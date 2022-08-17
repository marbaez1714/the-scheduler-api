import {
  ReportersResponse,
  ScopesResponse,
  SuppliersResponse,
  UnassignedJobsResponse,
  AssignedContractorsResponse,
} from './../generated/graphql';
import {
  AreasResponse,
  BuildersResponse,
  CommunitiesResponse,
  CompaniesResponse,
  ContractorsResponse,
  QueryResolvers,
} from '../generated/graphql';
import { UserInputError } from 'apollo-server-core';

import { Permissions } from './types';
import {
  checkPermission,
  areaDTO,
  builderDTO,
  communityDTO,
  companyDTO,
  contractorDTO,
  reporterDTO,
  scopeDTO,
  supplierDTO,
  jobLegacyDTO,
  getQueryOptions,
} from './utils';

export const queryResolvers: QueryResolvers = {
  // Query by Id
  areaById: async (_, args, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    // Find area
    const doc = await context.prisma.area.findUnique({ where: { id: args.id } });

    // If no idea is found, throw an error
    if (!doc) {
      throw new UserInputError(`${args.id} does not exist.`);
    }

    return areaDTO(doc);
  },
  builderById: async (_, args, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    // Find area
    const doc = await context.prisma.builder.findUnique({ where: { id: args.id }, include: { company: true } });

    // If no idea is found, throw an error
    if (!doc) {
      throw new UserInputError(`${args.id} does not exist.`);
    }

    return builderDTO(doc);
  },
  communityById: async (_, args, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    // Find area
    const doc = await context.prisma.community.findUnique({ where: { id: args.id }, include: { company: true } });

    // If no idea is found, throw an error
    if (!doc) {
      throw new UserInputError(`${args.id} does not exist.`);
    }

    return communityDTO(doc);
  },
  companyById: async (_, args, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    // Find area
    const doc = await context.prisma.company.findUnique({ where: { id: args.id } });

    // If no idea is found, throw an error
    if (!doc) {
      throw new UserInputError(`${args.id} does not exist.`);
    }

    return companyDTO(doc);
  },
  contractorById: async (_, args, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    // Find area
    const doc = await context.prisma.contractor.findUnique({
      where: { id: args.id },
      include: { jobsLegacy: { include: { lineItems: true } } },
    });

    // If no idea is found, throw an error
    if (!doc) {
      throw new UserInputError(`${args.id} does not exist.`);
    }

    return contractorDTO(doc);
  },
  reporterById: async (_, args, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    // Find area
    const doc = await context.prisma.reporter.findUnique({ where: { id: args.id } });

    // If no idea is found, throw an error
    if (!doc) {
      throw new UserInputError(`${args.id} does not exist.`);
    }

    return reporterDTO(doc);
  },
  scopeById: async (_, args, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    // Find area
    const doc = await context.prisma.scope.findUnique({ where: { id: args.id } });

    // If no idea is found, throw an error
    if (!doc) {
      throw new UserInputError(`${args.id} does not exist.`);
    }

    return scopeDTO(doc);
  },
  supplierById: async (_, args, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    // Find area
    const doc = await context.prisma.supplier.findUnique({ where: { id: args.id } });

    // If no idea is found, throw an error
    if (!doc) {
      throw new UserInputError(`${args.id} does not exist.`);
    }

    return supplierDTO(doc);
  },
  jobLegacyById: async (_, args, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    // Find area
    const doc = await context.prisma.jobLegacy.findUnique({ where: { id: args.id }, include: { lineItems: true } });

    // If no idea is found, throw an error
    if (!doc) {
      throw new UserInputError(`${args.id} does not exist.`);
    }

    return jobLegacyDTO(doc);
  },
  // Paginated Queries
  areas: async (_, args, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findArgs = {
      ...getQueryOptions(args),
    };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.area.findMany(findArgs),
      context.prisma.area.count({ where: findArgs.where }),
    ]);

    const response: AreasResponse = {
      data: docList.map(areaDTO),
      pagination: {
        totalCount: count,
        ...args.pagination,
      },
      sorting: args.sorting,
    };

    return response;
  },
  builders: async (_, args, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findArgs = {
      include: {
        company: true,
      },
      ...getQueryOptions(args),
    };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.builder.findMany(findArgs),
      context.prisma.builder.count({ where: findArgs.where }),
    ]);

    const response: BuildersResponse = {
      data: docList.map(builderDTO),
      pagination: {
        totalCount: count,
        ...args.pagination,
      },
      sorting: args.sorting,
    };

    return response;
  },
  communities: async (_, args, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findArgs = {
      include: {
        company: true,
      },
      ...getQueryOptions(args),
    };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.community.findMany(findArgs),
      context.prisma.community.count({ where: findArgs.where }),
    ]);

    const response: CommunitiesResponse = {
      data: docList.map(communityDTO),
      pagination: {
        totalCount: count,
        ...args.pagination,
      },
      sorting: args.sorting,
    };

    return response;
  },
  companies: async (_, args, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findArgs = { ...getQueryOptions(args) };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.company.findMany(findArgs),
      context.prisma.company.count({ where: findArgs.where }),
    ]);

    const response: CompaniesResponse = {
      data: docList.map(companyDTO),
      pagination: {
        totalCount: count,
        ...args.pagination,
      },
      sorting: args.sorting,
    };

    return response;
  },
  contractors: async (_, args, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findArgs = {
      include: {
        jobsLegacy: {
          include: {
            lineItems: true,
          },
        },
      },
      ...getQueryOptions(args),
    };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.contractor.findMany(findArgs),
      context.prisma.contractor.count({ where: findArgs.where }),
    ]);

    const response: ContractorsResponse = {
      data: docList.map(contractorDTO),
      pagination: {
        totalCount: count,
        ...args.pagination,
      },
      sorting: args.sorting,
    };

    return response;
  },
  reporters: async (_, args, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findArgs = { ...getQueryOptions(args) };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.reporter.findMany(findArgs),
      context.prisma.reporter.count({ where: findArgs.where }),
    ]);

    const response: ReportersResponse = {
      data: docList.map(reporterDTO),
      pagination: {
        totalCount: count,
        ...args.pagination,
      },
      sorting: args.sorting,
    };

    return response;
  },
  scopes: async (_, args, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findArgs = { ...getQueryOptions(args) };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.scope.findMany(findArgs),
      context.prisma.scope.count({ where: findArgs.where }),
    ]);

    const response: ScopesResponse = {
      data: docList.map(scopeDTO),
      pagination: {
        totalCount: count,
        ...args.pagination,
      },
      sorting: args.sorting,
    };

    return response;
  },
  suppliers: async (_, args, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findArgs = { ...getQueryOptions(args) };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.supplier.findMany(findArgs),
      context.prisma.supplier.count({ where: findArgs.where }),
    ]);

    const response: SuppliersResponse = {
      data: docList.map(supplierDTO),
      pagination: {
        totalCount: count,
        ...args.pagination,
      },
      sorting: args.sorting,
    };

    return response;
  },
  // Dashboard
  assignedContractors: async (_, args, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const { where, ...rest } = getQueryOptions(args);

    const jobWhereArgs = {
      active: true,
      ...where,
    };

    const findArgs = {
      where: {
        jobsLegacy: {
          some: jobWhereArgs,
        },
        ...where,
      },
      include: {
        jobsLegacy: {
          where: jobWhereArgs,
          include: {
            lineItems: true,
          },
        },
      },
      ...rest,
    };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.contractor.findMany(findArgs),
      context.prisma.jobLegacy.count({ where: jobWhereArgs }),
    ]);

    const response: AssignedContractorsResponse = {
      data: docList.map(contractorDTO),
      pagination: {
        totalCount: count,
        ...args.pagination,
      },
      sorting: args.sorting,
    };

    return response;
  },
  unassignedJobs: async (_, args, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const { where, ...rest } = getQueryOptions(args);

    const findArgs = {
      where: {
        active: true,
        contractorId: null,
        ...where,
      },
      include: {
        lineItems: true,
      },
      ...rest,
    };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.jobLegacy.findMany(findArgs),
      context.prisma.jobLegacy.count({ where: findArgs.where }),
    ]);

    const response: UnassignedJobsResponse = {
      data: docList.map(jobLegacyDTO),
      pagination: {
        totalCount: count,
        ...args.pagination,
      },
      sorting: args.sorting,
    };

    return response;
  },
};
