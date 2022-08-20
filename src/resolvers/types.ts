import { SortOrder } from './../generated/graphql';
import {
  Area as AreaModel,
  Builder as BuilderModel,
  Community as CommunityModel,
  Company as CompanyModel,
  Contractor as ContractorModel,
  JobLegacy as JobLegacyModel,
  LineItemLegacy as LineItemLegacyModel,
  Reporter as ReporterModel,
  Scope as ScopeModel,
  Supplier as SupplierModel,
} from '@prisma/client';

/******************************/
/* Types                      */
/******************************/
export type BaseDocument = {
  name: string;
  id: string;
};

export type PaginationFindArguments = { take: number; skip: number } | undefined;

export type SortingFindArguments = { orderBy: { [field: string]: SortOrder } } | undefined;

export type FindArguments =
  | PaginationFindArguments
  | SortingFindArguments
  | (PaginationFindArguments & SortingFindArguments);

export type PrismaClientNames =
  | 'company'
  | 'area'
  | 'builder'
  | 'community'
  | 'contractor'
  | 'lineItemLegacy'
  | 'reporter'
  | 'scope'
  | 'supplier'
  | 'jobLegacy';

/******************************/
/* Interfaces                 */
/******************************/
export interface PrismaData {
  Area: AreaModel;
  Builder: BuilderModel & { company: PrismaData['Company'] };
  Community: CommunityModel & { company: PrismaData['Company'] };
  Company: CompanyModel;
  Contractor: ContractorModel & { jobsLegacy: PrismaData['JobLegacy'][] };
  JobLegacy: JobLegacyModel & { lineItems: PrismaData['LineItemLegacy'][] };
  LineItemLegacy: LineItemLegacyModel;
  Reporter: ReporterModel;
  Scope: ScopeModel;
  Supplier: SupplierModel;
}

/******************************/
/* Enums                      */
/******************************/
export enum PermissionsEnum {
  Admin = 'admin',
}
