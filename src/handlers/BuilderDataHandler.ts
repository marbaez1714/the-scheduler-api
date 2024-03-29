import { DataHandler } from '.';
import { Context } from '../context';
import {
  ArchiveBuilderResponse,
  Builder,
  BuildersResponse,
  Pagination,
  WriteBuilderInput,
  WriteBuilderResponse,
} from '../generated';
import { GRAPHQL_ERRORS, RESPONSES } from '../constants';

export class BuilderDataHandler extends DataHandler<'builder'> {
  constructor(context: Context) {
    super(context, 'builder');
  }

  async archive(id: string): Promise<ArchiveBuilderResponse> {
    const doc = await this.crud.update({
      where: { id },
      data: { archived: true, updatedBy: this.userId },
      include: { company: true },
    });

    return this.archiveBuilderResponseDTO(doc);
  }

  async create(data: WriteBuilderInput): Promise<WriteBuilderResponse> {
    const doc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userId,
        createdBy: this.userId,
      },
      include: { company: true },
    });

    return this.writeBuilderResponseDTO(doc, RESPONSES.createSuccess(doc.name));
  }

  async modify(id: string, data: WriteBuilderInput): Promise<WriteBuilderResponse> {
    const doc = await this.crud.update({
      where: { id },
      data: { ...data, updatedBy: this.userId },
      include: { company: true },
    });

    return this.writeBuilderResponseDTO(doc, RESPONSES.modifySuccess(doc.name));
  }

  async getById(id: string): Promise<Builder> {
    const doc = await this.crud.findUnique({
      where: { id },
      include: { company: true },
    });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    return this.builderDTO(doc);
  }

  async getMany(archived?: boolean, pagination?: Pagination): Promise<BuildersResponse> {
    const findArgs = {
      include: { company: true },
      where: { archived: !!archived },
      ...this.generatePaginationArgs(pagination),
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany(findArgs),
      this.crud.count({ where: findArgs.where }),
    ]);

    return this.buildersResponseDTO(docList, count, pagination);
  }
}
