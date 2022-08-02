import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Metadata {
    updatedBy: String!
    createdBy: String!
    createdTime: String!
    updatedTime: String!
    archived: Boolean!
    legacy: Boolean!
  }

  type Area {
    id: ID!
    name: String!
    nameSpanish: String!
    notes: String

    metadata: Metadata!
  }

  type Builder {
    id: ID!
    name: String!
    primaryPhone: String!
    primaryEmail: String
    companyId: String!
    notes: String

    metadata: Metadata!
  }

  type Community {
    id: ID!
    name: String!
    companyId: String!
    notes: String

    metadata: Metadata!
  }

  type Contractor {
    id: ID!
    name: String!
    primaryPhone: String!
    notes: String

    metadata: Metadata!
  }

  type LineItemLegacy {
    id: ID!
    orderNumber: String!
    supplierId: String!
    jobId: String!

    metadata: Metadata!
  }

  type Reporter {
    id: ID!
    name: String!
    primaryPhone: String!
    primaryEmail: String
    notes: String

    metadata: Metadata!
  }

  type Scope {
    id: ID!
    name: String!
    nameSpanish: String!
    description: String
    notes: String

    metadata: Metadata!
  }

  type Supplier {
    id: ID!
    name: String!
    primaryPhone: String
    notes: String

    metadata: Metadata!
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

    metadata: Metadata!
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

  type Query {
    area(id: ID!): Area
    areas: [Area!]!
    builder(id: ID!): Builder
    builders: [Builder!]!
    community(id: ID!): Community
    communities: [Community!]!
    contractor(id: ID!): Contractor
    contractors: [Contractor!]!
    reporter(id: ID!): Reporter
    reporters: [Reporter!]!
    scope(id: ID!): Scope
    scopes: [Scope!]!
    supplier(id: ID!): Supplier
    suppliers: [Supplier!]!
    jobLegacy(id: ID!): JobLegacy
    jobsLegacy: [JobLegacy!]!
  }

  type Mutation {
    createArea(data: CreateAreaInput!): Area
    createBuilder(data: CreateBuilderInput!): Builder
    createCommunity(data: CreateCommunityInput!): Community
    createContractor(data: CreateContractorInput!): Contractor
    createReporter(data: CreateReporterInput!): Reporter
    createScope(data: CreateScopeInput!): Scope
    createSupplier(data: CreateSupplierInput!): Supplier
    createJobLegacy(data: CreateJobLegacyInput!): JobLegacy
  }
`;
