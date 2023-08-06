import {
  ArchiveJobLegacyResponse,
  JobLegacy,
  JobsLegacyResponse,
  JobsLegacySendMessageResponse,
  MutationReenableJobLegacyArgs,
  WriteJobLegacyResponse,
  JobsLegacyMessageRecipient,
  MutationCreateJobLegacyArgs,
  MutationModifyJobLegacyArgs,
  MutationArchiveJobLegacyArgs,
  MutationSendMessageJobLegacyArgs,
  QueryJobLegacyByIdArgs,
  QueryJobsLegacyArgs,
  QueryJobsLegacyByActiveStatusArgs,
  QueryJobsLegacyByContractorIdArgs,
  MutationDeleteLineItemLegacyArgs,
  DeleteResponse,
  SortDirection,
} from '../generated';
import { DataHandler } from '.';
import { Context } from '../context';
import { checkDelete } from '../utils';
import { GRAPHQL_ERRORS, RESPONSES } from '../constants';

export class JobLegacyDataHandler extends DataHandler<'jobLegacy'> {
  constructor(context: Context) {
    super(context, 'jobLegacy');
  }

  /******************************/
  /* Getters                    */
  /******************************/
  async getById({ id }: QueryJobLegacyByIdArgs): Promise<JobLegacy> {
    const doc = await this.crud.findUnique({
      where: { id },
      include: { lineItems: { include: { supplier: true } } },
    });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    return this.jobLegacyDTO(doc);
  }

