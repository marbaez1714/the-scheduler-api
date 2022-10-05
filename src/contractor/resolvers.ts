import { Resolvers } from '../generated';
import { ContractorDataHandler } from './handlers';

export const contractorResolvers: Resolvers = {
  Query: {
    contractorById: async (_, { id }, context) => {
      const response = await new ContractorDataHandler(context).getById(id);
      return response;
    },
    contractors: async (_, { archived, pagination, sorting }, context) => {
      const response = await new ContractorDataHandler(context).getMany(
        archived,
        pagination,
        sorting
      );
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
    modifyContractor: async (_, { id, data }, context) => {
      const response = await new ContractorDataHandler(context).modify(
        id,
        data
      );
      return response;
    },
  },
};
