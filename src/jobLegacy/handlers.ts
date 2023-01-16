import { UserInputError } from 'apollo-server';

import { DataHandler } from '../app';
import { Context } from '../context';
import {
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
} from '../generated';
import { checkDelete } from '../utils';

export class JobLegacyDataHandler extends DataHandler<'jobLegacy'> {
  constructor(context: Context) {
    super(context, 'jobLegacy');
  }

  /******************************/
  /* Getters                    */
  /******************************/
  async getById({ id }: QueryJobLegacyByIdArgs) {
    const doc = await this.crud.findUnique({
      where: { id },
      include: { lineItems: { include: { supplier: true } } },
    });

    if (!doc) throw new UserInputError(`${id} does not exist.`);

    return this.formatJobLegacy(doc);
  }

  async getByContractorId({
    id,
    archived,
    pagination,
    filter,
    sort,
  }: QueryJobsLegacyByContractorIdArgs) {
    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany({
        where: {
          active: true,
          contractorId: id || null,
          archived: !!archived,
          ...this.filterArgs(filter),
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
        orderBy: this.sortingArgs(sort),
        ...this.paginationArgs(pagination),
      }),
      this.crud.count({
        where: {
          active: true,
          contractorId: id || null,
          archived: !!archived,
          ...this.filterArgs(filter),
        },
      }),
    ]);

    return {
      data: docList.map((doc) => this.formatJobLegacy(doc)),
      pagination: this.paginationResponse(count, pagination),
      filter: this.filterResponse(filter),
      sort: this.sortResponse(sort),
    };
  }

  async getMany({ archived, pagination, filter, sort }: QueryJobsLegacyArgs) {
    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany({
        where: {
          archived: !!archived,
          ...this.filterArgs(filter),
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
        orderBy: this.sortingArgs(sort),
        ...this.paginationArgs(pagination),
      }),
      this.crud.count({ where: { archived: !!archived } }),
    ]);

    return {
      data: docList.map((doc) => this.formatJobLegacy(doc)),
      pagination: this.paginationResponse(count, pagination),
      filter: this.filterResponse(filter),
      sort: this.sortResponse(sort),
    };
  }

  async getByActiveStatus({
    active,
    archived,
    pagination,
    filter,
    sort,
  }: QueryJobsLegacyByActiveStatusArgs) {
    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany({
        where: {
          archived: !!archived,
          active,
          ...this.filterArgs(filter),
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
        orderBy: this.sortingArgs(sort),
        ...this.paginationArgs(pagination),
      }),
      this.crud.count({
        where: {
          archived: !!archived,
          active,
          ...this.filterArgs(filter),
        },
      }),
    ]);

    return {
      data: docList.map((doc) => this.formatJobLegacy(doc)),
      pagination: this.paginationResponse(count, pagination),
      filter: this.filterResponse(filter),
      sort: this.sortResponse(sort),
    };
  }

  /******************************/
  /* Setters                    */
  /******************************/
  async archive({ id }: MutationArchiveJobLegacyArgs) {
    const archivedDoc = await this.crud.update({
      where: { id },
      data: this.archiveData,
      include: { lineItems: { include: { supplier: true } } },
    });
    const formatted = this.formatJobLegacy(archivedDoc);
    return this.archiveResponse(formatted);
  }

  async create({ data }: MutationCreateJobLegacyArgs) {
    const { lineItems, startDate, ...rest } = data;

    const startDateTime = startDate ? new Date(startDate) : null;

    const createLineItemsData = lineItems.map((item) => ({
      ...item,
      updatedBy: this.userId,
      createdBy: this.userId,
    }));

    const newJob = await this.crud.create({
      data: {
        ...rest,
        startDate: startDateTime,
        updatedBy: this.userId,
        createdBy: this.userId,
        lineItems: { create: createLineItemsData },
      },
      include: { lineItems: { include: { supplier: true } } },
    });

    const formatted = this.formatJobLegacy(newJob);

    return this.writeResponse(formatted);
  }

  async modify({ id, data }: MutationModifyJobLegacyArgs) {
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

    const startDateTime = startDate ? new Date(startDate) : null;
    const completeDateTime = completedDate
      ? new Date(completedDate)
      : undefined;

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

    const updatedDoc = await this.crud.update({
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

    const formatted = this.formatJobLegacy(updatedDoc);

    return this.writeResponse(formatted);
  }

  async sendMessage({
    id,
    message,
    recipient,
  }: MutationSendMessageJobLegacyArgs) {
    // Set up phone number
    let recipientPhone: string | undefined;

    // Find associated job
    const jobDoc = await this.crud.findUnique({
      where: { id },
      include: { contractor: true, reporter: true },
    });

    if (!jobDoc) throw new UserInputError(`${id} does not exist.`);

    // Set phone number
    switch (recipient) {
      case JobsLegacyMessageRecipient.Contractor:
        recipientPhone = jobDoc.contractor?.primaryPhone;
        break;
      case JobsLegacyMessageRecipient.Reporter:
        recipientPhone = jobDoc.reporter?.primaryPhone;
        break;
      default:
        throw new UserInputError(`${recipient} does not exist`);
    }

    // Remove all non number characters
    const formattedPhoneNumber = `+1${recipientPhone?.replace(/\D/g, '')}`;

    // Send message
    await this.context.twilio.messages.create({
      to: formattedPhoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
      body: message,
    });

    return { message, recipient };
  }
}

export class LineItemLegacyDataHandler extends DataHandler<'lineItemLegacy'> {
  constructor(context: Context) {
    super(context, 'lineItemLegacy');
  }

  async delete({ id }: MutationDeleteLineItemLegacyArgs) {
    const deletedDoc = await this.crud.delete({ where: { id: id } });
    return { message: `${deletedDoc.orderNumber} deleted.` };
  }
}
