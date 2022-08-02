import { Resolvers } from '../generated/graphql';
import { mutationResolvers } from './mutation';
import { queryResolvers } from './query';

export const resolvers: Resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};
