import { QueryResolvers } from '../generated/graphql';

import {
  AreaService,
  BuilderService,
  CommunityService,
  CompanyService,
  ContractorService,
  JobLegacyService,
  ReporterService,
  ScopeService,
  SupplierService,
} from './services';

export const queryResolvers: QueryResolvers = {
  // Query by Id
  areaById: async (_, args, context) => {
    const response = await new AreaService(context).getById(args);
    return response;
  },
  builderById: async (_, args, context) => {
    const response = await new BuilderService(context).getById(args);
    return response;
  },
  communityById: async (_, args, context) => {
    const response = await new CommunityService(context).getById(args);
    return response;
  },
  companyById: async (_, args, context) => {
    const response = await new CompanyService(context).getById(args);
    return response;
  },
  contractorById: async (_, args, context) => {
    const response = await new ContractorService(context).getById(args);
    return response;
  },
  reporterById: async (_, args, context) => {
    const response = await new ReporterService(context).getById(args);
    return response;
  },
  scopeById: async (_, args, context) => {
    const response = await new ScopeService(context).getById(args);
    return response;
  },
  supplierById: async (_, args, context) => {
    const response = await new SupplierService(context).getById(args);
    return response;
  },
  jobLegacyById: async (_, args, context) => {
    const response = await new JobLegacyService(context).getById(args);
    return response;
  },
  // Paginated Queries
  areas: async (_, args, context) => {
    const response = await new AreaService(context).getMany(args);
    return response;
  },
  builders: async (_, args, context) => {
    const response = await new BuilderService(context).getMany(args);
    return response;
  },
  communities: async (_, args, context) => {
    const response = await new CommunityService(context).getMany(args);
    return response;
  },
  companies: async (_, args, context) => {
    const response = await new CompanyService(context).getMany(args);
    return response;
  },
  contractors: async (_, args, context) => {
    const response = await new ContractorService(context).getMany(args);
    return response;
  },
  reporters: async (_, args, context) => {
    const response = await new ReporterService(context).getMany(args);
    return response;
  },
  scopes: async (_, args, context) => {
    const response = await new ScopeService(context).getMany(args);
    return response;
  },
  suppliers: async (_, args, context) => {
    const response = await new SupplierService(context).getMany(args);
    return response;
  },
  // Dashboard
  assignedContractors: async (_, args, context) => {
    const response = await new ContractorService(context).getAssigned(args);
    return response;
  },
  unassignedJobs: async (_, args, context) => {
    const response = await new JobLegacyService(context).getUnassigned(args);
    return response;
  },
};
