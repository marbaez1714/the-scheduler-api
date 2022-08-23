import { Resolvers } from '../generated';
import { ContractorDataHandler } from './handlers';

export const resolvers: Resolvers = {
  Query: {
    assignedContractors: async (_, args, context) => {
      const response = await new ContractorDataHandler(context).getAssigned(args);
      return response;
    },
    contractorById: async (_, args, context) => {
      const response = await new ContractorDataHandler(context).getById(args);
      return response;
    },
    contractors: async (_, args, context) => {
      const response = await new ContractorDataHandler(context).getMany(args);
      return response;
    },
  },
  Mutation: {
    archiveContractor: async (_, { id }, context) => {
      const response = await new ContractorDataHandler(context).archive(id);
      return response;
    },
    createContractor: async (_, { data }, context) => {
      const response = await new ContractorDataHandler(context).create(data);
      return response;
    },
  },
};
