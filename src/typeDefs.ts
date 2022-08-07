import { gql } from 'apollo-server';

export const typeDefs = gql`
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
    primaryPhone: String!
    primaryEmail: String
    companyId: String!
    notes: String

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

    updatedBy: String!
    createdBy: String!
    createdTime: String!
    updatedTime: String!
    archived: Boolean!
    legacy: Boolean!
  }

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
    lineItems: [LineItemLegacyInput]!
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

  type Query {
    areasAll: [Area!]!
    buildersAll: [Builder!]!
    communitiesAll: [Community!]!
    companiesAll: [Company!]!
    contractorsAll: [Contractor!]!
    reportersAll: [Reporter!]!
    scopesAll: [Scope!]!
    suppliersAll: [Supplier!]!
    jobsLegacyAll: [JobLegacy!]!

    areaById(id: ID!): Area
    builderById(id: ID!): Builder
    communityById(id: ID!): Community
    companyById(id: ID!): Company
    contractorById(id: ID!): Contractor
    reporterById(id: ID!): Reporter
    scopeById(id: ID!): Scope
    supplierById(id: ID!): Supplier
    jobLegacyById(id: ID!): JobLegacy
  }

  type Mutation {
    createArea(data: CreateAreaInput!): Area
    createBuilder(data: CreateBuilderInput!): Builder
    createCommunity(data: CreateCommunityInput!): Community
    createCompany(data: CreateCompanyInput!): Company
    createContractor(data: CreateContractorInput!): Contractor
    createReporter(data: CreateReporterInput!): Reporter
    createScope(data: CreateScopeInput!): Scope
    createSupplier(data: CreateSupplierInput!): Supplier
    createJobLegacy(data: CreateJobLegacyInput!): JobLegacy

    archiveArea(id: ID!): Boolean
    archiveBuilder(id: ID!): Boolean
    archiveCommunity(id: ID!): Boolean
    archiveCompany(id: ID!): Boolean
    archiveContractor(id: ID!): Boolean
    archiveReporter(id: ID!): Boolean
    archiveScope(id: ID!): Boolean
    archiveSupplier(id: ID!): Boolean
    archiveJobLegacy(id: ID!): Boolean
  }
`;
