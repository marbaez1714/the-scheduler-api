import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = undefined | T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  PhoneNumber: string;
};

export type ArchiveAreaResponse = {
  __typename?: 'ArchiveAreaResponse';
  data: Area;
  message: Scalars['String'];
};

export type ArchiveBuilderResponse = {
  __typename?: 'ArchiveBuilderResponse';
  data: Builder;
  message: Scalars['String'];
};

export type ArchiveCommunityResponse = {
  __typename?: 'ArchiveCommunityResponse';
  data: Community;
  message: Scalars['String'];
};

export type ArchiveCompanyResponse = {
  __typename?: 'ArchiveCompanyResponse';
  data: Company;
  message: Scalars['String'];
};

export type ArchiveContractorResponse = {
  __typename?: 'ArchiveContractorResponse';
  data: Contractor;
  message: Scalars['String'];
};

export type ArchiveJobLegacyResponse = {
  __typename?: 'ArchiveJobLegacyResponse';
  data: JobLegacy;
  message: Scalars['String'];
};

export type ArchiveReporterResponse = {
  __typename?: 'ArchiveReporterResponse';
  data: Reporter;
  message: Scalars['String'];
};

export type ArchiveScopeResponse = {
  __typename?: 'ArchiveScopeResponse';
  data: Scope;
  message: Scalars['String'];
};

export type ArchiveSupplierResponse = {
  __typename?: 'ArchiveSupplierResponse';
  data: Supplier;
  message: Scalars['String'];
};

export type Area = {
  __typename?: 'Area';
  archived: Scalars['Boolean'];
  createdBy: Scalars['String'];
  createdTime: Scalars['String'];
  id: Scalars['ID'];
  legacy: Scalars['Boolean'];
  name: Scalars['String'];
  nameSpanish: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
};

export type AreasResponse = {
  __typename?: 'AreasResponse';
  data: Array<Area>;
  pagination: PaginationResponse;
};

export type AssignedContractorsResponse = {
  __typename?: 'AssignedContractorsResponse';
  data: Array<Contractor>;
};

export type Builder = {
  __typename?: 'Builder';
  archived: Scalars['Boolean'];
  company: Company;
  companyId: Scalars['String'];
  createdBy: Scalars['String'];
  createdTime: Scalars['String'];
  id: Scalars['ID'];
  legacy: Scalars['Boolean'];
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  primaryEmail?: Maybe<Scalars['String']>;
  primaryPhone?: Maybe<Scalars['PhoneNumber']>;
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
};

export type BuildersResponse = {
  __typename?: 'BuildersResponse';
  data: Array<Builder>;
  pagination: PaginationResponse;
};

export type CommunitiesResponse = {
  __typename?: 'CommunitiesResponse';
  data: Array<Community>;
  pagination: PaginationResponse;
};

export type Community = {
  __typename?: 'Community';
  archived: Scalars['Boolean'];
  company: Company;
  companyId: Scalars['String'];
  createdBy: Scalars['String'];
  createdTime: Scalars['String'];
  id: Scalars['ID'];
  legacy: Scalars['Boolean'];
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
};

export type CompaniesResponse = {
  __typename?: 'CompaniesResponse';
  data: Array<Company>;
  pagination: PaginationResponse;
};

export type Company = {
  __typename?: 'Company';
  archived: Scalars['Boolean'];
  createdBy: Scalars['String'];
  createdTime: Scalars['String'];
  id: Scalars['ID'];
  legacy: Scalars['Boolean'];
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  primaryAddress?: Maybe<Scalars['String']>;
  primaryEmail?: Maybe<Scalars['String']>;
  primaryPhone?: Maybe<Scalars['PhoneNumber']>;
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
};

export type Contractor = {
  __typename?: 'Contractor';
  archived: Scalars['Boolean'];
  createdBy: Scalars['String'];
  createdTime: Scalars['String'];
  id: Scalars['ID'];
  jobsLegacy: Array<JobLegacy>;
  legacy: Scalars['Boolean'];
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  primaryPhone: Scalars['PhoneNumber'];
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
};

export type ContractorsResponse = {
  __typename?: 'ContractorsResponse';
  data: Array<Contractor>;
  pagination: PaginationResponse;
};

export type CreateJobLegacyInput = {
  areaId?: InputMaybe<Scalars['String']>;
  builderId?: InputMaybe<Scalars['String']>;
  communityId?: InputMaybe<Scalars['String']>;
  contractorId?: InputMaybe<Scalars['String']>;
  lineItems: Array<CreateLineItemLegacyInput>;
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  reporterId?: InputMaybe<Scalars['String']>;
  scopeId?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['String']>;
};

export type CreateLineItemLegacyInput = {
  orderNumber: Scalars['String'];
  supplierId: Scalars['String'];
};

export type DeleteResponse = {
  __typename?: 'DeleteResponse';
  message: Scalars['String'];
};

export type FilterInput = {
  field: Scalars['String'];
  term: Scalars['String'];
};

export type FilterResponse = {
  __typename?: 'FilterResponse';
  field: Scalars['String'];
  term: Scalars['String'];
};

export type JobLegacy = {
  __typename?: 'JobLegacy';
  active: Scalars['Boolean'];
  archived: Scalars['Boolean'];
  area?: Maybe<Area>;
  areaId?: Maybe<Scalars['String']>;
  builder?: Maybe<Builder>;
  builderId?: Maybe<Scalars['String']>;
  community?: Maybe<Community>;
  communityId?: Maybe<Scalars['String']>;
  completedDate?: Maybe<Scalars['String']>;
  contractor?: Maybe<Contractor>;
  contractorId?: Maybe<Scalars['String']>;
  createdBy: Scalars['String'];
  createdTime: Scalars['String'];
  id: Scalars['ID'];
  inProgress: Scalars['Boolean'];
  isImportant: Scalars['Boolean'];
  legacy: Scalars['Boolean'];
  lineItems: Array<LineItemLegacy>;
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  reporter?: Maybe<Reporter>;
  reporterId?: Maybe<Scalars['String']>;
  scope?: Maybe<Scope>;
  scopeId?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
  status: JobLegacyStatus;
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
};

