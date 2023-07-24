import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { loadFiles } from '@graphql-tools/load-files';
import { context, Context } from './context';
import { resolvers } from './resolvers';

async function main() {
  // Configure Port
  const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;

  // setup express
  const app = express();

  // setup http server
  const httpServer = http.createServer(app);

  // setup apollo server with ApolloServerPluginDrainHttpServer
  const server = new ApolloServer<Context | {}>({
    typeDefs: await loadFiles('src/**/*.graphql'),
    resolvers,
    cache: 'bounded',
    csrfPrevention: true,
    allowBatchedHttpRequests: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // start apollo server
  await server.start();

  // setup express middleware
  app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server, { context }));

  // start the http server
  await new Promise<void>((resolve) => httpServer.listen(port, resolve));
}

main();
