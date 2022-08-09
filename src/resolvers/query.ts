import { QueryResolvers, SortOrder } from '../generated/graphql';
import { UserInputError } from 'apollo-server-core';
import { Prisma } from '@prisma/client';

import { checkPermission, formatResponse, formatJobLegacy, getPaginationOptions, getSortingOptions } from './utils';
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

    return formatResponse(doc);
  },
  builderById: async (_, args, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    // Find area
    const doc = await context.prisma.builder.findUnique({ where: { id: args.id } });

    // If no idea is found, throw an error
    if (!doc) {
      throw new UserInputError(`${args.id} does not exist.`);
    }

    return formatResponse(doc);
  },
  communityById: async (_, args, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    // Find area
    const doc = await context.prisma.community.findUnique({ where: { id: args.id } });

    // If no idea is found, throw an error
    if (!doc) {
      throw new UserInputError(`${args.id} does not exist.`);
    }

    return formatResponse(doc);
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

    return formatResponse(doc);
  },
  contractorById: async (_, args, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    // Find area
    const doc = await context.prisma.contractor.findUnique({ where: { id: args.id } });

    // If no idea is found, throw an error
    if (!doc) {
      throw new UserInputError(`${args.id} does not exist.`);
    }

    return formatResponse(doc);
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

    return formatResponse(doc);
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

    return formatResponse(doc);
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

    return formatResponse(doc);
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

    return formatJobLegacy(doc);
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

    return docList.map(formatResponse);
  },
  builders: async (_, { options }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findManyArgs: Prisma.BuilderFindManyArgs = {
      where: { archived: !!options?.archived },
      ...getPaginationOptions(options?.pagination),
      ...getSortingOptions(options?.sorting),
    };

    const docList = await context.prisma.builder.findMany(findManyArgs);

    return docList.map(formatResponse);
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
