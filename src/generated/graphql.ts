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

export type Builder = {
  __typename?: 'Builder';
  archived: Scalars['Boolean'];
  companyId: Scalars['String'];
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

export type Community = {
  __typename?: 'Community';
  archived: Scalars['Boolean'];
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
  legacy: Scalars['Boolean'];
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  primaryPhone: Scalars['String'];
  updatedBy: Scalars['String'];
  updatedTime: Scalars['String'];
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
  areaId?: Maybe<Scalars['String']>;
  builderId?: Maybe<Scalars['String']>;
  communityId?: Maybe<Scalars['String']>;
  completedDate?: Maybe<Scalars['String']>;
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
  reporterId?: Maybe<Scalars['String']>;
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

export type PaginationOptions = {
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  areaById?: Maybe<Area>;
  areas: Array<Area>;
  builderById?: Maybe<Builder>;
  builders: Array<Builder>;
  communities: Array<Community>;
  communityById?: Maybe<Community>;
  companies: Array<Company>;
  companyById?: Maybe<Company>;
  contractorById?: Maybe<Contractor>;
  contractors: Array<Contractor>;
  jobLegacyById?: Maybe<JobLegacy>;
  reporterById?: Maybe<Reporter>;
  reporters: Array<Reporter>;
  scopeById?: Maybe<Scope>;
  scopes: Array<Scope>;
  supplierById?: Maybe<Supplier>;
  suppliers: Array<Supplier>;
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

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type SortingOptions = {
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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Builder: ResolverTypeWrapper<Builder>;
  Community: ResolverTypeWrapper<Community>;
  Company: ResolverTypeWrapper<Company>;
  Contractor: ResolverTypeWrapper<Contractor>;
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
  Query: ResolverTypeWrapper<{}>;
  QueryOptions: QueryOptions;
  Reporter: ResolverTypeWrapper<Reporter>;
  Scope: ResolverTypeWrapper<Scope>;
  SortOrder: SortOrder;
  SortingOptions: SortingOptions;
  String: ResolverTypeWrapper<Scalars['String']>;
  Supplier: ResolverTypeWrapper<Supplier>;
  UpdateAreaInput: UpdateAreaInput;
  UpdateBuilderInput: UpdateBuilderInput;
  UpdateCommunityInput: UpdateCommunityInput;
  UpdateCompanyInput: UpdateCompanyInput;
  UpdateContractorInput: UpdateContractorInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Area: Area;
  Boolean: Scalars['Boolean'];
  Builder: Builder;
  Community: Community;
  Company: Company;
  Contractor: Contractor;
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
  Query: {};
  QueryOptions: QueryOptions;
  Reporter: Reporter;
  Scope: Scope;
  SortingOptions: SortingOptions;
  String: Scalars['String'];
  Supplier: Supplier;
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

export type BuilderResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Builder'] = ResolversParentTypes['Builder']
> = {
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  companyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export type CommunityResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Community'] = ResolversParentTypes['Community']
> = {
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
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
  legacy?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primaryPhone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JobLegacyResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['JobLegacy'] = ResolversParentTypes['JobLegacy']
> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  archived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  areaId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  builderId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  communityId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  completedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  reporterId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
};

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  areaById?: Resolver<Maybe<ResolversTypes['Area']>, ParentType, ContextType, RequireFields<QueryAreaByIdArgs, 'id'>>;
  areas?: Resolver<Array<ResolversTypes['Area']>, ParentType, ContextType, Partial<QueryAreasArgs>>;
  builderById?: Resolver<
    Maybe<ResolversTypes['Builder']>,
    ParentType,
    ContextType,
    RequireFields<QueryBuilderByIdArgs, 'id'>
  >;
  builders?: Resolver<Array<ResolversTypes['Builder']>, ParentType, ContextType, Partial<QueryBuildersArgs>>;
  communities?: Resolver<Array<ResolversTypes['Community']>, ParentType, ContextType, Partial<QueryCommunitiesArgs>>;
  communityById?: Resolver<
    Maybe<ResolversTypes['Community']>,
    ParentType,
    ContextType,
    RequireFields<QueryCommunityByIdArgs, 'id'>
  >;
  companies?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType, Partial<QueryCompaniesArgs>>;
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
  contractors?: Resolver<Array<ResolversTypes['Contractor']>, ParentType, ContextType, Partial<QueryContractorsArgs>>;
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
  reporters?: Resolver<Array<ResolversTypes['Reporter']>, ParentType, ContextType, Partial<QueryReportersArgs>>;
  scopeById?: Resolver<
    Maybe<ResolversTypes['Scope']>,
    ParentType,
    ContextType,
    RequireFields<QueryScopeByIdArgs, 'id'>
  >;
  scopes?: Resolver<Array<ResolversTypes['Scope']>, ParentType, ContextType, Partial<QueryScopesArgs>>;
  supplierById?: Resolver<
    Maybe<ResolversTypes['Supplier']>,
    ParentType,
    ContextType,
    RequireFields<QuerySupplierByIdArgs, 'id'>
  >;
  suppliers?: Resolver<Array<ResolversTypes['Supplier']>, ParentType, ContextType, Partial<QuerySuppliersArgs>>;
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

export type Resolvers<ContextType = Context> = {
  Area?: AreaResolvers<ContextType>;
  Builder?: BuilderResolvers<ContextType>;
  Community?: CommunityResolvers<ContextType>;
  Company?: CompanyResolvers<ContextType>;
  Contractor?: ContractorResolvers<ContextType>;
  JobLegacy?: JobLegacyResolvers<ContextType>;
  LineItemLegacy?: LineItemLegacyResolvers<ContextType>;
  MessageResponse?: MessageResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Reporter?: ReporterResolvers<ContextType>;
  Scope?: ScopeResolvers<ContextType>;
  Supplier?: SupplierResolvers<ContextType>;
};
