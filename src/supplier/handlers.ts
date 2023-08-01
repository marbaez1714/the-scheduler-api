import { DataHandler } from '../app';
import { Context } from '../context';
import {
  ArchiveSupplierResponse,
  Pagination,
  Supplier,
  SuppliersResponse,
  WriteSupplierInput,
  WriteSupplierResponse,
} from '../generated';
import { GRAPHQL_ERRORS } from '../constants';

export class SupplierDataHandler extends DataHandler<'supplier'> {
  constructor(context: Context) {
    super(context, 'supplier');
  }

  async archive(id: string): Promise<ArchiveSupplierResponse> {
    const doc = await this.crud.update({
      where: { id },
      data: this.archiveData,
    });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    const formatted = this.formatDBSupplier(doc);

    return this.generateArchiveResponse(formatted);
  }

  async create(data: WriteSupplierInput): Promise<WriteSupplierResponse> {
    const doc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userId,
        createdBy: this.userId,
      },
    });

    const formatted = this.formatDBSupplier(doc);

    return this.generateWriteResponse(formatted);
  }

  async modify(id: string, data: WriteSupplierInput): Promise<WriteSupplierResponse> {
    const doc = await this.crud.update({
      where: { id },
      data: { ...data, updatedBy: this.userId },
    });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    const formatted = this.formatDBSupplier(doc);

    return this.generateWriteResponse(formatted);
  }

  async getById(id: string): Promise<Supplier> {
    const doc = await this.crud.findUnique({ where: { id } });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    return this.formatDBSupplier(doc);
  }

  async getMany(archived?: boolean, pagination?: Pagination): Promise<SuppliersResponse> {
    const findArgs = {
      where: { archived: !!archived },
      ...this.generatePaginationArgs(pagination),
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany(findArgs),
      this.crud.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map((doc) => this.formatDBSupplier(doc)),
      pagination: this.generatePaginationResponse(count, pagination),
    };
  }
}
