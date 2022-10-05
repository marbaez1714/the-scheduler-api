import { Resolvers } from '../generated';
import { CompanyDataHandler } from './handlers';

export const companyResolvers: Resolvers = {
  Query: {
    companyById: async (_, { id }, context) => {
      const response = await new CompanyDataHandler(context).getById(id);
      return response;
    },
    companies: async (_, { archived, pagination, sorting }, context) => {
      const response = await new CompanyDataHandler(context).getMany(
        archived,
        pagination,
        sorting
      );
      return response;
    },
  },
  Mutation: {
    archiveCompany: async (_, { id }, context) => {
      const response = await new CompanyDataHandler(context).archive(id);
      return response;
    },
    createCompany: async (_, { data }, context) => {
      const response = await new CompanyDataHandler(context).create(data);
      return response;
    },
    modifyCompany: async (_, { id, data }, context) => {
      const response = await new CompanyDataHandler(context).modify(id, data);
      return response;
    },
  },
};
