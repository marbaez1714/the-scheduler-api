import { UserInputError } from 'apollo-server';

import { DataHandler } from '../app';
import { Context } from '../context';
import {
  Pagination,
  Sorting,
  WriteBuilderInput,
} from '../generated';

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

    const formatted = this.formatBuilder(archivedDoc);

    return this.archiveResponse(formatted);
  }

  async create(data: WriteBuilderInput) {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userEmail,
        createdBy: this.userEmail,
      },
      include: { company: true },
    });

    const formatted = this.formatBuilder(newDoc);

    return this.writeResponse(formatted);
  }

  async modify(id: string, data: WriteBuilderInput) {
    const updatedDoc = await this.crud.update({
      where: { id },
      data: { ...data, updatedBy: this.userEmail },
      include: { company: true },
    });

    const formatted = this.formatBuilder(updatedDoc);

    return this.writeResponse(formatted);
  }

  async getById(id: string) {
    const doc = await this.crud.findUnique({
      where: { id },
      include: { company: true },
    });

    if (!doc) throw new UserInputError(`${id} does not exist.`);

    return this.formatBuilder(doc);
  }

  async getMany(
    archived?: boolean,
    pagination?: Pagination,
    sorting?: Sorting
  ) {
    const findArgs = {
      include: { company: true },
      where: { archived: !!archived },
      ...this.findArgs(pagination, sorting),
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany(findArgs),
      this.crud.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map((doc) => this.formatBuilder(doc)),
      meta: this.responseMeta(count, pagination, sorting),
    };
  }
}
