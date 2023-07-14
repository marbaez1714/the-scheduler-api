import { createMockContext } from '../__mocks__/context';
import { DataHandler } from '../app';
import {
  BuilderWithCompanyModel,
  CommunityWithCompanyModel,
  LineItemLegacyWithSupplierModel,
  PermissionsEnum,
} from '../app/types';
import { SortDirection } from '../generated';
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

const mockClient = 'area';
const mockTotalCount = 100;
const mockCreatedTime = new Date();
const mockUpdatedTime = new Date();
const mockCreatedBy = 'some-user-created-id';
const mockUpdatedBy = 'some-user-updated-id';
const mockPaginationArgs = { page: 1, pageSize: 10 };
const mockFilterArgs = { field: 'some-field', term: 'some-term' };
const mockAreaSortArgs = { field: 'area', direction: SortDirection.Asc };
const mockBuilderSortArgs = { field: 'builder', direction: SortDirection.Asc };
const mockCommunitySortArgs = { field: 'community', direction: SortDirection.Asc };
const mockCompanySortArgs = { field: 'company', direction: SortDirection.Asc };
const mockContractorSortArgs = { field: 'contractor', direction: SortDirection.Asc };
const mockJobLegacySortArgs = { field: 'jobLegacy', direction: SortDirection.Asc };
const mockReporterSortArgs = { field: 'reporter', direction: SortDirection.Asc };
const mockScopeSortArgs = { field: 'scope', direction: SortDirection.Asc };
const mockSupplierSortArgs = { field: 'supplier', direction: SortDirection.Asc };
const mockDefaultSortArgs = { field: 'some-field', direction: SortDirection.Asc };
const mockBaseDocument = { name: 'some-name', id: 'some-id' };
const mockPrismaBase = {
  archived: false,
  createdBy: mockCreatedBy,
  updatedBy: mockUpdatedBy,
  createdTime: mockCreatedTime,
  updatedTime: mockUpdatedTime,
  legacy: false,
};
const mockPrismaArea: AreaModel = {
  ...mockPrismaBase,
  nameSpanish: 'some-spanish-name',
  name: 'some-area-name',
  notes: 'some-area-notes',
  id: 'some-area-id',
};
const mockPrismaCompany: CompanyModel = {
  ...mockPrismaBase,
  name: 'some-company-name',
  notes: 'some-company-notes',
  id: 'some-company-id',
  primaryAddress: 'some-company-primary-address',
  primaryEmail: 'some-company-primary-email',
  primaryPhone: 'some-company-primary-phone',
};
const mockPrismaBuilder: BuilderWithCompanyModel = {
  ...mockPrismaBase,
  companyId: mockPrismaCompany.id,
  notes: 'some-builder-notes',
  primaryEmail: 'some-builder-primary-email',
  primaryPhone: 'some-builder-primary-phone',
  id: 'some-builder-id',
  name: 'some-builder-name',
  company: mockPrismaCompany,
};
const mockPrismaCommunity: CommunityWithCompanyModel = {
  ...mockPrismaBase,
  name: 'some-community-name',
  notes: 'some-community-notes',
  id: 'some-community-id',
  companyId: mockPrismaCompany.id,
  company: mockPrismaCompany,
};
const mockPrismaReporter: ReporterModel = {
  ...mockPrismaBase,
  name: 'some-reporter-name',
  notes: 'some-reporter-notes',
  id: 'some-reporter-id',
  primaryEmail: 'some-reporter-primary-email',
  primaryPhone: 'some-reporter-primary-phone',
};
const mockPrismaScope: ScopeModel = {
  ...mockPrismaBase,
  name: 'some-scope-name',
  notes: 'some-scope-notes',
  id: 'some-scope-id',
  description: 'some-scope-description',
  nameSpanish: 'some-scope-spanish-name',
};
const mockPrismaSupplier: SupplierModel = {
  ...mockPrismaBase,
  name: 'some-supplier-name',
  notes: 'some-supplier-notes',
  id: 'some-supplier-id',
  primaryPhone: 'some-supplier-primary-phone',
};
const mockPrismaLineItemLegacy: LineItemLegacyWithSupplierModel = {
  ...mockPrismaBase,
  id: 'some-line-item-legacy-id',
  orderNumber: 'some-line-item-legacy-order-number',
  supplierId: mockPrismaSupplier.id,
  supplier: mockPrismaSupplier,
  jobId: 'some-line-item-legacy-job-id',
};

