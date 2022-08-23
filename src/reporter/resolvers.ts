import { Resolvers } from '../generated';
import { ReporterDataHandler } from './handlers';

export const resolvers: Resolvers = {
  Query: {
    reporterById: async (_, args, context) => {
      const response = await new ReporterDataHandler(context).getById(args);
      return response;
    },
    reporters: async (_, args, context) => {
      const response = await new ReporterDataHandler(context).getMany(args);
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
  },
};
