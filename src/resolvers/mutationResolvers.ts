import { checkPermission, messageDTO } from './utils';
import { PermissionsEnum } from './types';
import { MutationResolvers } from '../generated/graphql';

import { AreaModel, BuilderModel } from './models';

export const mutationResolvers: MutationResolvers = {
  // Create
  createArea: async (_, { data }, context) => {
    const response = await new AreaModel(context).create(data);
    return response;
  },
  createBuilder: async (_, { data }, context) => {
    const response = await new BuilderModel(context).create(data);
    return response;
  },
  createCommunity: async (_, { data }, context) => {
    // Check for admin permissions
    checkPermission(PermissionsEnum.Admin, context);

    const newDoc = await context.prisma.community.create({
      data: {
        ...data,
        updatedBy: context.user.email,
        createdBy: context.user.email,
      },
    });

    return messageDTO('create', newDoc);
  },
  createCompany: async (_, { data }, context) => {
    // Check for admin permissions
    checkPermission(PermissionsEnum.Admin, context);

    const newDoc = await context.prisma.company.create({
      data: {
        ...data,
        updatedBy: context.user.email,
        createdBy: context.user.email,
      },
    });

    return messageDTO('create', newDoc);
  },
  createContractor: async (_, { data }, context) => {
    // Check for admin permissions
    checkPermission(PermissionsEnum.Admin, context);

    const newDoc = await context.prisma.contractor.create({
      data: {
        ...data,
        updatedBy: context.user.email,
        createdBy: context.user.email,
      },
    });

    return messageDTO('create', newDoc);
  },
  createReporter: async (_, { data }, context) => {
    // Check for admin permissions
    checkPermission(PermissionsEnum.Admin, context);

    const newDoc = await context.prisma.reporter.create({
      data: {
        ...data,
        updatedBy: context.user.email,
        createdBy: context.user.email,
      },
    });

    return messageDTO('create', newDoc);
  },
  createScope: async (_, { data }, context) => {
    // Check for admin permissions
    checkPermission(PermissionsEnum.Admin, context);

    const newDoc = await context.prisma.scope.create({
      data: {
        ...data,
        updatedBy: context.user.email,
        createdBy: context.user.email,
      },
    });

    return messageDTO('create', newDoc);
  },
  createSupplier: async (_, { data }, context) => {
    // Check for admin permissions
    checkPermission(PermissionsEnum.Admin, context);

    const newDoc = await context.prisma.supplier.create({
      data: {
        ...data,
        updatedBy: context.user.email,
        createdBy: context.user.email,
      },
    });

    return messageDTO('create', newDoc);
  },
  createJobLegacy: async (_, { data }, context) => {
    // Check for admin permissions
    checkPermission(PermissionsEnum.Admin, context);

    const { lineItems, ...rest } = data;

    const newJob = await context.prisma.jobLegacy.create({
      data: {
        ...rest,
        updatedBy: context.user.email,
        createdBy: context.user.email,
      },
    });

    if (lineItems.length) {
      const lineItemsFormatted = lineItems.map((item) => ({
        ...item,
        jobId: newJob.id,
        updatedBy: context.user.email,
        createdBy: context.user.email,
      }));

      await context.prisma.lineItemLegacy.createMany({ data: lineItemsFormatted });
    }

    return messageDTO('create', newJob);
  },
  // Archive
  archiveArea: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(PermissionsEnum.Admin, context);

    const updatedDoc = await context.prisma.area.update({ where: { id: id }, data: { archived: true } });

    return messageDTO('archive', updatedDoc);
  },
  archiveBuilder: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(PermissionsEnum.Admin, context);

    const updatedDoc = await context.prisma.builder.update({ where: { id: id }, data: { archived: true } });

    return messageDTO('archive', updatedDoc);
  },
  archiveCommunity: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(PermissionsEnum.Admin, context);

    const updatedDoc = await context.prisma.community.update({ where: { id: id }, data: { archived: true } });

    return messageDTO('archive', updatedDoc);
  },
  archiveCompany: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(PermissionsEnum.Admin, context);

    const updatedDoc = await context.prisma.company.update({ where: { id: id }, data: { archived: true } });

    return messageDTO('archive', updatedDoc);
  },
  archiveContractor: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(PermissionsEnum.Admin, context);

    const updatedDoc = await context.prisma.contractor.update({ where: { id: id }, data: { archived: true } });

    return messageDTO('archive', updatedDoc);
  },
  archiveReporter: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(PermissionsEnum.Admin, context);

    const updatedDoc = await context.prisma.reporter.update({ where: { id: id }, data: { archived: true } });

    return messageDTO('archive', updatedDoc);
  },
  archiveScope: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(PermissionsEnum.Admin, context);

    const updatedDoc = await context.prisma.scope.update({ where: { id: id }, data: { archived: true } });

    return messageDTO('archive', updatedDoc);
  },
  archiveSupplier: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(PermissionsEnum.Admin, context);

    const updatedDoc = await context.prisma.supplier.update({ where: { id: id }, data: { archived: true } });

    return messageDTO('archive', updatedDoc);
  },
  archiveJobLegacy: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(PermissionsEnum.Admin, context);

    // Archive the job
    const updatedDoc = await context.prisma.jobLegacy.update({ where: { id: id }, data: { archived: true } });

    // Archive it's line items
    await context.prisma.lineItemLegacy.updateMany({ where: { jobId: updatedDoc.id }, data: { archived: true } });

    return messageDTO('archive', updatedDoc);
  },
  // Delete
  deleteLineItemLegacy: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(PermissionsEnum.Admin, context);

    const deletedDoc = await context.prisma.lineItemLegacy.delete({ where: { id: id } });

    return messageDTO('delete', { name: deletedDoc.orderNumber, id: deletedDoc.id });
  },
};
