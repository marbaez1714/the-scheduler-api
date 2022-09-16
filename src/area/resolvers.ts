import { Resolvers } from '../generated';
import { AreaDataHandler } from './handlers';

export const areaResolvers: Resolvers = {
  Query: {
    areaById: async (_, args, context) => {
      const response = await new AreaDataHandler(context).getById(args);
      return response;
    },
    areas: async (_, args, context) => {
      const response = await new AreaDataHandler(context).getMany(args);
      return response;
    },
  },

  Mutation: {
    archiveArea: async (_, { id }, context) => {
      const response = await new AreaDataHandler(context).archive(id);
      return response;
    },
    createArea: async (_, { data }, context) => {
      const response = await new AreaDataHandler(context).create(data);
      return response;
    },
    modifyArea: async (_, { id, data }, context) => {
      const response = await new AreaDataHandler(context).modify(id, data);
      return response;
    },
  },
};
