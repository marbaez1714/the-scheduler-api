import { DataHandler } from '../app';
import { Context } from '../context';
import {
  ArchiveContractorResponse,
  AssignedContractorsResponse,
  Contractor,
  ContractorsResponse,
  Pagination,
  WriteContractorInput,
  WriteContractorResponse,
} from '../generated';
import { GRAPHQL_ERRORS, RESPONSES } from '../constants';

export class ContractorDataHandler extends DataHandler<'contractor'> {
  constructor(context: Context) {
    super(context, 'contractor');
  }

  async archive(id: string): Promise<ArchiveContractorResponse> {
    const doc = await this.crud.update({
      where: { id },
      data: this.archiveData,
      include: {
        jobsLegacy: { include: { lineItems: { include: { supplier: true } } } },
      },
    });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    return {
      data: this.contractorDTO(doc),
      message: RESPONSES.archived(doc.name),
    };
  }

  async create(data: WriteContractorInput): Promise<WriteContractorResponse> {
    const doc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userId,
        createdBy: this.userId,
      },
      include: {
        jobsLegacy: { include: { lineItems: { include: { supplier: true } } } },
      },
    });

    const formatted = this.contractorDTO(doc);

    return this.generateWriteResponse(formatted);
  }

  async modify(id: string, data: WriteContractorInput): Promise<WriteContractorResponse> {
    const doc = await this.crud.update({
      where: { id },
      data: { ...data, updatedBy: this.userId },
      include: {
        jobsLegacy: { include: { lineItems: { include: { supplier: true } } } },
      },
    });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    const formatted = this.contractorDTO(doc);

    return this.generateWriteResponse(formatted);
  }

  async getById(id: string): Promise<Contractor> {
    const doc = await this.crud.findUnique({
      where: { id },
      include: {
        jobsLegacy: { include: { lineItems: { include: { supplier: true } } } },
      },
    });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    return this.contractorDTO(doc);
  }

  async getMany(archived?: boolean, pagination?: Pagination): Promise<ContractorsResponse> {
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
      data: docList.map((doc) => this.contractorDTO(doc)),
      pagination: this.generatePaginationResponse(count, pagination),
    };
  }

  async getAssigned(): Promise<AssignedContractorsResponse> {
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

    return { data: docList.map((doc) => this.contractorDTO(doc)) };
  }
}
