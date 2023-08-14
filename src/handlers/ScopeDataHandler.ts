import { DataHandler } from '.';
import { Context } from '../context';
import {
  ArchiveScopeResponse,
  Pagination,
  Scope,
  ScopesResponse,
  WriteScopeInput,
  WriteScopeResponse,
} from '../generated';
import { GRAPHQL_ERRORS, RESPONSES } from '../constants';

export class ScopeDataHandler extends DataHandler<'scope'> {
  constructor(context: Context) {
    super(context, 'scope');
  }

  async archive(id: string): Promise<ArchiveScopeResponse> {
    const doc = await this.crud.update({
      where: { id },
      data: { archived: true, updatedBy: this.userId },
    });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    return this.archiveScopeResponseDTO(doc);
  }

  async create(data: WriteScopeInput): Promise<WriteScopeResponse> {
    const doc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userId,
        createdBy: this.userId,
      },
    });

    return this.writeScopeResponseDTO(doc, RESPONSES.createSuccess(doc.name));
  }

  async modify(id: string, data: WriteScopeInput): Promise<WriteScopeResponse> {
    const doc = await this.crud.update({
      where: { id },
      data: { ...data, updatedBy: this.userId },
    });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    return this.writeScopeResponseDTO(doc, RESPONSES.modifySuccess(doc.name));
  }

  async getById(id: string): Promise<Scope> {
    const doc = await this.crud.findUnique({ where: { id } });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    return this.scopeDTO(doc);
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

    return this.scopesResponseDTO(docList, count, pagination);
  }
}
