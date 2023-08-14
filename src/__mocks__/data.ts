import { SMSConsent } from '@prisma/client';
import { FilterInput, Pagination, SortDirection, SortInput } from '../generated';
import { PrismaModels } from '../app/types';
import crypto from 'crypto';

const today = new Date();
today.setHours(0, 0, 0, 0);
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
yesterday.setHours(0, 0, 0, 0);
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);
const createdTime = new Date(2023, 0, 1, 0, 0, 0, 0); // Default created time is January 1, 2023
const updatedTime = new Date(2023, 0, 15, 0, 0, 0, 0); // Default updated time is January 15, 2023

const mockDates = {
  today,
  yesterday,
  tomorrow,
  createdTime,
  updatedTime,
  todayJSON: today.toJSON(),
  yesterdayJSON: yesterday.toJSON(),
  tomorrowJSON: tomorrow.toJSON(),
  createTimeJSON: createdTime.toJSON(),
  updatedTimeJSON: updatedTime.toJSON(),
};

export class MockData {
  static dates = mockDates;

  static dBArea(index = 0, data?: Partial<PrismaModels['area']>): PrismaModels['area'] {
    const defaultData: PrismaModels['area'] = {
      archived: false,
      legacy: false,
      createdBy: `some-user-created-id-${index}`,
      updatedBy: `some-user-updated-id-${index}`,
      createdTime: MockData.dates.createdTime,
      updatedTime: MockData.dates.updatedTime,
      id: crypto.randomUUID(),
      nameSpanish: `some-spanish-name-${index}`,
      name: `some-area-name-${index}`,
      notes: null,
    };

    return { ...defaultData, ...data };
  }

  static dBBuilder(index = 0, data?: Partial<PrismaModels['builder']>): PrismaModels['builder'] {
    const defaultData: PrismaModels['builder'] = {
      archived: false,
      legacy: false,
      createdBy: `some-user-created-id-${index}`,
      updatedBy: `some-user-updated-id-${index}`,
      createdTime: MockData.dates.createdTime,
      updatedTime: MockData.dates.updatedTime,
      notes: null,
      companyId: `some-company-id-${index}`,
      id: crypto.randomUUID(),
      name: `some-builder-name-${index}`,
      primaryEmail: null,
      primaryPhone: null,
    };

    return { ...defaultData, ...data };
  }

  static dBCompany(index = 0, data?: Partial<PrismaModels['company']>): PrismaModels['company'] {
    const defaultData: PrismaModels['company'] = {
      archived: false,
      legacy: false,
      createdBy: `some-user-created-id-${index}`,
      updatedBy: `some-user-updated-id-${index}`,
      createdTime: MockData.dates.createdTime,
      updatedTime: MockData.dates.updatedTime,
      id: crypto.randomUUID(),
      name: `some-company-name-${index}`,
      notes: null,
      primaryAddress: null,
      primaryEmail: null,
      primaryPhone: null,
    };

    return { ...defaultData, ...data };
  }

  static dBContractor(
    index = 0,
    data?: Partial<PrismaModels['contractor']>
  ): PrismaModels['contractor'] {
    const defaultData: PrismaModels['contractor'] = {
      archived: false,
      legacy: false,
      createdBy: `some-user-created-id-${index}`,
      updatedBy: `some-user-updated-id-${index}`,
      createdTime: MockData.dates.createdTime,
      updatedTime: MockData.dates.updatedTime,
      id: crypto.randomUUID(),
      name: `some-contractor-name-${index}`,
      notes: null,
      primaryPhone: `some-contractor-primary-phone-${index}`,
      smsConsent: SMSConsent.NEEDED,
    };

    return { ...defaultData, ...data };
  }

  static dBCommunity(
    index = 0,
    data?: Partial<PrismaModels['community']>
  ): PrismaModels['community'] {
    const defaultData: PrismaModels['community'] = {
      archived: false,
      legacy: false,
      createdBy: `some-user-created-id-${index}`,
      updatedBy: `some-user-updated-id-${index}`,
      createdTime: MockData.dates.createdTime,
      updatedTime: MockData.dates.updatedTime,
      id: crypto.randomUUID(),
      name: `some-community-name-${index}`,
      notes: null,
      companyId: `some-company-id-${index}`,
    };

    return { ...defaultData, ...data };
  }

