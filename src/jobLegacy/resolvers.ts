import { Resolvers } from '../generated';
import { JobLegacyDataHandler, LineItemLegacyDataHandler } from './handlers';

export const jobLegacyResolvers: Resolvers = {
  Query: {
    jobLegacyById: async (_, { id }, context) => {
      const response = await new JobLegacyDataHandler(context).getById(id);
      return response;
    },
    jobLegacyByContractorId: async (
      _,
      { id, archived, pagination, sorting },
      context
    ) => {
      const response = await new JobLegacyDataHandler(
        context
      ).getByContractorId(id, archived, pagination, sorting);

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
