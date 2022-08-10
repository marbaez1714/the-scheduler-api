import { AuthenticationError } from 'apollo-server-core';
import { JobLegacy as JobLegacyPrisma, LineItemLegacy as LineItemLegacyPrisma } from '@prisma/client';

import { JobLegacy, PaginationOptions, SortingOptions } from './../generated/graphql';

import { Context } from './../context';
import { Permissions, BaseDocument } from './types';

/******************************/
/* Authentication             */
/******************************/
export const checkPermission = (permission: Permissions, context: Context) => {
  if (!context.user.permissions?.includes(permission)) {
    throw new AuthenticationError('Missing permissions');
  }
};

/******************************/
/* Responses                  */
/******************************/
export const messageResponses = {
  create: (model: string, doc: BaseDocument) => ({ message: `${model} ${doc.name}[${doc.id}] added.` }),
  archive: (model: string, doc: BaseDocument) => ({ message: `${model} ${doc.name}[${doc.id}] archived.` }),
  deleted: (model: string, doc: BaseDocument) => ({ message: `${model} ${doc.name}[${doc.id}] deleted.` }),
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

/******************************/
/* Request Inputs             */
/******************************/
export const getPaginationOptions = (options?: PaginationOptions) => {
  if (!options) {
    return {};
  }

  const { page, pageSize } = options;

  return { take: pageSize, skip: Math.min(page - 1, 0) * pageSize };
};

export const getSortingOptions = (options?: SortingOptions) => {
  return options ? { [options.field]: options.order } : {};
};
