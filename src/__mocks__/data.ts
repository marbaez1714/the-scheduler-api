import { SMSConsent, Prisma } from '@prisma/client';
import { Pagination, SortDirection, SortInput } from '../generated';
import { PrismaModels } from '../app/types';

// Default created time is January 1, 2023
const defaultCreatedTime = new Date(2023, 0, 1, 0, 0, 0, 0);

// Default updated time is January 15, 2023
const defaultUpdatedTime = new Date(2023, 0, 15, 0, 0, 0, 0);

export const generateDBArea = (
  index: number,
  data?: Partial<PrismaModels['area']>
): PrismaModels['area'] => {
  const defaultData: PrismaModels['area'] = {
    archived: false,
    legacy: false,
    createdBy: `some-user-created-id-${index}`,
    updatedBy: `some-user-updated-id-${index}`,
    createdTime: defaultCreatedTime,
    updatedTime: defaultUpdatedTime,
    id: `some-area-id-${index}`,
    nameSpanish: `some-spanish-name-${index}`,
    name: `some-area-name-${index}`,
    notes: null,
  };

  return { ...defaultData, ...data };
};

export const generateDBBuilder = (
  index: number,
  data?: Partial<PrismaModels['builder']>
): PrismaModels['builder'] => {
  const defaultData: PrismaModels['builder'] = {
    archived: false,
    legacy: false,
    createdBy: `some-user-created-id-${index}`,
    updatedBy: `some-user-updated-id-${index}`,
    createdTime: defaultCreatedTime,
    updatedTime: defaultUpdatedTime,
    notes: null,
    companyId: `some-company-id-${index}`,
    id: `some-builder-id-${index}`,
    name: `some-builder-name-${index}`,
    primaryEmail: null,
    primaryPhone: null,
  };

  return { ...defaultData, ...data };
};

export const generateDBCompany = (
  index: number,
  data?: Partial<PrismaModels['company']>
): PrismaModels['company'] => {
  const defaultData: PrismaModels['company'] = {
    archived: false,
    legacy: false,
    createdBy: `some-user-created-id-${index}`,
    updatedBy: `some-user-updated-id-${index}`,
    createdTime: defaultCreatedTime,
    updatedTime: defaultUpdatedTime,
    id: `some-company-id-${index}`,
    name: `some-company-name-${index}`,
    notes: null,
    primaryAddress: null,
    primaryEmail: null,
    primaryPhone: null,
  };

  return { ...defaultData, ...data };
};

export const generateDBContractor = (
  index: number,
  data?: Partial<PrismaModels['contractor']>
): PrismaModels['contractor'] => {
  const defaultData: PrismaModels['contractor'] = {
    archived: false,
    legacy: false,
    createdBy: `some-user-created-id-${index}`,
    updatedBy: `some-user-updated-id-${index}`,
    createdTime: defaultCreatedTime,
    updatedTime: defaultUpdatedTime,
    id: `some-contractor-id-${index}`,
    name: `some-contractor-name-${index}`,
    notes: null,
    primaryPhone: `some-contractor-primary-phone-${index}`,
    smsConsent: SMSConsent.NEEDED,
  };

  return { ...defaultData, ...data };
};

export const generateDBCommunity = (
  index: number,
  data?: Partial<PrismaModels['community']>
): PrismaModels['community'] => {
  const defaultData: PrismaModels['community'] = {
    archived: false,
    legacy: false,
    createdBy: `some-user-created-id-${index}`,
    updatedBy: `some-user-updated-id-${index}`,
    createdTime: defaultCreatedTime,
    updatedTime: defaultUpdatedTime,
    id: `some-community-id-${index}`,
    name: `some-community-name-${index}`,
    notes: null,
    companyId: `some-company-id-${index}`,
  };

  return { ...defaultData, ...data };
};

