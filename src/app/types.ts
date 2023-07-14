import {
  Builder as BuilderModel,
  Community as CommunityModel,
  Company as CompanyModel,
  Contractor as ContractorModel,
  JobLegacy as JobLegacyModel,
  LineItemLegacy as LineItemLegacyModel,
  Supplier as SupplierModel,
} from '@prisma/client';

/******************************/
/* Enums                      */
/******************************/
export enum PermissionsEnum {
  Admin = 'admin',
}

export type PrismaClients =
  | 'area'
  | 'builder'
  | 'community'
  | 'company'
  | 'contractor'
  | 'jobLegacy'
  | 'lineItemLegacy'
  | 'reporter'
  | 'scope'
  | 'supplier';

/******************************/
/* Data                       */
/******************************/
export interface BaseDocument {
  name: string;
  id: string;
}

export type BuilderWithCompanyModel = BuilderModel & { company: CompanyModel };
export type LineItemLegacyWithSupplierModel = LineItemLegacyModel & { supplier: SupplierModel };
export type JobLegacyWithLineItemsModel = JobLegacyModel & {
  lineItems: LineItemLegacyWithSupplierModel[];
};
export type ContractorWithJobsLegacyModel = ContractorModel & {
  jobsLegacy: JobLegacyWithLineItemsModel[];
};
export type CommunityWithCompanyModel = CommunityModel & { company: CompanyModel };
