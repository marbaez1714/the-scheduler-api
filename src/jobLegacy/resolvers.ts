import { Resolvers } from '../generated';
import { JobLegacyDataHandler, LineItemLegacyDataHandler } from '../handlers';

export const jobLegacyResolvers: Resolvers = {
  Query: {
    jobLegacyById: async (_, args, context) => {
      const response = await new JobLegacyDataHandler(context).getById(args);
      return response;
    },
    jobsLegacyByContractorId: async (_, args, context) => {
      const response = await new JobLegacyDataHandler(context).getByContractorId(args);

      return response;
    },
    jobsLegacy: async (_, args, context) => {
      const response = await new JobLegacyDataHandler(context).getMany(args);
      return response;
    },
    jobsLegacyByActiveStatus: async (_, args, context) => {
      const response = await new JobLegacyDataHandler(context).getByActiveStatus(args);
      return response;
    },
  },
  Mutation: {
    archiveJobLegacy: async (_, args, context) => {
      const response = await new JobLegacyDataHandler(context).archive(args);
      return response;
    },
    createJobLegacy: async (_, args, context) => {
      const response = await new JobLegacyDataHandler(context).create(args);
      return response;
    },
    modifyJobLegacy: async (_, args, context) => {
      const response = await new JobLegacyDataHandler(context).modify(args);
      return response;
    },
    deleteLineItemLegacy: async (_, args, context) => {
      const response = await new LineItemLegacyDataHandler(context).delete(args);
      return response;
    },
    sendMessageJobLegacy: async (_, args, context) => {
      const response = await new JobLegacyDataHandler(context).sendMessage(args);
      return response;
    },
    reenableJobLegacy: async (_, args, context) => {
      const response = await new JobLegacyDataHandler(context).reenable(args);
      return response;
    },
  },
};