export enum JobLegacyStatus {
  InProgress = 'inProgress',
  PastDue = 'pastDue',
  Planned = 'planned',
  Today = 'today',
  WillCall = 'willCall',
}

export enum JobsLegacyMessageRecipient {
  Contractor = 'contractor',
  Reporter = 'reporter',
}

export type JobsLegacyResponse = {
  __typename?: 'JobsLegacyResponse';
  data: Array<JobLegacy>;
  filter: FilterResponse;
  pagination: PaginationResponse;
  sort: SortResponse;
};

export type JobsLegacySendMessageResponse = {
  __typename?: 'JobsLegacySendMessageResponse';
  message: Scalars['String'];
  recipient: JobsLegacyMessageRecipient;
};

export type LineItemLegacy = {
  __typename?: 'LineItemLegacy';
  createdBy: Scalars['String'];
  createdTime: Scalars['String'];
  id: Scalars['ID'];
  jobId: Scalars['String'];
  legacy: Scalars['Boolean'];
  orderNumber: Scalars['String'];
  supplier: Supplier;
  supplierId: Scalars['String'];
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  message: Scalars['String'];
};

export type ModifyJobLegacyInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  areaId?: InputMaybe<Scalars['String']>;
  builderId?: InputMaybe<Scalars['String']>;
  communityId?: InputMaybe<Scalars['String']>;
  completedDate?: InputMaybe<Scalars['String']>;
  contractorId?: InputMaybe<Scalars['String']>;
  inProgress?: InputMaybe<Scalars['Boolean']>;
  isImportant?: InputMaybe<Scalars['Boolean']>;
  lineItems?: InputMaybe<Array<ModifyLineItemLegacyInput>>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  reporterId?: InputMaybe<Scalars['String']>;
  scopeId?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['String']>;
};

export type ModifyLineItemLegacyInput = {
  delete?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
  orderNumber: Scalars['String'];
  supplierId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  archiveArea: ArchiveAreaResponse;
  archiveBuilder: ArchiveBuilderResponse;
  archiveCommunity: ArchiveCommunityResponse;
  archiveCompany: ArchiveCompanyResponse;
  archiveContractor: ArchiveContractorResponse;
  archiveJobLegacy: ArchiveJobLegacyResponse;
  archiveReporter: ArchiveReporterResponse;
  archiveScope: ArchiveScopeResponse;
  archiveSupplier: ArchiveSupplierResponse;
  createArea: WriteAreaResponse;
  createBuilder: WriteBuilderResponse;
  createCommunity: WriteCommunityResponse;
  createCompany: WriteCompanyResponse;
  createContractor: WriteContractorResponse;
  createJobLegacy: WriteJobLegacyResponse;
  createReporter: WriteReporterResponse;
  createScope: WriteScopeResponse;
  createSupplier: WriteSupplierResponse;
  deleteLineItemLegacy: DeleteResponse;
  modifyArea: WriteAreaResponse;
  modifyBuilder: WriteBuilderResponse;
  modifyCommunity: WriteCommunityResponse;
  modifyCompany: WriteCompanyResponse;
  modifyContractor: WriteContractorResponse;
  modifyJobLegacy: WriteJobLegacyResponse;
  modifyReporter: WriteReporterResponse;
  modifyScope: WriteScopeResponse;
  modifySupplier: WriteSupplierResponse;
  reenableJobLegacy: WriteJobLegacyResponse;
  sendMessageJobLegacy?: Maybe<JobsLegacySendMessageResponse>;
};

export type MutationArchiveAreaArgs = {
  id: Scalars['ID'];
};

export type MutationArchiveBuilderArgs = {
  id: Scalars['ID'];
};

export type MutationArchiveCommunityArgs = {
  id: Scalars['ID'];
};

export type MutationArchiveCompanyArgs = {
  id: Scalars['ID'];
};

export type MutationArchiveContractorArgs = {
  id: Scalars['ID'];
};

export type MutationArchiveJobLegacyArgs = {
  id: Scalars['ID'];
};

export type MutationArchiveReporterArgs = {
  id: Scalars['ID'];
};

export type MutationArchiveScopeArgs = {
  id: Scalars['ID'];
};

export type MutationArchiveSupplierArgs = {
  id: Scalars['ID'];
};

export type MutationCreateAreaArgs = {
  data: WriteAreaInput;
};

export type MutationCreateBuilderArgs = {
  data: WriteBuilderInput;
};

export type MutationCreateCommunityArgs = {
  data: WriteCommunityInput;
};

export type MutationCreateCompanyArgs = {
  data: WriteCompanyInput;
};

export type MutationCreateContractorArgs = {
  data: WriteContractorInput;
};

export type MutationCreateJobLegacyArgs = {
  data: CreateJobLegacyInput;
};

export type MutationCreateReporterArgs = {
  data: WriteReporterInput;
};

export type MutationCreateScopeArgs = {
  data: WriteScopeInput;
};

export type MutationCreateSupplierArgs = {
  data: WriteSupplierInput;
};

export type MutationDeleteLineItemLegacyArgs = {
  id: Scalars['ID'];
};

export type MutationModifyAreaArgs = {
  data: WriteAreaInput;
  id: Scalars['ID'];
};

export type MutationModifyBuilderArgs = {
  data: WriteBuilderInput;
  id: Scalars['ID'];
};

export type MutationModifyCommunityArgs = {
  data: WriteCommunityInput;
  id: Scalars['ID'];
};

export type MutationModifyCompanyArgs = {
  data: WriteCompanyInput;
  id: Scalars['ID'];
};

export type MutationModifyContractorArgs = {
  data: WriteContractorInput;
  id: Scalars['ID'];
};

export type MutationModifyJobLegacyArgs = {
  data: ModifyJobLegacyInput;
  id: Scalars['ID'];
};

export type MutationModifyReporterArgs = {
  data: WriteReporterInput;
  id: Scalars['ID'];
};

export type MutationModifyScopeArgs = {
  data: WriteScopeInput;
  id: Scalars['ID'];
};

export type MutationModifySupplierArgs = {
  data: WriteSupplierInput;
  id: Scalars['ID'];
};

export type MutationReenableJobLegacyArgs = {
  id: Scalars['ID'];
};

