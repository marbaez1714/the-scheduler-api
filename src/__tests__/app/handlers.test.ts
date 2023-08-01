import {
  generateSortInput,
  generatePaginationInput,
  generateDBArea,
  generateDBCompany,
  generateDBJobLegacy,
  generateDBSupplier,
  generateDBBuilder,
  generateDBCommunity,
  generateDBLineItemLegacy,
  generateDBReporter,
  generateDBContractor,
  generateDBScope,
} from '../../__mocks__/data';
import { createMockContext } from '../../__mocks__/context';
import { DataHandler } from '../../app';
import { PermissionsEnum } from '../../app/types';
import { JobLegacyStatus, SortDirection } from '../../generated';

const mockClient = 'area';
const mockTotalCount = 100;
const mockPaginationArgs = generatePaginationInput();
const mockBaseDocument = { name: 'some-name', id: 'some-id' };
const mockArea = generateDBArea(0);
const mockCompany = generateDBCompany(0);
const mockSupplier = generateDBSupplier(0);
const mockBuilder = generateDBBuilder(0, { companyId: mockCompany.id });
const mockCommunity = generateDBCommunity(0, { companyId: mockCompany.id });
const mockLineItem = generateDBLineItemLegacy(0, { supplierId: mockSupplier.id });
const mockReporter = generateDBReporter(0);
const mockContractor = generateDBContractor(0);
const mockScope = generateDBScope(0);

