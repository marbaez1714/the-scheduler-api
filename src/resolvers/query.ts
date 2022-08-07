import {
  Permissions,
  checkPermission,
  formatArea,
  formatBuilder,
  formatCommunity,
  formatCompany,
  formatContractor,
  formatReporter,
  formatScope,
  formatSupplier,
  formatJobLegacy,
} from './utils';

import { QueryResolvers } from './../generated/graphql';
import { UserInputError } from 'apollo-server-core';

export const queryResolvers: QueryResolvers = {
  // Query All
  areasAll: async (_, __, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    // Get all areas
    const docList = await context.prisma.area.findMany();

    // return all areas
    return docList.map(formatArea);
  },
  buildersAll: async (_, __, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    // Get all areas
    const docList = await context.prisma.builder.findMany();

    // return all areas
    return docList.map(formatBuilder);
  },
  communitiesAll: async (_, __, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    // Get all areas
    const docList = await context.prisma.community.findMany();

    // return all areas
    return docList.map(formatCommunity);
  },
  companiesAll: async (_, __, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    // Get all areas
    const docList = await context.prisma.company.findMany();

    // return all areas
    return docList.map(formatCompany);
  },
  contractorsAll: async (_, __, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    // Get all areas
    const docList = await context.prisma.contractor.findMany();

    // return all areas
    return docList.map(formatContractor);
  },
  reportersAll: async (_, __, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    // Get all areas
    const docList = await context.prisma.reporter.findMany();

    // return all areas
    return docList.map(formatReporter);
  },
  scopesAll: async (_, __, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    // Get all areas
    const docList = await context.prisma.scope.findMany();

    // return all areas
    return docList.map(formatScope);
  },
  suppliersAll: async (_, __, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    // Get all areas
    const docList = await context.prisma.supplier.findMany();

    // return all areas
    return docList.map(formatSupplier);
  },
  jobsLegacyAll: async (_, __, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    // Get all areas
    const docList = await context.prisma.jobLegacy.findMany();

    // return all areas
    return docList.map(formatJobLegacy);
  },
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

    return formatArea(doc);
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

    return formatBuilder(doc);
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

    return formatCommunity(doc);
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

    return formatCompany(doc);
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

    return formatContractor(doc);
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

    return formatReporter(doc);
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

    return formatScope(doc);
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

    return formatSupplier(doc);
  },
  jobLegacyById: async (_, args, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    // Find area
    const doc = await context.prisma.jobLegacy.findUnique({ where: { id: args.id } });

    // If no idea is found, throw an error
    if (!doc) {
      throw new UserInputError(`${args.id} does not exist.`);
    }

    return formatJobLegacy(doc);
  },
};
