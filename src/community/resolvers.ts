import { Resolvers } from '../generated';
import { CommunityDataHandler } from './handlers';

export const communityResolvers: Resolvers = {
  Query: {
    communityById: async (_, { id }, context) => {
      const response = await new CommunityDataHandler(context).getById(id);
      return response;
    },
    communities: async (_, { archived, pagination, sorting }, context) => {
      const response = await new CommunityDataHandler(context).getMany(
        archived,
        pagination,
        sorting
      );
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
    modifyCommunity: async (_, { id, data }, context) => {
      const response = await new CommunityDataHandler(context).modify(id, data);
      return response;
    },
  },
};