const mockDates = {
  yesterday: new Date(),
  tomorrow: new Date(),
  today: new Date(),
};
mockDates.yesterday.setHours(0, 0, 0, 0);
mockDates.yesterday.setDate(mockDates.yesterday.getDate() - 1);
mockDates.tomorrow.setHours(0, 0, 0, 0);
mockDates.tomorrow.setDate(mockDates.tomorrow.getDate() + 1);
mockDates.today.setHours(0, 0, 0, 0);

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
        expect(appHandler.todayDate).toEqual(mockDates.today);
      });
    });

    describe('appHandler methods', () => {
      describe('generatePaginationArgs', () => {
        describe('when pagination is not passed', () => {
          const args = appHandler.generatePaginationArgs();

          it('should return undefined', () => {
            expect(args).toBeUndefined();
          });
        });

        describe('when pagination is passed', () => {
          const args = appHandler.generatePaginationArgs(mockPaginationArgs);

          it('should return pagination args if pagination is passed', () => {
            expect(args).toEqual({ take: 10, skip: 0 });
          });
        });
      });

      describe('generateFilterArgs', () => {
        describe('when filter is not passed', () => {
          const args = appHandler.generateFilterArgs();

          it('should return undefined', () => {
            expect(args).toBeUndefined();
          });
        });

        describe('when filter is passed', () => {
          const input = { field: 'some-field', term: 'some-term' };
          const args = appHandler.generateFilterArgs(input);

          it('should return filter args', () => {
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
      });

      describe('generateSortingArgs', () => {
        describe('when sorting is not passed', () => {
          const args = appHandler.generateSortingArgs();

          it('should return undefined', () => {
            expect(args).toBeUndefined();
          });
        });

        describe('when sorting is passed', () => {
          describe('when sort.field is area', () => {
            const input = generateSortInput({ field: 'area' });
            const args = appHandler.generateSortingArgs(input);

            it('should return area sort args', () => {
              const expectedSortArgs = { [input.field]: { name: input.direction } };

              expect(args).toEqual(expectedSortArgs);
            });
          });

          describe('when sort.field is builder', () => {
            const input = generateSortInput({ field: 'builder' });
            const args = appHandler.generateSortingArgs(input);

            it('should return builder sort args', () => {
              const expectedSortArgs = { [input.field]: { name: input.direction } };

              expect(args).toEqual(expectedSortArgs);
            });
          });

          describe('when sort.field is community', () => {
            const input = generateSortInput({ field: 'community' });
            const args = appHandler.generateSortingArgs(input);

            it('should return community sort args', () => {
              const expectedSortArgs = { [input.field]: { name: input.direction } };

              expect(args).toEqual(expectedSortArgs);
            });
          });

          describe('when sort.field is company', () => {
            const input = generateSortInput({ field: 'company' });
            const args = appHandler.generateSortingArgs(input);

            it('should return company sort args', () => {
              const expectedSortArgs = { [input.field]: { name: input.direction } };

              expect(args).toEqual(expectedSortArgs);
            });
          });

          describe('when sort.field is contractor', () => {
            const input = generateSortInput({ field: 'contractor' });
            const args = appHandler.generateSortingArgs(input);

            it('should return contractor sort args', () => {
              const expectedSortArgs = { [input.field]: { name: input.direction } };

              expect(args).toEqual(expectedSortArgs);
            });
          });

          describe('when sort.field is jobLegacy', () => {
            const input = generateSortInput({ field: 'jobLegacy' });
            const args = appHandler.generateSortingArgs(input);

            it('should return jobLegacy sort args', () => {
              const expectedSortArgs = { [input.field]: { name: input.direction } };

              expect(args).toEqual(expectedSortArgs);
            });
          });

          describe('when sort.field is reporter', () => {
            const input = generateSortInput({ field: 'reporter' });
            const args = appHandler.generateSortingArgs(input);

            it('should return reporter sort args', () => {
              const expectedSortArgs = { [input.field]: { name: input.direction } };

              expect(args).toEqual(expectedSortArgs);
            });
          });

          describe('when sort.field is scope', () => {
            const input = generateSortInput({ field: 'scope' });
            const args = appHandler.generateSortingArgs(input);

            it('should return scope sort args', () => {
              const expectedSortArgs = { [input.field]: { name: input.direction } };

              expect(args).toEqual(expectedSortArgs);
            });
          });

          describe('when sort.field is supplier', () => {
            const input = generateSortInput({ field: 'supplier' });
            const args = appHandler.generateSortingArgs(input);

            it('should return supplier sort args', () => {
              const expectedSortArgs = { [input.field]: { name: input.direction } };

              expect(args).toEqual(expectedSortArgs);
            });
          });

          describe('when sort.field is some-field', () => {
            const input = generateSortInput({ field: 'some-field' });
            const args = appHandler.generateSortingArgs(input);

            it('should return default sort args', () => {
              const expectedSortArgs = { [input.field]: input.direction };

              expect(args).toEqual(expectedSortArgs);
            });
          });
        });
      });

      describe('generatePaginationResponse', () => {
        describe('when pagination is not passed', () => {
          const response = appHandler.generatePaginationResponse(mockTotalCount);

          it('should return a response with only totalCount and totalPages', () => {
            expect(response).toEqual({ totalCount: mockTotalCount, totalPages: 1 });
          });
        });

        describe('when pagination is passed', () => {
          const response = appHandler.generatePaginationResponse(
            mockTotalCount,
            mockPaginationArgs
          );

          it('should return a response with totalCount, totalPages, page, and pageSize', () => {
            expect(response).toEqual({
              totalCount: mockTotalCount,
              totalPages: 10,
              ...mockPaginationArgs,
            });
          });
        });
      });

      describe('generateWriteResponse', () => {
        const response = appHandler.generateWriteResponse(mockBaseDocument);

        it('should return a write response', () => {
          expect(response).toEqual({
            data: mockBaseDocument,
            message: `${mockBaseDocument.name} written.`,
          });
        });
      });

      describe('generateDeleteResponse', () => {
        const response = appHandler.generateDeleteResponse(mockBaseDocument);

        it('should return a delete response', () => {
          expect(response).toEqual({ message: `${mockBaseDocument.name} deleted.` });
        });
      });

      describe('generateFilterResponse', () => {
        describe('when filter is not passed', () => {
          const response = appHandler.generateFilterResponse();

          it('should return an empty filter response', () => {
            expect(response).toEqual({ field: '', term: '' });
          });
        });

        describe('when filter is passed', () => {
          const input = { field: 'some-field', term: 'some-term' };
          const response = appHandler.generateFilterResponse(input);

          it('should return a filter response', () => {
            expect(response).toEqual({ field: input.field, term: input.term });
          });
        });
      });

      describe('generateSortResponse', () => {
        describe('when sort is not passed', () => {
          const response = appHandler.generateSortResponse();

          it('should return an empty sort response', () => {
            expect(response).toEqual({ field: '', direction: SortDirection.Asc });
          });
        });

        describe('when sort is passed', () => {
          const input = generateSortInput();
          const response = appHandler.generateSortResponse(input);

          it('should return a sort response', () => {
            expect(response).toEqual({ field: input.field, direction: input.direction });
          });
        });
      });
    });
  });
});
