import { UserInputError } from 'apollo-server';

import { DataHandler } from '../app';
import { Context } from '../context';
import { Pagination, WriteAreaInput } from '../generated';

export class AreaDataHandler extends DataHandler<'area'> {
  constructor(context: Context) {
    super(context, 'area');
  }

  async archive(id: string) {
    const archivedDoc = await this.crud.update({
      where: { id },
      data: this.archiveData,
    });

    const formatted = this.formatArea(archivedDoc);

    return this.archiveResponse(formatted);
  }

  async create(data: WriteAreaInput) {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userId,
        createdBy: this.userId,
      },
    });

    const formatted = this.formatArea(newDoc);

    return this.writeResponse(formatted);
  }

  async modify(id: string, data: WriteAreaInput) {
    const updatedDoc = await this.crud.update({
      where: { id },
      data: { ...data, updatedBy: this.userId },
    });

    const formatted = this.formatArea(updatedDoc);

    return this.writeResponse(formatted);
  }

  async getById(id: string) {
    const doc = await this.crud.findUnique({ where: { id } });

    if (!doc) throw new UserInputError(`${id} does not exist.`);

    return this.formatArea(doc);
  }

  async getMany(archived?: boolean, pagination?: Pagination) {
    const findArgs = {
      where: { archived: !!archived },
      ...this.findArgs(pagination),
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany(findArgs),
      this.crud.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map((doc) => this.formatArea(doc)),
      meta: this.responseMeta(count, pagination),
    };
  }
}
