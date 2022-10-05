import { UserInputError } from 'apollo-server';

import { DataHandler } from '../app';
import { Context } from '../context';
import {
  PaginationOptions,
  SortingOptions,
  WriteCompanyInput,
} from '../generated';

export class CompanyDataHandler extends DataHandler<'company'> {
  constructor(context: Context) {
    super(context, 'company');
  }

  async archive(id: string) {
    const archivedDoc = await this.crud.update({
      where: { id },
      data: this.archiveData,
    });

    const formatted = this.formatCompany(archivedDoc);

    return this.archiveResponse(formatted);
  }

  async create(data: WriteCompanyInput) {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userEmail,
        createdBy: this.userEmail,
      },
    });

    const formatted = this.formatCompany(newDoc);

    return this.writeResponse(formatted);
  }

  async modify(id: string, data: WriteCompanyInput) {
    const updatedDoc = await this.crud.update({
      where: { id },
      data: { ...data, updatedBy: this.userEmail },
    });

    const formatted = this.formatCompany(updatedDoc);

    return this.writeResponse(formatted);
  }

  async getById(id: string) {
    const doc = await this.crud.findUnique({ where: { id } });

    if (!doc) throw new UserInputError(`${id} does not exist.`);

    return this.formatCompany(doc);
  }

  async getMany(
    archived?: boolean,
    pagination?: PaginationOptions,
    sorting?: SortingOptions
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
      data: docList.map((doc) => this.formatCompany(doc)),
      meta: this.responseMeta(count, pagination, sorting),
    };
  }
}