  static dBJobLegacy(
    index = 0,
    data?: Partial<PrismaModels['jobLegacy']>
  ): PrismaModels['jobLegacy'] {
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
      createdTime: MockData.dates.createdTime,
      updatedTime: MockData.dates.updatedTime,
      id: crypto.randomUUID(),
      name: `some-job-legacy-name-${index}`,
      notes: null,
      inProgress: false,
      isImportant: false,
      completedDate: null,
      scopeId: null,
      startDate: null,
    };

    return { ...defaultData, ...data };
  }

  static dBReporter(index = 0, data?: Partial<PrismaModels['reporter']>): PrismaModels['reporter'] {
    const defaultData: PrismaModels['reporter'] = {
      archived: false,
      legacy: false,
      createdBy: `some-user-created-id-${index}`,
      updatedBy: `some-user-updated-id-${index}`,
      createdTime: MockData.dates.createdTime,
      updatedTime: MockData.dates.updatedTime,
      id: crypto.randomUUID(),
      name: `some-reporter-name-${index}`,
      notes: null,
      primaryPhone: `some-reporter-primary-phone-${index}`,
      smsConsent: SMSConsent.NEEDED,
      primaryEmail: null,
    };

    return { ...defaultData, ...data };
  }

  static dBScope(index = 0, data?: Partial<PrismaModels['scope']>): PrismaModels['scope'] {
    const defaultData: PrismaModels['scope'] = {
      archived: false,
      legacy: false,
      createdBy: `some-user-created-id-${index}`,
      updatedBy: `some-user-updated-id-${index}`,
      createdTime: MockData.dates.createdTime,
      updatedTime: MockData.dates.updatedTime,
      id: crypto.randomUUID(),
      name: `some-scope-name-${index}`,
      notes: null,
      description: null,
      nameSpanish: `some-scope-name-spanish-${index}`,
    };

    return { ...defaultData, ...data };
  }

  static dBSupplier(index = 0, data?: Partial<PrismaModels['supplier']>): PrismaModels['supplier'] {
    const defaultData: PrismaModels['supplier'] = {
      archived: false,
      legacy: false,
      createdBy: `some-user-created-id-${index}`,
      createdTime: MockData.dates.createdTime,
      updatedBy: `some-user-updated-id-${index}`,
      updatedTime: MockData.dates.updatedTime,
      id: crypto.randomUUID(),
      name: `some-supplier-name-${index}`,
      notes: null,
      primaryPhone: `some-supplier-primary-phone-${index}`,
    };

    return { ...defaultData, ...data };
  }

  static dBLineItemLegacy(
    index = 0,
    data?: Partial<PrismaModels['lineItemLegacy']>
  ): PrismaModels['lineItemLegacy'] {
    const defaultData: PrismaModels['lineItemLegacy'] = {
      legacy: false,
      createdBy: `some-user-created-id-${index}`,
      createdTime: MockData.dates.createdTime,
      id: crypto.randomUUID(),
      jobId: `some-job-legacy-id-${index}`,
      orderNumber: `some-line-item-legacy-order-number-${index}`,
      supplierId: `some-supplier-id-${index}`,
      updatedBy: `some-user-updated-id-${index}`,
      updatedTime: MockData.dates.updatedTime,
    };

    return { ...defaultData, ...data };
  }

  static paginationInput(data?: Partial<Pagination>): Pagination {
    const defaultData = {
      page: 1,
      pageSize: 10,
    };

    return {
      ...defaultData,
      ...data,
    };
  }

  static sortInput(data?: Partial<SortInput>): SortInput {
    const defaultData = {
      field: 'name',
      direction: SortDirection.Asc,
    };

    return {
      ...defaultData,
      ...data,
    };
  }

  static filterInput(data?: Partial<FilterInput>): FilterInput {
    return {
      field: data?.field || '',
      term: data?.term || '',
    };
  }
}

//#region DB Models

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

//#endregion
