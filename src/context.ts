import { PrismaClient } from '@prisma/client';
import { ContextFunction, AuthenticationError } from 'apollo-server-core';
import { ExpressContext } from 'apollo-server-express';
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

// Create Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Creates the jwksClient for jwt verification
const authClient = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

// Sets the options for decoding jwt tokens
const authOptions: jwt.VerifyOptions = {
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
  audience: process.env.AUTH0_AUD,
};

// Gets the public key for jwt token
const authGetKey: jwt.GetPublicKeyOrSecret = async (header, callback) => {
  const key = await authClient.getSigningKey(header.kid);
  const signingKey = key.getPublicKey();
  callback(null, signingKey);
};

export const context: ContextFunction<ExpressContext, Context | {}> = async ({
  req,
}) => {
  const authHeader = req.headers.authorization?.split(' ');
  const token = authHeader?.[1];

  if (!token) {
    return {};
  }

  const decodedToken = await new Promise<DecodedUserToken>(
    (resolve, reject) => {
      jwt.verify(token, authGetKey, authOptions, (err, decoded) => {
        err && reject(err);
        decoded && resolve(decoded as DecodedUserToken);
      });
    }
  );

  if (!decodedToken.permissions) {
    throw new AuthenticationError('No permissions given.');
  }

  if (!decodedToken.sub) {
    throw new AuthenticationError('No user id');
  }

  return {
    prisma: prismaClient,
    twilio: twilioClient,
    user: {
      permissions: decodedToken.permissions,
      sub: decodedToken.sub,
    },
  };
};
