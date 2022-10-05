import { UserInputError } from 'apollo-server';

import { DataHandler } from '../app';
import { Context } from '../context';
import {
  CreateJobLegacyInput,
  PaginationOptions,
  SortingOptions,
} from '../generated';

export class JobLegacyDataHandler extends DataHandler<'jobLegacy'> {
  constructor(context: Context) {
    super(context, 'jobLegacy');
  }

  async archive(id: string) {
    const archivedDoc = await this.crud.update({
      where: { id },
      data: this.archiveData,
      include: { lineItems: true },
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
      include: { lineItems: true },
    });

    const formatted = this.formatJobLegacy(newJob);

    return this.writeResponse(formatted);
  }

  async getById(id: string) {
    const doc = await this.crud.findUnique({
      where: { id },
      include: { lineItems: true },
    });

    if (!doc) throw new UserInputError(`${id} does not exist.`);

    return this.formatJobLegacy(doc);
  }

  async getByContractorId(
    id: string,
    archived?: boolean,
    pagination?: PaginationOptions,
    sorting?: SortingOptions
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
        lineItems: true,
        reporter: true,
        scope: true,
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
