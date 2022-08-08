import { PrismaClient } from '@prisma/client';
import { ContextFunction, AuthenticationError } from 'apollo-server-core';
import { ExpressContext } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { AuthenticationClient } from 'auth0';

type DecodedToken = {
  permissions: string[];
};

type User = {
  email: string;
};

export interface Context {
  prisma: PrismaClient;
  user: DecodedToken & User;
}

// Creates the prisma client
const prisma = new PrismaClient();

// Create auth0 authentication client
const auth0Client = new AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN ?? '',
  clientId: process.env.AUTH0_CLIENT_ID,
});

// Creates the jwksClient for jwt verification
const authClient = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

// Sets the options for decoding jwt tokens
const authOptions: jwt.VerifyOptions = {
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
};

// Gets the public key for jwt token
const authGetKey: jwt.GetPublicKeyOrSecret = async (header, callback) => {
  const key = await authClient.getSigningKey(header.kid);
  const signingKey = key.getPublicKey();
  callback(null, signingKey);
};

export const context: ContextFunction<ExpressContext, Context | {}> = async ({ req }) => {
  const authHeader = req.headers.authorization?.split(' ');
  const token = authHeader?.[1];

  if (!token) {
    return {};
  }

  const decodedToken = await new Promise<DecodedToken>((resolve, reject) => {
    jwt.verify(token, authGetKey, authOptions, (err, decoded) => {
      err && reject(err);
      decoded && resolve(decoded as DecodedToken);
    });
  });

  const profile: User = await auth0Client.getProfile(token);

  if (!decodedToken.permissions) {
    throw new AuthenticationError('No permissions given.');
  }

  if (!profile.email) {
    throw new AuthenticationError('No email provided');
  }

  return {
    prisma,
    user: {
      permissions: decodedToken.permissions,
      email: profile.email,
    },
  };
};
