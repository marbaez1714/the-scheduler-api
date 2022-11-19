import { context } from './../context';
import { Resolvers } from '../generated';
import { JobLegacyDataHandler, LineItemLegacyDataHandler } from './handlers';

export const jobLegacyResolvers: Resolvers = {
  Query: {
    jobLegacyById: async (_, { id }, context) => {
      const response = await new JobLegacyDataHandler(context).getById(id);
      return response;
    },
    jobsLegacyByContractorId: async (
      _,
      { id, archived, pagination },
      context
    ) => {
      const response = await new JobLegacyDataHandler(
        context
      ).getByContractorId(id, archived, pagination);

      return response;
    },
    jobsLegacy: async (_, { archived, pagination }, context) => {
      const response = await new JobLegacyDataHandler(context).getMany(
        archived,
        pagination
      );
      return response;
    },
    jobsLegacyByActiveStatus: async (
      _,
      { active, archived, pagination },
      context
    ) => {
      const response = await new JobLegacyDataHandler(
        context
      ).getByActiveStatus(active, archived, pagination);
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
    modifyJobLegacy: async (_, { id, data }, context) => {
      const response = await new JobLegacyDataHandler(context).modify(id, data);
      return response;
    },
    deleteLineItemLegacy: async (_, { id }, context) => {
      const response = await new LineItemLegacyDataHandler(context).delete(id);
      return response;
    },
    sendMessageJobLegacy: async (_, { id, message, recipient }, context) => {
      const response = await new JobLegacyDataHandler(context).sendMessage(
        id,
        message,
        recipient
      );
      return response;
    },
  },
};
