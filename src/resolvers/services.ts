import { UserInputError } from 'apollo-server';

import {
  // Area
  Area,
  AreasResponse,
  QueryAreasArgs,
  QueryAreaByIdArgs,
  // Builder
  Builder,
  BuildersResponse,
  QueryBuildersArgs,
  QueryBuilderByIdArgs,
  // Community
  Community,
  CommunitiesResponse,
  QueryCommunityByIdArgs,
  QueryCommunitiesArgs,
  // Company
  Company,
  CompaniesResponse,
  QueryCompaniesArgs,
  QueryCompanyByIdArgs,
  // Contractor
  Contractor,
  QueryContractorByIdArgs,
  // Job Legacy
  JobLegacy,
  // Line Item Legacy
  LineItemLegacy,
  // Reporter
  Reporter,
  // Scope
  Scope,
  // Supplier
  Supplier,
  // Util
  MetaResponse,
  PaginationOptions,
  SortingOptions,
  SortOrder,
} from '../generated/graphql';

import { checkPermission, messageDTO } from './utils';
import { Context } from '../context';
import {
  PermissionsEnum,
  PrismaData,
  FindArguments,
  ArchiveResponse,
  CreateInputs,
  BaseDocument,
  CreateResponse,
} from './types';

/******************************/
/* Base                       */
/******************************/
export class DataServiceBase<TClient extends keyof PrismaData> {
  context: Context;
  client: TClient;
  crud: Context['prisma'][TClient];
  userEmail: string;
  archiveData: { archived: true; updatedBy: string };

  constructor(context: Context, client: TClient) {
    // Check to see if user has admin rights
    checkPermission(PermissionsEnum.Admin, context);
    // Set context
    this.context = context;
    // Set the client
    this.client = client;
    // Create the prisma client
    this.crud = context.prisma[client];
    // Set the user's email
    this.userEmail = context.user.email;
    // Set generic archive data
    this.archiveData = { archived: true, updatedBy: context.user.email };
  }

  // Creates a formatted response
  archiveResponse<TData extends BaseDocument>(data: TData): { data: TData; message: string } {
    return { data, message: `${data.name} archived.` };
  }

  createResponse<TData extends BaseDocument>(data: TData): { data: TData; message: string } {
    return { data, message: `${data.name} created.` };
  }
}

class Meta {
  private page?: number;
  private pageSize?: number;
  private field?: string;
  private order?: SortOrder;
  findArgs: FindArguments;

  constructor(args?: { pagination?: PaginationOptions; sorting?: SortingOptions }) {
    if (args?.pagination) {
      this.page = args.pagination.page;
      this.pageSize = args.pagination.pageSize;
      this.findArgs = {
        ...this.findArgs,
        ...{ take: this.pageSize, skip: Math.min(this.page - 1, 0) * this.pageSize },
      };
    }

    if (args?.sorting) {
      this.field = args.sorting.field;
      this.order = args.sorting.order;
      this.findArgs = { ...this.findArgs, orderBy: { [this.field]: this.order } };
    }
  }

  response(totalCount: number): MetaResponse {
    return {
      totalCount,
      page: this.page,
      pageSize: this.pageSize,
      sortField: this.field,
      sortOrder: this.order,
    };
  }
}

/******************************/
/* Area                       */
/******************************/
export class AreaService extends DataServiceBase<'area'> {
  constructor(context: Context) {
    super(context, 'area');
  }

  async archive(id: string): ArchiveResponse['area'] {
    const archivedDoc = await this.crud.update({
      where: { id },
      data: this.archiveData,
    });

    const formatted = this.formatPrisma(archivedDoc);

    return this.archiveResponse(formatted);
  }

  async create(data: CreateInputs['area']): CreateResponse['area'] {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userEmail,
        createdBy: this.userEmail,
      },
    });

    const formatted = this.formatPrisma(newDoc);

    return this.createResponse(formatted);
  }

  formatPrisma(data: PrismaData['area']): Area {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  async getById(args: QueryAreaByIdArgs): Promise<Area> {
    const doc = await this.crud.findUnique({ where: { id: args.id } });

    if (!doc) throw new UserInputError(`${args.id} does not exist.`);

    return this.formatPrisma(doc);
  }

  async getMany(args: QueryAreasArgs): Promise<AreasResponse> {
    const meta = new Meta(args);

    const findArgs = {
      where: { archived: !!args.archived },
      ...meta.findArgs,
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany(findArgs),
      this.crud.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map(this.formatPrisma),
      meta: meta.response(count),
    };
  }
}

/******************************/
/* Builder                    */
/******************************/
export class BuilderService extends DataServiceBase<'builder'> {
  constructor(context: Context) {
    super(context, 'builder');
  }

  async archive(id: string): ArchiveResponse['builder'] {
    const archivedDoc = await this.crud.update({
      where: { id },
      data: this.archiveData,
      include: { company: true },
    });

    const formatted = this.formatPrisma(archivedDoc);

    return this.archiveResponse(formatted);
  }

