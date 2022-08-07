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
  lineItems: Array<InputMaybe<LineItemLegacyInput>>;
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

export type Mutation = {
  __typename?: 'Mutation';
  archiveArea?: Maybe<Scalars['Boolean']>;
  archiveBuilder?: Maybe<Scalars['Boolean']>;
  archiveCommunity?: Maybe<Scalars['Boolean']>;
  archiveCompany?: Maybe<Scalars['Boolean']>;
  archiveContractor?: Maybe<Scalars['Boolean']>;
  archiveJobLegacy?: Maybe<Scalars['Boolean']>;
  archiveReporter?: Maybe<Scalars['Boolean']>;
  archiveScope?: Maybe<Scalars['Boolean']>;
  archiveSupplier?: Maybe<Scalars['Boolean']>;
  createArea?: Maybe<Area>;
  createBuilder?: Maybe<Builder>;
  createCommunity?: Maybe<Community>;
  createCompany?: Maybe<Company>;
  createContractor?: Maybe<Contractor>;
  createJobLegacy?: Maybe<JobLegacy>;
  createReporter?: Maybe<Reporter>;
  createScope?: Maybe<Scope>;
  createSupplier?: Maybe<Supplier>;
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

export type Query = {
  __typename?: 'Query';
  areaById?: Maybe<Area>;
  areasAll: Array<Area>;
  builderById?: Maybe<Builder>;
  buildersAll: Array<Builder>;
  communitiesAll: Array<Community>;
  communityById?: Maybe<Community>;
  companiesAll: Array<Company>;
  companyById?: Maybe<Company>;
  contractorById?: Maybe<Contractor>;
  contractorsAll: Array<Contractor>;
  jobLegacyById?: Maybe<JobLegacy>;
  jobsLegacyAll: Array<JobLegacy>;
  reporterById?: Maybe<Reporter>;
  reportersAll: Array<Reporter>;
  scopeById?: Maybe<Scope>;
  scopesAll: Array<Scope>;
  supplierById?: Maybe<Supplier>;
  suppliersAll: Array<Supplier>;
};

export type QueryAreaByIdArgs = {
  id: Scalars['ID'];
};

export type QueryBuilderByIdArgs = {
  id: Scalars['ID'];
};

export type QueryCommunityByIdArgs = {
  id: Scalars['ID'];
};

export type QueryCompanyByIdArgs = {
  id: Scalars['ID'];
};

export type QueryContractorByIdArgs = {
  id: Scalars['ID'];
};

export type QueryJobLegacyByIdArgs = {
  id: Scalars['ID'];
};

export type QueryReporterByIdArgs = {
  id: Scalars['ID'];
};

export type QueryScopeByIdArgs = {
  id: Scalars['ID'];
};

export type QuerySupplierByIdArgs = {
  id: Scalars['ID'];
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
  JobLegacy: ResolverTypeWrapper<JobLegacy>;
  LineItemLegacy: ResolverTypeWrapper<LineItemLegacy>;
  LineItemLegacyInput: LineItemLegacyInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Reporter: ResolverTypeWrapper<Reporter>;
  Scope: ResolverTypeWrapper<Scope>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Supplier: ResolverTypeWrapper<Supplier>;
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
  JobLegacy: JobLegacy;
  LineItemLegacy: LineItemLegacy;
  LineItemLegacyInput: LineItemLegacyInput;
  Mutation: {};
  Query: {};
  Reporter: Reporter;
  Scope: Scope;
  String: Scalars['String'];
  Supplier: Supplier;
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

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  archiveArea?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationArchiveAreaArgs, 'id'>
  >;
  archiveBuilder?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationArchiveBuilderArgs, 'id'>
  >;
  archiveCommunity?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationArchiveCommunityArgs, 'id'>
  >;
  archiveCompany?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationArchiveCompanyArgs, 'id'>
  >;
  archiveContractor?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationArchiveContractorArgs, 'id'>
  >;
  archiveJobLegacy?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationArchiveJobLegacyArgs, 'id'>
  >;
  archiveReporter?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationArchiveReporterArgs, 'id'>
  >;
  archiveScope?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationArchiveScopeArgs, 'id'>
  >;
  archiveSupplier?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationArchiveSupplierArgs, 'id'>
  >;
  createArea?: Resolver<
    Maybe<ResolversTypes['Area']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateAreaArgs, 'data'>
  >;
  createBuilder?: Resolver<
    Maybe<ResolversTypes['Builder']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateBuilderArgs, 'data'>
  >;
  createCommunity?: Resolver<
    Maybe<ResolversTypes['Community']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateCommunityArgs, 'data'>
  >;
  createCompany?: Resolver<
    Maybe<ResolversTypes['Company']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateCompanyArgs, 'data'>
  >;
  createContractor?: Resolver<
    Maybe<ResolversTypes['Contractor']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateContractorArgs, 'data'>
  >;
  createJobLegacy?: Resolver<
    Maybe<ResolversTypes['JobLegacy']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateJobLegacyArgs, 'data'>
  >;
  createReporter?: Resolver<
    Maybe<ResolversTypes['Reporter']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateReporterArgs, 'data'>
  >;
  createScope?: Resolver<
    Maybe<ResolversTypes['Scope']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateScopeArgs, 'data'>
  >;
  createSupplier?: Resolver<
    Maybe<ResolversTypes['Supplier']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateSupplierArgs, 'data'>
  >;
};

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  areaById?: Resolver<Maybe<ResolversTypes['Area']>, ParentType, ContextType, RequireFields<QueryAreaByIdArgs, 'id'>>;
  areasAll?: Resolver<Array<ResolversTypes['Area']>, ParentType, ContextType>;
  builderById?: Resolver<
    Maybe<ResolversTypes['Builder']>,
    ParentType,
    ContextType,
    RequireFields<QueryBuilderByIdArgs, 'id'>
  >;
  buildersAll?: Resolver<Array<ResolversTypes['Builder']>, ParentType, ContextType>;
  communitiesAll?: Resolver<Array<ResolversTypes['Community']>, ParentType, ContextType>;
  communityById?: Resolver<
    Maybe<ResolversTypes['Community']>,
    ParentType,
    ContextType,
    RequireFields<QueryCommunityByIdArgs, 'id'>
  >;
  companiesAll?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType>;
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
  contractorsAll?: Resolver<Array<ResolversTypes['Contractor']>, ParentType, ContextType>;
  jobLegacyById?: Resolver<
    Maybe<ResolversTypes['JobLegacy']>,
    ParentType,
    ContextType,
    RequireFields<QueryJobLegacyByIdArgs, 'id'>
  >;
  jobsLegacyAll?: Resolver<Array<ResolversTypes['JobLegacy']>, ParentType, ContextType>;
  reporterById?: Resolver<
    Maybe<ResolversTypes['Reporter']>,
    ParentType,
    ContextType,
    RequireFields<QueryReporterByIdArgs, 'id'>
  >;
  reportersAll?: Resolver<Array<ResolversTypes['Reporter']>, ParentType, ContextType>;
  scopeById?: Resolver<
    Maybe<ResolversTypes['Scope']>,
    ParentType,
    ContextType,
    RequireFields<QueryScopeByIdArgs, 'id'>
  >;
  scopesAll?: Resolver<Array<ResolversTypes['Scope']>, ParentType, ContextType>;
  supplierById?: Resolver<
    Maybe<ResolversTypes['Supplier']>,
    ParentType,
    ContextType,
    RequireFields<QuerySupplierByIdArgs, 'id'>
  >;
  suppliersAll?: Resolver<Array<ResolversTypes['Supplier']>, ParentType, ContextType>;
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
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Reporter?: ReporterResolvers<ContextType>;
  Scope?: ScopeResolvers<ContextType>;
  Supplier?: SupplierResolvers<ContextType>;
};
