import { UserInputError } from 'apollo-server';

import { DataHandler } from '../app';
import { Context } from '../context';
import { Pagination, WriteContractorInput } from '../generated';

export class ContractorDataHandler extends DataHandler<'contractor'> {
  constructor(context: Context) {
    super(context, 'contractor');
  }

  async archive(id: string) {
    const archivedDoc = await this.crud.update({
      where: { id },
      data: this.archiveData,
      include: {
        jobsLegacy: { include: { lineItems: { include: { supplier: true } } } },
      },
    });

    const formatted = this.formatContractor(archivedDoc);

    return this.archiveResponse(formatted);
  }

  async create(data: WriteContractorInput) {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userId,
        createdBy: this.userId,
      },
      include: {
        jobsLegacy: { include: { lineItems: { include: { supplier: true } } } },
      },
    });

    const formatted = this.formatContractor(newDoc);

    return this.writeResponse(formatted);
  }

  async modify(id: string, data: WriteContractorInput) {
    const updatedDoc = await this.crud.update({
      where: { id },
      data: { ...data, updatedBy: this.userId },
      include: {
        jobsLegacy: { include: { lineItems: { include: { supplier: true } } } },
      },
    });

    const formatted = this.formatContractor(updatedDoc);

    return this.writeResponse(formatted);
  }

  async getById(id: string) {
    const doc = await this.crud.findUnique({
      where: { id },
      include: {
        jobsLegacy: { include: { lineItems: { include: { supplier: true } } } },
      },
    });

    if (!doc) throw new UserInputError(`${id} does not exist.`);

    return this.formatContractor(doc);
  }

  async getMany(archived?: boolean, pagination?: Pagination) {
    const findArgs = {
      include: {
        jobsLegacy: {
          include: { lineItems: { include: { supplier: true } } },
        },
      },
      where: { archived: !!archived },
      ...this.findArgs(pagination),
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany(findArgs),
      this.crud.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map((doc) => this.formatContractor(doc)),
      meta: this.responseMeta(count, pagination),
    };
  }

  async getAssigned() {
    const docList = await this.crud.findMany({
      where: {
        jobsLegacy: { some: { archived: false, active: true } },
        archived: false,
      },
      include: {
        jobsLegacy: {
          include: { lineItems: { include: { supplier: true } } },
        },
      },
    });

    return { data: docList.map((doc) => this.formatContractor(doc)) };
  }
}
