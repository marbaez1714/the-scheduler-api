import { UserInputError } from 'apollo-server';

import { DataHandler } from '../app';
import { Context } from '../context';
import { Pagination, WriteCommunityInput } from '../generated';

export class CommunityDataHandler extends DataHandler<'community'> {
  constructor(context: Context) {
    super(context, 'community');
  }

  async archive(id: string) {
    const archivedDoc = await this.crud.update({
      where: { id },
      data: this.archiveData,
      include: { company: true },
    });

    const formatted = this.formatCommunity(archivedDoc);

    return this.generateArchiveResponse(formatted);
  }

  async create(data: WriteCommunityInput) {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userId,
        createdBy: this.userId,
      },
      include: { company: true },
    });

    const formatted = this.formatCommunity(newDoc);

    return this.generateWriteResponse(formatted);
  }

  async modify(id: string, data: WriteCommunityInput) {
    const updatedDoc = await this.crud.update({
      where: { id },
      data: { ...data, updatedBy: this.userId },
      include: { company: true },
    });

    const formatted = this.formatCommunity(updatedDoc);

    return this.generateWriteResponse(formatted);
  }

  async getById(id: string) {
    const doc = await this.crud.findUnique({
      where: { id },
      include: { company: true },
    });

    if (!doc) throw new UserInputError(`${id} does not exist.`);

    return this.formatCommunity(doc);
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
      data: docList.map((doc) => this.formatCommunity(doc)),
      pagination: this.generatePaginationResponse(count, pagination),
    };
  }
}
