import { AuthenticationError } from 'apollo-server-core';
import { Context } from './../context';
import {
  Area,
  Builder,
  Community,
  Company,
  Contractor,
  Reporter,
  Scope,
  Supplier,
  JobLegacy,
  LineItemLegacy,
  MessageResponse,
} from './../generated/graphql';
import {
  Area as AreaPrisma,
  Builder as BuilderPrisma,
  Community as CommunityPrisma,
  Company as CompanyPrisma,
  Contractor as ContractorPrisma,
  Reporter as ReporterPrisma,
  Scope as ScopePrisma,
  Supplier as SupplierPrisma,
  JobLegacy as JobLegacyPrisma,
  LineItemLegacy as LineItemLegacyPrisma,
} from '@prisma/client';

type BaseDocument = {
  name: string;
  id: string;
};

export enum Permissions {
  Admin = 'admin',
}

const formatTimestamps = (data: { createdTime: Date; updatedTime: Date }) => {
  return { createdTime: data.createdTime.toJSON(), updatedTime: data.updatedTime.toJSON() };
};

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

export const formatArea = (data: AreaPrisma): Area => {
  return { ...data, ...formatTimestamps(data) };
};

export const formatBuilder = (data: BuilderPrisma): Builder => {
  return { ...data, ...formatTimestamps(data) };
};

export const formatCommunity = (data: CommunityPrisma): Community => {
  return { ...data, ...formatTimestamps(data) };
};

export const formatCompany = (data: CompanyPrisma): Company => {
  return { ...data, ...formatTimestamps(data) };
};

export const formatContractor = (data: ContractorPrisma): Contractor => {
  return { ...data, ...formatTimestamps(data) };
};

export const formatReporter = (data: ReporterPrisma): Reporter => {
  return { ...data, ...formatTimestamps(data) };
};

export const formatScope = (data: ScopePrisma): Scope => {
  return { ...data, ...formatTimestamps(data) };
};

export const formatSupplier = (data: SupplierPrisma): Supplier => {
  return { ...data, ...formatTimestamps(data) };
};

export const formatLineItemLegacy = (data: LineItemLegacyPrisma): LineItemLegacy => {
  return {
    ...data,
    ...formatTimestamps(data),
  };
};

export const formatJobLegacy = (
  data: JobLegacyPrisma & {
    lineItems: LineItemLegacyPrisma[];
  }
): JobLegacy => {
  return {
    ...data,
    lineItems: data.lineItems.map((lineItem) => formatLineItemLegacy(lineItem)),
    completedDate: data.completedDate?.toJSON(),
    startDate: data.startDate?.toJSON(),
    ...formatTimestamps(data),
  };
};
