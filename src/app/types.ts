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

import { SortOrder } from '../generated';

/******************************/
/* Enums                      */
/******************************/
export enum PermissionsEnum {
  Admin = 'admin',
}

/******************************/
/* Data                       */
/******************************/
export interface BaseDocument {
  name: string;
  id: string;
}

export interface PrismaData {
  area: AreaModel;
  builder: BuilderModel & { company: PrismaData['company'] };
  community: CommunityModel & { company: PrismaData['company'] };
  company: CompanyModel;
  contractor: ContractorModel & { jobsLegacy: PrismaData['jobLegacy'][] };
  jobLegacy: JobLegacyModel & { lineItems: PrismaData['lineItemLegacy'][] };
  lineItemLegacy: LineItemLegacyModel;
  reporter: ReporterModel;
  scope: ScopeModel;
  supplier: SupplierModel;
}

/******************************/
/* Arguments                  */
/******************************/
type PaginationFindArgs = { take: number; skip: number } | undefined;

type SortingFindArgs = { orderBy: { [field: string]: SortOrder } } | undefined;

export type FindArguments =
  | PaginationFindArgs
  | SortingFindArgs
  | (PaginationFindArgs & SortingFindArgs);
