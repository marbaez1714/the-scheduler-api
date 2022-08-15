import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../context';
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
  areas: Array<Area>;
  pagination: PaginationResponse;
  sorting?: Maybe<SortingResponse>;
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
  primaryPhone?: Maybe<Scalars['String']>;
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
};

export type BuildersResponse = {
  __typename?: 'BuildersResponse';
  builders: Array<Builder>;
  pagination: PaginationResponse;
  sorting?: Maybe<SortingResponse>;
};

export type CommunitiesResponse = {
  __typename?: 'CommunitiesResponse';
  communities: Array<Community>;
  pagination: PaginationResponse;
  sorting?: Maybe<SortingResponse>;
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
  companies: Array<Company>;
  pagination: PaginationResponse;
  sorting?: Maybe<SortingResponse>;
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
  primaryPhone?: Maybe<Scalars['String']>;
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
  primaryPhone: Scalars['String'];
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
};

export type ContractorsResponse = {
  __typename?: 'ContractorsResponse';
  contractors: Array<Contractor>;
  pagination: PaginationResponse;
  sorting?: Maybe<SortingResponse>;
};

export type CreateAreaInput = {
  name: Scalars['String'];
  nameSpanish: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
};

export type CreateBuilderInput = {
  companyId: Scalars['String'];
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  primaryEmail?: InputMaybe<Scalars['String']>;
  primaryPhone: Scalars['String'];
};

export type CreateCommunityInput = {
  companyId: Scalars['String'];
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
};

export type CreateCompanyInput = {
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  primaryAddress?: InputMaybe<Scalars['String']>;
  primaryEmail?: InputMaybe<Scalars['String']>;
  primaryPhone?: InputMaybe<Scalars['String']>;
};

export type CreateContractorInput = {
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  primaryPhone: Scalars['String'];
};

export type CreateJobLegacyInput = {
  areaId?: InputMaybe<Scalars['String']>;
  builderId?: InputMaybe<Scalars['String']>;
  communityId?: InputMaybe<Scalars['String']>;
  contractorId?: InputMaybe<Scalars['String']>;
  lineItems: Array<LineItemLegacyInput>;
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  reporterId?: InputMaybe<Scalars['String']>;
  scopeId?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['String']>;
};

export type CreateReporterInput = {
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  primaryEmail?: InputMaybe<Scalars['String']>;
  primaryPhone: Scalars['String'];
};

export type CreateScopeInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  nameSpanish: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
};

export type CreateSupplierInput = {
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  primaryPhone?: InputMaybe<Scalars['String']>;
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
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
};

export type LineItemLegacy = {
  __typename?: 'LineItemLegacy';
  archived: Scalars['Boolean'];
  createdBy: Scalars['String'];
  createdTime: Scalars['String'];
  id: Scalars['ID'];
  jobId: Scalars['String'];
  legacy: Scalars['Boolean'];
  orderNumber: Scalars['String'];
  supplierId: Scalars['String'];
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
};

export type LineItemLegacyInput = {
  orderNumber: Scalars['String'];
  supplierId: Scalars['String'];
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  archiveArea: MessageResponse;
  archiveBuilder: MessageResponse;
  archiveCommunity: MessageResponse;
  archiveCompany: MessageResponse;
  archiveContractor: MessageResponse;
  archiveJobLegacy: MessageResponse;
  archiveReporter: MessageResponse;
  archiveScope: MessageResponse;
  archiveSupplier: MessageResponse;
  createArea: MessageResponse;
  createBuilder: MessageResponse;
  createCommunity: MessageResponse;
  createCompany: MessageResponse;
  createContractor: MessageResponse;
  createJobLegacy: MessageResponse;
  createReporter: MessageResponse;
  createScope: MessageResponse;
  createSupplier: MessageResponse;
  deleteLineItemLegacy: MessageResponse;
  updateArea: MessageResponse;
  updateBuilder: MessageResponse;
  updateCommunity: MessageResponse;
  updateCompany: MessageResponse;
  updateContactor: MessageResponse;
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
  data: CreateAreaInput;
};

