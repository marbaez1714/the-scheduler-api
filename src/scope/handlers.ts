import { UserInputError } from 'apollo-server';

import { DataHandler, GetByIdArgs, GetManyArgs } from '../app';
import { Context } from '../context';
import { CreateScopeInput } from '../generated';

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

  async create(data: CreateScopeInput) {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userEmail,
        createdBy: this.userEmail,
      },
    });

    const formatted = this.formatScope(newDoc);

    return this.createResponse(formatted);
  }

  async getById(args: GetByIdArgs) {
    const doc = await this.crud.findUnique({ where: { id: args.id } });

    if (!doc) throw new UserInputError(`${args.id} does not exist.`);

    return this.formatScope(doc);
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
      data: docList.map((doc) => this.formatScope(doc)),
      meta: this.responseMeta(count, args),
    };
  }
}
