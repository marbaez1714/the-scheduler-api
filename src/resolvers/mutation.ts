import {
  checkPermission,
  Permissions,
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
import { MutationResolvers } from '../generated/graphql';

export const mutationResolvers: MutationResolvers = {
  // Create
  createArea: async (_, { data }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const newDoc = await context.prisma.area.create({
      data: {
        ...data,
        updatedBy: context.user.email,
        createdBy: context.user.email,
      },
    });

    return formatArea(newDoc);
  },
  createBuilder: async (_, { data }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const newDoc = await context.prisma.builder.create({
      data: {
        ...data,
        updatedBy: context.user.email,
        createdBy: context.user.email,
      },
    });

    return formatBuilder(newDoc);
  },
  createCommunity: async (_, { data }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const newDoc = await context.prisma.community.create({
      data: {
        ...data,
        updatedBy: context.user.email,
        createdBy: context.user.email,
      },
    });

    return formatCommunity(newDoc);
  },
  createCompany: async (_, { data }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const newDoc = await context.prisma.company.create({
      data: {
        ...data,
        updatedBy: context.user.email,
        createdBy: context.user.email,
      },
    });

    return formatCompany(newDoc);
  },
  createContractor: async (_, { data }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const newDoc = await context.prisma.contractor.create({
      data: {
        ...data,
        updatedBy: context.user.email,
        createdBy: context.user.email,
      },
    });

    return formatContractor(newDoc);
  },
  createReporter: async (_, { data }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const newDoc = await context.prisma.reporter.create({
      data: {
        ...data,
        updatedBy: context.user.email,
        createdBy: context.user.email,
      },
    });

    return formatReporter(newDoc);
  },
  createScope: async (_, { data }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const newDoc = await context.prisma.scope.create({
      data: {
        ...data,
        updatedBy: context.user.email,
        createdBy: context.user.email,
      },
    });

    return formatScope(newDoc);
  },
  createSupplier: async (_, { data }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const newDoc = await context.prisma.supplier.create({
      data: {
        ...data,
        updatedBy: context.user.email,
        createdBy: context.user.email,
      },
    });

    return formatSupplier(newDoc);
  },
  createJobLegacy: async (_, { data }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const newDoc = await context.prisma.jobLegacy.create({
      data: {
        ...data,
        updatedBy: context.user.email,
        createdBy: context.user.email,
      },
    });

    return formatJobLegacy(newDoc);
  },
  // Archive
  archiveArea: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const updatedDoc = await context.prisma.area.update({ where: { id: id }, data: { archived: true } });

    return !!updatedDoc;
  },
  archiveBuilder: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const updatedDoc = await context.prisma.builder.update({ where: { id: id }, data: { archived: true } });

    return !!updatedDoc;
  },
  archiveCommunity: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const updatedDoc = await context.prisma.community.update({ where: { id: id }, data: { archived: true } });

    return !!updatedDoc;
  },
  archiveCompany: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const updatedDoc = await context.prisma.company.update({ where: { id: id }, data: { archived: true } });

    return !!updatedDoc;
  },
  archiveContractor: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const updatedDoc = await context.prisma.contractor.update({ where: { id: id }, data: { archived: true } });

    return !!updatedDoc;
  },
  archiveReporter: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const updatedDoc = await context.prisma.reporter.update({ where: { id: id }, data: { archived: true } });

    return !!updatedDoc;
  },
  archiveScope: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const updatedDoc = await context.prisma.scope.update({ where: { id: id }, data: { archived: true } });

    return !!updatedDoc;
  },
  archiveSupplier: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const updatedDoc = await context.prisma.supplier.update({ where: { id: id }, data: { archived: true } });

    return !!updatedDoc;
  },
  archiveJobLegacy: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const updatedDoc = await context.prisma.jobLegacy.update({ where: { id: id }, data: { archived: true } });

    return !!updatedDoc;
  },
};
