import { UserInputError } from 'apollo-server';

import { DataHandler } from '../app';
import { Context } from '../context';
import { Pagination, WriteScopeInput } from '../generated';

export class ScopeDataHandler extends DataHandler<'scope'> {
  constructor(context: Context) {
    super(context, 'scope');
  }

  async archive(id: string) {
    const archivedDoc = await this.crud.update({
      where: { id },
      data: this.archiveData,
    });

    const formatted = this.formatScope(archivedDoc);

    return this.archiveResponse(formatted);
  }

  async create(data: WriteScopeInput) {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userId,
        createdBy: this.userId,
      },
    });

    const formatted = this.formatScope(newDoc);

    return this.writeResponse(formatted);
  }

  async modify(id: string, data: WriteScopeInput) {
    const updatedDoc = await this.crud.update({
      where: { id },
      data: { ...data, updatedBy: this.userId },
    });

    const formatted = this.formatScope(updatedDoc);

    return this.writeResponse(formatted);
  }

  async getById(id: string) {
    const doc = await this.crud.findUnique({ where: { id } });

    if (!doc) throw new UserInputError(`${id} does not exist.`);

    return this.formatScope(doc);
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
      data: docList.map((doc) => this.formatScope(doc)),
      meta: this.responseMeta(count, pagination),
    };
  }
}
