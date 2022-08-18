import { QueryResolvers } from '../generated/graphql';
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
  paginationDTO,
  sortingDTO,
  getPaginationArgs,
  getSortingArgs,
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
  areas: async (_, { archived, pagination, sorting }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findArgs = {
      where: { archived: !!archived },
      ...getPaginationArgs(pagination),
      ...getSortingArgs(sorting),
    };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.area.findMany(findArgs),
      context.prisma.area.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map(areaDTO),
      ...paginationDTO(count, pagination),
      ...sortingDTO(sorting),
    };
  },
  builders: async (_, { archived, pagination, sorting }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findArgs = {
      include: { company: true },
      where: { archived: !!archived },
      ...getPaginationArgs(pagination),
      ...getSortingArgs(sorting),
    };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.builder.findMany(findArgs),
      context.prisma.builder.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map(builderDTO),
      ...paginationDTO(count, pagination),
      ...sortingDTO(sorting),
    };
  },
  communities: async (_, { archived, pagination, sorting }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findArgs = {
      include: { company: true },
      where: { archived: !!archived },
      ...getPaginationArgs(pagination),
      ...getSortingArgs(sorting),
    };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.community.findMany(findArgs),
      context.prisma.community.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map(communityDTO),
      ...paginationDTO(count, pagination),
      ...sortingDTO(sorting),
    };
  },
  companies: async (_, { archived, pagination, sorting }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findArgs = {
      where: { archived: !!archived },
      ...getPaginationArgs(pagination),
      ...getSortingArgs(sorting),
    };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.company.findMany(findArgs),
      context.prisma.company.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map(companyDTO),
      ...paginationDTO(count, pagination),
      ...sortingDTO(sorting),
    };
  },
  contractors: async (_, { archived, pagination, sorting }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findArgs = {
      include: {
        jobsLegacy: {
          include: { lineItems: true },
        },
      },
      where: { archived: !!archived },
      ...getPaginationArgs(pagination),
      ...getSortingArgs(sorting),
    };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.contractor.findMany(findArgs),
      context.prisma.contractor.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map(contractorDTO),
      ...paginationDTO(count, pagination),
      ...sortingDTO(sorting),
    };
  },
  reporters: async (_, { archived, pagination, sorting }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findArgs = {
      where: { archived: !!archived },
      ...getPaginationArgs(pagination),
      ...getSortingArgs(sorting),
    };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.reporter.findMany(findArgs),
      context.prisma.reporter.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map(reporterDTO),
      ...paginationDTO(count, pagination),
      ...sortingDTO(sorting),
    };
  },
  scopes: async (_, { archived, pagination, sorting }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findArgs = {
      where: { archived: !!archived },
      ...getPaginationArgs(pagination),
      ...getSortingArgs(sorting),
    };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.scope.findMany(findArgs),
      context.prisma.scope.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map(scopeDTO),
      ...paginationDTO(count, pagination),
      ...sortingDTO(sorting),
    };
  },
  suppliers: async (_, { archived, pagination, sorting }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findArgs = {
      where: { archived: !!archived },
      ...getPaginationArgs(pagination),
      ...getSortingArgs(sorting),
    };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.supplier.findMany(findArgs),
      context.prisma.supplier.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map(supplierDTO),
      ...paginationDTO(count, pagination),
      ...sortingDTO(sorting),
    };
  },
  // Dashboard
  assignedContractors: async (_, { pagination, sorting }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findArgs = {
      where: {
        jobsLegacy: {
          some: { active: true, archived: false },
        },
        archived: false,
      },
      include: {
        jobsLegacy: {
          where: { active: true, archived: false },
          include: {
            lineItems: true,
          },
        },
      },
      ...getPaginationArgs(pagination),
      ...getSortingArgs(sorting),
    };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.contractor.findMany(findArgs),
      context.prisma.jobLegacy.count({ where: { active: true, archived: false, contractorId: { not: null } } }),
    ]);

    return {
      data: docList.map(contractorDTO),
      ...paginationDTO(count, pagination),
      ...sortingDTO(sorting),
    };
  },
  unassignedJobs: async (_, { pagination, sorting }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const findArgs = {
      where: {
        active: true,
        contractorId: null,
        archived: false,
      },
      include: {
        area: true,
        builder: true,
        community: true,
        lineItems: true,
        reporter: true,
        scope: true,
      },
      ...getPaginationArgs(pagination),
      ...getSortingArgs(sorting),
    };

    const [docList, count] = await context.prisma.$transaction([
      context.prisma.jobLegacy.findMany(findArgs),
      context.prisma.jobLegacy.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map(jobLegacyDTO),
      ...paginationDTO(count, pagination),
      ...sortingDTO(sorting),
    };
  },
};
