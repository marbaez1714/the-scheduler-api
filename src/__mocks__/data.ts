import { Prisma } from '@prisma/client';
import { Pagination, SortDirection, SortInput } from '../generated';
import { PrismaModels } from '../app/types';

const defaultDate = new Date();
defaultDate.setHours(0, 0, 0, 0);
const mockPrismaBase = {
  archived: false,
  legacy: false,
  createdBy: 'some-user-created-id',
  updatedBy: 'some-user-updated-id',
  createdTime: defaultDate,
  updatedTime: defaultDate,
};

export const generatePrismaArea = (data?: Partial<PrismaModels['area']>): PrismaModels['area'] => {
  const defaultData = {
    ...mockPrismaBase,
    id: 'some-area-id',
    nameSpanish: 'some-spanish-name',
    name: 'some-area-name',
    notes: 'some-area-notes',
  };

  return {
    ...defaultData,
    ...data,
  };
};

export const generatePrismaBuilder = (
  data?: Partial<PrismaModels['builder']>
): PrismaModels['builder'] => {
  const defaultData = {
    ...mockPrismaBase,
    notes: 'some-builder-notes',
    primaryEmail: 'some-builder-primary-email',
    primaryPhone: 'some-builder-primary-phone',
    id: 'some-builder-id',
    name: 'some-builder-name',
    companyId: 'some-company-id',
  };

  return {
    ...defaultData,
    ...data,
  };
};

export const generatePrismaCompany = (
  data?: Partial<PrismaModels['company']>
): PrismaModels['company'] => {
  const defaultData = {
    ...mockPrismaBase,
    id: 'some-company-id',
    name: 'some-company-name',
    notes: 'some-company-notes',
    primaryAddress: 'some-company-primary-address',
    primaryEmail: 'some-company-primary-email',
    primaryPhone: 'some-company-primary-phone',
  };

  return {
    ...defaultData,
    ...data,
  };
};

export const generatePrismaContractor = (
  data?: Partial<PrismaModels['contractor']>
): PrismaModels['contractor'] => {
  const defaultData = {
    ...mockPrismaBase,
    id: 'some-contractor-id',
    name: 'some-contractor-name',
    notes: 'some-contractor-notes',
    primaryPhone: 'some-contractor-primary-phone',
  };

  return {
    ...defaultData,
    ...data,
  };
};

export const generatePrismaCommunity = (
  data?: Partial<PrismaModels['community']>
): PrismaModels['community'] => {
  const defaultData = {
    ...mockPrismaBase,
    id: 'some-community-id',
    name: 'some-community-name',
    notes: 'some-community-notes',
    companyId: 'some-company-id',
  };

  return {
    ...defaultData,
    ...data,
  };
};

export const generatePrismaJobLegacy = (
  data?: Partial<PrismaModels['jobLegacy']>
): PrismaModels['jobLegacy'] => {
  const defaultData = {
    ...mockPrismaBase,
    id: 'some-job-legacy-id',
    name: 'some-job-legacy-name',
    notes: 'some-job-legacy-notes',
    active: true,
    areaId: 'some-area-id',
    builderId: 'some-builder-id',
    communityId: 'some-community-id',
    contractorId: 'some-contractor-id',
    scopeId: 'some-scope-id',
    completedDate: defaultDate,
    startDate: defaultDate,
    inProgress: true,
    reporterId: 'some-reporter-id',
    isImportant: true,
  };

  return {
    ...defaultData,
    ...data,
  };
};

export const generatePrismaReporter = (
  data?: Partial<PrismaModels['reporter']>
): PrismaModels['reporter'] => {
  const defaultData = {
    ...mockPrismaBase,
    id: 'some-reporter-id',
    name: 'some-reporter-name',
    notes: 'some-reporter-notes',
    primaryEmail: 'some-reporter-primary-email',
    primaryPhone: 'some-reporter-primary-phone',
  };

  return {
    ...defaultData,
    ...data,
  };
};

export const generatePrismaScope = (
  data?: Partial<PrismaModels['scope']>
): PrismaModels['scope'] => {
  const defaultData = {
    ...mockPrismaBase,
    id: 'some-scope-id',
    name: 'some-scope-name',
    nameSpanish: 'some-scope-spanish-name',
    notes: 'some-scope-notes',
    description: 'some-scope-description',
  };

  return {
    ...defaultData,
    ...data,
  };
};

export const generatePrismaSupplier = (
  data?: Partial<PrismaModels['supplier']>
): PrismaModels['supplier'] => {
  const defaultData = {
    ...mockPrismaBase,
    id: 'some-supplier-id',
    name: 'some-supplier-name',
    notes: 'some-supplier-notes',
    primaryPhone: 'some-supplier-primary-phone',
  };

  return {
    ...defaultData,
    ...data,
  };
};

export const generatePrismaLineItemLegacy = (
  data?: Partial<PrismaModels['lineItemLegacy']>
): PrismaModels['lineItemLegacy'] => {
  const defaultData = {
    ...mockPrismaBase,
    id: 'some-line-item-legacy-id',
    orderNumber: 'some-line-item-legacy-order-number',
    supplierId: 'some-supplier-id',
    jobId: 'some-line-item-legacy-job-id',
  };

  return {
    ...defaultData,
    ...data,
  };
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

export const generateAreaCreateInput = (
  index: number,
  data?: Partial<Prisma.AreaCreateInput>
): Prisma.AreaCreateInput => {
  const defaultData: Prisma.AreaCreateInput = {
    name: `area-name-${index}`,
    nameSpanish: `area-name-spanish-${index}`,
    createdBy: `area-created-by-${index}`,
    updatedBy: `area-updated-by-${index}`,
    id: `area-id-${index}`,
  };

  return { ...defaultData, ...data };
};
