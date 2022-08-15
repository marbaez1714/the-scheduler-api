import { gql } from 'apollo-server';

export const typeDefs = gql`
  # Enums
  enum SortOrder {
    asc
    desc
  }

  # Documents
  type Area {
    id: ID!
    name: String!
    nameSpanish: String!
    notes: String

    updatedBy: String!
    createdBy: String!
    createdTime: String!
    updatedTime: String!
    archived: Boolean!
    legacy: Boolean!
  }

  type Builder {
    id: ID!
    name: String!
    primaryPhone: String
    primaryEmail: String
    companyId: String!
    notes: String

    company: Company!

    updatedBy: String!
    createdBy: String!
    createdTime: String!
    updatedTime: String!
    archived: Boolean!
    legacy: Boolean!
  }

  type Community {
    id: ID!
    name: String!
    companyId: String!
    notes: String

    company: Company!

    updatedBy: String!
    createdBy: String!
    createdTime: String!
    updatedTime: String!
    archived: Boolean!
    legacy: Boolean!
  }

  type Company {
    id: ID!
    name: String!
    primaryAddress: String
    primaryEmail: String
    primaryPhone: String
    notes: String

    updatedBy: String!
    createdBy: String!
    createdTime: String!
    updatedTime: String!
    archived: Boolean!
    legacy: Boolean!
  }

  type Contractor {
    id: ID!
    name: String!
    primaryPhone: String!
    notes: String

    jobsLegacy: [JobLegacy!]!

    updatedBy: String!
    createdBy: String!
    createdTime: String!
    updatedTime: String!
    archived: Boolean!
    legacy: Boolean!
  }

  type LineItemLegacy {
    id: ID!
    orderNumber: String!
    supplierId: String!
    jobId: String!

    updatedBy: String!
    createdBy: String!
    createdTime: String!
    updatedTime: String!
    archived: Boolean!
    legacy: Boolean!
  }

  type Reporter {
    id: ID!
    name: String!
    primaryPhone: String!
    primaryEmail: String
    notes: String

    updatedBy: String!
    createdBy: String!
    createdTime: String!
    updatedTime: String!
    archived: Boolean!
    legacy: Boolean!
  }

  type Scope {
    id: ID!
    name: String!
    nameSpanish: String!
    description: String
    notes: String

    updatedBy: String!
    createdBy: String!
    createdTime: String!
    updatedTime: String!
    archived: Boolean!
    legacy: Boolean!
  }

  type Supplier {
    id: ID!
    name: String!
    primaryPhone: String
    notes: String

    updatedBy: String!
    createdBy: String!
    createdTime: String!
    updatedTime: String!
    archived: Boolean!
    legacy: Boolean!
  }

  type JobLegacy {
    id: ID!
    name: String!
    active: Boolean!
    inProgress: Boolean!
    isImportant: Boolean!
    areaId: String
    builderId: String
    communityId: String
    contractorId: String
    reporterId: String
    scopeId: String
    completedDate: String
    startDate: String
    notes: String

    area: Area
    builder: Builder
    community: Community
    contractor: Contractor
    reporter: Reporter
    scope: Scope
    lineItems: [LineItemLegacy!]!

    updatedBy: String!
    createdBy: String!
    createdTime: String!
    updatedTime: String!
    archived: Boolean!
    legacy: Boolean!
  }

  # Inputs
  input CreateAreaInput {
    name: String!
    nameSpanish: String!
    notes: String
  }

  input CreateBuilderInput {
    name: String!
    primaryPhone: String!
    primaryEmail: String
    companyId: String!
    notes: String
  }

  input CreateCommunityInput {
    name: String!
    companyId: String!
    notes: String
  }

  input CreateCompanyInput {
    name: String!
    primaryAddress: String
    primaryEmail: String
    primaryPhone: String
    notes: String
  }

  input CreateContractorInput {
    name: String!
    primaryPhone: String!
    notes: String
  }

  input CreateReporterInput {
    name: String!
    primaryPhone: String!
    primaryEmail: String
    notes: String
  }

  input CreateScopeInput {
    name: String!
    nameSpanish: String!
    description: String
    notes: String
  }

  input CreateSupplierInput {
    name: String!
    primaryPhone: String
    notes: String
  }

  input LineItemLegacyInput {
    orderNumber: String!
    supplierId: String!
  }

  input CreateJobLegacyInput {
    name: String!
    areaId: String
    builderId: String
    communityId: String
    contractorId: String
    reporterId: String
    scopeId: String
    startDate: String
    notes: String
    lineItems: [LineItemLegacyInput!]!
  }

  input UpdateAreaInput {
    name: String
    nameSpanish: String
    notes: String
  }

  input UpdateBuilderInput {
    name: String
    primaryPhone: String
    primaryEmail: String
    companyId: String
    notes: String
  }

  input UpdateCommunityInput {
    name: String
    companyId: String
    notes: String
  }

  input UpdateCompanyInput {
    name: String
    primaryAddress: String
    primaryEmail: String
    primaryPhone: String
    notes: String
  }

  input UpdateContractorInput {
    name: String
    primaryPhone: String
    notes: String
  }

  input PaginationOptions {
    page: Int!
    pageSize: Int!
  }

  input SortingOptions {
    field: String!
    order: SortOrder!
  }

  input QueryOptions {
    pagination: PaginationOptions
    sorting: SortingOptions
    archived: Boolean
  }

  # Responses
  type MessageResponse {
    message: String!
  }

  type SortingResponse {
    field: String!
    order: SortOrder!
  }

  type PaginationResponse {
    page: Int
    pageSize: Int
    totalCount: Int!
  }

  type AreasResponse {
    data: [Area!]!
    pagination: PaginationResponse!
    sorting: SortingResponse
  }

  type BuildersResponse {
    data: [Builder!]!
    pagination: PaginationResponse!
    sorting: SortingResponse
  }

  type CommunitiesResponse {
    data: [Community!]!
    pagination: PaginationResponse!
    sorting: SortingResponse
  }

  type CompaniesResponse {
    data: [Company!]!
    pagination: PaginationResponse!
    sorting: SortingResponse
  }

  type ContractorsResponse {
    data: [Contractor!]!
    pagination: PaginationResponse!
    sorting: SortingResponse
  }

  type ReportersResponse {
    data: [Reporter!]!
    pagination: PaginationResponse!
    sorting: SortingResponse
  }

  type ScopesResponse {
    data: [Scope!]!
    pagination: PaginationResponse!
    sorting: SortingResponse
  }

  type SuppliersResponse {
    data: [Supplier!]!
    pagination: PaginationResponse!
    sorting: SortingResponse
  }

  # Queries
  type Query {
    # Query by id
    areaById(id: ID!): Area
    builderById(id: ID!): Builder
    communityById(id: ID!): Community
    companyById(id: ID!): Company
    contractorById(id: ID!): Contractor
    reporterById(id: ID!): Reporter
    scopeById(id: ID!): Scope
    supplierById(id: ID!): Supplier
    jobLegacyById(id: ID!): JobLegacy

    # Query paginated and sorted
    areas(options: QueryOptions): AreasResponse!
    builders(options: QueryOptions): BuildersResponse!
    communities(options: QueryOptions): CommunitiesResponse!
    companies(options: QueryOptions): CompaniesResponse!
    contractors(options: QueryOptions): ContractorsResponse!
    reporters(options: QueryOptions): ReportersResponse!
    scopes(options: QueryOptions): ScopesResponse!
    suppliers(options: QueryOptions): SuppliersResponse!
  }

  # Mutations
  type Mutation {
    # Create
    createArea(data: CreateAreaInput!): MessageResponse!
    createBuilder(data: CreateBuilderInput!): MessageResponse!
    createCommunity(data: CreateCommunityInput!): MessageResponse!
    createCompany(data: CreateCompanyInput!): MessageResponse!
    createContractor(data: CreateContractorInput!): MessageResponse!
    createReporter(data: CreateReporterInput!): MessageResponse!
    createScope(data: CreateScopeInput!): MessageResponse!
    createSupplier(data: CreateSupplierInput!): MessageResponse!
    createJobLegacy(data: CreateJobLegacyInput!): MessageResponse!
    # Archive
    archiveArea(id: ID!): MessageResponse!
    archiveBuilder(id: ID!): MessageResponse!
    archiveCommunity(id: ID!): MessageResponse!
    archiveCompany(id: ID!): MessageResponse!
    archiveContractor(id: ID!): MessageResponse!
    archiveReporter(id: ID!): MessageResponse!
    archiveScope(id: ID!): MessageResponse!
    archiveSupplier(id: ID!): MessageResponse!
    archiveJobLegacy(id: ID!): MessageResponse!
    # Delete
    deleteLineItemLegacy(id: ID!): MessageResponse!
    # Update
    updateArea(id: ID!, data: UpdateAreaInput!): MessageResponse!
    updateBuilder(id: ID!, data: UpdateBuilderInput!): MessageResponse!
    updateCommunity(id: ID!, data: UpdateCommunityInput!): MessageResponse!
    updateCompany(id: ID!, data: UpdateCompanyInput!): MessageResponse!
    updateContactor(id: ID!, data: UpdateContractorInput!): MessageResponse!
  }
`;
