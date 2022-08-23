import { resolvers as areaResolvers } from './area';
import { resolvers as builderResolvers } from './builder';
import { resolvers as communityResolvers } from './community';
import { resolvers as companyResolvers } from './company';
import { resolvers as contractorResolvers } from './contractor';
import { resolvers as jobLegacyResolvers } from './jobLegacy';
import { resolvers as reporterResolvers } from './reporter';
import { resolvers as scopeResolvers } from './scope';
import { resolvers as supplierResolvers } from './supplier';

export const resolvers = [
  areaResolvers,
  builderResolvers,
  communityResolvers,
  companyResolvers,
  contractorResolvers,
  jobLegacyResolvers,
  reporterResolvers,
  scopeResolvers,
  supplierResolvers,
];
