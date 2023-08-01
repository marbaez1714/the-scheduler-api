import { ApolloServerErrorCode } from '@apollo/server/errors';
import { DataHandler } from '../app';
import { Context } from '../context';
import {
  ArchiveAreaResponse,
  Area,
  AreasResponse,
  Pagination,
  WriteAreaInput,
  WriteAreaResponse,
} from '../generated';
import { GraphQLError } from 'graphql';

export class AreaDataHandler extends DataHandler<'area'> {
  constructor(context: Context) {
    super(context, 'area');
  }

  async archive(id: string): Promise<ArchiveAreaResponse> {
    const archivedDoc = await this.crud.update({
      where: { id },
      data: this.archiveData,
    });

    const formatted = this.formatDBArea(archivedDoc);

    return this.generateArchiveResponse(formatted);
  }

  async create(data: WriteAreaInput): Promise<WriteAreaResponse> {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userId,
        createdBy: this.userId,
      },
    });

    const formatted = this.formatDBArea(newDoc);

    return this.generateWriteResponse(formatted);
  }

  async modify(id: string, data: WriteAreaInput): Promise<WriteAreaResponse> {
    const updatedDoc = await this.crud.update({
      where: { id },
      data: { ...data, updatedBy: this.userId },
    });

    const formatted = this.formatDBArea(updatedDoc);

    return this.generateWriteResponse(formatted);
  }

  async getById(id: string): Promise<Area> {
    const doc = await this.crud.findUnique({ where: { id } });

    if (!doc) {
      throw new GraphQLError(`${id} does not exist.`, {
        extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
      });
    }

    return this.formatDBArea(doc);
  }

  async getMany(archived?: boolean, pagination?: Pagination): Promise<AreasResponse> {
    const findArgs = {
      where: { archived: !!archived },
      ...this.generatePaginationArgs(pagination),
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany(findArgs),
      this.crud.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map((doc) => this.formatDBArea(doc)),
      pagination: this.generatePaginationResponse(count, pagination),
    };
  }
}
