import { DataHandler } from '../app';
import { Context } from '../context';
import {
  ArchiveReporterResponse,
  Pagination,
  Reporter,
  ReportersResponse,
  WriteReporterInput,
  WriteReporterResponse,
} from '../generated';
import { GRAPHQL_ERRORS, RESPONSES } from '../constants';

export class ReporterDataHandler extends DataHandler<'reporter'> {
  constructor(context: Context) {
    super(context, 'reporter');
  }

  async archive(id: string): Promise<ArchiveReporterResponse> {
    const doc = await this.crud.update({
      where: { id },
      data: this.archiveData,
    });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    return {
      data: this.reporterDTO(doc),
      message: RESPONSES.archiveSuccess(doc.name),
    };
  }

  async create(data: WriteReporterInput): Promise<WriteReporterResponse> {
    const doc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userId,
        createdBy: this.userId,
      },
    });

    return {
      data: this.reporterDTO(doc),
      message: RESPONSES.createSuccess(doc.name),
    };
  }

  async modify(id: string, data: WriteReporterInput): Promise<WriteReporterResponse> {
    const doc = await this.crud.update({
      where: { id },
      data: { ...data, updatedBy: this.userId },
    });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    return {
      data: this.reporterDTO(doc),
      message: RESPONSES.modifySuccess(doc.name),
    };
  }

  async getById(id: string): Promise<Reporter> {
    const doc = await this.crud.findUnique({ where: { id } });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    return this.reporterDTO(doc);
  }

  async getMany(archived?: boolean, pagination?: Pagination): Promise<ReportersResponse> {
    const findArgs = {
      where: { archived: !!archived },
      ...this.generatePaginationArgs(pagination),
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany(findArgs),
      this.crud.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map((doc) => this.reporterDTO(doc)),
      pagination: this.generatePaginationResponse(count, pagination),
    };
  }
}
