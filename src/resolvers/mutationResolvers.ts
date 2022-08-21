import { MutationResolvers } from '../generated/graphql';

import {
  AreaService,
  BuilderService,
  CommunityService,
  CompanyService,
  ContractorService,
  JobLegacyService,
  LineItemLegacyService,
  ReporterService,
  ScopeService,
  SupplierService,
} from './services';

export const mutationResolvers: MutationResolvers = {
  // Archive
  archiveArea: async (_, { id }, context) => {
    const response = await new AreaService(context).archive(id);
    return response;
  },
  archiveBuilder: async (_, { id }, context) => {
    const response = await new BuilderService(context).archive(id);
    return response;
  },
  archiveCommunity: async (_, { id }, context) => {
    const response = await new CommunityService(context).archive(id);
    return response;
  },
  archiveCompany: async (_, { id }, context) => {
    const response = await new CompanyService(context).archive(id);
    return response;
  },
  archiveContractor: async (_, { id }, context) => {
    const response = await new ContractorService(context).archive(id);
    return response;
  },
  archiveReporter: async (_, { id }, context) => {
    const response = await new ReporterService(context).archive(id);
    return response;
  },
  archiveScope: async (_, { id }, context) => {
    const response = await new ScopeService(context).archive(id);
    return response;
  },
  archiveSupplier: async (_, { id }, context) => {
    const response = await new SupplierService(context).archive(id);
    return response;
  },
  archiveJobLegacy: async (_, { id }, context) => {
    const response = await new JobLegacyService(context).archive(id);
    return response;
  },

  // Create
  createArea: async (_, { data }, context) => {
    const response = await new AreaService(context).create(data);
    return response;
  },
  createBuilder: async (_, { data }, context) => {
    const response = await new BuilderService(context).create(data);
    return response;
  },
  createCommunity: async (_, { data }, context) => {
    const response = await new CommunityService(context).create(data);
    return response;
  },
  createCompany: async (_, { data }, context) => {
    const response = await new CompanyService(context).create(data);
    return response;
  },
  createContractor: async (_, { data }, context) => {
    const response = await new ContractorService(context).create(data);
    return response;
  },
  createReporter: async (_, { data }, context) => {
    const response = await new ReporterService(context).create(data);
    return response;
  },
  createScope: async (_, { data }, context) => {
    const response = await new ScopeService(context).create(data);
    return response;
  },
  createSupplier: async (_, { data }, context) => {
    const response = await new SupplierService(context).create(data);
    return response;
  },
  createJobLegacy: async (_, { data }, context) => {
    const response = await new JobLegacyService(context).create(data);
    return response;
  },

  // Delete
  deleteLineItemLegacy: async (_, { id }, context) => {
    const response = await new LineItemLegacyService(context).delete(id);
    return response;
  },
};
