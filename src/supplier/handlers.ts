import { UserInputError } from 'apollo-server';

import { DataHandler, GetByIdArgs, GetManyArgs } from '../app';
import { Context } from '../context';
import { WriteSupplierInput } from '../generated';
import { formatPhoneNumber } from './../utils';

export class SupplierDataHandler extends DataHandler<'supplier'> {
  constructor(context: Context) {
    super(context, 'supplier');
  }

  async archive(id: string) {
    const archivedDoc = await this.crud.update({
      where: { id },
      data: this.archiveData,
    });

    const formatted = this.formatSupplier(archivedDoc);

    return this.archiveResponse(formatted);
  }

  async create({ primaryPhone, ...rest }: WriteSupplierInput) {
    const primaryPhoneFormatted = formatPhoneNumber(primaryPhone);

    const newDoc = await this.crud.create({
      data: {
        ...rest,
        primaryPhone: primaryPhoneFormatted,
        updatedBy: this.userEmail,
        createdBy: this.userEmail,
      },
    });

    const formatted = this.formatSupplier(newDoc);

    return this.writeResponse(formatted);
  }

  async getById(args: GetByIdArgs) {
    const doc = await this.crud.findUnique({ where: { id: args.id } });

    if (!doc) throw new UserInputError(`${args.id} does not exist.`);

    return this.formatSupplier(doc);
  }

  async getMany(args: GetManyArgs) {
    const findArgs = {
      where: { archived: !!args.archived },
      ...this.findArgs(args),
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany(findArgs),
      this.crud.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map((doc) => this.formatSupplier(doc)),
      meta: this.responseMeta(count, args),
    };
  }
}
