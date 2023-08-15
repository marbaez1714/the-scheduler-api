import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { loadFiles } from '@graphql-tools/load-files';
import { Router } from 'express';
import { Server } from 'http';
import cors from 'cors';
import { json } from 'body-parser';

import { context } from './context';
import { resolvers } from './resolvers';

export const setupApolloServer = async (httpServer: Server) => {
  try {
    // setup express
    const router = Router();

    // get typeDefs from graphql files
    const typeDefs = await loadFiles('src/**/*.graphql');

    // setup apollo server with ApolloServerPluginDrainHttpServer
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      cache: 'bounded',
      csrfPrevention: true,
      allowBatchedHttpRequests: true,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    // start apollo server
    await apolloServer.start();

    // setup express middleware
    router.use('/', cors(), json(), expressMiddleware(apolloServer, { context }));

    return router;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
