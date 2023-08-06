import { DataHandler } from '../handlers';
import { Context } from '../context';
import {
  ArchiveSupplierResponse,
  Pagination,
  Supplier,
  SuppliersResponse,
  WriteSupplierInput,
  WriteSupplierResponse,
} from '../generated';
import { GRAPHQL_ERRORS, RESPONSES } from '../constants';

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

    return {
      data: this.supplierDTO(doc),
      message: RESPONSES.archiveSuccess(doc.name),
    };
  }

  async create(data: WriteSupplierInput): Promise<WriteSupplierResponse> {
    const doc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userId,
        createdBy: this.userId,
      },
    });

    return {
      data: this.supplierDTO(doc),
      message: RESPONSES.createSuccess(doc.name),
    };
  }

  async modify(id: string, data: WriteSupplierInput): Promise<WriteSupplierResponse> {
    const doc = await this.crud.update({
      where: { id },
      data: { ...data, updatedBy: this.userId },
    });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    return {
      data: this.supplierDTO(doc),
      message: RESPONSES.modifySuccess(doc.name),
    };
  }

  async getById(id: string): Promise<Supplier> {
    const doc = await this.crud.findUnique({ where: { id } });

    if (!doc) {
      throw GRAPHQL_ERRORS.idNotFound(id);
    }

    return this.supplierDTO(doc);
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
      data: docList.map((doc) => this.supplierDTO(doc)),
      pagination: this.generatePaginationResponse(count, pagination),
    };
  }
}
