import { ApolloServerErrorCode } from '@apollo/server/errors';
import { DataHandler } from '../app';
import { Context } from '../context';
import { Pagination, WriteContractorInput } from '../generated';
import { GraphQLError } from 'graphql';

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

    return this.generateArchiveResponse(formatted);
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

    return this.generateWriteResponse(formatted);
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

    return this.generateWriteResponse(formatted);
  }

  async getById(id: string) {
    const doc = await this.crud.findUnique({
      where: { id },
      include: {
        jobsLegacy: { include: { lineItems: { include: { supplier: true } } } },
      },
    });

    if (!doc) {
      throw new GraphQLError(`${id} does not exist.`, {
        extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
      });
    }

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
      ...this.generatePaginationArgs(pagination),
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany(findArgs),
      this.crud.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map((doc) => this.formatContractor(doc)),
      pagination: this.generatePaginationResponse(count, pagination),
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
      orderBy: {
        name: 'asc',
      },
    });

    return { data: docList.map((doc) => this.formatContractor(doc)) };
  }
}
