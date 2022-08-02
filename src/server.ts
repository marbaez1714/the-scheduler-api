import { ApolloServer } from 'apollo-server';

import { context } from './context';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  csrfPrevention: true,
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