describe('DataHandler', () => {
  describe('when user is not an admin', () => {
    const mockContext = createMockContext();
    it('should throw an error', () => {
      expect(() => new DataHandler(mockContext, mockClient)).toThrowError();
    });
  });

  describe('when user is an admin', () => {
    const mockContext = createMockContext([PermissionsEnum.Admin]);
    const appHandler = new DataHandler(mockContext, mockClient);

    describe('appHandler fields', () => {
      it('should have a context field', () => {
        expect(appHandler.context).toEqual(mockContext);
      });

      it('should have a client', () => {
        expect(appHandler.client).toEqual(mockClient);
      });

      it('should have a crud', () => {
        expect(appHandler.crud).toEqual(mockContext.prisma[mockClient]);
      });

      it('should have a userId', () => {
        expect(appHandler.userId).toEqual(mockContext.user.sub);
      });

      it('should have a archiveData', () => {
        expect(appHandler.archiveData).toEqual({ archived: true, updatedBy: mockContext.user.sub });
      });

      it('should have a todayDate', () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        expect(appHandler.todayDate).toEqual(today);
      });
    });

    describe('appHandler methods', () => {
      describe('generatePaginationArgs', () => {
        it('should return undefined if no pagination is passed', () => {
          const args = appHandler.generatePaginationArgs();

          expect(args).toBeUndefined();
        });

        it('should return pagination args if pagination is passed', () => {
          const args = appHandler.generatePaginationArgs(mockPaginationArgs);

          expect(args).toEqual({ take: 10, skip: 0 });
        });
      });

      describe('generateFilterArgs', () => {
        it('should return undefined if no filter is passed', () => {
          const args = appHandler.generateFilterArgs();

          expect(args).toBeUndefined();
        });

        it('should return filter args if filter is passed', () => {
          const args = appHandler.generateFilterArgs(mockFilterArgs);
          const expectedFilterArgs = {
            OR: [
              { 'some-field': { contains: 'some-term', mode: 'insensitive' } },
              { 'some-field': { startsWith: 'some-term', mode: 'insensitive' } },
              { 'some-field': { endsWith: 'some-term', mode: 'insensitive' } },
              { 'some-field': { equals: 'some-term', mode: 'insensitive' } },
            ],
          };

          expect(args).toEqual(expectedFilterArgs);
        });
      });

      describe('generateSortingArgs', () => {
        it('should return undefined if no sorting is passed', () => {
          const args = appHandler.generateSortingArgs();

          expect(args).toBeUndefined();
        });

        it('should return area sort args if sort.field is area', () => {
          const args = appHandler.generateSortingArgs(mockAreaSortArgs);
          const expectedSortArgs = {
            [mockAreaSortArgs.field]: { name: mockAreaSortArgs.direction },
          };

          expect(args).toEqual(expectedSortArgs);
        });

        it('should return builder sort args if sort.field is builder', () => {
          const args = appHandler.generateSortingArgs(mockBuilderSortArgs);
          const expectedSortArgs = {
            [mockBuilderSortArgs.field]: { name: mockBuilderSortArgs.direction },
          };

          expect(args).toEqual(expectedSortArgs);
        });

        it('should return community sort args if sort.field is community', () => {
          const args = appHandler.generateSortingArgs(mockCommunitySortArgs);
          const expectedSortArgs = {
            [mockCommunitySortArgs.field]: { name: mockCommunitySortArgs.direction },
          };

          expect(args).toEqual(expectedSortArgs);
        });

        it('should return company sort args if sort.field is company', () => {
          const args = appHandler.generateSortingArgs(mockCompanySortArgs);
          const expectedSortArgs = {
            [mockCompanySortArgs.field]: { name: mockCompanySortArgs.direction },
          };

          expect(args).toEqual(expectedSortArgs);
        });

        it('should return contractor sort args if sort.field is contractor', () => {
          const args = appHandler.generateSortingArgs(mockContractorSortArgs);
          const expectedSortArgs = {
            [mockContractorSortArgs.field]: { name: mockContractorSortArgs.direction },
          };

          expect(args).toEqual(expectedSortArgs);
        });

        it('should return jobLegacy sort args if sort.field is jobLegacy', () => {
          const args = appHandler.generateSortingArgs(mockJobLegacySortArgs);
          const expectedSortArgs = {
            [mockJobLegacySortArgs.field]: { name: mockJobLegacySortArgs.direction },
          };

          expect(args).toEqual(expectedSortArgs);
        });

        it('should return reporter sort args if sort.field is reporter', () => {
          const args = appHandler.generateSortingArgs(mockReporterSortArgs);
          const expectedSortArgs = {
            [mockReporterSortArgs.field]: { name: mockReporterSortArgs.direction },
          };

          expect(args).toEqual(expectedSortArgs);
        });

        it('should return scope sort args if sort.field is scope', () => {
          const args = appHandler.generateSortingArgs(mockScopeSortArgs);
          const expectedSortArgs = {
            [mockScopeSortArgs.field]: { name: mockScopeSortArgs.direction },
          };

          expect(args).toEqual(expectedSortArgs);
        });

        it('should return supplier sort args if sort.field is supplier', () => {
          const args = appHandler.generateSortingArgs(mockSupplierSortArgs);
          const expectedSortArgs = {
            [mockSupplierSortArgs.field]: { name: mockSupplierSortArgs.direction },
          };

          expect(args).toEqual(expectedSortArgs);
        });

        it("should return default sort args if sort.field isn't supplier", () => {
          const args = appHandler.generateSortingArgs(mockDefaultSortArgs);
          const expectedSortArgs = { [mockDefaultSortArgs.field]: mockDefaultSortArgs.direction };

          expect(args).toEqual(expectedSortArgs);
        });
      });

      describe('generatePaginationResponse', () => {
        it('should return a response with only totalCount and totalPages if pagination is not passed', () => {
          const response = appHandler.generatePaginationResponse(mockTotalCount);

          expect(response).toEqual({ totalCount: mockTotalCount, totalPages: 1 });
        });

        it('should return a response with totalCount, totalPages, page, and pageSize if pagination is passed', () => {
          const response = appHandler.generatePaginationResponse(
            mockTotalCount,
            mockPaginationArgs
          );
          const expectedResponse = {
            totalCount: mockTotalCount,
            totalPages: 10,
            ...mockPaginationArgs,
          };

          expect(response).toEqual(expectedResponse);
        });
      });

      describe('generateArchiveResponse', () => {
        it('should return an archive response', () => {
          const response = appHandler.generateArchiveResponse(mockBaseDocument);

          expect(response).toEqual({
            data: mockBaseDocument,
            message: `${mockBaseDocument.name} archived.`,
          });
        });
      });

      describe('generateWriteResponse', () => {
        it('should return a write response', () => {
          const response = appHandler.generateWriteResponse(mockBaseDocument);

          expect(response).toEqual({
            data: mockBaseDocument,
            message: `${mockBaseDocument.name} written.`,
          });
        });
      });

      describe('generateDeleteResponse', () => {
        it('should return a delete response', () => {
          const response = appHandler.generateDeleteResponse(mockBaseDocument);

          expect(response).toEqual({ message: `${mockBaseDocument.name} deleted.` });
        });
      });

      describe('generateFilterResponse', () => {
        it('should return an empty filter response when no filter is passed', () => {
          const response = appHandler.generateFilterResponse();

          expect(response).toEqual({ field: '', term: '' });
        });

        it('should return a filter response when a filter is passed', () => {
          const response = appHandler.generateFilterResponse(mockFilterArgs);

          expect(response).toEqual({ field: mockFilterArgs.field, term: mockFilterArgs.term });
        });
      });

      describe('generateSortResponse', () => {
        it('should return an empty sort response when no sort is passed', () => {
          const response = appHandler.generateSortResponse();

          expect(response).toEqual({ field: '', direction: SortDirection.Asc });
        });

        it('should return a sort response when a sort is passed', () => {
          const response = appHandler.generateSortResponse(mockDefaultSortArgs);

          expect(response).toEqual({
            field: mockDefaultSortArgs.field,
            direction: mockDefaultSortArgs.direction,
          });
        });
      });

      describe('formatArea', () => {
        it('should return a formatted area', () => {
          const formattedArea = appHandler.formatArea(mockPrismaArea);

          expect(formattedArea).toEqual({
            ...mockPrismaArea,
            createdTime: mockPrismaArea.createdTime.toJSON(),
            updatedTime: mockPrismaArea.updatedTime.toJSON(),
          });
        });
      });

      describe('formatBuilder', () => {
        it('should return a formatted builder', () => {
          const formattedBuilder = appHandler.formatBuilder(mockPrismaBuilder);

          expect(formattedBuilder).toEqual({
            ...mockPrismaBuilder,
            company: appHandler.formatCompany(mockPrismaBuilder.company),
            createdTime: mockPrismaBuilder.createdTime.toJSON(),
            updatedTime: mockPrismaBuilder.updatedTime.toJSON(),
          });
        });
      });

      describe('formatCommunity', () => {
        it('should return a formatted community', () => {
          const formattedCommunity = appHandler.formatCommunity(mockPrismaCommunity);

          expect(formattedCommunity).toEqual({
            ...mockPrismaCommunity,
            company: appHandler.formatCompany(mockPrismaCommunity.company),
            createdTime: mockPrismaCommunity.createdTime.toJSON(),
            updatedTime: mockPrismaCommunity.updatedTime.toJSON(),
          });
        });
      });

      describe('formatCompany', () => {
        it('should return a formatted company', () => {
          const formattedCompany = appHandler.formatCompany(mockPrismaCompany);

          expect(formattedCompany).toEqual({
            ...mockPrismaCompany,
            createdTime: mockPrismaCompany.createdTime.toJSON(),
            updatedTime: mockPrismaCompany.updatedTime.toJSON(),
          });
        });
      });
    });
  });
});
