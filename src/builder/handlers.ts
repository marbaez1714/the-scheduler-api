import { ApolloServerErrorCode } from '@apollo/server/errors';
import { DataHandler } from '../app';
import { Context } from '../context';
import { Pagination, WriteBuilderInput } from '../generated';
import { GraphQLError } from 'graphql';

export class BuilderDataHandler extends DataHandler<'builder'> {
  constructor(context: Context) {
    super(context, 'builder');
  }

  async archive(id: string) {
    const archivedDoc = await this.crud.update({
      where: { id },
      data: this.archiveData,
      include: { company: true },
    });

    const formatted = this.formatBuilderWithCompany(archivedDoc);

    return this.generateArchiveResponse(formatted);
  }

  async create(data: WriteBuilderInput) {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userId,
        createdBy: this.userId,
      },
      include: { company: true },
    });

    const formatted = this.formatBuilderWithCompany(newDoc);

    return this.generateWriteResponse(formatted);
  }

  async modify(id: string, data: WriteBuilderInput) {
    const updatedDoc = await this.crud.update({
      where: { id },
      data: { ...data, updatedBy: this.userId },
      include: { company: true },
    });

    const formatted = this.formatBuilderWithCompany(updatedDoc);

    return this.generateWriteResponse(formatted);
  }

  async getById(id: string) {
    const doc = await this.crud.findUnique({
      where: { id },
      include: { company: true },
    });

    if (!doc) {
      throw new GraphQLError(`${id} does not exist.`, {
        extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
      });
    }

    return this.formatBuilderWithCompany(doc);
  }

  async getMany(archived?: boolean, pagination?: Pagination) {
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
      data: docList.map((doc) => this.formatBuilderWithCompany(doc)),
      pagination: this.generatePaginationResponse(count, pagination),
    };
  }
}