  async getByContractorId({
    id,
    archived,
    pagination,
    filter,
    sort,
  }: QueryJobsLegacyByContractorIdArgs): Promise<JobsLegacyResponse> {
    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany({
        where: {
          active: true,
          contractorId: id || null,
          archived: !!archived,
          ...this.generateFilterArgs(filter),
        },
        include: {
          area: true,
          builder: true,
          community: true,
          lineItems: { include: { supplier: true } },
          reporter: true,
          scope: true,
          contractor: true,
        },
        orderBy: this.generateSortingArgs(sort),
        ...this.generatePaginationArgs(pagination),
      }),
      this.crud.count({
        where: {
          active: true,
          contractorId: id || null,
          archived: !!archived,
          ...this.generateFilterArgs(filter),
        },
      }),
    ]);

    return {
      data: docList.map((doc) => this.jobLegacyDTO(doc)),
      pagination: this.generatePaginationResponse(count, pagination),
      filter: {
        field: filter?.field ?? '',
        term: filter?.term ?? '',
      },
      sort: {
        field: sort?.field ?? '',
        direction: sort?.direction ?? SortDirection.Asc,
      },
    };
  }

  async getMany({
    archived,
    pagination,
    filter,
    sort,
  }: QueryJobsLegacyArgs): Promise<JobsLegacyResponse> {
    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany({
        where: {
          archived: !!archived,
          ...this.generateFilterArgs(filter),
        },
        include: {
          contractor: true,
          area: true,
          builder: true,
          community: true,
          lineItems: { include: { supplier: true } },
          reporter: true,
          scope: true,
        },
        orderBy: this.generateSortingArgs(sort),
        ...this.generatePaginationArgs(pagination),
      }),
      this.crud.count({ where: { archived: !!archived } }),
    ]);

    return {
      data: docList.map((doc) => this.jobLegacyDTO(doc)),
      pagination: this.generatePaginationResponse(count, pagination),
      filter: {
        field: filter?.field ?? '',
        term: filter?.term ?? '',
      },
      sort: {
        field: sort?.field ?? '',
        direction: sort?.direction ?? SortDirection.Asc,
      },
    };
  }

  async getByActiveStatus({
    active,
    archived,
    pagination,
    filter,
    sort,
  }: QueryJobsLegacyByActiveStatusArgs): Promise<JobsLegacyResponse> {
    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany({
        where: {
          archived: !!archived,
          active,
          ...this.generateFilterArgs(filter),
        },
        include: {
          contractor: true,
          area: true,
          builder: true,
          community: true,
          lineItems: { include: { supplier: true } },
          reporter: true,
          scope: true,
        },
        orderBy: this.generateSortingArgs(sort),
        ...this.generatePaginationArgs(pagination),
      }),
      this.crud.count({
        where: {
          archived: !!archived,
          active,
          ...this.generateFilterArgs(filter),
        },
      }),
    ]);

    return {
      data: docList.map((doc) => this.jobLegacyDTO(doc)),
      pagination: this.generatePaginationResponse(count, pagination),
      filter: {
        field: filter?.field ?? '',
        term: filter?.term ?? '',
      },
      sort: {
        field: sort?.field ?? '',
        direction: sort?.direction ?? SortDirection.Asc,
      },
    };
  }

  /******************************/
  /* Setters                    */
  /******************************/
  async archive({ id }: MutationArchiveJobLegacyArgs): Promise<ArchiveJobLegacyResponse> {
    const doc = await this.crud.update({
      where: { id },
      data: this.archiveData,
      include: { lineItems: { include: { supplier: true } } },
    });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    return {
      data: this.jobLegacyDTO(doc),
      message: RESPONSES.archiveSuccess(doc.name),
    };
  }

  async create({ data }: MutationCreateJobLegacyArgs): Promise<WriteJobLegacyResponse> {
    const { lineItems, startDate, ...rest } = data;

    const startDateTime = startDate ? new Date(startDate) : null;

    const createLineItemsData = lineItems.map((item) => ({
      ...item,
      updatedBy: this.userId,
      createdBy: this.userId,
    }));

    const doc = await this.crud.create({
      data: {
        ...rest,
        startDate: startDateTime,
        updatedBy: this.userId,
        createdBy: this.userId,
        lineItems: { create: createLineItemsData },
      },
      include: { lineItems: { include: { supplier: true } } },
    });

    return {
      data: this.jobLegacyDTO(doc),
      message: RESPONSES.createSuccess(doc.name),
    };
  }

  async modify({ id, data }: MutationModifyJobLegacyArgs): Promise<WriteJobLegacyResponse> {
    const {
      lineItems,
      startDate,
      areaId,
      builderId,
      communityId,
      contractorId,
      reporterId,
      scopeId,
      completedDate,
      ...rest
    } = data;

    const startDateTime = startDate ? new Date(startDate) : startDate;
    const completeDateTime = completedDate ? new Date(completedDate) : undefined;

    const createLineItems = lineItems
      ?.filter((item) => !item.id)
      .map((item) => ({
        ...item,
        updatedBy: this.userId,
        createdBy: this.userId,
      }));

    const deleteLineItems = lineItems
      ?.filter((item) => item.id && item.delete)
      .map((item) => item.id ?? '');

    const doc = await this.crud.update({
      where: { id },
      data: {
        ...rest,
        areaId: checkDelete(areaId),
        builderId: checkDelete(builderId),
        communityId: checkDelete(communityId),
        contractorId: checkDelete(contractorId),
        reporterId: checkDelete(reporterId),
        scopeId: checkDelete(scopeId),
        startDate: startDateTime,
        completedDate: completeDateTime,
        updatedBy: this.userId,
        lineItems: {
          create: createLineItems,
          deleteMany: { id: { in: deleteLineItems } },
        },
      },
      include: { lineItems: { include: { supplier: true } } },
    });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    return {
      data: this.jobLegacyDTO(doc),
      message: RESPONSES.modifySuccess(doc.name),
    };
  }

  async reenable({ id }: MutationReenableJobLegacyArgs): Promise<WriteJobLegacyResponse> {
    const doc = await this.crud.update({
      where: { id },
      data: {
        active: true,
        completedDate: null,
      },
      include: { lineItems: { include: { supplier: true } } },
    });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    return {
      data: this.jobLegacyDTO(doc),
      message: RESPONSES.jobLegacyReenableSuccess(doc.name),
    };
  }

  async sendMessage({
    id,
    message,
    recipient,
  }: MutationSendMessageJobLegacyArgs): Promise<JobsLegacySendMessageResponse> {
    // Find associated job
    const jobDoc = await this.crud.findUnique({
      where: { id },
      include: { contractor: true, reporter: true },
    });

    if (!jobDoc) {
      throw GRAPHQL_ERRORS.jobNotFound;
    }

    // Set phone number
    switch (recipient) {
      case JobsLegacyMessageRecipient.Contractor:
        if (!jobDoc.contractor) {
          throw GRAPHQL_ERRORS.contractorNotFound;
        }

        await this.sendSMS(jobDoc.contractor, recipient, message);
        break;
      case JobsLegacyMessageRecipient.Reporter:
        if (!jobDoc.reporter) {
          throw GRAPHQL_ERRORS.reporterNotFound;
        }

        await this.sendSMS(jobDoc.reporter, recipient, message);
        break;
      default:
        throw GRAPHQL_ERRORS.invalidRecipient;
    }

    return { message, recipient };
  }
}

export class LineItemLegacyDataHandler extends DataHandler<'lineItemLegacy'> {
  constructor(context: Context) {
    super(context, 'lineItemLegacy');
  }

  async delete({ id }: MutationDeleteLineItemLegacyArgs): Promise<DeleteResponse> {
    const doc = await this.crud.delete({ where: { id } });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    return { message: `${doc.orderNumber} deleted.` };
  }
}
