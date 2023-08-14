import { Prisma, SMSConsent } from '@prisma/client';
import { Context } from '../context';
import {
  BuilderDTOArgs,
  CommunityDTOArgs,
  ContractorDTOArgs,
  JobLegacyDTOArgs,
  PermissionsEnum,
  PrismaModels,
} from '../app/types';
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
  ArchiveAreaResponse,
  WriteAreaResponse,
  AreasResponse,
  ArchiveBuilderResponse,
  WriteBuilderResponse,
  BuildersResponse,
  ArchiveCommunityResponse,
  WriteCommunityResponse,
  CommunitiesResponse,
  ArchiveCompanyResponse,
  WriteCompanyResponse,
  CompaniesResponse,
  ArchiveContractorResponse,
  WriteContractorResponse,
  ContractorsResponse,
  AssignedContractorsResponse,
  ArchiveReporterResponse,
  WriteReporterResponse,
  ReportersResponse,
  ArchiveScopeResponse,
  WriteScopeResponse,
  ScopesResponse,
  ArchiveSupplierResponse,
  WriteSupplierResponse,
  SuppliersResponse,
  JobsLegacyResponse,
  SortDirection,
  ArchiveJobLegacyResponse,
  WriteJobLegacyResponse,
  SortResponse,
  FilterResponse,
} from '../generated';
import { GRAPHQL_ERRORS, RESPONSES, SMS_MESSAGES } from '../constants';

export class DataHandler<TClient extends keyof PrismaModels> {
  //#region - Properties

  context: Context;
  client: TClient;
  crud: Context['prisma'][TClient];
  userId: string;
  todayDate: Date;
  messagingServiceSid: string;

