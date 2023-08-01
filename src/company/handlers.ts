import { DataHandler } from '../app';
import { Context } from '../context';
import {
  ArchiveCompanyResponse,
  CompaniesResponse,
  Company,
  Pagination,
  WriteCompanyInput,
  WriteCompanyResponse,
} from '../generated';
import { GRAPHQL_ERRORS } from '../constants';

export class CompanyDataHandler extends DataHandler<'company'> {
  constructor(context: Context) {
    super(context, 'company');
  }

  async archive(id: string): Promise<ArchiveCompanyResponse> {
    const doc = await this.crud.update({
      where: { id },
      data: this.archiveData,
    });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    const formatted = this.formatDBCompany(doc);

    return this.generateArchiveResponse(formatted);
  }

  async create(data: WriteCompanyInput): Promise<WriteCompanyResponse> {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userId,
        createdBy: this.userId,
      },
    });

    const formatted = this.formatDBCompany(newDoc);

    return this.generateWriteResponse(formatted);
  }

  async modify(id: string, data: WriteCompanyInput): Promise<WriteCompanyResponse> {
    const doc = await this.crud.update({
      where: { id },
      data: { ...data, updatedBy: this.userId },
    });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    const formatted = this.formatDBCompany(doc);

    return this.generateWriteResponse(formatted);
  }

  async getById(id: string): Promise<Company> {
    const doc = await this.crud.findUnique({ where: { id } });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    return this.formatDBCompany(doc);
  }

  async getMany(archived?: boolean, pagination?: Pagination): Promise<CompaniesResponse> {
    const findArgs = {
      where: { archived: !!archived },
      ...this.generatePaginationArgs(pagination),
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany(findArgs),
      this.crud.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map((doc) => this.formatDBCompany(doc)),
      pagination: this.generatePaginationResponse(count, pagination),
    };
  }
}
