/* eslint-disable prefer-const */
import { AuthenticationError, UserInputError } from 'apollo-server';

import { Context } from '../context';
import {
  BaseDocument,
  PrismaData,
  PermissionsEnum,
  FindArguments,
} from './types';
import {
  Area,
  Builder,
  Community,
  Company,
  Contractor,
  JobLegacy,
  JobLegacyStatus,
  LineItemLegacy,
  MetaResponse,
  Pagination,
  Reporter,
  Scope,
  Sorting,
  Supplier,
} from '../generated';
import { GraphQLScalarType } from 'graphql';
import { regexPatterns } from '../utils';

export class DataHandler<TClient extends keyof PrismaData> {
  context: Context;
  client: TClient;
  crud: Context['prisma'][TClient];
  userEmail: string;
  archiveData: { archived: true; updatedBy: string };
  todayDate: Date;

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
    // Set today's date to midnight
    this.todayDate = new Date();
    this.todayDate.setHours(0, 0, 0, 0);
  }

  /******************************/
  /* Prisma Find Arguments      */
  /******************************/
  findArgs(pagination?: Pagination, sorting?: Sorting) {
    let findArgs: FindArguments;

    if (pagination) {
      const { page, pageSize } = pagination;
      findArgs = {
        take: pageSize,
        skip: Math.min(page - 1, 0) * pageSize,
      };
    }

    if (sorting) {
      const { field, order } = sorting;
      findArgs = { ...findArgs, orderBy: { [field]: order } };
    }

    return findArgs;
  }

  /******************************/
  /* Response Meta              */
  /******************************/
  responseMeta(
    totalCount: number,
    pagination?: Pagination,
    sorting?: Sorting
  ) {
    let response: MetaResponse = {
      totalCount,
    };

    if (pagination) {
      response = { ...response, ...pagination };
    }

    if (sorting) {
      response = {
        ...response,
        sortField: sorting.field,
        sortOrder: sorting.order,
      };
    }

    return response;
  }

  /******************************/
  /* General Responses          */
  /******************************/
  archiveResponse<TData extends BaseDocument>(data: TData) {
    return { data, message: `${data.name} archived.` };
  }

  writeResponse<TData extends BaseDocument>(data: TData) {
    return { data, message: `${data.name} written.` };
  }

  deleteResponse<TData extends BaseDocument>(data: TData) {
    return { message: `${data.name} deleted.` };
  }

  /******************************/
  /* Formatting                 */
  /******************************/
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

    return {
      ...rest,
      company: this.formatCompany(company),
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatCommunity(data: PrismaData['community']): Community {
    const { createdTime, updatedTime, company, ...rest } = data;

    return {
      ...rest,
      company: this.formatCompany(company),
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
      jobsLegacy: jobsLegacy.map((doc) => this.formatJobLegacy(doc)),
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatJobLegacy(data: PrismaData['jobLegacy']): JobLegacy {
    const {
      lineItems,
      startDate,
      completedDate,
      createdTime,
      updatedTime,
      inProgress,
      ...rest
    } = data;

    // By default the job is will call
    let status: JobLegacyStatus = JobLegacyStatus.WillCall;

    // if the job is in progress, override all other statuses
    if (inProgress) {
      status = JobLegacyStatus.InProgress;
    } else if (startDate) {
      // todayDate > startDate = past due
      // todayDate < startDate = planned
      // todayDate === startDate = today
      status =
        this.todayDate > startDate
          ? JobLegacyStatus.PastDue
          : this.todayDate < startDate
          ? JobLegacyStatus.Planned
          : JobLegacyStatus.Today;
    }

    return {
      ...rest,
      status,
      inProgress,
      lineItems: lineItems.map((doc) => this.formatLineItemLegacy(doc)),
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

export const ScalarDefs = {
  PhoneNumber: new GraphQLScalarType<string, string>({
    name: 'PhoneNumber',
    description: 'Formatted phone number with only numeric characters.',
    parseValue: (value) => {
      if (typeof value !== 'string') {
        throw new UserInputError('Phone Number must be a string');
      }

      if (!regexPatterns.phoneNumber.test(value)) {
        throw new UserInputError(`Invalid phone format - ${value}`);
      }

      return value;
    },
  }),
};
