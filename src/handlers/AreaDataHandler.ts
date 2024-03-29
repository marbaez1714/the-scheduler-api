import { DataHandler } from './DataHandler';
import { Context } from '../context';
import {
  ArchiveAreaResponse,
  Area,
  AreasResponse,
  Pagination,
  WriteAreaInput,
  WriteAreaResponse,
} from '../generated';
import { GRAPHQL_ERRORS, RESPONSES } from '../constants';

export class AreaDataHandler extends DataHandler<'area'> {
  constructor(context: Context) {
    super(context, 'area');
  }

  async archive(id: string): Promise<ArchiveAreaResponse> {
    const doc = await this.crud.update({
      where: { id },
      data: { archived: true, updatedBy: this.userId },
    });

    return this.archiveAreaResponseDTO(doc);
  }

  async create(data: WriteAreaInput): Promise<WriteAreaResponse> {
    const doc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userId,
        createdBy: this.userId,
      },
    });

    const message = RESPONSES.createSuccess(doc.name);

    return this.writeAreaResponseDTO(doc, message);
  }

  async modify(id: string, data: WriteAreaInput): Promise<WriteAreaResponse> {
    const doc = await this.crud.update({
      where: { id },
      data: { ...data, updatedBy: this.userId },
    });

    return {
      data: this.areaDTO(doc),
      message: RESPONSES.modifySuccess(doc.name),
    };
  }

  async getById(id: string): Promise<Area> {
    const doc = await this.crud.findUnique({ where: { id } });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    return this.areaDTO(doc);
  }

  async getMany(archived = false, pagination?: Pagination): Promise<AreasResponse> {
    const findArgs = {
      where: { archived: !!archived },
      ...this.generatePaginationArgs(pagination),
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany(findArgs),
      this.crud.count({ where: findArgs.where }),
    ]);

    return this.areasResponseDTO(docList, count, pagination);
  }
}
