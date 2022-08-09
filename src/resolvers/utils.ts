import { AuthenticationError } from 'apollo-server-core';
import { Prisma, JobLegacy as JobLegacyPrisma, LineItemLegacy as LineItemLegacyPrisma } from '@prisma/client';

import { Context } from './../context';
import { Permissions, BaseDocument } from './types';

import { JobLegacy, PaginationOptions, SortingOptions } from './../generated/graphql';

export const checkPermission = (permission: Permissions, context: Context) => {
  if (!context.user.permissions?.includes(permission)) {
    throw new AuthenticationError('Missing permissions');
  }
};

export const messageResponses = {
  create: (model: string, doc: BaseDocument) => ({ message: `${model} ${doc.name}[${doc.id}] added.` }),
  archive: (model: string, doc: BaseDocument) => ({ message: `${model} ${doc.name}[${doc.id}] archived.` }),
  deleted: (model: string, doc: BaseDocument) => ({ message: `${model} ${doc.name}[${doc.id}] deleted.` }),
};

export const getPaginationOptions = (options?: PaginationOptions) => {
  const page = options?.page ?? 0;
  const pageSize = options?.pageSize ?? 0;

  return options ? { take: pageSize, skip: page > 0 ? (page - 1) * pageSize : 0 } : {};
};

export const getSortingOptions = (options?: SortingOptions) => {
  return options ? { [options.field]: options.order } : {};
};

export const formatResponse = <T extends { createdTime: Date; updatedTime: Date }>(data: T) => {
  return { ...data, createdTime: data.createdTime.toJSON(), updatedTime: data.updatedTime.toJSON() };
};

export const formatJobLegacy = (
  data: JobLegacyPrisma & {
    lineItems: LineItemLegacyPrisma[];
  }
): JobLegacy => {
  return {
    ...formatResponse(data),
    lineItems: data.lineItems.map((lineItem) => formatResponse(lineItem)),
    completedDate: data.completedDate?.toJSON(),
    startDate: data.startDate?.toJSON(),
  };
};
