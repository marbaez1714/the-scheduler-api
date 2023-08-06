import { Prisma, SMSConsent } from '@prisma/client';
import { Context } from '../context';
import { PermissionsEnum, PrismaModels } from './types';
import {
  JobLegacyStatus,
  PaginationResponse,
  Pagination,
  FilterInput,
  SortInput,
  Area,
  Builder,
  Community,
  Company,
  Contractor,
  JobLegacy,
  Reporter,
  Scope,
  Supplier,
  LineItemLegacy,
} from '../generated';
import { GRAPHQL_ERRORS, SMS_MESSAGES } from '../constants';

export class DataHandler<TClient extends keyof PrismaModels> {
  context: Context;
  client: TClient;
  crud: Context['prisma'][TClient];
  userId: string;
  archiveData: { archived: true; updatedBy: string };
  todayDate: Date;
  messagingServiceSid: string;

  constructor(context: Context, client: TClient) {
    // Check to see if user has admin rights
    if (!context.user.permissions.includes(PermissionsEnum.Admin)) {
      throw GRAPHQL_ERRORS.missingPermissions;
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.todayDate = today;
    // Set messaging service sid
    this.messagingServiceSid = `${process.env.TWILIO_MESSAGING_SERVICE_SID}`;
  }

  /******************************/
  /* Generate Responses         */
  /******************************/
  generatePaginationArgs(pagination?: Pagination) {
    if (pagination) {
      const { page, pageSize } = pagination;
      return {
        take: pageSize,
        skip: Math.max(page - 1, 0) * pageSize,
      };
    }
  }

  generateFilterArgs(filter?: FilterInput) {
    if (filter) {
      switch (filter.field) {
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

  generateSortingArgs(sort?: SortInput) {
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

  generatePaginationResponse(totalCount: number, pagination?: Pagination): PaginationResponse {
    let response = {
      totalCount,
      totalPages: pagination?.pageSize ? Math.ceil(totalCount / pagination.pageSize) : 1,
    };

    if (pagination) {
      response = { ...response, ...pagination };
    }

    return response;
  }

  //#region - DB Data Formatting

  formatDBArea(data: PrismaModels['area']) {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatDBBuilder(data: PrismaModels['builder']) {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatDBCommunity(data: PrismaModels['community']) {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatDBCompany(data: PrismaModels['company']) {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatDBContractor(data: PrismaModels['contractor']) {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatDBJobLegacy(data: PrismaModels['jobLegacy']) {
    const { createdTime, updatedTime, completedDate, startDate, ...rest } = data;

    // By default the job is will call
    let status: JobLegacyStatus = JobLegacyStatus.WillCall;

    // if the job is in progress, override all other statuses
    if (rest.inProgress) {
      status = JobLegacyStatus.InProgress;
    }

    if (!rest.inProgress && startDate) {
      // todayDate > startDate = past due
      // todayDate < startDate = planned
      // todayDate === startDate = today
      const isPastDue = this.todayDate.getTime() > startDate.getTime();
      const isPlanned = this.todayDate.getTime() < startDate.getTime();
      const isToday = this.todayDate.getTime() === startDate.getTime();

      if (isPastDue) {
        status = JobLegacyStatus.PastDue;
      }

      if (isPlanned) {
        status = JobLegacyStatus.Planned;
      }

      if (isToday) {
        status = JobLegacyStatus.Today;
      }
    }

    return {
      ...rest,
      status,
      startDate: startDate?.toJSON() ?? null,
      completedDate: completedDate?.toJSON() ?? null,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatDBReporter(data: PrismaModels['reporter']) {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatDBScope(data: PrismaModels['scope']) {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatDBSupplier(data: PrismaModels['supplier']) {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatDBLineItemLegacy(data: PrismaModels['lineItemLegacy']) {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  //#endregion
  //#region - GraphQL DTOs

  areaDTO(data: PrismaModels['area']): Area {
    return this.formatDBArea(data);
  }

  builderDTO(data: PrismaModels['builder'] & { company: PrismaModels['company'] }): Builder {
    const { company, ...rest } = data;

    return { ...this.formatDBBuilder(rest), company: this.formatDBCompany(company) };
  }

  communityDTO(data: PrismaModels['community'] & { company: PrismaModels['company'] }): Community {
    const { company, ...rest } = data;

    return { ...this.formatDBCommunity(rest), company: this.formatDBCompany(company) };
  }

  companyDTO(data: PrismaModels['company']): Company {
    return this.formatDBCompany(data);
  }

  contractorDTO(
    data: PrismaModels['contractor'] & {
      jobsLegacy: (PrismaModels['jobLegacy'] & {
        lineItems: (PrismaModels['lineItemLegacy'] & { supplier: PrismaModels['supplier'] })[];
      })[];
    }
  ): Contractor {
    const { jobsLegacy, ...contractorRest } = data;
    const formattedJobsLegacy = jobsLegacy.map(({ lineItems, ...jobRest }) => {
      return {
        ...this.formatDBJobLegacy(jobRest),
        lineItems: lineItems.map(({ supplier, ...lineItemRest }) => ({
          ...this.formatDBLineItemLegacy(lineItemRest),
          supplier: this.formatDBSupplier(supplier),
        })),
      };
    });

    return {
      ...this.formatDBContractor(contractorRest),
      jobsLegacy: formattedJobsLegacy,
    };
  }

  jobLegacyDTO(
    data: PrismaModels['jobLegacy'] & {
      lineItems: (PrismaModels['lineItemLegacy'] & { supplier: PrismaModels['supplier'] })[];
    }
  ): JobLegacy {
    const { lineItems, ...jobRest } = data;
    const formattedLineItems = lineItems.map(({ supplier, ...lineItemRest }) => ({
      ...this.formatDBLineItemLegacy(lineItemRest),
      supplier: this.formatDBSupplier(supplier),
    }));

    return {
      ...this.formatDBJobLegacy(jobRest),
      lineItems: formattedLineItems,
    };
  }

  lineItemLegacyDTO(
    data: PrismaModels['lineItemLegacy'] & { supplier: PrismaModels['supplier'] }
  ): LineItemLegacy {
    const { supplier, ...lineItemRest } = data;

    return {
      ...this.formatDBLineItemLegacy(lineItemRest),
      supplier: this.formatDBSupplier(supplier),
    };
  }

  reporterDTO(data: PrismaModels['reporter']): Reporter {
    return this.formatDBReporter(data);
  }

  scopeDTO(data: PrismaModels['scope']): Scope {
    return this.formatDBScope(data);
  }

  supplierDTO(data: PrismaModels['supplier']): Supplier {
    return this.formatDBSupplier(data);
  }

  //#endregion
  //#region - Utils

  async sendSMS(
    recipient: { id: string; smsConsent: SMSConsent; primaryPhone: string },
    recipientType: 'contractor' | 'reporter',
    message: string
  ) {
    // Errors
    if (!recipient.primaryPhone) {
      throw GRAPHQL_ERRORS.phoneNumberRequired;
    }

    if (!message) {
      throw GRAPHQL_ERRORS.messageRequired;
    }

    // Format phone number
    const formattedPhoneNumber = `+1${recipient.primaryPhone.replace(/\D/g, '')}`;

    // Check if the recipient has consented to receive SMS messages
    switch (recipient.smsConsent) {
      case SMSConsent.NEEDED:
        await this.context.twilio.messages.create({
          to: formattedPhoneNumber,
          messagingServiceSid: this.messagingServiceSid,
          body: SMS_MESSAGES.optInRequest,
        });

        if (recipientType === 'contractor') {
          await this.context.prisma.contractor.update({
            where: { id: recipient.id },
            data: { smsConsent: SMSConsent.PENDING },
          });
        }

        if (recipientType === 'reporter') {
          await this.context.prisma.reporter.update({
            where: { id: recipient.id },
            data: { smsConsent: SMSConsent.PENDING },
          });
        }

        break;
      case SMSConsent.PENDING:
        await this.context.twilio.messages.create({
          to: formattedPhoneNumber,
          messagingServiceSid: this.messagingServiceSid,
          body: SMS_MESSAGES.optInReminder,
        });
        break;
      case SMSConsent.OPTED_OUT:
        throw GRAPHQL_ERRORS.userSMSOptedOut;
    }

    // Send the message
    return this.context.twilio.messages.create({
      to: formattedPhoneNumber,
      messagingServiceSid: this.messagingServiceSid,
      body: message,
    });
  }

  //#endregion
}