export type MutationCreateBuilderArgs = {
  data: CreateBuilderInput;
};

export type MutationCreateCommunityArgs = {
  data: CreateCommunityInput;
};

export type MutationCreateCompanyArgs = {
  data: CreateCompanyInput;
};

export type MutationCreateContractorArgs = {
  data: CreateContractorInput;
};

export type MutationCreateJobLegacyArgs = {
  data: CreateJobLegacyInput;
};

export type MutationCreateReporterArgs = {
  data: CreateReporterInput;
};

export type MutationCreateScopeArgs = {
  data: CreateScopeInput;
};

export type MutationCreateSupplierArgs = {
  data: CreateSupplierInput;
};

export type MutationDeleteLineItemLegacyArgs = {
  id: Scalars['ID'];
};

export type MutationUpdateAreaArgs = {
  data: UpdateAreaInput;
  id: Scalars['ID'];
};

export type MutationUpdateBuilderArgs = {
  data: UpdateBuilderInput;
  id: Scalars['ID'];
};

export type MutationUpdateCommunityArgs = {
  data: UpdateCommunityInput;
  id: Scalars['ID'];
};

export type MutationUpdateCompanyArgs = {
  data: UpdateCompanyInput;
  id: Scalars['ID'];
};

export type MutationUpdateContactorArgs = {
  data: UpdateContractorInput;
  id: Scalars['ID'];
};

