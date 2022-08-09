import { checkPermission, messageResponses } from './utils';
import { Permissions } from './types';
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

    return messageResponses.create('Area', newDoc);
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

    return messageResponses.create('Builder', newDoc);
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

    return messageResponses.create('Community', newDoc);
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

    return messageResponses.create('Company', newDoc);
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

    return messageResponses.create('Contractor', newDoc);
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

    return messageResponses.create('Reporter', newDoc);
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

    return messageResponses.create('Scope', newDoc);
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

    return messageResponses.create('Supplier', newDoc);
  },
  createJobLegacy: async (_, { data }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

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

    return messageResponses.create('Job (Legacy)', newJob);
  },
  // Archive
  archiveArea: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const updatedDoc = await context.prisma.area.update({ where: { id: id }, data: { archived: true } });

    return messageResponses.archive('Area', updatedDoc);
  },
  archiveBuilder: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const updatedDoc = await context.prisma.builder.update({ where: { id: id }, data: { archived: true } });

    return messageResponses.archive('Builder', updatedDoc);
  },
  archiveCommunity: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const updatedDoc = await context.prisma.community.update({ where: { id: id }, data: { archived: true } });

    return messageResponses.archive('Community', updatedDoc);
  },
  archiveCompany: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const updatedDoc = await context.prisma.company.update({ where: { id: id }, data: { archived: true } });

    return messageResponses.archive('Company', updatedDoc);
  },
  archiveContractor: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const updatedDoc = await context.prisma.contractor.update({ where: { id: id }, data: { archived: true } });

    return messageResponses.archive('Contractor', updatedDoc);
  },
  archiveReporter: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const updatedDoc = await context.prisma.reporter.update({ where: { id: id }, data: { archived: true } });

    return messageResponses.archive('Reporter', updatedDoc);
  },
  archiveScope: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const updatedDoc = await context.prisma.scope.update({ where: { id: id }, data: { archived: true } });

    return messageResponses.archive('Scope', updatedDoc);
  },
  archiveSupplier: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const updatedDoc = await context.prisma.supplier.update({ where: { id: id }, data: { archived: true } });

    return messageResponses.archive('Supplier', updatedDoc);
  },
  archiveJobLegacy: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    // Archive the job
    const updatedDoc = await context.prisma.jobLegacy.update({ where: { id: id }, data: { archived: true } });

    // Archive it's line items
    await context.prisma.lineItemLegacy.updateMany({ where: { jobId: updatedDoc.id }, data: { archived: true } });

    return messageResponses.archive('Job (Legacy)', updatedDoc);
  },
  // Delete
  deleteLineItemLegacy: async (_, { id }, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const deletedDoc = await context.prisma.lineItemLegacy.delete({ where: { id: id } });

    return messageResponses.archive('Line Item (Legacy)', { name: deletedDoc.orderNumber, id: deletedDoc.id });
  },
};
