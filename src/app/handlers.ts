import {
  Prisma,
  Area as AreaModel,
  Company as CompanyModel,
  Reporter as ReporterModel,
  Scope as ScopeModel,
  Supplier as SupplierModel,
  SMSConsent,
} from '@prisma/client';
import { Context } from '../context';
import {
  BaseDocument,
  PermissionsEnum,
  LineItemLegacyWithSupplierModel,
  JobLegacyWithLineItemsModel,
  ContractorWithJobsLegacyModel,
  BuilderWithCompanyModel,
  CommunityWithCompanyModel,
  PrismaModels,
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
  PaginationResponse,
  Pagination,
  Reporter,
  Scope,
  Supplier,
  FilterInput,
  SortInput,
  SortDirection,
} from '../generated';
import { GraphQLError } from 'graphql';
import { GRAPHQL_ERRORS, SMS_MESSAGES } from '../constants';
import { delay } from 'lodash';

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
      throw new GraphQLError('Missing permissions.', { extensions: { code: 'UNAUTHENTICATED' } });
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

  generateArchiveResponse<TData extends BaseDocument>(data: TData) {
    return { data, message: `${data.name} archived.` };
  }

  generateWriteResponse<TData extends BaseDocument>(data: TData) {
    return { data, message: `${data.name} written.` };
  }

  generateDeleteResponse<TData extends BaseDocument>(data: TData) {
    return { message: `${data.name} deleted.` };
  }

  generateFilterResponse(filter?: FilterInput) {
    return {
      field: filter?.field ?? '',
      term: filter?.term ?? '',
    };
  }

  generateSortResponse(sort?: SortInput) {
    return {
      field: sort?.field ?? '',
      direction: sort?.direction ?? SortDirection.Asc,
    };
  }

  /******************************/
  /* Formatting                 */
  /******************************/
  formatArea(data: AreaModel): Area {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatBuilder(data: BuilderWithCompanyModel): Builder {
    const { createdTime, updatedTime, company, ...rest } = data;

    return {
      ...rest,
      company: this.formatCompany(company),
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatCommunity(data: CommunityWithCompanyModel): Community {
    const { createdTime, updatedTime, company, ...rest } = data;

    return {
      ...rest,
      company: this.formatCompany(company),
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatCompany(data: CompanyModel): Company {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatContractor(data: ContractorWithJobsLegacyModel): Contractor {
    const { jobsLegacy, createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      jobsLegacy: jobsLegacy.map((doc) => this.formatJobLegacy(doc)),
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatJobLegacy(data: JobLegacyWithLineItemsModel): JobLegacy {
    const { lineItems, startDate, completedDate, createdTime, updatedTime, inProgress, ...rest } =
      data;

    // By default the job is will call
    let status: JobLegacyStatus = JobLegacyStatus.WillCall;

    // if the job is in progress, override all other statuses
    if (inProgress) {
      status = JobLegacyStatus.InProgress;
    }

    if (!inProgress && startDate) {
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
      inProgress,
      lineItems: lineItems.map((doc) => this.formatLineItemLegacy(doc)),
      startDate: startDate?.toJSON(),
      completedDate: completedDate?.toJSON(),
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatLineItemLegacy(data: LineItemLegacyWithSupplierModel): LineItemLegacy {
    const { createdTime, updatedTime, supplier, ...rest } = data;

    return {
      ...rest,
      supplier: this.formatSupplier(supplier),
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatReporter(data: ReporterModel): Reporter {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatScope(data: ScopeModel): Scope {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  formatSupplier(data: SupplierModel): Supplier {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  //region - Shared

  async sendSMSConsentRequest(phoneNumber: string) {
    const payload = {
      to: phoneNumber,
      messagingServiceSid: this.messagingServiceSid,
      body: SMS_MESSAGES.optInRequest,
    };

    return this.context.twilio.messages.create(payload, (err) => {
      if (err) throw GRAPHQL_ERRORS.smsConsentRequestFailed;
    });
  }

  async sendSMSConsentReminder(phoneNumber: string) {
    const payload = {
      to: phoneNumber,
      messagingServiceSid: this.messagingServiceSid,
      body: SMS_MESSAGES.optInReminder,
    };

    return this.context.twilio.messages.create(payload, (err) => {
      if (err) throw GRAPHQL_ERRORS.smsConsentReminderFailed;
    });
  }

  async sendContractorSMSById(id: string, message: string) {
    const contractor = await this.context.prisma.contractor.findUnique({ where: { id } });
    const formattedPhoneNumber = `+1${contractor?.primaryPhone.replace(/\D/g, '')}`;
    const smsPayload = {
      to: formattedPhoneNumber,
      messagingServiceSid: this.messagingServiceSid,
      body: message,
    };

    if (!contractor) {
      throw GRAPHQL_ERRORS.contractorNotFound;
    }

    if (!message) {
      throw GRAPHQL_ERRORS.messageRequired;
    }

    switch (contractor.smsConsent) {
      case SMSConsent.NEEDED:
        await this.sendSMSConsentRequest(formattedPhoneNumber);
        await this.context.prisma.contractor.update({
          where: { id },
          data: { smsConsent: SMSConsent.PENDING },
        });
        break;
      case SMSConsent.PENDING:
        await this.sendSMSConsentReminder(formattedPhoneNumber);
        break;
      case SMSConsent.OPTED_OUT:
        throw GRAPHQL_ERRORS.contractorSMSOptedOut;
      default:
        break;
    }

    delay(() => {
      // delay the message by 500ms to ensure the consent request is sent first
    }, 500);

    return this.context.twilio.messages.create(smsPayload, (err) => {
      if (err) throw GRAPHQL_ERRORS.contractorSMSFailed;
    });
  }

  async sendReporterSMSById(id: string, message: string) {
    const reporter = await this.context.prisma.reporter.findUnique({ where: { id } });
    const formattedPhoneNumber = `+1${reporter?.primaryPhone.replace(/\D/g, '')}`;
    const smsPayload = {
      to: formattedPhoneNumber,
      messagingServiceSid: this.messagingServiceSid,
      body: message,
    };

    if (!reporter) {
      throw GRAPHQL_ERRORS.reporterNotFound;
    }

    if (!message) {
      throw GRAPHQL_ERRORS.messageRequired;
    }

    switch (reporter.smsConsent) {
      case SMSConsent.NEEDED:
        await this.sendSMSConsentRequest(formattedPhoneNumber);
        await this.context.prisma.reporter.update({
          where: { id },
          data: { smsConsent: SMSConsent.PENDING },
        });
        break;
      case SMSConsent.PENDING:
        await this.sendSMSConsentReminder(formattedPhoneNumber);
        break;
      case SMSConsent.OPTED_OUT:
        throw GRAPHQL_ERRORS.reporterSMSOptedOut;
      default:
        break;
    }

    delay(() => {
      // delay the message by 500ms to ensure the consent request is sent first
    }, 500);

    return this.context.twilio.messages.create(smsPayload, (err) => {
      if (err) throw GRAPHQL_ERRORS.reporterSMSFailed;
    });
  }

  //endregion
}
