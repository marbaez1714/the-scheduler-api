import { Resolvers } from '../generated';
import { JobLegacyDataHandler, LineItemLegacyDataHandler } from './handlers';

export const resolvers: Resolvers = {
  Query: {
    jobLegacyById: async (_, args, context) => {
      const response = await new JobLegacyDataHandler(context).getById(args);
      return response;
    },
    unassignedJobs: async (_, args, context) => {
      const response = await new JobLegacyDataHandler(context).getUnassigned(args);
      return response;
    },
  },
  Mutation: {
    archiveJobLegacy: async (_, { id }, context) => {
      const response = await new JobLegacyDataHandler(context).archive(id);
      return response;
    },
    createJobLegacy: async (_, { data }, context) => {
      const response = await new JobLegacyDataHandler(context).create(data);
      return response;
    },
    deleteLineItemLegacy: async (_, { id }, context) => {
      const response = await new LineItemLegacyDataHandler(context).delete(id);
      return response;
    },
  },
};
