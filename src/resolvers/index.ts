import { Resolvers } from '../generated/graphql';
import { mutationResolvers } from './mutationResolvers';
import { queryResolvers } from './queryResolvers';

export const resolvers: Resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};
