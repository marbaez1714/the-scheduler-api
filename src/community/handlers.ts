import { UserInputError } from 'apollo-server';

import { DataHandler, GetByIdArgs, GetManyArgs } from '../app';
import { Context } from '../context';
import { CreateCommunityInput } from '../generated';

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

    return this.archiveResponse(formatted);
  }

  async create(data: CreateCommunityInput) {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userEmail,
        createdBy: this.userEmail,
      },
      include: { company: true },
    });

    const formatted = this.formatCommunity(newDoc);

    return this.createResponse(formatted);
  }

  async getById(args: GetByIdArgs) {
    const doc = await this.crud.findUnique({ where: { id: args.id }, include: { company: true } });

    if (!doc) throw new UserInputError(`${args.id} does not exist.`);

    return this.formatCommunity(doc);
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
      data: docList.map(this.formatCommunity),
      meta: this.responseMeta(count, args),
    };
  }
}