export type MutationSendMessageJobLegacyArgs = {
  id: Scalars['ID'];
  message: Scalars['String'];
  recipient: JobsLegacyMessageRecipient;
};

export type Pagination = {
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export type PaginationResponse = {
  __typename?: 'PaginationResponse';
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  areaById?: Maybe<Area>;
  areas: AreasResponse;
  assignedContractors: AssignedContractorsResponse;
  builderById?: Maybe<Builder>;
  builders: BuildersResponse;
  communities: CommunitiesResponse;
  communityById?: Maybe<Community>;
  companies: CompaniesResponse;
  companyById?: Maybe<Company>;
  contractorById?: Maybe<Contractor>;
  contractors: ContractorsResponse;
  jobLegacyById?: Maybe<JobLegacy>;
  jobsLegacy: JobsLegacyResponse;
  jobsLegacyByActiveStatus: JobsLegacyResponse;
  jobsLegacyByContractorId: JobsLegacyResponse;
  reporterById?: Maybe<Reporter>;
  reporters: ReportersResponse;
  scopeById?: Maybe<Scope>;
  scopes: ScopesResponse;
  supplierById?: Maybe<Supplier>;
  suppliers: SuppliersResponse;
};

export type QueryAreaByIdArgs = {
  id: Scalars['ID'];
};

export type QueryAreasArgs = {
  archived?: InputMaybe<Scalars['Boolean']>;
  pagination?: InputMaybe<Pagination>;
};

export type QueryBuilderByIdArgs = {
  id: Scalars['ID'];
};

export type QueryBuildersArgs = {
  archived?: InputMaybe<Scalars['Boolean']>;
  pagination?: InputMaybe<Pagination>;
};

export type QueryCommunitiesArgs = {
  archived?: InputMaybe<Scalars['Boolean']>;
  pagination?: InputMaybe<Pagination>;
};

export type QueryCommunityByIdArgs = {
  id: Scalars['ID'];
};

export type QueryCompaniesArgs = {
  archived?: InputMaybe<Scalars['Boolean']>;
  pagination?: InputMaybe<Pagination>;
};

export type QueryCompanyByIdArgs = {
  id: Scalars['ID'];
};

export type QueryContractorByIdArgs = {
  id: Scalars['ID'];
};

export type QueryContractorsArgs = {
  archived?: InputMaybe<Scalars['Boolean']>;
  pagination?: InputMaybe<Pagination>;
};

export type QueryJobLegacyByIdArgs = {
  id: Scalars['ID'];
};

export type QueryJobsLegacyArgs = {
  archived?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<FilterInput>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<SortInput>;
};

export type QueryJobsLegacyByActiveStatusArgs = {
  active: Scalars['Boolean'];
  archived?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<FilterInput>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<SortInput>;
};

export type QueryJobsLegacyByContractorIdArgs = {
  archived?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<FilterInput>;
  id: Scalars['ID'];
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<SortInput>;
};

export type QueryReporterByIdArgs = {
  id: Scalars['ID'];
};

export type QueryReportersArgs = {
  archived?: InputMaybe<Scalars['Boolean']>;
  pagination?: InputMaybe<Pagination>;
};

export type QueryScopeByIdArgs = {
  id: Scalars['ID'];
};

export type QueryScopesArgs = {
  archived?: InputMaybe<Scalars['Boolean']>;
  pagination?: InputMaybe<Pagination>;
};

export type QuerySupplierByIdArgs = {
  id: Scalars['ID'];
};

export type QuerySuppliersArgs = {
  archived?: InputMaybe<Scalars['Boolean']>;
  pagination?: InputMaybe<Pagination>;
};

export type Reporter = {
  __typename?: 'Reporter';
  archived: Scalars['Boolean'];
  createdBy: Scalars['String'];
  createdTime: Scalars['String'];
  id: Scalars['ID'];
  legacy: Scalars['Boolean'];
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  primaryEmail?: Maybe<Scalars['String']>;
  primaryPhone: Scalars['PhoneNumber'];
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
};

export type ReportersResponse = {
  __typename?: 'ReportersResponse';
  data: Array<Reporter>;
  pagination: PaginationResponse;
};

export type Scope = {
  __typename?: 'Scope';
  archived: Scalars['Boolean'];
  createdBy: Scalars['String'];
  createdTime: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  legacy: Scalars['Boolean'];
  name: Scalars['String'];
  nameSpanish: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
};

export type ScopesResponse = {
  __typename?: 'ScopesResponse';
  data: Array<Scope>;
  pagination: PaginationResponse;
};

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type SortInput = {
  direction: SortDirection;
  field: Scalars['String'];
};

export type SortResponse = {
  __typename?: 'SortResponse';
  direction: SortDirection;
  field: Scalars['String'];
};

export type Supplier = {
  __typename?: 'Supplier';
  archived: Scalars['Boolean'];
  createdBy: Scalars['String'];
  createdTime: Scalars['String'];
  id: Scalars['ID'];
  legacy: Scalars['Boolean'];
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  primaryPhone?: Maybe<Scalars['PhoneNumber']>;
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
};

export type SuppliersResponse = {
  __typename?: 'SuppliersResponse';
  data: Array<Supplier>;
  pagination: PaginationResponse;
};

export type WriteAreaInput = {
  name: Scalars['String'];
  nameSpanish: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
};

export type WriteAreaResponse = {
  __typename?: 'WriteAreaResponse';
  data: Area;
  message: Scalars['String'];
};

export type WriteBuilderInput = {
  companyId: Scalars['String'];
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  primaryEmail?: InputMaybe<Scalars['String']>;
  primaryPhone: Scalars['PhoneNumber'];
};

export type WriteBuilderResponse = {
  __typename?: 'WriteBuilderResponse';
  data: Builder;
  message: Scalars['String'];
};

export type WriteCommunityInput = {
  companyId: Scalars['String'];
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
};

export type WriteCommunityResponse = {
  __typename?: 'WriteCommunityResponse';
  data: Community;
  message: Scalars['String'];
};

export type WriteCompanyInput = {
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  primaryAddress?: InputMaybe<Scalars['String']>;
  primaryEmail?: InputMaybe<Scalars['String']>;
  primaryPhone?: InputMaybe<Scalars['PhoneNumber']>;
};

export type WriteCompanyResponse = {
  __typename?: 'WriteCompanyResponse';
  data: Company;
  message: Scalars['String'];
};

export type WriteContractorInput = {
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  primaryPhone: Scalars['PhoneNumber'];
};

export type WriteContractorResponse = {
  __typename?: 'WriteContractorResponse';
  data: Contractor;
  message: Scalars['String'];
};

export type WriteJobLegacyResponse = {
  __typename?: 'WriteJobLegacyResponse';
  data: JobLegacy;
  message: Scalars['String'];
};

export type WriteReporterInput = {
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  primaryEmail?: InputMaybe<Scalars['String']>;
  primaryPhone: Scalars['PhoneNumber'];
};

export type WriteReporterResponse = {
  __typename?: 'WriteReporterResponse';
  data: Reporter;
  message: Scalars['String'];
};

export type WriteScopeInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  nameSpanish: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
};

