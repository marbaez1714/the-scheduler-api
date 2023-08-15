import { Resolvers } from '../generated';
import { ReporterDataHandler } from '../handlers';

export const reporterResolvers: Resolvers = {
  Query: {
    reporterById: async (_, { id }, context) => {
      const response = await new ReporterDataHandler(context).getById(id);
      return response;
    },
    reporters: async (_, { archived, pagination }, context) => {
      const response = await new ReporterDataHandler(context).getMany(archived, pagination);
      return response;
    },
  },
  Mutation: {
    archiveReporter: async (_, { id }, context) => {
      const response = await new ReporterDataHandler(context).archive(id);
      return response;
    },
    createReporter: async (_, { data }, context) => {
      const response = await new ReporterDataHandler(context).create(data);
      return response;
    },
    modifyReporter: async (_, { id, data }, context) => {
      const response = await new ReporterDataHandler(context).modify(id, data);
      return response;
    },
  },
};
