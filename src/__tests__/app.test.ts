import {
  generatePrismaBuilder,
  generatePrismaCommunity,
  generatePrismaLineItemLegacy,
  generatePrismaReporter,
  generatePrismaScope,
  generatePrismaSupplier,
  generatePrismaArea,
  generatePrismaCompany,
  generatePrismaJobLegacy,
  generatePrismaContractor,
  generateSortInput,
  generatePaginationInput,
} from './../__mocks__/data';
import { createMockContext } from '../__mocks__/context';
import { DataHandler } from '../app';
import { PermissionsEnum } from '../app/types';
import { SortDirection } from '../generated';

const mockClient = 'area';
const mockTotalCount = 100;
const mockPaginationArgs = generatePaginationInput();
const mockBaseDocument = { name: 'some-name', id: 'some-id' };

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
          const input = { field: 'some-field', term: 'some-term' };
          const args = appHandler.generateFilterArgs(input);
          const expectedFilterArgs = {
            OR: [
              { [input.field]: { contains: input.term, mode: 'insensitive' } },
              { [input.field]: { startsWith: input.term, mode: 'insensitive' } },
              { [input.field]: { endsWith: input.term, mode: 'insensitive' } },
              { [input.field]: { equals: input.term, mode: 'insensitive' } },
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
          const input = generateSortInput({ field: 'area' });
          const args = appHandler.generateSortingArgs(input);
          const expectedSortArgs = { [input.field]: { name: input.direction } };

          expect(args).toEqual(expectedSortArgs);
        });

        it('should return builder sort args if sort.field is builder', () => {
          const input = generateSortInput({ field: 'builder' });
          const args = appHandler.generateSortingArgs(input);
          const expectedSortArgs = { [input.field]: { name: input.direction } };

          expect(args).toEqual(expectedSortArgs);
        });

        it('should return community sort args if sort.field is community', () => {
          const input = generateSortInput({ field: 'community' });
          const args = appHandler.generateSortingArgs(input);
          const expectedSortArgs = { [input.field]: { name: input.direction } };

          expect(args).toEqual(expectedSortArgs);
        });

        it('should return company sort args if sort.field is company', () => {
          const input = generateSortInput({ field: 'company' });
          const args = appHandler.generateSortingArgs(input);
          const expectedSortArgs = { [input.field]: { name: input.direction } };

          expect(args).toEqual(expectedSortArgs);
        });

        it('should return contractor sort args if sort.field is contractor', () => {
          const input = generateSortInput({ field: 'contractor' });
          const args = appHandler.generateSortingArgs(input);
          const expectedSortArgs = { [input.field]: { name: input.direction } };

          expect(args).toEqual(expectedSortArgs);
        });

        it('should return jobLegacy sort args if sort.field is jobLegacy', () => {
          const input = generateSortInput({ field: 'jobLegacy' });
          const args = appHandler.generateSortingArgs(input);
          const expectedSortArgs = { [input.field]: { name: input.direction } };

          expect(args).toEqual(expectedSortArgs);
        });

        it('should return reporter sort args if sort.field is reporter', () => {
          const input = generateSortInput({ field: 'reporter' });
          const args = appHandler.generateSortingArgs(input);
          const expectedSortArgs = { [input.field]: { name: input.direction } };

          expect(args).toEqual(expectedSortArgs);
        });

        it('should return scope sort args if sort.field is scope', () => {
          const input = generateSortInput({ field: 'scope' });
          const args = appHandler.generateSortingArgs(input);
          const expectedSortArgs = { [input.field]: { name: input.direction } };

          expect(args).toEqual(expectedSortArgs);
        });

        it('should return supplier sort args if sort.field is supplier', () => {
          const input = generateSortInput({ field: 'supplier' });
          const args = appHandler.generateSortingArgs(input);
          const expectedSortArgs = { [input.field]: { name: input.direction } };

          expect(args).toEqual(expectedSortArgs);
        });

        it("should return default sort args if sort.field isn't supplier", () => {
          const input = generateSortInput({ field: 'some-field' });
          const args = appHandler.generateSortingArgs(input);
          const expectedSortArgs = { [input.field]: input.direction };

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
          const input = { field: 'some-field', term: 'some-term' };
          const response = appHandler.generateFilterResponse(input);

          expect(response).toEqual({ field: input.field, term: input.term });
        });
      });

      describe('generateSortResponse', () => {
        it('should return an empty sort response when no sort is passed', () => {
          const response = appHandler.generateSortResponse();

          expect(response).toEqual({ field: '', direction: SortDirection.Asc });
        });

        it('should return a sort response when a sort is passed', () => {
          const input = generateSortInput();
          const response = appHandler.generateSortResponse(input);

          expect(response).toEqual({ field: input.field, direction: input.direction });
        });
      });

      describe('formatArea', () => {
        it('should return a formatted area', () => {
          const area = generatePrismaArea();
          const formattedArea = appHandler.formatArea(area);

          expect(formattedArea).toEqual({
            ...area,
            createdTime: area.createdTime.toJSON(),
            updatedTime: area.updatedTime.toJSON(),
          });
        });
      });

      describe('formatBuilder', () => {
        it('should return a formatted builder', () => {
          const company = generatePrismaCompany();
          const builder = { ...generatePrismaBuilder({ companyId: company.id }), company };
          const formattedBuilder = appHandler.formatBuilder(builder);

          expect(formattedBuilder).toEqual({
            ...builder,
            company: appHandler.formatCompany(builder.company),
            createdTime: builder.createdTime.toJSON(),
            updatedTime: builder.updatedTime.toJSON(),
          });
        });
      });

      describe('formatCompany', () => {
        it('should return a formatted company', () => {
          const company = generatePrismaCompany();
          const formattedCompany = appHandler.formatCompany(company);

          expect(formattedCompany).toEqual({
            ...company,
            createdTime: company.createdTime.toJSON(),
            updatedTime: company.updatedTime.toJSON(),
          });
        });
      });

      describe('formatCommunity', () => {
        it('should return a formatted community', () => {
          const company = generatePrismaCompany();
          const community = { ...generatePrismaCommunity({ companyId: company.id }), company };
          const formattedCommunity = appHandler.formatCommunity(community);

          expect(formattedCommunity).toEqual({
            ...community,
            company: appHandler.formatCompany(community.company),
            createdTime: community.createdTime.toJSON(),
            updatedTime: community.updatedTime.toJSON(),
          });
        });
      });

      describe('formatContractor', () => {
        it('should return a formatted contractor', () => {
          const supplier = generatePrismaSupplier();
          const lineItems = [
            { ...generatePrismaLineItemLegacy({ supplierId: supplier.id }), supplier },
          ];
          const jobsLegacy = [{ ...generatePrismaJobLegacy(), lineItems }];
          const contractor = { ...generatePrismaContractor(), jobsLegacy };
          const formattedContractor = appHandler.formatContractor(contractor);

          expect(formattedContractor).toEqual({
            ...contractor,
            jobsLegacy: contractor.jobsLegacy.map((job) => appHandler.formatJobLegacy(job)),
            createdTime: contractor.createdTime.toJSON(),
            updatedTime: contractor.updatedTime.toJSON(),
          });
        });
      });

      describe('formatReporter', () => {
        it('should return a formatted reporter', () => {
          const reporter = generatePrismaReporter();
          const formattedReporter = appHandler.formatReporter(reporter);

          expect(formattedReporter).toEqual({
            ...reporter,
            createdTime: reporter.createdTime.toJSON(),
            updatedTime: reporter.updatedTime.toJSON(),
          });
        });
      });

      describe('formatSupplier', () => {
        it('should return a formatted supplier', () => {
          const supplier = generatePrismaSupplier();
          const formattedSupplier = appHandler.formatSupplier(supplier);

          expect(formattedSupplier).toEqual({
            ...supplier,
            createdTime: supplier.createdTime.toJSON(),
            updatedTime: supplier.updatedTime.toJSON(),
          });
        });
      });

      describe('formatScope', () => {
        it('should return a formatted scope', () => {
          const scope = generatePrismaScope();
          const formattedScope = appHandler.formatScope(scope);

          expect(formattedScope).toEqual({
            ...scope,
            createdTime: scope.createdTime.toJSON(),
            updatedTime: scope.updatedTime.toJSON(),
          });
        });
      });
    });
  });
});
