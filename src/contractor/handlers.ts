import { UserInputError } from 'apollo-server';

import { DataHandler, GetByIdArgs, GetDashboardArgs, GetManyArgs } from '../app';
import { Context } from '../context';
import { CreateContractorInput } from '../generated';

export class ContractorDataHandler extends DataHandler<'contractor'> {
  constructor(context: Context) {
    super(context, 'contractor');
  }

  async archive(id: string) {
    const archivedDoc = await this.crud.update({
      where: { id },
      data: this.archiveData,
      include: { jobsLegacy: { include: { lineItems: true } } },
    });

    const formatted = this.formatContractor(archivedDoc);

    return this.archiveResponse(formatted);
  }

  async create(data: CreateContractorInput) {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userEmail,
        createdBy: this.userEmail,
      },
      include: { jobsLegacy: { include: { lineItems: true } } },
    });

    const formatted = this.formatContractor(newDoc);

    return this.createResponse(formatted);
  }

  async getById(args: GetByIdArgs) {
    const doc = await this.crud.findUnique({
      where: { id: args.id },
      include: { jobsLegacy: { include: { lineItems: true } } },
    });

    if (!doc) throw new UserInputError(`${args.id} does not exist.`);

    return this.formatContractor(doc);
  }

  async getMany(args: GetManyArgs) {
    const findArgs = {
      include: {
        jobsLegacy: {
          include: { lineItems: true },
        },
      },
      where: { archived: !!args?.archived },
      ...this.findArgs(args),
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany(findArgs),
      this.crud.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map(this.formatContractor),
      meta: this.responseMeta(count, args),
    };
  }

  async getAssigned(args: GetDashboardArgs) {
    const findArgs = {
      where: {
        jobsLegacy: {
          some: { active: true, archived: false },
        },
        archived: false,
      },
      include: {
        jobsLegacy: {
          where: { active: true, archived: false },
          include: {
            lineItems: true,
          },
        },
      },
      ...this.findArgs(args),
    };

    const countArgs = {
      where: {
        active: true,
        archived: false,
        contractorId: { not: null },
      },
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany(findArgs),
      this.context.prisma.jobLegacy.count(countArgs),
    ]);

    return {
      data: docList.map(this.formatContractor),
      meta: this.responseMeta(count, args),
    };
  }
}
