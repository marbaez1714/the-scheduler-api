import { ReportersResponse, ScopesResponse, SuppliersResponse } from './../generated/graphql';
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
  areas: async (_, { options }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findArgs = { ...getQueryOptions(options) };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.area.findMany(findArgs),
      context.prisma.area.count({ where: findArgs.where }),
    ]);

    const response: AreasResponse = {
      data: docList.map(areaDTO),
      pagination: {
        totalCount: count,
        page: options?.pagination?.page,
        pageSize: options?.pagination?.pageSize,
      },
      sorting: options?.sorting,
    };

    return response;
  },
  builders: async (_, { options }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findArgs = { include: { company: true }, ...getQueryOptions(options) };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.builder.findMany(findArgs),
      context.prisma.builder.count({ where: findArgs.where }),
    ]);

    const response: BuildersResponse = {
      data: docList.map(builderDTO),
      pagination: {
        totalCount: count,
        page: options?.pagination?.page,
        pageSize: options?.pagination?.pageSize,
      },
      sorting: options?.sorting,
    };

    return response;
  },
  communities: async (_, { options }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findArgs = { include: { company: true }, ...getQueryOptions(options) };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.community.findMany(findArgs),
      context.prisma.community.count({ where: findArgs.where }),
    ]);

    const response: CommunitiesResponse = {
      data: docList.map(communityDTO),
      pagination: {
        totalCount: count,
        page: options?.pagination?.page,
        pageSize: options?.pagination?.pageSize,
      },
      sorting: options?.sorting,
    };

    return response;
  },
  companies: async (_, { options }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findArgs = { ...getQueryOptions(options) };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.company.findMany(findArgs),
      context.prisma.company.count({ where: findArgs.where }),
    ]);

    const response: CompaniesResponse = {
      data: docList.map(companyDTO),
      pagination: {
        totalCount: count,
        page: options?.pagination?.page,
        pageSize: options?.pagination?.pageSize,
      },
      sorting: options?.sorting,
    };

    return response;
  },
  contractors: async (_, { options }, context) => {
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
      ...getQueryOptions(options),
    };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.contractor.findMany(findArgs),
      context.prisma.contractor.count({ where: findArgs.where }),
    ]);

    const response: ContractorsResponse = {
      data: docList.map(contractorDTO),
      pagination: {
        totalCount: count,
        page: options?.pagination?.page,
        pageSize: options?.pagination?.pageSize,
      },
      sorting: options?.sorting,
    };

    return response;
  },
  reporters: async (_, { options }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findArgs = { ...getQueryOptions(options) };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.reporter.findMany(findArgs),
      context.prisma.reporter.count({ where: findArgs.where }),
    ]);

    const response: ReportersResponse = {
      data: docList.map(reporterDTO),
      pagination: {
        totalCount: count,
        page: options?.pagination?.page,
        pageSize: options?.pagination?.pageSize,
      },
      sorting: options?.sorting,
    };

    return response;
  },
  scopes: async (_, { options }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findArgs = { ...getQueryOptions(options) };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.scope.findMany(findArgs),
      context.prisma.scope.count({ where: findArgs.where }),
    ]);

    const response: ScopesResponse = {
      data: docList.map(scopeDTO),
      pagination: {
        totalCount: count,
        page: options?.pagination?.page,
        pageSize: options?.pagination?.pageSize,
      },
      sorting: options?.sorting,
    };

    return response;
  },
  suppliers: async (_, { options }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findArgs = { ...getQueryOptions(options) };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.supplier.findMany(findArgs),
      context.prisma.supplier.count({ where: findArgs.where }),
    ]);

    const response: SuppliersResponse = {
      data: docList.map(supplierDTO),
      pagination: {
        totalCount: count,
        page: options?.pagination?.page,
        pageSize: options?.pagination?.pageSize,
      },
      sorting: options?.sorting,
    };

    return response;
  },
  // Dashboard
  dashboardLegacy: async (_, __, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findUnassigned = context.prisma.jobLegacy.findMany({
      where: { archived: false, active: true, contractorId: null },
      include: { lineItems: true },
    });

    const [unassignedList] = await context.prisma.$transaction([findUnassigned]);

    return {
      assigned: [],
      unassigned: unassignedList.map(jobLegacyDTO),
      totalAssigned: 0,
      totalUnassigned: 0,
    };
  },
};
