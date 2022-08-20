import { PrismaClient } from '@prisma/client';
import { UserInputError } from 'apollo-server';

import {
  Area,
  AreasResponse,
  QueryAreasArgs,
  QueryAreaByIdArgs,
  CreateAreaInput,
  Builder,
  BuildersResponse,
  QueryBuildersArgs,
  QueryBuilderByIdArgs,
  CreateBuilderInput,
  Community,
  CommunitiesResponse,
  QueryCommunityByIdArgs,
  QueryCommunitiesArgs,
  CreateCommunityInput,
  Company,
  CompaniesResponse,
  QueryCompaniesArgs,
  QueryCompanyByIdArgs,
  CreateCompanyInput,
  MessageResponse,
  MetaResponse,
  PaginationOptions,
  SortingOptions,
  SortOrder,
} from '../generated/graphql';

import { checkPermission, messageDTO } from './utils';
import { Context } from '../context';
import { PermissionsEnum, PrismaData, FindArguments } from './types';

// Base
export class DataServiceBase<TClient extends keyof PrismaClient> {
  context: Context;
  crud: Context['prisma'][TClient];
  userEmail: string;

  constructor(context: Context, client: TClient) {
    // Check to see if user has admin rights
    checkPermission(PermissionsEnum.Admin, context);
    this.context = context;
    this.crud = this.context.prisma[client];
    this.userEmail = this.context.user.email;
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

// Area
export class AreaService extends DataServiceBase<'area'> {
  constructor(context: Context) {
    super(context, 'area');
  }

  async archive(id: string): Promise<MessageResponse> {
    const updatedDoc = await this.crud.update({ where: { id: id }, data: { archived: true } });
    return messageDTO('archive', updatedDoc);
  }

  async create(data: CreateAreaInput): Promise<MessageResponse> {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userEmail,
        createdBy: this.userEmail,
      },
    });

    return messageDTO('create', newDoc);
  }

  formatPrisma(data: PrismaData['Area']): Area {
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

// Builder
export class BuilderService extends DataServiceBase<'builder'> {
  constructor(context: Context) {
    super(context, 'builder');
  }

  async archive(id: string): Promise<MessageResponse> {
    const updatedDoc = await this.crud.update({ where: { id: id }, data: { archived: true } });
    return messageDTO('archive', updatedDoc);
  }

  formatPrisma(data: PrismaData['Builder']): Builder {
    const { createdTime, updatedTime, company, ...rest } = data;

    const companyObject = new CompanyService(this.context).formatPrisma(company);

    return {
      ...rest,
      company: companyObject,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  async create(data: CreateBuilderInput): Promise<MessageResponse> {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userEmail,
        createdBy: this.userEmail,
      },
    });

    return messageDTO('create', newDoc);
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

// Community
export class CommunityService extends DataServiceBase<'community'> {
  constructor(context: Context) {
    super(context, 'community');
  }

  async archive(id: string): Promise<MessageResponse> {
    const updatedDoc = await this.crud.update({ where: { id: id }, data: { archived: true } });
    return messageDTO('archive', updatedDoc);
  }

  async create(data: CreateCommunityInput): Promise<MessageResponse> {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userEmail,
        createdBy: this.userEmail,
      },
    });

    return messageDTO('create', newDoc);
  }

  formatPrisma(data: PrismaData['Community']): Community {
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

// Company
export class CompanyService extends DataServiceBase<'company'> {
  constructor(context: Context) {
    super(context, 'company');
  }

  async archive(id: string): Promise<MessageResponse> {
    const updatedDoc = await this.crud.update({ where: { id: id }, data: { archived: true } });
    return messageDTO('archive', updatedDoc);
  }

  async create(data: CreateCompanyInput): Promise<MessageResponse> {
    const newDoc = await this.crud.create({
      data: {
        ...data,
        updatedBy: this.userEmail,
        createdBy: this.userEmail,
      },
    });

    return messageDTO('create', newDoc);
  }

  formatPrisma(data: PrismaData['Company']): Company {
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
