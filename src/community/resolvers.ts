import { Resolvers } from '../generated';
import { CommunityDataHandler } from './handlers';

export const resolvers: Resolvers = {
  Query: {
    communityById: async (_, args, context) => {
      const response = await new CommunityDataHandler(context).getById(args);
      return response;
    },
    communities: async (_, args, context) => {
      const response = await new CommunityDataHandler(context).getMany(args);
      return response;
    },
  },
  Mutation: {
    archiveCommunity: async (_, { id }, context) => {
      const response = await new CommunityDataHandler(context).archive(id);
      return response;
    },
    createCommunity: async (_, { data }, context) => {
      const response = await new CommunityDataHandler(context).create(data);
      return response;
    },
  },
};
