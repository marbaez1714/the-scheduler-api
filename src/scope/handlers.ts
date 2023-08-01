import { DataHandler } from '../app';
import { Context } from '../context';
import {
  ArchiveScopeResponse,
  Pagination,
  Scope,
  ScopesResponse,
  WriteScopeInput,
  WriteScopeResponse,
} from '../generated';
import { GRAPHQL_ERRORS } from '../constants';

export class ScopeDataHandler extends DataHandler<'scope'> {
  constructor(context: Context) {
    super(context, 'scope');
  }

  async archive(id: string): Promise<ArchiveScopeResponse> {
    const doc = await this.crud.update({
      where: { id },
      data: this.archiveData,
    });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    const formatted = this.formatDBScope(doc);

    return this.generateArchiveResponse(formatted);
  }

  async create(data: WriteScopeInput): Promise<WriteScopeResponse> {
    const doc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userId,
        createdBy: this.userId,
      },
    });

    const formatted = this.formatDBScope(doc);

    return this.generateWriteResponse(formatted);
  }

  async modify(id: string, data: WriteScopeInput): Promise<WriteScopeResponse> {
    const doc = await this.crud.update({
      where: { id },
      data: { ...data, updatedBy: this.userId },
    });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    const formatted = this.formatDBScope(doc);

    return this.generateWriteResponse(formatted);
  }

  async getById(id: string): Promise<Scope> {
    const doc = await this.crud.findUnique({ where: { id } });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    const formatted = this.formatDBScope(doc);

    return formatted;
  }

  async getMany(archived?: boolean, pagination?: Pagination): Promise<ScopesResponse> {
    const findArgs = {
      where: { archived: !!archived },
      ...this.generatePaginationArgs(pagination),
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany(findArgs),
      this.crud.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map((doc) => this.formatDBScope(doc)),
      pagination: this.generatePaginationResponse(count, pagination),
    };
  }
}
