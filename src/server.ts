import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { loadFiles } from '@graphql-tools/load-files';

import { context, Context } from './context';
import { resolvers } from './resolvers';

async function main() {
  const server = new ApolloServer<Context | {}>({
    typeDefs: await loadFiles('src/**/*.graphql'),
    resolvers,
    cache: 'bounded',
    csrfPrevention: true,
    allowBatchedHttpRequests: true,
  });

  const port = process.env.PORT || 4000;

  const { url } = await startStandaloneServer(server, {
    context,
    listen: { port: parseInt(`${port}`) },
  });

  console.log(`🚀  Server ready at ${url}`);
}

main();

// async function mainOld() {
//   // Setup Server
//   const server = new ApolloServerOld({
//     typeDefs: await loadFiles('src/**/*.graphql'),
//     resolvers,
//     context,
//     cache: 'bounded',
//     csrfPrevention: true,
//   });

//   // Configure Port
//   const port = process.env.PORT || 4000;

//   // Start Server
//   server.listen({ port }).then(({ url }) => {
//     console.log(`🚀  Server ready at ${url}`);
//   });
// }

// mainOld();
