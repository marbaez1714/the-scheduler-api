import { AuthenticationError } from 'apollo-server';

import { Context } from '../context';
import { BaseDocument, PrismaData, PermissionsEnum, FindArguments, MetaArgs } from './types';
import {
  Area,
  Builder,
  Community,
  Company,
  Contractor,
  JobLegacy,
  LineItemLegacy,
  MetaResponse,
  Reporter,
  Scope,
  SortOrder,
  Supplier,
} from '../generated';

export class DataHandler<TClient extends keyof PrismaData> {
  context: Context;
  client: TClient;
  crud: Context['prisma'][TClient];
  userEmail: string;
  archiveData: { archived: true; updatedBy: string };

  constructor(context: Context, client: TClient) {
    // Check to see if user has admin rights
    if (!context.user?.permissions?.includes(PermissionsEnum.Admin)) {
      throw new AuthenticationError('Missing permissions');
    }
    // Set context
    this.context = context;
    // Set the client
    this.client = client;
    // Create the prisma client
    this.crud = context.prisma[client];
    // Set the user's email
    this.userEmail = context.user.email;
    // Set generic archive data
    this.archiveData = { archived: true, updatedBy: context.user.email };
  }

  // Prisma Find Arguments
  findArgs(args?: MetaArgs) {
    let findArgs: FindArguments;
    let page: number;
    let pageSize: number;
    let field: string;
    let order: SortOrder;

    if (args?.pagination) {
      page = args.pagination.page;
      pageSize = args.pagination.pageSize;
      findArgs = {
        ...findArgs,
        ...{ take: pageSize, skip: Math.min(page - 1, 0) * pageSize },
      };
    }

    if (args?.sorting) {
      field = args.sorting.field;
      order = args.sorting.order;
      findArgs = { ...findArgs, orderBy: { [field]: order } };
    }

    return findArgs;
  }

  // Response Meta
  responseMeta(totalCount: number, args?: MetaArgs) {
    let response: MetaResponse = {
      totalCount,
    };

    if (args?.pagination) {
      response = { ...response, ...args.pagination };
    }

    if (args?.sorting) {
      response = { ...response, sortField: args.sorting.field, sortOrder: args.sorting.order };
    }

    return response;
  }

  // General Responses
  archiveResponse<TData extends BaseDocument>(data: TData) {
    return { data, message: `${data.name} archived.` };
  }

  createResponse<TData extends BaseDocument>(data: TData) {
    return { data, message: `${data.name} created.` };
  }

  deleteResponse<TData extends BaseDocument>(data: TData) {
    return { message: `${data.name} deleted.` };
  }

  // Formatting
  formatArea(data: PrismaData['area']): Area {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatBuilder(data: PrismaData['builder']): Builder {
    const { createdTime, updatedTime, company, ...rest } = data;

    const companyObject = this.formatCompany(company);

    return {
      ...rest,
      company: companyObject,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatCommunity(data: PrismaData['community']): Community {
    const { createdTime, updatedTime, company, ...rest } = data;

    const companyObject = this.formatCompany(company);

    return {
      ...rest,
      company: companyObject,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatCompany(data: PrismaData['company']): Company {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatContractor(data: PrismaData['contractor']): Contractor {
    const { jobsLegacy, createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      jobsLegacy: jobsLegacy.map(this.formatJobLegacy),
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatJobLegacy(data: PrismaData['jobLegacy']): JobLegacy {
    const { lineItems, startDate, completedDate, createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      lineItems: lineItems.map(this.formatLineItemLegacy),
      startDate: startDate?.toJSON(),
      completedDate: completedDate?.toJSON(),
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatLineItemLegacy(data: PrismaData['lineItemLegacy']): LineItemLegacy {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatReporter(data: PrismaData['reporter']): Reporter {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatScope(data: PrismaData['scope']): Scope {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatSupplier(data: PrismaData['supplier']): Supplier {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }
}
