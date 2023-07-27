import { ContextFunction } from '@apollo/server';
import { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone';
import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import twilio, { Twilio } from 'twilio';

export type DecodedUserToken = {
  permissions: string[];
  sub: string;
};

export interface Context {
  prisma: PrismaClient;
  twilio: Twilio;
  user: DecodedUserToken;
}

// Creates the prisma client
const prismaClient = new PrismaClient();

// Creates the jwksClient for jwt verification
const authClient = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

// Sets the options for decoding jwt tokens
const authOptions: jwt.VerifyOptions = {
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
};

// Gets the public key for jwt token
const authGetKey: jwt.GetPublicKeyOrSecret = async (header, callback) => {
  const key = await authClient.getSigningKey(header.kid);
  const signingKey = key.getPublicKey();
  callback(null, signingKey);
};

export const context: ContextFunction<
  [StandaloneServerContextFunctionArgument],
  Context | {}
> = async ({ req }) => {
  const authHeader = req.headers.authorization?.split(' ');
  const token = authHeader?.[1];

  if (!token) {
    prismaClient.$disconnect();
    return {};
  }

  const decodedToken = await new Promise<DecodedUserToken>((resolve, reject) => {
    jwt.verify(token, authGetKey, authOptions, (err, decoded) => {
      if (err) {
        reject(err);
      }

      if (decoded) {
        const permissions = (decoded as Partial<DecodedUserToken>).permissions ?? [];
        const sub = (decoded as Partial<DecodedUserToken>).sub ?? '';

        resolve({ permissions, sub });
      }
    });
  });

  if (!decodedToken.permissions) {
    throw new GraphQLError('No permissions given.', { extensions: { code: 'UNAUTHENTICATED' } });
  }

  if (!decodedToken.sub) {
    throw new GraphQLError('No user id.', { extensions: { code: 'UNAUTHENTICATED' } });
  }

  return {
    prisma: prismaClient,
    twilio: twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN),
    user: {
      permissions: decodedToken.permissions,
      sub: decodedToken.sub,
    },
  };
};
