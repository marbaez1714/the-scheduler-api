/* eslint-disable prefer-const */
import { AuthenticationError, UserInputError } from 'apollo-server';
import { Prisma } from '.prisma/client';

import { Context } from '../context';
import { BaseDocument, PrismaData, PermissionsEnum } from './types';
import {
  Area,
  Builder,
  Community,
  Company,
  Contractor,
  JobLegacy,
  JobLegacyStatus,
  LineItemLegacy,
  PaginationResponse,
  Pagination,
  Reporter,
  Scope,
  Supplier,
  FilterInput,
  SortInput,
  SortDirection,
} from '../generated';
import { GraphQLScalarType } from 'graphql';
import { regexPatterns } from '../utils';

export class DataHandler<TClient extends keyof PrismaData> {
  context: Context;
  client: TClient;
  crud: Context['prisma'][TClient];
  userId: string;
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
    // Set the user's id
    this.userId = context.user.sub;
    // Set generic archive data
    this.archiveData = { archived: true, updatedBy: context.user.sub };
    // Set today's date to midnight
    this.todayDate = new Date();
    this.todayDate.setHours(0, 0, 0, 0);
  }

  /******************************/
  /* Prisma Find Arguments      */
  /******************************/
  paginationArgs(pagination?: Pagination) {
    if (pagination) {
      const { page, pageSize } = pagination;
      return {
        take: pageSize,
        skip: Math.max(page - 1, 0) * pageSize,
      };
    }
  }

  filterArgs(filter?: FilterInput) {
    if (filter) {
      switch (filter?.field) {
        default:
          return {
            OR: [
              {
                [filter.field]: {
                  contains: filter.term,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
              {
                [filter.field]: {
                  startsWith: filter.term,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
              {
                [filter.field]: {
                  endsWith: filter.term,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
              {
                [filter.field]: {
                  equals: filter.term,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            ],
          };
      }
    }
  }

  sortingArgs(sort?: SortInput) {
    if (sort) {
      switch (sort.field) {
        case 'area':
        case 'builder':
        case 'community':
        case 'company':
        case 'contractor':
        case 'jobLegacy':
        case 'reporter':
        case 'scope':
        case 'supplier':
          return { [sort.field]: { name: sort.direction } };
        default:
          return { [sort.field]: sort.direction };
      }
    }
  }

  /******************************/
  /* Pagination Response        */
  /******************************/
  paginationResponse(totalCount: number, pagination?: Pagination) {
    let response: PaginationResponse = {
      totalCount,
      totalPages: pagination?.pageSize
        ? Math.ceil(totalCount / pagination?.pageSize)
        : 1,
    };

    if (pagination) {
      response = { ...response, ...pagination };
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

  filterResponse(filter?: FilterInput) {
    return {
      field: filter?.field ?? '',
      term: filter?.term ?? '',
    };
  }

  sortResponse(sort?: SortInput) {
    return {
      field: sort?.field ?? '',
      direction: sort?.direction ?? SortDirection.Asc,
    };
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
    const { createdTime, updatedTime, supplier, ...rest } = data;

    return {
      ...rest,
      supplier: this.formatSupplier(supplier),
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
