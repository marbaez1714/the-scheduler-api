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
} from './../generated/graphql';

import { checkPermission, getPaginationArgs, getSortingArgs, messageDTO, paginationDTO, sortingDTO } from './utils';
import { Context } from './../context';
import { PermissionsEnum, PrismaData } from './types';

export class DataModel {
  context: Context;

  constructor(context: Context) {
    // Check to see if user has admin rights
    checkPermission(PermissionsEnum.Admin, context);
    this.context = context;
  }
}

// Area
export class AreaModel extends DataModel {
  constructor(context: Context) {
    super(context);
  }

  formatPrisma(data: PrismaData['Area']): Area {
    const { createdTime, updatedTime, ...rest } = data;

    return {
      ...rest,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  async create(data: CreateAreaInput): Promise<MessageResponse> {
    const newDoc = await this.context.prisma.area.create({
      data: {
        ...data,
        updatedBy: this.context.user.email,
        createdBy: this.context.user.email,
      },
    });

    return messageDTO('create', newDoc);
  }

  async getById(args: QueryAreaByIdArgs): Promise<Area> {
    const doc = await this.context.prisma.area.findUnique({ where: { id: args.id } });

    if (!doc) throw new UserInputError(`${args.id} does not exist.`);

    return this.formatPrisma(doc);
  }

  async getMany(args: QueryAreasArgs): Promise<AreasResponse> {
    const { archived, pagination, sorting } = args;

    const findArgs = {
      where: { archived: !!archived },
      ...getPaginationArgs(pagination),
      ...getSortingArgs(sorting),
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.context.prisma.area.findMany(findArgs),
      this.context.prisma.area.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map(this.formatPrisma),
      ...paginationDTO(count, pagination),
      ...sortingDTO(sorting),
    };
  }
}

// Builder
export class BuilderModel extends DataModel {
  constructor(context: Context) {
    super(context);
  }

  formatPrisma(data: PrismaData['Builder']): Builder {
    const { createdTime, updatedTime, company, ...rest } = data;

    const companyObject = new CompanyModel(this.context).formatPrisma(company);

    return {
      ...rest,
      company: companyObject,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  async create(data: CreateBuilderInput) {
    const newDoc = await this.context.prisma.builder.create({
      data: {
        ...data,
        updatedBy: this.context.user.email,
        createdBy: this.context.user.email,
      },
    });

    return messageDTO('create', newDoc);
  }

  async getById(args: QueryBuilderByIdArgs) {
    const doc = await this.context.prisma.builder.findUnique({ where: { id: args.id }, include: { company: true } });

    if (!doc) throw new UserInputError(`${args.id} does not exist.`);

    return this.formatPrisma(doc);
  }

  async getMany(args: QueryBuildersArgs): Promise<BuildersResponse> {
    const { archived, pagination, sorting } = args;

    const findArgs = {
      include: { company: true },
      where: { archived: !!archived },
      ...getPaginationArgs(pagination),
      ...getSortingArgs(sorting),
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.context.prisma.builder.findMany(findArgs),
      this.context.prisma.builder.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map(this.formatPrisma),
      ...paginationDTO(count, pagination),
      ...sortingDTO(sorting),
    };
  }
}

// Community
export class CommunityModel extends DataModel {
  constructor(context: Context) {
    super(context);
  }

  formatPrisma(data: PrismaData['Community']): Community {
    const { createdTime, updatedTime, company, ...rest } = data;

    const companyObject = new CompanyModel(this.context).formatPrisma(company);
    return {
      ...rest,
      company: companyObject,
      createdTime: createdTime.toJSON(),
      updatedTime: updatedTime.toJSON(),
    };
  }

  async getById(args: QueryCommunityByIdArgs): Promise<Community> {
    const doc = await this.context.prisma.community.findUnique({ where: { id: args.id }, include: { company: true } });

    if (!doc) throw new UserInputError(`${args.id} does not exist.`);

    return this.formatPrisma(doc);
  }

  async getMany(args: QueryCommunitiesArgs): Promise<CommunitiesResponse> {
    const { archived, pagination, sorting } = args;

    const findArgs = {
      include: { company: true },
      where: { archived: !!archived },
      ...getPaginationArgs(pagination),
      ...getSortingArgs(sorting),
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.context.prisma.community.findMany(findArgs),
      this.context.prisma.community.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map(this.formatPrisma),
      ...paginationDTO(count, pagination),
      ...sortingDTO(sorting),
    };
  }
}

// Company
export class CompanyModel extends DataModel {
  constructor(context: Context) {
    super(context);
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
    const doc = await this.context.prisma.company.findUnique({ where: { id: args.id } });

    if (!doc) throw new UserInputError(`${args.id} does not exist.`);

    return this.formatPrisma(doc);
  }

  async getMany(args: QueryCompaniesArgs): Promise<CompaniesResponse> {
    const { archived, pagination, sorting } = args;

    const findArgs = {
      where: { archived: !!archived },
      ...getPaginationArgs(pagination),
      ...getSortingArgs(sorting),
    };

    const [docList, count] = await this.context.prisma.$transaction([
      this.context.prisma.company.findMany(findArgs),
      this.context.prisma.company.count({ where: findArgs.where }),
    ]);

    return {
      data: docList.map(this.formatPrisma),
      ...paginationDTO(count, pagination),
      ...sortingDTO(sorting),
    };
  }
}
