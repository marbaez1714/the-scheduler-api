import { Resolvers } from '../generated';
import { SupplierDataHandler } from './handlers';

export const supplierResolvers: Resolvers = {
  Query: {
    supplierById: async (_, { id }, context) => {
      const response = await new SupplierDataHandler(context).getById(id);
      return response;
    },
    suppliers: async (_, { archived, pagination, sorting }, context) => {
      const response = await new SupplierDataHandler(context).getMany(
        archived,
        pagination,
        sorting
      );
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
    modifySupplier: async (_, { id, data }, context) => {
      const response = await new SupplierDataHandler(context).modify(id, data);
      return response;
    },
  },
};