  formatPrisma(data: PrismaData['builder']): Builder {
    const { createdTime, updatedTime, company, ...rest } = data;

    const companyObject = new CompanyService(this.context).formatPrisma(company);

    return {
      ...rest,
      company: companyObject,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  async create(data: CreateInputs['builder']): CreateResponse['builder'] {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userEmail,
        createdBy: this.userEmail,
      },
      include: { company: true },
    });

    const formatted = this.formatPrisma(newDoc);

    return this.createResponse(formatted);
  }

  async getById(args: QueryBuilderByIdArgs) {
    const doc = await this.crud.findUnique({ where: { id: args.id }, include: { company: true } });

    if (!doc) throw new UserInputError(`${args.id} does not exist.`);

    return this.formatPrisma(doc);
  }

  async getMany(args: QueryBuildersArgs): Promise<BuildersResponse> {
    const meta = new Meta(args);

    const findArgs = {
      include: { company: true },
      where: { archived: !!args.archived },
      ...meta.findArgs,
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany(findArgs),
      this.crud.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map(this.formatPrisma),
      meta: meta.response(count),
    };
  }
}

/******************************/
/* Community                  */
/******************************/
export class CommunityService extends DataServiceBase<'community'> {
  constructor(context: Context) {
    super(context, 'community');
  }

  async archive(id: string): ArchiveResponse['community'] {
    const archivedDoc = await this.crud.update({
      where: { id },
      data: this.archiveData,
      include: { company: true },
    });

    const formatted = this.formatPrisma(archivedDoc);

    return this.archiveResponse(formatted);
  }

  async create(data: CreateInputs['community']): CreateResponse['community'] {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userEmail,
        createdBy: this.userEmail,
      },
      include: { company: true },
    });

    const formatted = this.formatPrisma(newDoc);

    return this.createResponse(formatted);
  }

  formatPrisma(data: PrismaData['community']): Community {
    const { createdTime, updatedTime, company, ...rest } = data;

    const companyObject = new CompanyService(this.context).formatPrisma(company);
    return {
      ...rest,
      company: companyObject,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  async getById(args: QueryCommunityByIdArgs): Promise<Community> {
    const doc = await this.crud.findUnique({ where: { id: args.id }, include: { company: true } });

    if (!doc) throw new UserInputError(`${args.id} does not exist.`);

    return this.formatPrisma(doc);
  }

  async getMany(args: QueryCommunitiesArgs): Promise<CommunitiesResponse> {
    const meta = new Meta(args);

    const findArgs = {
      include: { company: true },
      where: { archived: !!args.archived },
      ...meta.findArgs,
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany(findArgs),
      this.crud.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map(this.formatPrisma),
      meta: meta.response(count),
    };
  }
}

/******************************/
/* Company                    */
/******************************/
export class CompanyService extends DataServiceBase<'company'> {
  constructor(context: Context) {
    super(context, 'company');
  }

  async archive(id: string): ArchiveResponse['company'] {
    const archivedDoc = await this.crud.update({
      where: { id },
      data: this.archiveData,
    });

    const formatted = this.formatPrisma(archivedDoc);

    return this.archiveResponse(formatted);
  }

  async create(data: CreateInputs['company']): CreateResponse['company'] {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userEmail,
        createdBy: this.userEmail,
      },
    });

    const formatted = this.formatPrisma(newDoc);

    return this.createResponse(formatted);
  }

  formatPrisma(data: PrismaData['company']): Company {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  async getById(args: QueryCompanyByIdArgs): Promise<Company> {
    const doc = await this.crud.findUnique({ where: { id: args.id } });

    if (!doc) throw new UserInputError(`${args.id} does not exist.`);

    return this.formatPrisma(doc);
  }

  async getMany(args: QueryCompaniesArgs): Promise<CompaniesResponse> {
    const meta = new Meta(args);

    const findArgs = {
      where: { archived: !!args.archived },
      ...meta.findArgs,
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.crud.findMany(findArgs),
      this.crud.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map(this.formatPrisma),
      meta: meta.response(count),
    };
  }
}

/******************************/
/* Contractor                 */
/******************************/
export class ContractorService extends DataServiceBase<'contractor'> {
  constructor(context: Context) {
    super(context, 'contractor');
  }

  async archive(id: string): ArchiveResponse['contractor'] {
    const archivedDoc = await this.crud.update({
      where: { id },
      data: this.archiveData,
      include: { jobsLegacy: { include: { lineItems: true } } },
    });

    const formatted = this.formatPrisma(archivedDoc);

    return this.archiveResponse(formatted);
  }

