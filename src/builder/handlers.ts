import { DataHandler } from '../app';
import { Context } from '../context';
import {
  ArchiveBuilderResponse,
  Builder,
  BuildersResponse,
  Pagination,
  WriteBuilderInput,
  WriteBuilderResponse,
} from '../generated';
import { GRAPHQL_ERRORS } from '../constants';

export class BuilderDataHandler extends DataHandler<'builder'> {
  constructor(context: Context) {
    super(context, 'builder');
  }

  async archive(id: string): Promise<ArchiveBuilderResponse> {
    const doc = await this.crud.update({
      where: { id },
      data: this.archiveData,
      include: { company: true },
    });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    const { company, ...rest } = doc;
    const formatted = { ...this.formatDBBuilder(rest), company: this.formatDBCompany(company) };

    return this.generateArchiveResponse(formatted);
  }

  async create(data: WriteBuilderInput): Promise<WriteBuilderResponse> {
    const { company, ...rest } = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userId,
        createdBy: this.userId,
      },
      include: { company: true },
    });

    const formatted = { ...this.formatDBBuilder(rest), company: this.formatDBCompany(company) };

    return this.generateWriteResponse(formatted);
  }

  async modify(id: string, data: WriteBuilderInput): Promise<WriteBuilderResponse> {
    const doc = await this.crud.update({
      where: { id },
      data: { ...data, updatedBy: this.userId },
      include: { company: true },
    });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    const { company, ...rest } = doc;
    const formatted = { ...this.formatDBBuilder(rest), company: this.formatDBCompany(company) };

    return this.generateWriteResponse(formatted);
  }

  async getById(id: string): Promise<Builder> {
    const doc = await this.crud.findUnique({
      where: { id },
      include: { company: true },
    });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    const { company, ...rest } = doc;
    const formatted = { ...this.formatDBBuilder(rest), company: this.formatDBCompany(company) };

    return formatted;
  }

  async getMany(archived?: boolean, pagination?: Pagination): Promise<BuildersResponse> {
    const findArgs = {
      include: { company: true },
      where: { archived: !!archived },
      ...this.generatePaginationArgs(pagination),
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany(findArgs),
      this.crud.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map(({ company, ...rest }) => ({
        ...this.formatDBBuilder(rest),
        company: this.formatDBCompany(company),
      })),
      pagination: this.generatePaginationResponse(count, pagination),
    };
  }
}
