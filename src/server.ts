import { ApolloServer } from 'apollo-server';

import { context } from './context';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  cache: 'bounded',
  introspection: true,
  csrfPrevention: true,
});

const port = process.env.PORT || 4000;

server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