  //#endregion
  //#region - Constructor

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
    // Set today's date to midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.todayDate = today;
    // Set messaging service sid
    this.messagingServiceSid = `${process.env.TWILIO_MESSAGING_SERVICE_SID}`;
  }

  //#endregion
  //#region - Arguments

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

  //#endregion
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

  //#region - Pagination

  sortResponseDTO(input?: SortInput): SortResponse {
    return {
      field: input?.field || '',
      direction: input?.direction || SortDirection.Asc,
    };
  }

  filterResponseDTO(input?: FilterInput): FilterResponse {
    return {
      field: input?.field || '',
      term: input?.term || '',
    };
  }

  //#endregion
  //#region - Pagination

  paginationResponseDTO(totalCount: number, pagination?: Pagination): PaginationResponse {
    let response = {
      totalCount,
      totalPages: pagination?.pageSize ? Math.ceil(totalCount / pagination.pageSize) : 1,
    };

    if (pagination) {
      response = { ...response, ...pagination };
    }

    return response;
  }

  //#endregion
  //#region - Areas

  areaDTO(doc: PrismaModels['area']): Area {
    return this.formatDBArea(doc);
  }

  archiveAreaResponseDTO(doc: PrismaModels['area']): ArchiveAreaResponse {
    return {
      data: this.areaDTO(doc),
      message: RESPONSES.archiveSuccess(doc.name),
    };
  }

  writeAreaResponseDTO(doc: PrismaModels['area'], message: string): WriteAreaResponse {
    return {
      data: this.areaDTO(doc),
      message,
    };
  }

  areasResponseDTO(
    docList: PrismaModels['area'][],
    count: number,
    pagination?: Pagination
  ): AreasResponse {
    return {
      data: docList.map((doc) => this.areaDTO(doc)),
      pagination: this.paginationResponseDTO(count, pagination),
    };
  }

  //#endregion
  //#region - Builders

  builderDTO(doc: BuilderDTOArgs): Builder {
    const { company, ...rest } = doc;

    return { ...this.formatDBBuilder(rest), company: this.formatDBCompany(company) };
  }

  archiveBuilderResponseDTO(doc: BuilderDTOArgs): ArchiveBuilderResponse {
    return {
      data: this.builderDTO(doc),
      message: RESPONSES.archiveSuccess(doc.name),
    };
  }

  writeBuilderResponseDTO(doc: BuilderDTOArgs, message: string): WriteBuilderResponse {
    return {
      data: this.builderDTO(doc),
      message,
    };
  }

  buildersResponseDTO(
    docList: BuilderDTOArgs[],
    count: number,
    pagination?: Pagination
  ): BuildersResponse {
    return {
      data: docList.map((doc) => this.builderDTO(doc)),
      pagination: this.paginationResponseDTO(count, pagination),
    };
  }

  //#endregion
  //#region - Communities

  communityDTO(doc: CommunityDTOArgs): Community {
    const { company, ...rest } = doc;

    return { ...this.formatDBCommunity(rest), company: this.formatDBCompany(company) };
  }

  archiveCommunityResponseDTO(data: CommunityDTOArgs): ArchiveCommunityResponse {
    return {
      data: this.communityDTO(data),
      message: RESPONSES.archiveSuccess(data.name),
    };
  }

  writeCommunityResponseDTO(data: CommunityDTOArgs, message: string): WriteCommunityResponse {
    return {
      data: this.communityDTO(data),
      message,
    };
  }

  communitiesResponseDTO(
    docList: CommunityDTOArgs[],
    count: number,
    pagination?: Pagination
  ): CommunitiesResponse {
    return {
      data: docList.map((doc) => this.communityDTO(doc)),
      pagination: this.paginationResponseDTO(count, pagination),
    };
  }

  //#endregion
  //#region - Companies

  companyDTO(doc: PrismaModels['company']): Company {
    return this.formatDBCompany(doc);
  }

  archiveCompanyResponseDTO(doc: PrismaModels['company']): ArchiveCompanyResponse {
    return {
      data: this.companyDTO(doc),
      message: RESPONSES.archiveSuccess(doc.name),
    };
  }

  writeCompanyResponseDTO(doc: PrismaModels['company'], message: string): WriteCompanyResponse {
    return {
      data: this.companyDTO(doc),
      message,
    };
  }

  companiesResponseDTO(
    docList: PrismaModels['company'][],
    count: number,
    pagination?: Pagination
  ): CompaniesResponse {
    return {
      data: docList.map((doc) => this.companyDTO(doc)),
      pagination: this.paginationResponseDTO(count, pagination),
    };
  }

  //#endregion
  //#region - Contractors

  contractorDTO(doc: ContractorDTOArgs): Contractor {
    const { jobsLegacy, ...contractorDocRest } = doc;

    const formattedJobsLegacy = jobsLegacy.map(({ lineItems, ...jobDocRest }) => {
      return {
        ...this.formatDBJobLegacy(jobDocRest),
        lineItems: lineItems.map(({ supplier, ...lineItemDocRest }) => ({
          ...this.formatDBLineItemLegacy(lineItemDocRest),
          supplier: this.formatDBSupplier(supplier),
        })),
      };
    });

    return {
      ...this.formatDBContractor(contractorDocRest),
      jobsLegacy: formattedJobsLegacy,
    };
  }

  archiveContractorResponseDTO(doc: ContractorDTOArgs): ArchiveContractorResponse {
    return {
      data: this.contractorDTO(doc),
      message: RESPONSES.archiveSuccess(doc.name),
    };
  }

  writeContractorResponseDTO(doc: ContractorDTOArgs, message: string): WriteContractorResponse {
    return {
      data: this.contractorDTO(doc),
      message,
    };
  }

  contractorsResponseDTO(
    docList: ContractorDTOArgs[],
    count: number,
    pagination?: Pagination
  ): ContractorsResponse {
    return {
      data: docList.map((doc) => this.contractorDTO(doc)),
      pagination: this.paginationResponseDTO(count, pagination),
    };
  }

  assignedContractorsResponseDTO(docList: ContractorDTOArgs[]): AssignedContractorsResponse {
    return {
      data: docList.map((doc) => this.contractorDTO(doc)),
    };
  }

  //#endregion
  //#region - JobsLegacy

  jobLegacyDTO(doc: JobLegacyDTOArgs): JobLegacy {
    const { lineItems, ...jobRest } = doc;
    const formattedLineItems = lineItems.map(({ supplier, ...lineItemRest }) => ({
      ...this.formatDBLineItemLegacy(lineItemRest),
      supplier: this.formatDBSupplier(supplier),
    }));

    return {
      ...this.formatDBJobLegacy(jobRest),
      lineItems: formattedLineItems,
    };
  }

  archiveJobLegacyResponseDTO(doc: JobLegacyDTOArgs): ArchiveJobLegacyResponse {
    return {
      data: this.jobLegacyDTO(doc),
      message: RESPONSES.archiveSuccess(doc.name),
    };
  }

  writeJobLegacyResponseDTO(doc: JobLegacyDTOArgs, message: string): WriteJobLegacyResponse {
    return {
      data: this.jobLegacyDTO(doc),
      message,
    };
  }

  jobsLegacyResponseDTO(
    docList: JobLegacyDTOArgs[],
    count: number,
    pagination?: Pagination,
    filterInput?: FilterInput,
    sortInput?: SortInput
  ): JobsLegacyResponse {
    return {
      data: docList.map((doc) => this.jobLegacyDTO(doc)),
      pagination: this.paginationResponseDTO(count, pagination),
      filter: this.filterResponseDTO(filterInput),
      sort: this.sortResponseDTO(sortInput),
    };
  }

  //#endregion
  //#region - LineItemsLegacy

  lineItemLegacyDTO(
    data: PrismaModels['lineItemLegacy'] & { supplier: PrismaModels['supplier'] }
  ): LineItemLegacy {
    const { supplier, ...lineItemRest } = data;

    return {
      ...this.formatDBLineItemLegacy(lineItemRest),
      supplier: this.formatDBSupplier(supplier),
    };
  }

  //#endregion
  //#region - Reporters

  reporterDTO(doc: PrismaModels['reporter']): Reporter {
    return this.formatDBReporter(doc);
  }

  archiveReporterResponseDTO(doc: PrismaModels['reporter']): ArchiveReporterResponse {
    return {
      data: this.reporterDTO(doc),
      message: RESPONSES.archiveSuccess(doc.name),
    };
  }

  writeReporterResponseDTO(doc: PrismaModels['reporter'], message: string): WriteReporterResponse {
    return {
      data: this.reporterDTO(doc),
      message,
    };
  }

  reportersResponseDTO(
    docList: PrismaModels['reporter'][],
    count: number,
    pagination?: Pagination
  ): ReportersResponse {
    return {
      data: docList.map((doc) => this.reporterDTO(doc)),
      pagination: this.paginationResponseDTO(count, pagination),
    };
  }

  //#endregion
  //#region - Scopes

  scopeDTO(data: PrismaModels['scope']): Scope {
    return this.formatDBScope(data);
  }

  archiveScopeResponseDTO(data: PrismaModels['scope']): ArchiveScopeResponse {
    return {
      data: this.scopeDTO(data),
      message: RESPONSES.archiveSuccess(data.name),
    };
  }

  writeScopeResponseDTO(data: PrismaModels['scope'], message: string): WriteScopeResponse {
    return {
      data: this.scopeDTO(data),
      message,
    };
  }

  scopesResponseDTO(
    docList: PrismaModels['scope'][],
    count: number,
    pagination?: Pagination
  ): ScopesResponse {
    return {
      data: docList.map((doc) => this.scopeDTO(doc)),
      pagination: this.paginationResponseDTO(count, pagination),
    };
  }

  //#endregion
  //#region - Suppliers

  supplierDTO(doc: PrismaModels['supplier']): Supplier {
    return this.formatDBSupplier(doc);
  }

  archiveSupplierResponseDTO(doc: PrismaModels['supplier']): ArchiveSupplierResponse {
    return {
      data: this.supplierDTO(doc),
      message: RESPONSES.archiveSuccess(doc.name),
    };
  }

  writeSupplierResponseDTO(doc: PrismaModels['supplier'], message: string): WriteSupplierResponse {
    return {
      data: this.supplierDTO(doc),
      message,
    };
  }

  suppliersResponseDTO(
    docList: PrismaModels['supplier'][],
    count: number,
    pagination?: Pagination
  ): SuppliersResponse {
    return {
      data: docList.map((doc) => this.supplierDTO(doc)),
      pagination: this.paginationResponseDTO(count, pagination),
    };
  }

  //#endregion

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
