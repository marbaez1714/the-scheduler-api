import { Resolvers } from '../generated';
import { ScopeDataHandler } from './handlers';

export const resolvers: Resolvers = {
  Query: {
    scopeById: async (_, args, context) => {
      const response = await new ScopeDataHandler(context).getById(args);
      return response;
    },
    scopes: async (_, args, context) => {
      const response = await new ScopeDataHandler(context).getMany(args);
      return response;
    },
  },
  Mutation: {
    archiveScope: async (_, { id }, context) => {
      const response = await new ScopeDataHandler(context).archive(id);
      return response;
    },
    createScope: async (_, { data }, context) => {
      const response = await new ScopeDataHandler(context).create(data);
      return response;
    },
  },
};
