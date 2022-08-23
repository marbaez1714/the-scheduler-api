import { Resolvers } from '../generated';
import { SupplierDataHandler } from './handlers';

export const resolvers: Resolvers = {
  Query: {
    supplierById: async (_, args, context) => {
      const response = await new SupplierDataHandler(context).getById(args);
      return response;
    },
    suppliers: async (_, args, context) => {
      const response = await new SupplierDataHandler(context).getMany(args);
      return response;
    },
  },
  Mutation: {
    archiveSupplier: async (_, { id }, context) => {
      const response = await new SupplierDataHandler(context).archive(id);
      return response;
    },
    createSupplier: async (_, { data }, context) => {
      const response = await new SupplierDataHandler(context).create(data);
      return response;
    },
  },
};
