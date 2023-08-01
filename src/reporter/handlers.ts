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
import { GRAPHQL_ERRORS } from '../constants';

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

    const formatted = this.formatDBReporter(doc);

    return this.generateArchiveResponse(formatted);
  }

  async create(data: WriteReporterInput): Promise<WriteReporterResponse> {
    const doc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userId,
        createdBy: this.userId,
      },
    });

    const formatted = this.formatDBReporter(doc);

    return this.generateWriteResponse(formatted);
  }

  async modify(id: string, data: WriteReporterInput): Promise<WriteReporterResponse> {
    const doc = await this.crud.update({
      where: { id },
      data: { ...data, updatedBy: this.userId },
    });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    const formatted = this.formatDBReporter(doc);

    return this.generateWriteResponse(formatted);
  }

  async getById(id: string): Promise<Reporter> {
    const doc = await this.crud.findUnique({ where: { id } });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    return this.formatDBReporter(doc);
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
      data: docList.map((doc) => this.formatDBReporter(doc)),
      pagination: this.generatePaginationResponse(count, pagination),
    };
  }
}
