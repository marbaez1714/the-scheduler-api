import { Resolvers } from '../generated';
import { BuilderDataHandler } from './handlers';

export const builderResolvers: Resolvers = {
  Query: {
    builderById: async (_, args, context) => {
      const response = await new BuilderDataHandler(context).getById(args);
      return response;
    },
    builders: async (_, args, context) => {
      const response = await new BuilderDataHandler(context).getMany(args);
      return response;
    },
  },

  Mutation: {
    archiveBuilder: async (_, { id }, context) => {
      const response = await new BuilderDataHandler(context).archive(id);
      return response;
    },
    createBuilder: async (_, { data }, context) => {
      const response = await new BuilderDataHandler(context).create(data);
      return response;
    },
    modifyBuilder: async (_, { id, data }, context) => {
      const response = await new BuilderDataHandler(context).modify(id, data);
      return response;
    },
  },
};
