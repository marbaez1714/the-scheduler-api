import { AuthenticationError } from 'apollo-server-core';

import {
  Area,
  Builder,
  Community,
  Company,
  Contractor,
  JobLegacy,
  LineItemLegacy,
  Reporter,
  Scope,
  Supplier,
  MessageResponse,
  PaginationOptions,
  SortingOptions,
} from './../generated/graphql';

import { Context } from './../context';
import { BaseDocument, Permissions, PrismaData } from './types';

/******************************/
/* Authentication             */
/******************************/
export const checkPermission = (permission: Permissions, context: Partial<Context>) => {
  if (!context.user?.permissions?.includes(permission)) {
    throw new AuthenticationError('Missing permissions');
  }
};

/******************************/
/* Data Transfer Objects      */
/******************************/
export const areaDTO = (data: PrismaData['Area']): Area => {
  const { createdTime, updatedTime, ...rest } = data;

  return { ...rest, createdTime: createdTime.toJSON(), updatedTime: updatedTime.toJSON() };
};

export const builderDTO = (data: PrismaData['Builder']): Builder => {
  const { createdTime, updatedTime, company, ...rest } = data;

  return {
    ...rest,
    company: companyDTO(company),
    createdTime: createdTime.toJSON(),
    updatedTime: updatedTime.toJSON(),
  };
};

export const communityDTO = (data: PrismaData['Community']): Community => {
  const { createdTime, updatedTime, company, ...rest } = data;

  return {
    ...rest,
    company: companyDTO(company),
    createdTime: createdTime.toJSON(),
    updatedTime: updatedTime.toJSON(),
  };
};

export const companyDTO = (data: PrismaData['Company']): Company => {
  const { createdTime, updatedTime, ...rest } = data;

  return {
    ...rest,
    createdTime: createdTime.toJSON(),
    updatedTime: updatedTime.toJSON(),
  };
};

export const contractorDTO = (data: PrismaData['Contractor']): Contractor => {
  const { jobsLegacy, createdTime, updatedTime, ...rest } = data;

  return {
    ...rest,
    jobsLegacy: jobsLegacy.map((job) => jobLegacyDTO(job)),
    createdTime: createdTime.toJSON(),
    updatedTime: updatedTime.toJSON(),
  };
};

export const jobLegacyDTO = (data: PrismaData['JobLegacy']): JobLegacy => {
  const { lineItems, startDate, completedDate, createdTime, updatedTime, ...rest } = data;

  return {
    ...rest,
    lineItems: lineItems.map(lineItemLegacyDTO),
    startDate: startDate?.toJSON(),
    completedDate: completedDate?.toJSON(),
    createdTime: createdTime.toJSON(),
    updatedTime: updatedTime.toJSON(),
  };
};

export const lineItemLegacyDTO = (data: PrismaData['LineItemLegacy']): LineItemLegacy => {
  const { createdTime, updatedTime, ...rest } = data;

  return {
    ...rest,
    createdTime: createdTime.toJSON(),
    updatedTime: updatedTime.toJSON(),
  };
};

export const messageDTO = (operation: 'create' | 'archive' | 'delete', data: BaseDocument): MessageResponse => {
  const { name, id } = data;
  let message: string;

  switch (operation) {
    case 'archive':
      message = `${name} archived. [id: ${id}]`;
      break;
    case 'create':
      message = `${name} created. [id: ${id}]`;
      break;
    case 'delete':
      message = `${name} deleted. [id: ${id}]`;
      break;
  }

  return { message };
};

export const reporterDTO = (data: PrismaData['Reporter']): Reporter => {
  const { createdTime, updatedTime, ...rest } = data;

  return {
    ...rest,
    createdTime: createdTime.toJSON(),
    updatedTime: updatedTime.toJSON(),
  };
};

export const scopeDTO = (data: PrismaData['Scope']): Scope => {
  const { createdTime, updatedTime, ...rest } = data;

  return {
    ...rest,
    createdTime: createdTime.toJSON(),
    updatedTime: updatedTime.toJSON(),
  };
};

export const supplierDTO = (data: PrismaData['Supplier']): Supplier => {
  const { createdTime, updatedTime, ...rest } = data;

  return {
    ...rest,
    createdTime: createdTime.toJSON(),
    updatedTime: updatedTime.toJSON(),
  };
};

export const paginationDTO = (totalCount: number, options?: PaginationOptions) => {
  return { pagination: { totalCount, ...options } };
};

export const sortingDTO = (options?: SortingOptions) => {
  return options ? { sorting: { ...options } } : {};
};

/******************************/
/* Request Inputs             */
/******************************/
export const getSortingArgs = (args?: SortingOptions) => {
  return args && { orderBy: { [args.field]: args.order } };
};

export const getPaginationArgs = (args?: PaginationOptions) => {
  return args && { take: args.pageSize, skip: Math.min(args.page - 1, 0) * args.pageSize };
};
