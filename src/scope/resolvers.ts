import { Resolvers } from '../generated';
import { ScopeDataHandler } from '../handlers';

export const scopeResolvers: Resolvers = {
  Query: {
    scopeById: async (_, { id }, context) => {
      const response = await new ScopeDataHandler(context).getById(id);
      return response;
    },
    scopes: async (_, { archived, pagination }, context) => {
      const response = await new ScopeDataHandler(context).getMany(archived, pagination);
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
    modifyScope: async (_, { id, data }, context) => {
      const response = await new ScopeDataHandler(context).modify(id, data);
      return response;
    },
  },
};