export type WriteScopeResponse = {
  __typename?: 'WriteScopeResponse';
  data: Scope;
  message: Scalars['String'];
};

export type WriteSupplierInput = {
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  primaryPhone?: InputMaybe<Scalars['PhoneNumber']>;
};

export type WriteSupplierResponse = {
  __typename?: 'WriteSupplierResponse';
  data: Supplier;
  message: Scalars['String'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  ArchiveAreaResponse: ResolverTypeWrapper<ArchiveAreaResponse>;
  ArchiveBuilderResponse: ResolverTypeWrapper<ArchiveBuilderResponse>;
  ArchiveCommunityResponse: ResolverTypeWrapper<ArchiveCommunityResponse>;
  ArchiveCompanyResponse: ResolverTypeWrapper<ArchiveCompanyResponse>;
  ArchiveContractorResponse: ResolverTypeWrapper<ArchiveContractorResponse>;
  ArchiveJobLegacyResponse: ResolverTypeWrapper<ArchiveJobLegacyResponse>;
  ArchiveReporterResponse: ResolverTypeWrapper<ArchiveReporterResponse>;
  ArchiveScopeResponse: ResolverTypeWrapper<ArchiveScopeResponse>;
  ArchiveSupplierResponse: ResolverTypeWrapper<ArchiveSupplierResponse>;
  Area: ResolverTypeWrapper<Area>;
  AreasResponse: ResolverTypeWrapper<AreasResponse>;
  AssignedContractorsResponse: ResolverTypeWrapper<AssignedContractorsResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Builder: ResolverTypeWrapper<Builder>;
  BuildersResponse: ResolverTypeWrapper<BuildersResponse>;
  CommunitiesResponse: ResolverTypeWrapper<CommunitiesResponse>;
  Community: ResolverTypeWrapper<Community>;
  CompaniesResponse: ResolverTypeWrapper<CompaniesResponse>;
  Company: ResolverTypeWrapper<Company>;
  Contractor: ResolverTypeWrapper<Contractor>;
  ContractorsResponse: ResolverTypeWrapper<ContractorsResponse>;
  CreateJobLegacyInput: CreateJobLegacyInput;
  CreateLineItemLegacyInput: CreateLineItemLegacyInput;
  DeleteResponse: ResolverTypeWrapper<DeleteResponse>;
  FilterInput: FilterInput;
  FilterResponse: ResolverTypeWrapper<FilterResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JobLegacy: ResolverTypeWrapper<JobLegacy>;
  JobLegacyStatus: JobLegacyStatus;
  JobsLegacyMessageRecipient: JobsLegacyMessageRecipient;
  JobsLegacyResponse: ResolverTypeWrapper<JobsLegacyResponse>;
  JobsLegacySendMessageResponse: ResolverTypeWrapper<JobsLegacySendMessageResponse>;
  LineItemLegacy: ResolverTypeWrapper<LineItemLegacy>;
  MessageResponse: ResolverTypeWrapper<MessageResponse>;
  ModifyJobLegacyInput: ModifyJobLegacyInput;
  ModifyLineItemLegacyInput: ModifyLineItemLegacyInput;
  Mutation: ResolverTypeWrapper<{}>;
  Pagination: Pagination;
  PaginationResponse: ResolverTypeWrapper<PaginationResponse>;
  PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']>;
  Query: ResolverTypeWrapper<{}>;
  Reporter: ResolverTypeWrapper<Reporter>;
  ReportersResponse: ResolverTypeWrapper<ReportersResponse>;
  Scope: ResolverTypeWrapper<Scope>;
  ScopesResponse: ResolverTypeWrapper<ScopesResponse>;
  SortDirection: SortDirection;
  SortInput: SortInput;
  SortResponse: ResolverTypeWrapper<SortResponse>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Supplier: ResolverTypeWrapper<Supplier>;
  SuppliersResponse: ResolverTypeWrapper<SuppliersResponse>;
  WriteAreaInput: WriteAreaInput;
  WriteAreaResponse: ResolverTypeWrapper<WriteAreaResponse>;
  WriteBuilderInput: WriteBuilderInput;
  WriteBuilderResponse: ResolverTypeWrapper<WriteBuilderResponse>;
  WriteCommunityInput: WriteCommunityInput;
  WriteCommunityResponse: ResolverTypeWrapper<WriteCommunityResponse>;
  WriteCompanyInput: WriteCompanyInput;
  WriteCompanyResponse: ResolverTypeWrapper<WriteCompanyResponse>;
  WriteContractorInput: WriteContractorInput;
  WriteContractorResponse: ResolverTypeWrapper<WriteContractorResponse>;
  WriteJobLegacyResponse: ResolverTypeWrapper<WriteJobLegacyResponse>;
  WriteReporterInput: WriteReporterInput;
  WriteReporterResponse: ResolverTypeWrapper<WriteReporterResponse>;
  WriteScopeInput: WriteScopeInput;
  WriteScopeResponse: ResolverTypeWrapper<WriteScopeResponse>;
  WriteSupplierInput: WriteSupplierInput;
  WriteSupplierResponse: ResolverTypeWrapper<WriteSupplierResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  ArchiveAreaResponse: ArchiveAreaResponse;
  ArchiveBuilderResponse: ArchiveBuilderResponse;
  ArchiveCommunityResponse: ArchiveCommunityResponse;
  ArchiveCompanyResponse: ArchiveCompanyResponse;
  ArchiveContractorResponse: ArchiveContractorResponse;
  ArchiveJobLegacyResponse: ArchiveJobLegacyResponse;
  ArchiveReporterResponse: ArchiveReporterResponse;
  ArchiveScopeResponse: ArchiveScopeResponse;
  ArchiveSupplierResponse: ArchiveSupplierResponse;
  Area: Area;
  AreasResponse: AreasResponse;
  AssignedContractorsResponse: AssignedContractorsResponse;
  Boolean: Scalars['Boolean'];
  Builder: Builder;
  BuildersResponse: BuildersResponse;
  CommunitiesResponse: CommunitiesResponse;
  Community: Community;
  CompaniesResponse: CompaniesResponse;
  Company: Company;
  Contractor: Contractor;
  ContractorsResponse: ContractorsResponse;
  CreateJobLegacyInput: CreateJobLegacyInput;
  CreateLineItemLegacyInput: CreateLineItemLegacyInput;
  DeleteResponse: DeleteResponse;
  FilterInput: FilterInput;
  FilterResponse: FilterResponse;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  JobLegacy: JobLegacy;
  JobsLegacyResponse: JobsLegacyResponse;
  JobsLegacySendMessageResponse: JobsLegacySendMessageResponse;
  LineItemLegacy: LineItemLegacy;
  MessageResponse: MessageResponse;
  ModifyJobLegacyInput: ModifyJobLegacyInput;
  ModifyLineItemLegacyInput: ModifyLineItemLegacyInput;
  Mutation: {};
  Pagination: Pagination;
  PaginationResponse: PaginationResponse;
  PhoneNumber: Scalars['PhoneNumber'];
  Query: {};
  Reporter: Reporter;
  ReportersResponse: ReportersResponse;
  Scope: Scope;
  ScopesResponse: ScopesResponse;
  SortInput: SortInput;
  SortResponse: SortResponse;
  String: Scalars['String'];
  Supplier: Supplier;
  SuppliersResponse: SuppliersResponse;
  WriteAreaInput: WriteAreaInput;
  WriteAreaResponse: WriteAreaResponse;
  WriteBuilderInput: WriteBuilderInput;
  WriteBuilderResponse: WriteBuilderResponse;
  WriteCommunityInput: WriteCommunityInput;
  WriteCommunityResponse: WriteCommunityResponse;
  WriteCompanyInput: WriteCompanyInput;
  WriteCompanyResponse: WriteCompanyResponse;
  WriteContractorInput: WriteContractorInput;
  WriteContractorResponse: WriteContractorResponse;
  WriteJobLegacyResponse: WriteJobLegacyResponse;
  WriteReporterInput: WriteReporterInput;
  WriteReporterResponse: WriteReporterResponse;
  WriteScopeInput: WriteScopeInput;
  WriteScopeResponse: WriteScopeResponse;
  WriteSupplierInput: WriteSupplierInput;
  WriteSupplierResponse: WriteSupplierResponse;
};

export type ArchiveAreaResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ArchiveAreaResponse'] = ResolversParentTypes['ArchiveAreaResponse']
> = {
  data?: Resolver<ResolversTypes['Area'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArchiveBuilderResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ArchiveBuilderResponse'] = ResolversParentTypes['ArchiveBuilderResponse']
> = {
  data?: Resolver<ResolversTypes['Builder'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArchiveCommunityResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ArchiveCommunityResponse'] = ResolversParentTypes['ArchiveCommunityResponse']
> = {
  data?: Resolver<ResolversTypes['Community'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArchiveCompanyResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ArchiveCompanyResponse'] = ResolversParentTypes['ArchiveCompanyResponse']
> = {
  data?: Resolver<ResolversTypes['Company'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArchiveContractorResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ArchiveContractorResponse'] = ResolversParentTypes['ArchiveContractorResponse']
> = {
  data?: Resolver<ResolversTypes['Contractor'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArchiveJobLegacyResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ArchiveJobLegacyResponse'] = ResolversParentTypes['ArchiveJobLegacyResponse']
> = {
  data?: Resolver<ResolversTypes['JobLegacy'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArchiveReporterResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ArchiveReporterResponse'] = ResolversParentTypes['ArchiveReporterResponse']
> = {
  data?: Resolver<ResolversTypes['Reporter'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArchiveScopeResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ArchiveScopeResponse'] = ResolversParentTypes['ArchiveScopeResponse']
> = {
  data?: Resolver<ResolversTypes['Scope'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArchiveSupplierResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ArchiveSupplierResponse'] = ResolversParentTypes['ArchiveSupplierResponse']
> = {
  data?: Resolver<ResolversTypes['Supplier'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AreaResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Area'] = ResolversParentTypes['Area']
> = {
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  legacy?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nameSpanish?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AreasResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AreasResponse'] = ResolversParentTypes['AreasResponse']
> = {
  data?: Resolver<Array<ResolversTypes['Area']>, ParentType, ContextType>;
  pagination?: Resolver<ResolversTypes['PaginationResponse'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AssignedContractorsResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AssignedContractorsResponse'] = ResolversParentTypes['AssignedContractorsResponse']
> = {
  data?: Resolver<Array<ResolversTypes['Contractor']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BuilderResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Builder'] = ResolversParentTypes['Builder']
> = {
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  company?: Resolver<ResolversTypes['Company'], ParentType, ContextType>;
  companyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  legacy?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primaryEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primaryPhone?: Resolver<Maybe<ResolversTypes['PhoneNumber']>, ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BuildersResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['BuildersResponse'] = ResolversParentTypes['BuildersResponse']
> = {
  data?: Resolver<Array<ResolversTypes['Builder']>, ParentType, ContextType>;
  pagination?: Resolver<ResolversTypes['PaginationResponse'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunitiesResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CommunitiesResponse'] = ResolversParentTypes['CommunitiesResponse']
> = {
  data?: Resolver<Array<ResolversTypes['Community']>, ParentType, ContextType>;
  pagination?: Resolver<ResolversTypes['PaginationResponse'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunityResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Community'] = ResolversParentTypes['Community']
> = {
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  company?: Resolver<ResolversTypes['Company'], ParentType, ContextType>;
  companyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  legacy?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompaniesResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CompaniesResponse'] = ResolversParentTypes['CompaniesResponse']
> = {
  data?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType>;
  pagination?: Resolver<ResolversTypes['PaginationResponse'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']
> = {
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  legacy?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primaryAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primaryEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primaryPhone?: Resolver<Maybe<ResolversTypes['PhoneNumber']>, ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContractorResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Contractor'] = ResolversParentTypes['Contractor']
> = {
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  jobsLegacy?: Resolver<Array<ResolversTypes['JobLegacy']>, ParentType, ContextType>;
  legacy?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primaryPhone?: Resolver<ResolversTypes['PhoneNumber'], ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContractorsResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ContractorsResponse'] = ResolversParentTypes['ContractorsResponse']
> = {
  data?: Resolver<Array<ResolversTypes['Contractor']>, ParentType, ContextType>;
  pagination?: Resolver<ResolversTypes['PaginationResponse'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['DeleteResponse'] = ResolversParentTypes['DeleteResponse']
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FilterResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['FilterResponse'] = ResolversParentTypes['FilterResponse']
> = {
  field?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  term?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JobLegacyResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['JobLegacy'] = ResolversParentTypes['JobLegacy']
> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  area?: Resolver<Maybe<ResolversTypes['Area']>, ParentType, ContextType>;
  areaId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  builder?: Resolver<Maybe<ResolversTypes['Builder']>, ParentType, ContextType>;
  builderId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  community?: Resolver<Maybe<ResolversTypes['Community']>, ParentType, ContextType>;
  communityId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  completedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contractor?: Resolver<Maybe<ResolversTypes['Contractor']>, ParentType, ContextType>;
  contractorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inProgress?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isImportant?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  legacy?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lineItems?: Resolver<Array<ResolversTypes['LineItemLegacy']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reporter?: Resolver<Maybe<ResolversTypes['Reporter']>, ParentType, ContextType>;
  reporterId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scope?: Resolver<Maybe<ResolversTypes['Scope']>, ParentType, ContextType>;
  scopeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['JobLegacyStatus'], ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JobsLegacyResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['JobsLegacyResponse'] = ResolversParentTypes['JobsLegacyResponse']
> = {
  data?: Resolver<Array<ResolversTypes['JobLegacy']>, ParentType, ContextType>;
  filter?: Resolver<ResolversTypes['FilterResponse'], ParentType, ContextType>;
  pagination?: Resolver<ResolversTypes['PaginationResponse'], ParentType, ContextType>;
  sort?: Resolver<ResolversTypes['SortResponse'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JobsLegacySendMessageResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['JobsLegacySendMessageResponse'] = ResolversParentTypes['JobsLegacySendMessageResponse']
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['JobsLegacyMessageRecipient'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LineItemLegacyResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['LineItemLegacy'] = ResolversParentTypes['LineItemLegacy']
> = {
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  jobId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  legacy?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  orderNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  supplier?: Resolver<ResolversTypes['Supplier'], ParentType, ContextType>;
  supplierId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['MessageResponse'] = ResolversParentTypes['MessageResponse']
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  archiveArea?: Resolver<
    ResolversTypes['ArchiveAreaResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationArchiveAreaArgs, 'id'>
  >;
  archiveBuilder?: Resolver<
    ResolversTypes['ArchiveBuilderResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationArchiveBuilderArgs, 'id'>
  >;
  archiveCommunity?: Resolver<
    ResolversTypes['ArchiveCommunityResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationArchiveCommunityArgs, 'id'>
  >;
  archiveCompany?: Resolver<
    ResolversTypes['ArchiveCompanyResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationArchiveCompanyArgs, 'id'>
  >;
  archiveContractor?: Resolver<
    ResolversTypes['ArchiveContractorResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationArchiveContractorArgs, 'id'>
  >;
  archiveJobLegacy?: Resolver<
    ResolversTypes['ArchiveJobLegacyResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationArchiveJobLegacyArgs, 'id'>
  >;
  archiveReporter?: Resolver<
    ResolversTypes['ArchiveReporterResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationArchiveReporterArgs, 'id'>
  >;
  archiveScope?: Resolver<
    ResolversTypes['ArchiveScopeResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationArchiveScopeArgs, 'id'>
  >;
  archiveSupplier?: Resolver<
    ResolversTypes['ArchiveSupplierResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationArchiveSupplierArgs, 'id'>
  >;
  createArea?: Resolver<
    ResolversTypes['WriteAreaResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateAreaArgs, 'data'>
  >;
  createBuilder?: Resolver<
    ResolversTypes['WriteBuilderResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateBuilderArgs, 'data'>
  >;
  createCommunity?: Resolver<
    ResolversTypes['WriteCommunityResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCommunityArgs, 'data'>
  >;
  createCompany?: Resolver<
    ResolversTypes['WriteCompanyResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCompanyArgs, 'data'>
  >;
  createContractor?: Resolver<
    ResolversTypes['WriteContractorResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateContractorArgs, 'data'>
  >;
  createJobLegacy?: Resolver<
    ResolversTypes['WriteJobLegacyResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateJobLegacyArgs, 'data'>
  >;
  createReporter?: Resolver<
    ResolversTypes['WriteReporterResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateReporterArgs, 'data'>
  >;
  createScope?: Resolver<
    ResolversTypes['WriteScopeResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateScopeArgs, 'data'>
  >;
  createSupplier?: Resolver<
    ResolversTypes['WriteSupplierResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateSupplierArgs, 'data'>
  >;
  deleteLineItemLegacy?: Resolver<
    ResolversTypes['DeleteResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteLineItemLegacyArgs, 'id'>
  >;
  modifyArea?: Resolver<
    ResolversTypes['WriteAreaResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationModifyAreaArgs, 'data' | 'id'>
  >;
  modifyBuilder?: Resolver<
    ResolversTypes['WriteBuilderResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationModifyBuilderArgs, 'data' | 'id'>
  >;
  modifyCommunity?: Resolver<
    ResolversTypes['WriteCommunityResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationModifyCommunityArgs, 'data' | 'id'>
  >;
  modifyCompany?: Resolver<
    ResolversTypes['WriteCompanyResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationModifyCompanyArgs, 'data' | 'id'>
  >;
  modifyContractor?: Resolver<
    ResolversTypes['WriteContractorResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationModifyContractorArgs, 'data' | 'id'>
  >;
  modifyJobLegacy?: Resolver<
    ResolversTypes['WriteJobLegacyResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationModifyJobLegacyArgs, 'data' | 'id'>
  >;
  modifyReporter?: Resolver<
    ResolversTypes['WriteReporterResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationModifyReporterArgs, 'data' | 'id'>
  >;
  modifyScope?: Resolver<
    ResolversTypes['WriteScopeResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationModifyScopeArgs, 'data' | 'id'>
  >;
  modifySupplier?: Resolver<
    ResolversTypes['WriteSupplierResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationModifySupplierArgs, 'data' | 'id'>
  >;
  reenableJobLegacy?: Resolver<
    ResolversTypes['WriteJobLegacyResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationReenableJobLegacyArgs, 'id'>
  >;
  sendMessageJobLegacy?: Resolver<
    Maybe<ResolversTypes['JobsLegacySendMessageResponse']>,
    ParentType,
    ContextType,
    RequireFields<MutationSendMessageJobLegacyArgs, 'id' | 'message' | 'recipient'>
  >;
};

export type PaginationResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PaginationResponse'] = ResolversParentTypes['PaginationResponse']
> = {
  page?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  pageSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface PhoneNumberScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['PhoneNumber'], any> {
  name: 'PhoneNumber';
}

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  areaById?: Resolver<
    Maybe<ResolversTypes['Area']>,
    ParentType,
    ContextType,
    RequireFields<QueryAreaByIdArgs, 'id'>
  >;
  areas?: Resolver<
    ResolversTypes['AreasResponse'],
    ParentType,
    ContextType,
    Partial<QueryAreasArgs>
  >;
  assignedContractors?: Resolver<
    ResolversTypes['AssignedContractorsResponse'],
    ParentType,
    ContextType
  >;
  builderById?: Resolver<
    Maybe<ResolversTypes['Builder']>,
    ParentType,
    ContextType,
    RequireFields<QueryBuilderByIdArgs, 'id'>
  >;
  builders?: Resolver<
    ResolversTypes['BuildersResponse'],
    ParentType,
    ContextType,
    Partial<QueryBuildersArgs>
  >;
  communities?: Resolver<
    ResolversTypes['CommunitiesResponse'],
    ParentType,
    ContextType,
    Partial<QueryCommunitiesArgs>
  >;
  communityById?: Resolver<
    Maybe<ResolversTypes['Community']>,
    ParentType,
    ContextType,
    RequireFields<QueryCommunityByIdArgs, 'id'>
  >;
  companies?: Resolver<
    ResolversTypes['CompaniesResponse'],
    ParentType,
    ContextType,
    Partial<QueryCompaniesArgs>
  >;
  companyById?: Resolver<
    Maybe<ResolversTypes['Company']>,
    ParentType,
    ContextType,
    RequireFields<QueryCompanyByIdArgs, 'id'>
  >;
  contractorById?: Resolver<
    Maybe<ResolversTypes['Contractor']>,
    ParentType,
    ContextType,
    RequireFields<QueryContractorByIdArgs, 'id'>
  >;
  contractors?: Resolver<
    ResolversTypes['ContractorsResponse'],
    ParentType,
    ContextType,
    Partial<QueryContractorsArgs>
  >;
  jobLegacyById?: Resolver<
    Maybe<ResolversTypes['JobLegacy']>,
    ParentType,
    ContextType,
    RequireFields<QueryJobLegacyByIdArgs, 'id'>
  >;
  jobsLegacy?: Resolver<
    ResolversTypes['JobsLegacyResponse'],
    ParentType,
    ContextType,
    Partial<QueryJobsLegacyArgs>
  >;
  jobsLegacyByActiveStatus?: Resolver<
    ResolversTypes['JobsLegacyResponse'],
    ParentType,
    ContextType,
    RequireFields<QueryJobsLegacyByActiveStatusArgs, 'active'>
  >;
  jobsLegacyByContractorId?: Resolver<
    ResolversTypes['JobsLegacyResponse'],
    ParentType,
    ContextType,
    RequireFields<QueryJobsLegacyByContractorIdArgs, 'id'>
  >;
  reporterById?: Resolver<
    Maybe<ResolversTypes['Reporter']>,
    ParentType,
    ContextType,
    RequireFields<QueryReporterByIdArgs, 'id'>
  >;
  reporters?: Resolver<
    ResolversTypes['ReportersResponse'],
    ParentType,
    ContextType,
    Partial<QueryReportersArgs>
  >;
  scopeById?: Resolver<
    Maybe<ResolversTypes['Scope']>,
    ParentType,
    ContextType,
    RequireFields<QueryScopeByIdArgs, 'id'>
  >;
  scopes?: Resolver<
    ResolversTypes['ScopesResponse'],
    ParentType,
    ContextType,
    Partial<QueryScopesArgs>
  >;
  supplierById?: Resolver<
    Maybe<ResolversTypes['Supplier']>,
    ParentType,
    ContextType,
    RequireFields<QuerySupplierByIdArgs, 'id'>
  >;
  suppliers?: Resolver<
    ResolversTypes['SuppliersResponse'],
    ParentType,
    ContextType,
    Partial<QuerySuppliersArgs>
  >;
};

export type ReporterResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Reporter'] = ResolversParentTypes['Reporter']
> = {
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  legacy?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primaryEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primaryPhone?: Resolver<ResolversTypes['PhoneNumber'], ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReportersResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ReportersResponse'] = ResolversParentTypes['ReportersResponse']
> = {
  data?: Resolver<Array<ResolversTypes['Reporter']>, ParentType, ContextType>;
  pagination?: Resolver<ResolversTypes['PaginationResponse'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScopeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Scope'] = ResolversParentTypes['Scope']
> = {
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  legacy?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nameSpanish?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScopesResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ScopesResponse'] = ResolversParentTypes['ScopesResponse']
> = {
  data?: Resolver<Array<ResolversTypes['Scope']>, ParentType, ContextType>;
  pagination?: Resolver<ResolversTypes['PaginationResponse'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SortResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['SortResponse'] = ResolversParentTypes['SortResponse']
> = {
  direction?: Resolver<ResolversTypes['SortDirection'], ParentType, ContextType>;
  field?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SupplierResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Supplier'] = ResolversParentTypes['Supplier']
> = {
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  legacy?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primaryPhone?: Resolver<Maybe<ResolversTypes['PhoneNumber']>, ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SuppliersResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['SuppliersResponse'] = ResolversParentTypes['SuppliersResponse']
> = {
  data?: Resolver<Array<ResolversTypes['Supplier']>, ParentType, ContextType>;
  pagination?: Resolver<ResolversTypes['PaginationResponse'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WriteAreaResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['WriteAreaResponse'] = ResolversParentTypes['WriteAreaResponse']
> = {
  data?: Resolver<ResolversTypes['Area'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WriteBuilderResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['WriteBuilderResponse'] = ResolversParentTypes['WriteBuilderResponse']
> = {
  data?: Resolver<ResolversTypes['Builder'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WriteCommunityResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['WriteCommunityResponse'] = ResolversParentTypes['WriteCommunityResponse']
> = {
  data?: Resolver<ResolversTypes['Community'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WriteCompanyResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['WriteCompanyResponse'] = ResolversParentTypes['WriteCompanyResponse']
> = {
  data?: Resolver<ResolversTypes['Company'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WriteContractorResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['WriteContractorResponse'] = ResolversParentTypes['WriteContractorResponse']
> = {
  data?: Resolver<ResolversTypes['Contractor'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WriteJobLegacyResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['WriteJobLegacyResponse'] = ResolversParentTypes['WriteJobLegacyResponse']
> = {
  data?: Resolver<ResolversTypes['JobLegacy'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WriteReporterResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['WriteReporterResponse'] = ResolversParentTypes['WriteReporterResponse']
> = {
  data?: Resolver<ResolversTypes['Reporter'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WriteScopeResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['WriteScopeResponse'] = ResolversParentTypes['WriteScopeResponse']
> = {
  data?: Resolver<ResolversTypes['Scope'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WriteSupplierResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['WriteSupplierResponse'] = ResolversParentTypes['WriteSupplierResponse']
> = {
  data?: Resolver<ResolversTypes['Supplier'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  ArchiveAreaResponse?: ArchiveAreaResponseResolvers<ContextType>;
  ArchiveBuilderResponse?: ArchiveBuilderResponseResolvers<ContextType>;
  ArchiveCommunityResponse?: ArchiveCommunityResponseResolvers<ContextType>;
  ArchiveCompanyResponse?: ArchiveCompanyResponseResolvers<ContextType>;
  ArchiveContractorResponse?: ArchiveContractorResponseResolvers<ContextType>;
  ArchiveJobLegacyResponse?: ArchiveJobLegacyResponseResolvers<ContextType>;
  ArchiveReporterResponse?: ArchiveReporterResponseResolvers<ContextType>;
  ArchiveScopeResponse?: ArchiveScopeResponseResolvers<ContextType>;
  ArchiveSupplierResponse?: ArchiveSupplierResponseResolvers<ContextType>;
  Area?: AreaResolvers<ContextType>;
  AreasResponse?: AreasResponseResolvers<ContextType>;
  AssignedContractorsResponse?: AssignedContractorsResponseResolvers<ContextType>;
  Builder?: BuilderResolvers<ContextType>;
  BuildersResponse?: BuildersResponseResolvers<ContextType>;
  CommunitiesResponse?: CommunitiesResponseResolvers<ContextType>;
  Community?: CommunityResolvers<ContextType>;
  CompaniesResponse?: CompaniesResponseResolvers<ContextType>;
  Company?: CompanyResolvers<ContextType>;
  Contractor?: ContractorResolvers<ContextType>;
  ContractorsResponse?: ContractorsResponseResolvers<ContextType>;
  DeleteResponse?: DeleteResponseResolvers<ContextType>;
  FilterResponse?: FilterResponseResolvers<ContextType>;
  JobLegacy?: JobLegacyResolvers<ContextType>;
  JobsLegacyResponse?: JobsLegacyResponseResolvers<ContextType>;
  JobsLegacySendMessageResponse?: JobsLegacySendMessageResponseResolvers<ContextType>;
  LineItemLegacy?: LineItemLegacyResolvers<ContextType>;
  MessageResponse?: MessageResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaginationResponse?: PaginationResponseResolvers<ContextType>;
  PhoneNumber?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Reporter?: ReporterResolvers<ContextType>;
  ReportersResponse?: ReportersResponseResolvers<ContextType>;
  Scope?: ScopeResolvers<ContextType>;
  ScopesResponse?: ScopesResponseResolvers<ContextType>;
  SortResponse?: SortResponseResolvers<ContextType>;
  Supplier?: SupplierResolvers<ContextType>;
  SuppliersResponse?: SuppliersResponseResolvers<ContextType>;
  WriteAreaResponse?: WriteAreaResponseResolvers<ContextType>;
  WriteBuilderResponse?: WriteBuilderResponseResolvers<ContextType>;
  WriteCommunityResponse?: WriteCommunityResponseResolvers<ContextType>;
  WriteCompanyResponse?: WriteCompanyResponseResolvers<ContextType>;
  WriteContractorResponse?: WriteContractorResponseResolvers<ContextType>;
  WriteJobLegacyResponse?: WriteJobLegacyResponseResolvers<ContextType>;
  WriteReporterResponse?: WriteReporterResponseResolvers<ContextType>;
  WriteScopeResponse?: WriteScopeResponseResolvers<ContextType>;
  WriteSupplierResponse?: WriteSupplierResponseResolvers<ContextType>;
};
