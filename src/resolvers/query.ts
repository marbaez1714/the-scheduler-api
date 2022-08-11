import { QueryResolvers } from '../generated/graphql';
import { UserInputError } from 'apollo-server-core';
import { Prisma } from '@prisma/client';

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
  getPaginationOptions,
  getSortingOptions,
} from './utils';
import { Permissions } from './types';

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

    const findManyArgs: Prisma.AreaFindManyArgs = {
      where: { archived: !!options?.archived },
      ...getPaginationOptions(options?.pagination),
      ...getSortingOptions(options?.sorting),
    };

    const docList = await context.prisma.area.findMany(findManyArgs);

    return docList.map(areaDTO);
  },
  builders: async (_, { options }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findManyArgs: Prisma.BuilderFindManyArgs = {
      where: { archived: !!options?.archived },
      include: { company: true },
      ...getPaginationOptions(options?.pagination),
      ...getSortingOptions(options?.sorting),
    };

    const docList = await context.prisma.builder.findMany(findManyArgs);

    return docList.map(builderDTO);
  },
  communities: async (_, { options }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findManyArgs: Prisma.CommunityFindManyArgs = {
      where: { archived: !!options?.archived },
      ...getPaginationOptions(options?.pagination),
      ...getSortingOptions(options?.sorting),
    };

    const docList = await context.prisma.community.findMany(findManyArgs);

    return docList.map(formatResponse);
  },
  companies: async (_, { options }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findManyArgs: Prisma.CompanyFindManyArgs = {
      where: { archived: !!options?.archived },
      ...getPaginationOptions(options?.pagination),
      ...getSortingOptions(options?.sorting),
    };

    const docList = await context.prisma.company.findMany(findManyArgs);

    return docList.map(formatResponse);
  },
  contractors: async (_, { options }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findManyArgs: Prisma.ContractorFindManyArgs = {
      where: { archived: !!options?.archived },
      ...getPaginationOptions(options?.pagination),
      ...getSortingOptions(options?.sorting),
    };

    const docList = await context.prisma.contractor.findMany(findManyArgs);

    return docList.map(formatResponse);
  },
  reporters: async (_, { options }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findManyArgs: Prisma.ReporterFindManyArgs = {
      where: { archived: !!options?.archived },
      ...getPaginationOptions(options?.pagination),
      ...getSortingOptions(options?.sorting),
    };

    const docList = await context.prisma.reporter.findMany(findManyArgs);

    return docList.map(formatResponse);
  },
  scopes: async (_, { options }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findManyArgs: Prisma.ScopeFindManyArgs = {
      where: { archived: !!options?.archived },
      ...getPaginationOptions(options?.pagination),
      ...getSortingOptions(options?.sorting),
    };

    const docList = await context.prisma.scope.findMany(findManyArgs);

    return docList.map(formatResponse);
  },
  suppliers: async (_, { options }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findManyArgs: Prisma.SupplierFindManyArgs = {
      where: { archived: !!options?.archived },
      ...getPaginationOptions(options?.pagination),
      ...getSortingOptions(options?.sorting),
    };

    const docList = await context.prisma.supplier.findMany(findManyArgs);

    return docList.map(formatResponse);
  },
};