export type PaginationOptions = {
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export type PaginationResponse = {
  __typename?: 'PaginationResponse';
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  areaById?: Maybe<Area>;
  areas: AreasResponse;
  builderById?: Maybe<Builder>;
  builders: BuildersResponse;
  communities: CommunitiesResponse;
  communityById?: Maybe<Community>;
  companies: CompaniesResponse;
  companyById?: Maybe<Company>;
  contractorById?: Maybe<Contractor>;
  contractors: ContractorsResponse;
  jobLegacyById?: Maybe<JobLegacy>;
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
  options?: InputMaybe<QueryOptions>;
};

export type QueryBuilderByIdArgs = {
  id: Scalars['ID'];
};

export type QueryBuildersArgs = {
  options?: InputMaybe<QueryOptions>;
};

export type QueryCommunitiesArgs = {
  options?: InputMaybe<QueryOptions>;
};

export type QueryCommunityByIdArgs = {
  id: Scalars['ID'];
};

export type QueryCompaniesArgs = {
  options?: InputMaybe<QueryOptions>;
};

export type QueryCompanyByIdArgs = {
  id: Scalars['ID'];
};

export type QueryContractorByIdArgs = {
  id: Scalars['ID'];
};

export type QueryContractorsArgs = {
  options?: InputMaybe<QueryOptions>;
};

export type QueryJobLegacyByIdArgs = {
  id: Scalars['ID'];
};

export type QueryReporterByIdArgs = {
  id: Scalars['ID'];
};

export type QueryReportersArgs = {
  options?: InputMaybe<QueryOptions>;
};

export type QueryScopeByIdArgs = {
  id: Scalars['ID'];
};

export type QueryScopesArgs = {
  options?: InputMaybe<QueryOptions>;
};

export type QuerySupplierByIdArgs = {
  id: Scalars['ID'];
};

export type QuerySuppliersArgs = {
  options?: InputMaybe<QueryOptions>;
};

export type QueryOptions = {
  archived?: InputMaybe<Scalars['Boolean']>;
  pagination?: InputMaybe<PaginationOptions>;
  sorting?: InputMaybe<SortingOptions>;
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
  primaryPhone: Scalars['String'];
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
};

export type ReportersResponse = {
  __typename?: 'ReportersResponse';
  pagination: PaginationResponse;
  reporters: Array<Reporter>;
  sorting?: Maybe<SortingResponse>;
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
  pagination: PaginationResponse;
  scopes: Array<Scope>;
  sorting?: Maybe<SortingResponse>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type SortingOptions = {
  field: Scalars['String'];
  order: SortOrder;
};

export type SortingResponse = {
  __typename?: 'SortingResponse';
  field: Scalars['String'];
  order: SortOrder;
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
  primaryPhone?: Maybe<Scalars['String']>;
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
};

export type SuppliersResponse = {
  __typename?: 'SuppliersResponse';
  pagination: PaginationResponse;
  sorting?: Maybe<SortingResponse>;
  suppliers: Array<Supplier>;
};

export type UpdateAreaInput = {
  name?: InputMaybe<Scalars['String']>;
  nameSpanish?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
};

export type UpdateBuilderInput = {
  companyId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  primaryEmail?: InputMaybe<Scalars['String']>;
  primaryPhone?: InputMaybe<Scalars['String']>;
};

export type UpdateCommunityInput = {
  companyId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
};

export type UpdateCompanyInput = {
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  primaryAddress?: InputMaybe<Scalars['String']>;
  primaryEmail?: InputMaybe<Scalars['String']>;
  primaryPhone?: InputMaybe<Scalars['String']>;
};

export type UpdateContractorInput = {
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  primaryPhone?: InputMaybe<Scalars['String']>;
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

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
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

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
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
  Area: ResolverTypeWrapper<Area>;
  AreasResponse: ResolverTypeWrapper<AreasResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Builder: ResolverTypeWrapper<Builder>;
  BuildersResponse: ResolverTypeWrapper<BuildersResponse>;
  CommunitiesResponse: ResolverTypeWrapper<CommunitiesResponse>;
  Community: ResolverTypeWrapper<Community>;
  CompaniesResponse: ResolverTypeWrapper<CompaniesResponse>;
  Company: ResolverTypeWrapper<Company>;
  Contractor: ResolverTypeWrapper<Contractor>;
  ContractorsResponse: ResolverTypeWrapper<ContractorsResponse>;
  CreateAreaInput: CreateAreaInput;
  CreateBuilderInput: CreateBuilderInput;
  CreateCommunityInput: CreateCommunityInput;
  CreateCompanyInput: CreateCompanyInput;
  CreateContractorInput: CreateContractorInput;
  CreateJobLegacyInput: CreateJobLegacyInput;
  CreateReporterInput: CreateReporterInput;
  CreateScopeInput: CreateScopeInput;
  CreateSupplierInput: CreateSupplierInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JobLegacy: ResolverTypeWrapper<JobLegacy>;
  LineItemLegacy: ResolverTypeWrapper<LineItemLegacy>;
  LineItemLegacyInput: LineItemLegacyInput;
  MessageResponse: ResolverTypeWrapper<MessageResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  PaginationOptions: PaginationOptions;
  PaginationResponse: ResolverTypeWrapper<PaginationResponse>;
  Query: ResolverTypeWrapper<{}>;
  QueryOptions: QueryOptions;
  Reporter: ResolverTypeWrapper<Reporter>;
  ReportersResponse: ResolverTypeWrapper<ReportersResponse>;
  Scope: ResolverTypeWrapper<Scope>;
  ScopesResponse: ResolverTypeWrapper<ScopesResponse>;
  SortOrder: SortOrder;
  SortingOptions: SortingOptions;
  SortingResponse: ResolverTypeWrapper<SortingResponse>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Supplier: ResolverTypeWrapper<Supplier>;
  SuppliersResponse: ResolverTypeWrapper<SuppliersResponse>;
  UpdateAreaInput: UpdateAreaInput;
  UpdateBuilderInput: UpdateBuilderInput;
  UpdateCommunityInput: UpdateCommunityInput;
  UpdateCompanyInput: UpdateCompanyInput;
  UpdateContractorInput: UpdateContractorInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Area: Area;
  AreasResponse: AreasResponse;
  Boolean: Scalars['Boolean'];
  Builder: Builder;
  BuildersResponse: BuildersResponse;
  CommunitiesResponse: CommunitiesResponse;
  Community: Community;
  CompaniesResponse: CompaniesResponse;
  Company: Company;
  Contractor: Contractor;
  ContractorsResponse: ContractorsResponse;
  CreateAreaInput: CreateAreaInput;
  CreateBuilderInput: CreateBuilderInput;
  CreateCommunityInput: CreateCommunityInput;
  CreateCompanyInput: CreateCompanyInput;
  CreateContractorInput: CreateContractorInput;
  CreateJobLegacyInput: CreateJobLegacyInput;
  CreateReporterInput: CreateReporterInput;
  CreateScopeInput: CreateScopeInput;
  CreateSupplierInput: CreateSupplierInput;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  JobLegacy: JobLegacy;
  LineItemLegacy: LineItemLegacy;
  LineItemLegacyInput: LineItemLegacyInput;
  MessageResponse: MessageResponse;
  Mutation: {};
  PaginationOptions: PaginationOptions;
  PaginationResponse: PaginationResponse;
  Query: {};
  QueryOptions: QueryOptions;
  Reporter: Reporter;
  ReportersResponse: ReportersResponse;
  Scope: Scope;
  ScopesResponse: ScopesResponse;
  SortingOptions: SortingOptions;
  SortingResponse: SortingResponse;
  String: Scalars['String'];
  Supplier: Supplier;
  SuppliersResponse: SuppliersResponse;
  UpdateAreaInput: UpdateAreaInput;
  UpdateBuilderInput: UpdateBuilderInput;
  UpdateCommunityInput: UpdateCommunityInput;
  UpdateCompanyInput: UpdateCompanyInput;
  UpdateContractorInput: UpdateContractorInput;
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
  areas?: Resolver<Array<ResolversTypes['Area']>, ParentType, ContextType>;
  pagination?: Resolver<ResolversTypes['PaginationResponse'], ParentType, ContextType>;
  sorting?: Resolver<Maybe<ResolversTypes['SortingResponse']>, ParentType, ContextType>;
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
  primaryPhone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BuildersResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['BuildersResponse'] = ResolversParentTypes['BuildersResponse']
> = {
  builders?: Resolver<Array<ResolversTypes['Builder']>, ParentType, ContextType>;
  pagination?: Resolver<ResolversTypes['PaginationResponse'], ParentType, ContextType>;
  sorting?: Resolver<Maybe<ResolversTypes['SortingResponse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunitiesResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CommunitiesResponse'] = ResolversParentTypes['CommunitiesResponse']
> = {
  communities?: Resolver<Array<ResolversTypes['Community']>, ParentType, ContextType>;
  pagination?: Resolver<ResolversTypes['PaginationResponse'], ParentType, ContextType>;
  sorting?: Resolver<Maybe<ResolversTypes['SortingResponse']>, ParentType, ContextType>;
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
  companies?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType>;
  pagination?: Resolver<ResolversTypes['PaginationResponse'], ParentType, ContextType>;
  sorting?: Resolver<Maybe<ResolversTypes['SortingResponse']>, ParentType, ContextType>;
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
  primaryPhone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  primaryPhone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContractorsResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ContractorsResponse'] = ResolversParentTypes['ContractorsResponse']
> = {
  contractors?: Resolver<Array<ResolversTypes['Contractor']>, ParentType, ContextType>;
  pagination?: Resolver<ResolversTypes['PaginationResponse'], ParentType, ContextType>;
  sorting?: Resolver<Maybe<ResolversTypes['SortingResponse']>, ParentType, ContextType>;
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
  updatedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LineItemLegacyResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['LineItemLegacy'] = ResolversParentTypes['LineItemLegacy']
> = {
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  jobId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  legacy?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  orderNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
    ResolversTypes['MessageResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationArchiveAreaArgs, 'id'>
  >;
  archiveBuilder?: Resolver<
    ResolversTypes['MessageResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationArchiveBuilderArgs, 'id'>
  >;
  archiveCommunity?: Resolver<
    ResolversTypes['MessageResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationArchiveCommunityArgs, 'id'>
  >;
  archiveCompany?: Resolver<
    ResolversTypes['MessageResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationArchiveCompanyArgs, 'id'>
  >;
  archiveContractor?: Resolver<
    ResolversTypes['MessageResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationArchiveContractorArgs, 'id'>
  >;
  archiveJobLegacy?: Resolver<
    ResolversTypes['MessageResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationArchiveJobLegacyArgs, 'id'>
  >;
  archiveReporter?: Resolver<
    ResolversTypes['MessageResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationArchiveReporterArgs, 'id'>
  >;
  archiveScope?: Resolver<
    ResolversTypes['MessageResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationArchiveScopeArgs, 'id'>
  >;
  archiveSupplier?: Resolver<
    ResolversTypes['MessageResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationArchiveSupplierArgs, 'id'>
  >;
  createArea?: Resolver<
    ResolversTypes['MessageResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateAreaArgs, 'data'>
  >;
  createBuilder?: Resolver<
    ResolversTypes['MessageResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateBuilderArgs, 'data'>
  >;
  createCommunity?: Resolver<
    ResolversTypes['MessageResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCommunityArgs, 'data'>
  >;
  createCompany?: Resolver<
    ResolversTypes['MessageResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCompanyArgs, 'data'>
  >;
  createContractor?: Resolver<
    ResolversTypes['MessageResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateContractorArgs, 'data'>
  >;
  createJobLegacy?: Resolver<
    ResolversTypes['MessageResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateJobLegacyArgs, 'data'>
  >;
  createReporter?: Resolver<
    ResolversTypes['MessageResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateReporterArgs, 'data'>
  >;
  createScope?: Resolver<
    ResolversTypes['MessageResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateScopeArgs, 'data'>
  >;
  createSupplier?: Resolver<
    ResolversTypes['MessageResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateSupplierArgs, 'data'>
  >;
  deleteLineItemLegacy?: Resolver<
    ResolversTypes['MessageResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteLineItemLegacyArgs, 'id'>
  >;
  updateArea?: Resolver<
    ResolversTypes['MessageResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateAreaArgs, 'data' | 'id'>
  >;
  updateBuilder?: Resolver<
    ResolversTypes['MessageResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateBuilderArgs, 'data' | 'id'>
  >;
  updateCommunity?: Resolver<
    ResolversTypes['MessageResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCommunityArgs, 'data' | 'id'>
  >;
  updateCompany?: Resolver<
    ResolversTypes['MessageResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCompanyArgs, 'data' | 'id'>
  >;
  updateContactor?: Resolver<
    ResolversTypes['MessageResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateContactorArgs, 'data' | 'id'>
  >;
};

export type PaginationResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PaginationResponse'] = ResolversParentTypes['PaginationResponse']
> = {
  page?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  pageSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  areaById?: Resolver<Maybe<ResolversTypes['Area']>, ParentType, ContextType, RequireFields<QueryAreaByIdArgs, 'id'>>;
  areas?: Resolver<ResolversTypes['AreasResponse'], ParentType, ContextType, Partial<QueryAreasArgs>>;
  builderById?: Resolver<
    Maybe<ResolversTypes['Builder']>,
    ParentType,
    ContextType,
    RequireFields<QueryBuilderByIdArgs, 'id'>
  >;
  builders?: Resolver<ResolversTypes['BuildersResponse'], ParentType, ContextType, Partial<QueryBuildersArgs>>;
  communities?: Resolver<ResolversTypes['CommunitiesResponse'], ParentType, ContextType, Partial<QueryCommunitiesArgs>>;
  communityById?: Resolver<
    Maybe<ResolversTypes['Community']>,
    ParentType,
    ContextType,
    RequireFields<QueryCommunityByIdArgs, 'id'>
  >;
  companies?: Resolver<ResolversTypes['CompaniesResponse'], ParentType, ContextType, Partial<QueryCompaniesArgs>>;
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
  contractors?: Resolver<ResolversTypes['ContractorsResponse'], ParentType, ContextType, Partial<QueryContractorsArgs>>;
  jobLegacyById?: Resolver<
    Maybe<ResolversTypes['JobLegacy']>,
    ParentType,
    ContextType,
    RequireFields<QueryJobLegacyByIdArgs, 'id'>
  >;
  reporterById?: Resolver<
    Maybe<ResolversTypes['Reporter']>,
    ParentType,
    ContextType,
    RequireFields<QueryReporterByIdArgs, 'id'>
  >;
  reporters?: Resolver<ResolversTypes['ReportersResponse'], ParentType, ContextType, Partial<QueryReportersArgs>>;
  scopeById?: Resolver<
    Maybe<ResolversTypes['Scope']>,
    ParentType,
    ContextType,
    RequireFields<QueryScopeByIdArgs, 'id'>
  >;
  scopes?: Resolver<ResolversTypes['ScopesResponse'], ParentType, ContextType, Partial<QueryScopesArgs>>;
  supplierById?: Resolver<
    Maybe<ResolversTypes['Supplier']>,
    ParentType,
    ContextType,
    RequireFields<QuerySupplierByIdArgs, 'id'>
  >;
  suppliers?: Resolver<ResolversTypes['SuppliersResponse'], ParentType, ContextType, Partial<QuerySuppliersArgs>>;
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
  primaryPhone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReportersResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ReportersResponse'] = ResolversParentTypes['ReportersResponse']
> = {
  pagination?: Resolver<ResolversTypes['PaginationResponse'], ParentType, ContextType>;
  reporters?: Resolver<Array<ResolversTypes['Reporter']>, ParentType, ContextType>;
  sorting?: Resolver<Maybe<ResolversTypes['SortingResponse']>, ParentType, ContextType>;
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
  pagination?: Resolver<ResolversTypes['PaginationResponse'], ParentType, ContextType>;
  scopes?: Resolver<Array<ResolversTypes['Scope']>, ParentType, ContextType>;
  sorting?: Resolver<Maybe<ResolversTypes['SortingResponse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SortingResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['SortingResponse'] = ResolversParentTypes['SortingResponse']
> = {
  field?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['SortOrder'], ParentType, ContextType>;
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
  primaryPhone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SuppliersResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['SuppliersResponse'] = ResolversParentTypes['SuppliersResponse']
> = {
  pagination?: Resolver<ResolversTypes['PaginationResponse'], ParentType, ContextType>;
  sorting?: Resolver<Maybe<ResolversTypes['SortingResponse']>, ParentType, ContextType>;
  suppliers?: Resolver<Array<ResolversTypes['Supplier']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Area?: AreaResolvers<ContextType>;
  AreasResponse?: AreasResponseResolvers<ContextType>;
  Builder?: BuilderResolvers<ContextType>;
  BuildersResponse?: BuildersResponseResolvers<ContextType>;
  CommunitiesResponse?: CommunitiesResponseResolvers<ContextType>;
  Community?: CommunityResolvers<ContextType>;
  CompaniesResponse?: CompaniesResponseResolvers<ContextType>;
  Company?: CompanyResolvers<ContextType>;
  Contractor?: ContractorResolvers<ContextType>;
  ContractorsResponse?: ContractorsResponseResolvers<ContextType>;
  JobLegacy?: JobLegacyResolvers<ContextType>;
  LineItemLegacy?: LineItemLegacyResolvers<ContextType>;
  MessageResponse?: MessageResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaginationResponse?: PaginationResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Reporter?: ReporterResolvers<ContextType>;
  ReportersResponse?: ReportersResponseResolvers<ContextType>;
  Scope?: ScopeResolvers<ContextType>;
  ScopesResponse?: ScopesResponseResolvers<ContextType>;
  SortingResponse?: SortingResponseResolvers<ContextType>;
  Supplier?: SupplierResolvers<ContextType>;
  SuppliersResponse?: SuppliersResponseResolvers<ContextType>;
};
