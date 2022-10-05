import { UserInputError } from 'apollo-server';

import { DataHandler } from '../app';
import { Context } from '../context';
import {
  Pagination,
  Sorting,
  WriteReporterInput,
} from '../generated';

export class ReporterDataHandler extends DataHandler<'reporter'> {
  constructor(context: Context) {
    super(context, 'reporter');
  }

  async archive(id: string) {
    const archivedDoc = await this.crud.update({
      where: { id },
      data: this.archiveData,
    });

    const formatted = this.formatReporter(archivedDoc);

    return this.archiveResponse(formatted);
  }

  async create(data: WriteReporterInput) {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userEmail,
        createdBy: this.userEmail,
      },
    });

    const formatted = this.formatReporter(newDoc);

    return this.writeResponse(formatted);
  }

  async modify(id: string, data: WriteReporterInput) {
    const updatedDoc = await this.crud.update({
      where: { id },
      data: { ...data, updatedBy: this.userEmail },
    });

    const formatted = this.formatReporter(updatedDoc);

    return this.writeResponse(formatted);
  }

  async getById(id: string) {
    const doc = await this.crud.findUnique({ where: { id } });

    if (!doc) throw new UserInputError(`${id} does not exist.`);

    return this.formatReporter(doc);
  }

  async getMany(
    archived?: boolean,
    pagination?: Pagination,
    sorting?: Sorting
  ) {
    const findArgs = {
      where: { archived: !!archived },
      ...this.findArgs(pagination, sorting),
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany(findArgs),
      this.crud.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map((doc) => this.formatReporter(doc)),
      meta: this.responseMeta(count, pagination, sorting),
    };
  }
}
