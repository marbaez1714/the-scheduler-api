import {
  Area as AreaModel,
  Builder as BuilderModel,
  Community as CommunityModel,
  Company as CompanyModel,
  Contractor as ContractorModel,
  JobLegacy as JobLegacyModel,
  LineItemLegacy as LineItemLegacyModel,
  Supplier as SupplierModel,
  Reporter as ReporterModel,
  Scope as ScopeModel,
} from '@prisma/client';

/******************************/
/* Enums                      */
/******************************/
export enum PermissionsEnum {
  Admin = 'admin',
}

export interface PrismaModels {
  area: AreaModel;
  builder: BuilderModel;
  community: CommunityModel;
  company: CompanyModel;
  contractor: ContractorModel;
  jobLegacy: JobLegacyModel;
  lineItemLegacy: LineItemLegacyModel;
  supplier: SupplierModel;
  reporter: ReporterModel;
  scope: ScopeModel;
}

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
