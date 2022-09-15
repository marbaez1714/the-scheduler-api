import { UserInputError } from 'apollo-server';

import { DataHandler, GetByIdArgs, GetManyArgs } from '../app';
import { Context } from '../context';
import { WriteBuilderInput } from '../generated';
import { formatPhoneNumber } from '../utils';

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

  async create({ primaryPhone, ...rest }: WriteBuilderInput) {
    const formattedPrimaryPhone = formatPhoneNumber(primaryPhone);

    const newDoc = await this.crud.create({
      data: {
        ...rest,
        primaryPhone: formattedPrimaryPhone,
        updatedBy: this.userEmail,
        createdBy: this.userEmail,
      },
      include: { company: true },
    });

    const formatted = this.formatBuilder(newDoc);

    return this.writeResponse(formatted);
  }

  async getById(args: GetByIdArgs) {
    const doc = await this.crud.findUnique({ where: { id: args.id }, include: { company: true } });

    if (!doc) throw new UserInputError(`${args.id} does not exist.`);

    return this.formatBuilder(doc);
  }

  async getMany(args: GetManyArgs) {
    const findArgs = {
      include: { company: true },
      where: { archived: !!args.archived },
      ...this.findArgs(args),
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany(findArgs),
      this.crud.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map((doc) => this.formatBuilder(doc)),
      meta: this.responseMeta(count, args),
    };
  }
}