  async create(data: CreateInputs['contractor']): CreateResponse['contractor'] {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userEmail,
        createdBy: this.userEmail,
      },
      include: { jobsLegacy: { include: { lineItems: true } } },
    });

    const formatted = this.formatPrisma(newDoc);

    return this.createResponse(formatted);
  }

  formatPrisma(data: PrismaData['contractor']): Contractor {
    const { jobsLegacy, createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      jobsLegacy: jobsLegacy.map(new JobLegacyService(this.context).formatPrisma),
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  async getById(args: QueryContractorByIdArgs): Promise<Contractor> {
    const doc = await this.crud.findUnique({
      where: { id: args.id },
      include: { jobsLegacy: { include: { lineItems: true } } },
    });

    if (!doc) throw new UserInputError(`${args.id} does not exist.`);

    return this.formatPrisma(doc);
  }
}

/******************************/
/* Job Legacy                 */
/******************************/
export class JobLegacyService extends DataServiceBase<'jobLegacy'> {
  constructor(context: Context) {
    super(context, 'jobLegacy');
  }

  async archive(id: string): ArchiveResponse['jobLegacy'] {
    const archivedDoc = await this.crud.update({
      where: { id },
      data: this.archiveData,
      include: { lineItems: true },
    });
    const formatted = this.formatPrisma(archivedDoc);
    return this.archiveResponse(formatted);
  }

  async create(data: CreateInputs['jobLegacy']): CreateResponse['jobLegacy'] {
    const { lineItems, ...rest } = data;

    const createLineItemsData = lineItems.map((item) => ({
      ...item,
      updatedBy: this.userEmail,
      createdBy: this.userEmail,
    }));

    const newJob = await this.crud.create({
      data: {
        ...rest,
        updatedBy: this.userEmail,
        createdBy: this.userEmail,
        lineItems: { create: createLineItemsData },
      },
      include: { lineItems: true },
    });

    const formatted = this.formatPrisma(newJob);

    return this.createResponse(formatted);
  }

  formatPrisma(data: PrismaData['jobLegacy']): JobLegacy {
    const { lineItems, startDate, completedDate, createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      lineItems: lineItems.map(new LineItemLegacyService(this.context).formatPrisma),
      startDate: startDate?.toJSON(),
      completedDate: completedDate?.toJSON(),
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }
}

/******************************/
/* Line Item Legacy`          */
/******************************/
export class LineItemLegacyService extends DataServiceBase<'lineItemLegacy'> {
  constructor(context: Context) {
    super(context, 'lineItemLegacy');
  }

  async delete(id: string) {
    const deletedDoc = await this.crud.delete({ where: { id: id } });
  }

  formatPrisma(data: PrismaData['lineItemLegacy']): LineItemLegacy {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }
}

/******************************/
/* Reporter                   */
/******************************/
export class ReporterService extends DataServiceBase<'reporter'> {
  constructor(context: Context) {
    super(context, 'reporter');
  }

  async archive(id: string): ArchiveResponse['reporter'] {
    const archivedDoc = await this.crud.update({
      where: { id },
      data: this.archiveData,
    });

    const formatted = this.formatPrisma(archivedDoc);

    return this.archiveResponse(formatted);
  }

  async create(data: CreateInputs['reporter']): CreateResponse['reporter'] {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userEmail,
        createdBy: this.userEmail,
      },
    });

    const formatted = this.formatPrisma(newDoc);

    return this.createResponse(formatted);
  }

  formatPrisma(data: PrismaData['reporter']): Reporter {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }
}

/******************************/
/* Scope                      */
/******************************/
export class ScopeService extends DataServiceBase<'scope'> {
  constructor(context: Context) {
    super(context, 'scope');
  }

  async archive(id: string): ArchiveResponse['scope'] {
    const archivedDoc = await this.crud.update({
      where: { id },
      data: this.archiveData,
    });

    const formatted = this.formatPrisma(archivedDoc);

    return this.archiveResponse(formatted);
  }

  async create(data: CreateInputs['scope']): CreateResponse['scope'] {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userEmail,
        createdBy: this.userEmail,
      },
    });

    const formatted = this.formatPrisma(newDoc);

    return this.createResponse(formatted);
  }

  formatPrisma(data: PrismaData['scope']): Scope {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }
}

/******************************/
/* Supplier                   */
/******************************/
export class SupplierService extends DataServiceBase<'supplier'> {
  constructor(context: Context) {
    super(context, 'supplier');
  }

  async archive(id: string): ArchiveResponse['supplier'] {
    const archivedDoc = await this.crud.update({
      where: { id },
      data: this.archiveData,
    });

    const formatted = this.formatPrisma(archivedDoc);

    return this.archiveResponse(formatted);
  }

  async create(data: CreateInputs['supplier']): CreateResponse['supplier'] {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userEmail,
        createdBy: this.userEmail,
      },
    });

    const formatted = this.formatPrisma(newDoc);

    return this.createResponse(formatted);
  }

  formatPrisma(data: PrismaData['supplier']): Supplier {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }
}
