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
import { RESPONSES } from '../constants';

export class AreaDataHandler extends DataHandler<'area'> {
  constructor(context: Context) {
    super(context, 'area');
  }

  async archive(id: string): Promise<ArchiveAreaResponse> {
    const doc = await this.crud.update({
      where: { id },
      data: this.archiveData,
    });

    return {
      data: this.areaDTO(doc),
      message: RESPONSES.archived(doc.name),
    };
  }

  async create(data: WriteAreaInput): Promise<WriteAreaResponse> {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userId,
        createdBy: this.userId,
      },
    });

    const formatted = this.areaDTO(newDoc);

    return this.generateWriteResponse(formatted);
  }

  async modify(id: string, data: WriteAreaInput): Promise<WriteAreaResponse> {
    const updatedDoc = await this.crud.update({
      where: { id },
      data: { ...data, updatedBy: this.userId },
    });

    const formatted = this.areaDTO(updatedDoc);

    return this.generateWriteResponse(formatted);
  }

  async getById(id: string): Promise<Area> {
    const doc = await this.crud.findUnique({ where: { id } });

    if (!doc) {
      throw new GraphQLError(`${id} does not exist.`, {
        extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
      });
    }

    return this.areaDTO(doc);
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
      data: docList.map((doc) => this.areaDTO(doc)),
      pagination: this.generatePaginationResponse(count, pagination),
    };
  }
}
