import { DataHandler } from '../app';
import { Context } from '../context';
import {
  ArchiveCommunityResponse,
  CommunitiesResponse,
  Community,
  Pagination,
  WriteCommunityInput,
  WriteCommunityResponse,
} from '../generated';
import { GRAPHQL_ERRORS, RESPONSES } from '../constants';

export class CommunityDataHandler extends DataHandler<'community'> {
  constructor(context: Context) {
    super(context, 'community');
  }

  async archive(id: string): Promise<ArchiveCommunityResponse> {
    const doc = await this.crud.update({
      where: { id },
      data: this.archiveData,
      include: { company: true },
    });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    return {
      data: this.communityDTO(doc),
      message: RESPONSES.archiveSuccess(doc.name),
    };
  }

  async create(data: WriteCommunityInput): Promise<WriteCommunityResponse> {
    const doc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userId,
        createdBy: this.userId,
      },
      include: { company: true },
    });

    return {
      data: this.communityDTO(doc),
      message: RESPONSES.createSuccess(doc.name),
    };
  }

  async modify(id: string, data: WriteCommunityInput): Promise<WriteCommunityResponse> {
    const doc = await this.crud.update({
      where: { id },
      data: { ...data, updatedBy: this.userId },
      include: { company: true },
    });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    return {
      data: this.communityDTO(doc),
      message: RESPONSES.modifySuccess(doc.name),
    };
  }

  async getById(id: string): Promise<Community> {
    const doc = await this.crud.findUnique({
      where: { id },
      include: { company: true },
    });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    return this.communityDTO(doc);
  }

  async getMany(archived?: boolean, pagination?: Pagination): Promise<CommunitiesResponse> {
    const findArgs = {
      include: { company: true },
      where: { archived: !!archived },
      ...this.generatePaginationArgs(pagination),
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany(findArgs),
      this.crud.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map((doc) => this.communityDTO(doc)),
      pagination: this.generatePaginationResponse(count, pagination),
    };
  }
}