export const generateDBJobLegacy = (
  index: number,
  data?: Partial<PrismaModels['jobLegacy']>
): PrismaModels['jobLegacy'] => {
  const defaultData: PrismaModels['jobLegacy'] = {
    archived: false,
    legacy: false,
    active: true,
    areaId: null,
    builderId: null,
    communityId: null,
    contractorId: null,
    reporterId: null,
    createdBy: `some-user-created-id-${index}`,
    updatedBy: `some-user-updated-id-${index}`,
    createdTime: defaultCreatedTime,
    updatedTime: defaultUpdatedTime,
    id: `some-job-legacy-id-${index}`,
    name: `some-job-legacy-name-${index}`,
    notes: null,
    inProgress: false,
    isImportant: false,
    completedDate: null,
    scopeId: null,
    startDate: null,
  };

  return { ...defaultData, ...data };
};

export const generateDBReporter = (
  index: number,
  data?: Partial<PrismaModels['reporter']>
): PrismaModels['reporter'] => {
  const defaultData: PrismaModels['reporter'] = {
    archived: false,
    legacy: false,
    createdBy: `some-user-created-id-${index}`,
    updatedBy: `some-user-updated-id-${index}`,
    createdTime: defaultCreatedTime,
    updatedTime: defaultUpdatedTime,
    id: `some-reporter-id-${index}`,
    name: `some-reporter-name-${index}`,
    notes: null,
    primaryPhone: `some-reporter-primary-phone-${index}`,
    smsConsent: SMSConsent.NEEDED,
    primaryEmail: null,
  };

  return { ...defaultData, ...data };
};

export const generateDBScope = (
  index: number,
  data?: Partial<PrismaModels['scope']>
): PrismaModels['scope'] => {
  const defaultData: PrismaModels['scope'] = {
    archived: false,
    legacy: false,
    createdBy: `some-user-created-id-${index}`,
    updatedBy: `some-user-updated-id-${index}`,
    createdTime: defaultCreatedTime,
    updatedTime: defaultUpdatedTime,
    id: `some-scope-id-${index}`,
    name: `some-scope-name-${index}`,
    notes: null,
    description: null,
    nameSpanish: `some-scope-name-spanish-${index}`,
  };

  return { ...defaultData, ...data };
};

export const generateDBSupplier = (
  index: number,
  data?: Partial<PrismaModels['supplier']>
): PrismaModels['supplier'] => {
  const defaultData: PrismaModels['supplier'] = {
    archived: false,
    legacy: false,
    createdBy: `some-user-created-id-${index}`,
    createdTime: defaultCreatedTime,
    updatedBy: `some-user-updated-id-${index}`,
    updatedTime: defaultUpdatedTime,
    id: `some-supplier-id-${index}`,
    name: `some-supplier-name-${index}`,
    notes: null,
    primaryPhone: `some-supplier-primary-phone-${index}`,
  };

  return { ...defaultData, ...data };
};

export const generateDBLineItemLegacy = (
  index: number,
  data?: Partial<PrismaModels['lineItemLegacy']>
): PrismaModels['lineItemLegacy'] => {
  const defaultData: PrismaModels['lineItemLegacy'] = {
    legacy: false,
    createdBy: `some-user-created-id-${index}`,
    createdTime: defaultCreatedTime,
    id: `some-line-item-legacy-id-${index}`,
    jobId: `some-job-legacy-id-${index}`,
    orderNumber: `some-line-item-legacy-order-number-${index}`,
    supplierId: `some-supplier-id-${index}`,
    updatedBy: `some-user-updated-id-${index}`,
    updatedTime: defaultUpdatedTime,
  };

  return { ...defaultData, ...data };
};

export const generatePaginationInput = (data?: Partial<Pagination>): Pagination => {
  const defaultData = {
    page: 1,
    pageSize: 10,
  };

  return {
    ...defaultData,
    ...data,
  };
};

export const generateSortInput = (data?: Partial<SortInput>): SortInput => {
  const defaultData = {
    field: 'name',
    direction: SortDirection.Asc,
  };

  return {
    ...defaultData,
    ...data,
  };
};
