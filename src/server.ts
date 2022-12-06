import { ApolloServer } from 'apollo-server';
import { loadFiles } from '@graphql-tools/load-files';

import { context } from './context';
import { resolvers } from './resolvers';

async function main() {
  // Setup Server
  const server = new ApolloServer({
    typeDefs: await loadFiles('src/**/*.graphql'),
    resolvers,
    context,
    cache: 'bounded',
    csrfPrevention: true,
  });

  // Configure Port
  const port = process.env.PORT || 4000;

  // Start Server
  server.listen({ port }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

main();
