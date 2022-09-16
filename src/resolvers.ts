import { appResolvers } from './app';
import { areaResolvers } from './area';
import { builderResolvers } from './builder';
import { communityResolvers } from './community';
import { companyResolvers } from './company';
import { contractorResolvers } from './contractor';
import { jobLegacyResolvers } from './jobLegacy';
import { reporterResolvers } from './reporter';
import { scopeResolvers } from './scope';
import { supplierResolvers } from './supplier';

export const resolvers = [
  appResolvers,
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
