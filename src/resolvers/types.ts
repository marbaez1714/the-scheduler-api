import {
  SortOrder,
  PaginationOptions,
  SortingOptions,
  Area,
  Builder,
  Community,
  Company,
  Contractor,
  JobLegacy,
  Reporter,
  Scope,
  Supplier,
  CreateAreaInput,
  CreateBuilderInput,
  CreateCommunityInput,
  CreateCompanyInput,
  CreateContractorInput,
  CreateJobLegacyInput,
  CreateReporterInput,
  CreateScopeInput,
  CreateSupplierInput,
  CreateAreaResponse,
  CreateBuilderResponse,
  CreateCommunityResponse,
  CreateCompanyResponse,
  CreateContractorResponse,
  CreateJobLegacyResponse,
  CreateReporterResponse,
  CreateScopeResponse,
  CreateSupplierResponse,
  AreasResponse,
  BuildersResponse,
  CommunitiesResponse,
  CompaniesResponse,
  ContractorsResponse,
  ReportersResponse,
  ScopesResponse,
  SuppliersResponse,
  ArchiveAreaResponse,
  ArchiveBuilderResponse,
  ArchiveCommunityResponse,
  ArchiveCompanyResponse,
  ArchiveContractorResponse,
  ArchiveJobLegacyResponse,
  ArchiveReporterResponse,
  ArchiveScopeResponse,
  ArchiveSupplierResponse,
} from './../generated/graphql';

import {
  Area as AreaModel,
  Builder as BuilderModel,
  Community as CommunityModel,
  Company as CompanyModel,
  Contractor as ContractorModel,
  JobLegacy as JobLegacyModel,
  LineItemLegacy as LineItemLegacyModel,
  Reporter as ReporterModel,
  Scope as ScopeModel,
  Supplier as SupplierModel,
} from '@prisma/client';

/******************************/
/* Types                      */
/******************************/
export type BaseDocument = {
  name: string;
  id: string;
};

export type PaginationFindArguments = { take: number; skip: number } | undefined;

export type SortingFindArguments = { orderBy: { [field: string]: SortOrder } } | undefined;

export type FindArguments =
  | PaginationFindArguments
  | SortingFindArguments
  | (PaginationFindArguments & SortingFindArguments);

/******************************/
/* Interfaces                 */
/******************************/
export interface PrismaData {
  area: AreaModel;
  builder: BuilderModel & { company: PrismaData['company'] };
  community: CommunityModel & { company: PrismaData['company'] };
  company: CompanyModel;
  contractor: ContractorModel & { jobsLegacy: PrismaData['jobLegacy'][] };
  jobLegacy: JobLegacyModel & { lineItems: PrismaData['lineItemLegacy'][] };
  lineItemLegacy: LineItemLegacyModel;
  reporter: ReporterModel;
  scope: ScopeModel;
  supplier: SupplierModel;
}

/******************************/
/* Enums                      */
/******************************/
export enum PermissionsEnum {
  Admin = 'admin',
}

/******************************/
/* Services                   */
/******************************/
// Archive
export interface ArchiveResponse {
  area: Promise<ArchiveAreaResponse>;
  builder: Promise<ArchiveBuilderResponse>;
  community: Promise<ArchiveCommunityResponse>;
  company: Promise<ArchiveCompanyResponse>;
  contractor: Promise<ArchiveContractorResponse>;
  jobLegacy: Promise<ArchiveJobLegacyResponse>;
  reporter: Promise<ArchiveReporterResponse>;
  scope: Promise<ArchiveScopeResponse>;
  supplier: Promise<ArchiveSupplierResponse>;

  lineItemLegacy: never;
}

// Create
export interface CreateInputs {
  area: CreateAreaInput;
  builder: CreateBuilderInput;
  community: CreateCommunityInput;
  company: CreateCompanyInput;
  contractor: CreateContractorInput;
  jobLegacy: CreateJobLegacyInput;
  reporter: CreateReporterInput;
  scope: CreateScopeInput;
  supplier: CreateSupplierInput;
}

export interface CreateResponse {
  area: Promise<CreateAreaResponse>;
  builder: Promise<CreateBuilderResponse>;
  community: Promise<CreateCommunityResponse>;
  company: Promise<CreateCompanyResponse>;
  contractor: Promise<CreateContractorResponse>;
  jobLegacy: Promise<CreateJobLegacyResponse>;
  reporter: Promise<CreateReporterResponse>;
  scope: Promise<CreateScopeResponse>;
  supplier: Promise<CreateSupplierResponse>;
}

// Get By Id
export interface GetByIdInput {
  id: string;
}

export interface GetByIdResponse {
  area: Promise<Area>;
  builder: Promise<Builder>;
  community: Promise<Community>;
  company: Promise<Company>;
  contractor: Promise<Contractor>;
  jobLegacy: Promise<JobLegacy>;
  reporter: Promise<Reporter>;
  scope: Promise<Scope>;
  supplier: Promise<Supplier>;
}

// Get Many
export interface GetManyInputs {
  archived?: boolean;
  pagination?: PaginationOptions;
  sorting?: SortingOptions;
}

export interface GetManyResponse {
  area: Promise<AreasResponse>;
  builder: Promise<BuildersResponse>;
  community: Promise<CommunitiesResponse>;
  company: Promise<CompaniesResponse>;
  contractor: Promise<ContractorsResponse>;
  reporter: Promise<ReportersResponse>;
  scope: Promise<ScopesResponse>;
  supplier: Promise<SuppliersResponse>;
}
