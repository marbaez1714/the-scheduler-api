import { ModifyJobLegacyInput } from './../generated';
import { UserInputError } from 'apollo-server';

import { DataHandler } from '../app';
import { Context } from '../context';
import { CreateJobLegacyInput, Pagination, Sorting } from '../generated';
import { checkDelete } from '../utils';

export class JobLegacyDataHandler extends DataHandler<'jobLegacy'> {
  constructor(context: Context) {
    super(context, 'jobLegacy');
  }

  async archive(id: string) {
    const archivedDoc = await this.crud.update({
      where: { id },
      data: this.archiveData,
      include: { lineItems: { include: { supplier: true } } },
    });
    const formatted = this.formatJobLegacy(archivedDoc);
    return this.archiveResponse(formatted);
  }

  async create(data: CreateJobLegacyInput) {
    const { lineItems, startDate, ...rest } = data;

    const startDateTime = startDate ? new Date(startDate) : null;

    const createLineItemsData = lineItems.map((item) => ({
      ...item,
      updatedBy: this.userEmail,
      createdBy: this.userEmail,
    }));

    const newJob = await this.crud.create({
      data: {
        ...rest,
        startDate: startDateTime,
        updatedBy: this.userEmail,
        createdBy: this.userEmail,
        lineItems: { create: createLineItemsData },
      },
      include: { lineItems: { include: { supplier: true } } },
    });

    const formatted = this.formatJobLegacy(newJob);

    return this.writeResponse(formatted);
  }

  async modify(id: string, data: ModifyJobLegacyInput) {
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

    const startDateTime = startDate ? new Date(startDate) : undefined;
    const completeDateTime = completedDate
      ? new Date(completedDate)
      : undefined;

    const createLineItems = lineItems
      ?.filter((item) => !item.id)
      .map((item) => ({
        ...item,
        updatedBy: this.userEmail,
        createdBy: this.userEmail,
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
        updatedBy: this.userEmail,
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

  async getById(id: string) {
    const doc = await this.crud.findUnique({
      where: { id },
      include: { lineItems: { include: { supplier: true } } },
    });

    if (!doc) throw new UserInputError(`${id} does not exist.`);

    return this.formatJobLegacy(doc);
  }

  async getByContractorId(
    id: string,
    archived?: boolean,
    pagination?: Pagination,
    sorting?: Sorting
  ) {
    const findArgs = {
      where: {
        active: true,
        contractorId: id || null,
        archived: !!archived,
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
      ...this.findArgs(pagination, sorting),
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany(findArgs),
      this.crud.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map((doc) => this.formatJobLegacy(doc)),
      meta: this.responseMeta(count, pagination, sorting),
    };
  }

  async getMany(
    archived?: boolean,
    pagination?: Pagination,
    sorting?: Sorting
  ) {
    const findArgs = {
      include: {
        contractor: true,
        area: true,
        builder: true,
        community: true,
        lineItems: { include: { supplier: true } },
        reporter: true,
        scope: true,
      },
      where: { archived: !!archived },
      ...this.findArgs(pagination, sorting),
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany(findArgs),
      this.crud.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map((doc) => this.formatJobLegacy(doc)),
      meta: this.responseMeta(count, pagination, sorting),
    };
  }

  async getByActiveStatus(
    active: boolean,
    archived?: boolean,
    pagination?: Pagination,
    sorting?: Sorting
  ) {
    const findArgs = {
      include: {
        contractor: true,
        area: true,
        builder: true,
        community: true,
        lineItems: { include: { supplier: true } },
        reporter: true,
        scope: true,
      },
      where: { archived: !!archived, active },
      ...this.findArgs(pagination, sorting),
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany(findArgs),
      this.crud.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map((doc) => this.formatJobLegacy(doc)),
      meta: this.responseMeta(count, pagination, sorting),
    };
  }
}

export class LineItemLegacyDataHandler extends DataHandler<'lineItemLegacy'> {
  constructor(context: Context) {
    super(context, 'lineItemLegacy');
  }

  async delete(id: string) {
    const deletedDoc = await this.crud.delete({ where: { id: id } });
    return { message: `${deletedDoc.orderNumber} deleted.` };
  }
}
