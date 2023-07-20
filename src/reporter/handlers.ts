import { UserInputError } from 'apollo-server';

import { DataHandler } from '../app';
import { Context } from '../context';
import { Pagination, WriteReporterInput } from '../generated';

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

    return this.generateArchiveResponse(formatted);
  }

  async create(data: WriteReporterInput) {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userId,
        createdBy: this.userId,
      },
    });

    const formatted = this.formatReporter(newDoc);

    return this.generateWriteResponse(formatted);
  }

  async modify(id: string, data: WriteReporterInput) {
    const updatedDoc = await this.crud.update({
      where: { id },
      data: { ...data, updatedBy: this.userId },
    });

    const formatted = this.formatReporter(updatedDoc);

    return this.generateWriteResponse(formatted);
  }

  async getById(id: string) {
    const doc = await this.crud.findUnique({ where: { id } });

    if (!doc) throw new UserInputError(`${id} does not exist.`);

    return this.formatReporter(doc);
  }

  async getMany(archived?: boolean, pagination?: Pagination) {
    const findArgs = {
      where: { archived: !!archived },
      ...this.generatePaginationArgs(pagination),
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany(findArgs),
      this.crud.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map((doc) => this.formatReporter(doc)),
      pagination: this.generatePaginationResponse(count, pagination),
    };
  }
}
