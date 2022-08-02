import { PrismaClient } from '@prisma/client';
import { ContextFunction, AuthenticationError } from 'apollo-server-core';
import { ExpressContext } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

export interface Context {
  prisma: PrismaClient;
}

// Creates the jwksClient for jwt verification
const authClient = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN ?? ''}/.well-known/jwks.json`,
});

// Sets the options for decoding jwt tokens
const authOptions: jwt.VerifyOptions = {
  audience: process.env.AUTH0_AUDIENCE ?? '',
  issuer: `https://${process.env.AUTH0_DOMAIN ?? ''}/`,
  algorithms: ['RS256'],
};

// Gets the public key for jwt token
const authGetKey: jwt.GetPublicKeyOrSecret = async (header, callback) => {
  const key = await authClient.getSigningKey(header.kid);
  const signingKey = key.getPublicKey();
  callback(null, signingKey);
};

export const context: ContextFunction<ExpressContext, Context> = async ({ req }) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AuthenticationError('No token provided.');
  }

  const result = await new Promise((resolve, reject) => {
    jwt.verify(token, authGetKey, authOptions, (err, decoded) => {
      err && reject(err);
      decoded && resolve(decoded);
    });
  });

  console.log(result);

  return {
    prisma: new PrismaClient(),
  };
};
