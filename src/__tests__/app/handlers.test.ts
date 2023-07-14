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
} from '../../__mocks__/data';
import { createMockContext } from '../../__mocks__/context';
import { DataHandler } from '../../app';
import { PermissionsEnum } from '../../app/types';
import { JobLegacyStatus, SortDirection } from '../../generated';

const mockClient = 'area';
const mockTotalCount = 100;
const mockPaginationArgs = generatePaginationInput();
const mockBaseDocument = { name: 'some-name', id: 'some-id' };
const mockArea = generatePrismaArea();
const mockCompany = generatePrismaCompany();
const mockSupplier = generatePrismaSupplier();
const mockBuilder = generatePrismaBuilder({ companyId: mockCompany.id });
const mockCommunity = generatePrismaCommunity({ companyId: mockCompany.id });
const mockLineItem = generatePrismaLineItemLegacy({ supplierId: mockSupplier.id });
const mockReporter = generatePrismaReporter();
const mockContractor = generatePrismaContractor();
const mockScope = generatePrismaScope();

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

      describe('generateArchiveResponse', () => {
        const response = appHandler.generateArchiveResponse(mockBaseDocument);

        it('should return an archive response', () => {
          expect(response).toEqual({
            data: mockBaseDocument,
            message: `${mockBaseDocument.name} archived.`,
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

      describe('formatArea', () => {
        const formattedArea = appHandler.formatArea(mockArea);

        it('should return a formatted area', () => {
          expect(formattedArea).toEqual({
            ...mockArea,
            createdTime: mockArea.createdTime.toJSON(),
            updatedTime: mockArea.updatedTime.toJSON(),
          });
        });
      });

      describe('formatBuilder', () => {
        const builder = {
          ...mockBuilder,
          company: mockCompany,
        };
        const formattedBuilder = appHandler.formatBuilder(builder);

        it('should return a formatted builder', () => {
          expect(formattedBuilder).toEqual({
            ...builder,
            company: appHandler.formatCompany(builder.company),
            createdTime: builder.createdTime.toJSON(),
            updatedTime: builder.updatedTime.toJSON(),
          });
        });
      });

      describe('formatCompany', () => {
        const formattedCompany = appHandler.formatCompany(mockCompany);

        it('should return a formatted company', () => {
          expect(formattedCompany).toEqual({
            ...mockCompany,
            createdTime: mockCompany.createdTime.toJSON(),
            updatedTime: mockCompany.updatedTime.toJSON(),
          });
        });
      });

      describe('formatCommunity', () => {
        const community = {
          ...mockCommunity,
          company: mockCompany,
        };
        const formattedCommunity = appHandler.formatCommunity(community);

        it('should return a formatted community', () => {
          expect(formattedCommunity).toEqual({
            ...community,
            company: appHandler.formatCompany(community.company),
            createdTime: community.createdTime.toJSON(),
            updatedTime: community.updatedTime.toJSON(),
          });
        });
      });

      describe('formatContractor', () => {
        const jobsLegacy = [
          {
            ...generatePrismaJobLegacy(),
            lineItems: [{ ...mockLineItem, supplier: mockSupplier }],
          },
        ];
        const contractor = { ...mockContractor, jobsLegacy };
        const formattedContractor = appHandler.formatContractor(contractor);

        it('should return a formatted contractor', () => {
          expect(formattedContractor).toEqual({
            ...contractor,
            jobsLegacy: contractor.jobsLegacy.map((job) => appHandler.formatJobLegacy(job)),
            createdTime: contractor.createdTime.toJSON(),
            updatedTime: contractor.updatedTime.toJSON(),
          });
        });
      });

      describe('formatReporter', () => {
        const formattedReporter = appHandler.formatReporter(mockReporter);

        it('should return a formatted reporter', () => {
          expect(formattedReporter).toEqual({
            ...mockReporter,
            createdTime: mockReporter.createdTime.toJSON(),
            updatedTime: mockReporter.updatedTime.toJSON(),
          });
        });
      });

      describe('formatSupplier', () => {
        const formattedSupplier = appHandler.formatSupplier(mockSupplier);

        it('should return a formatted supplier', () => {
          expect(formattedSupplier).toEqual({
            ...mockSupplier,
            createdTime: mockSupplier.createdTime.toJSON(),
            updatedTime: mockSupplier.updatedTime.toJSON(),
          });
        });
      });

      describe('formatScope', () => {
        const formattedScope = appHandler.formatScope(mockScope);

        it('should return a formatted scope', () => {
          expect(formattedScope).toEqual({
            ...mockScope,
            createdTime: mockScope.createdTime.toJSON(),
            updatedTime: mockScope.updatedTime.toJSON(),
          });
        });
      });

      describe('formatJobLegacy', () => {
        const lineItems = [{ ...mockLineItem, supplier: mockSupplier }];
        const formattedLineItems = lineItems.map((lineItem) =>
          appHandler.formatLineItemLegacy(lineItem)
        );

        describe('when inProgress is true', () => {
          const jobLegacy = {
            ...generatePrismaJobLegacy({ inProgress: true, completedDate: null }),
            lineItems,
          };
          const formattedJobLegacy = appHandler.formatJobLegacy(jobLegacy);

          it('should return a formatted job legacy with a status of JobLegacyStatus.InProgress', () => {
            expect(formattedJobLegacy).toEqual({
              ...jobLegacy,
              lineItems: formattedLineItems,
              status: JobLegacyStatus.InProgress,
              createdTime: jobLegacy.createdTime.toJSON(),
              updatedTime: jobLegacy.updatedTime.toJSON(),
              startDate: jobLegacy.startDate?.toJSON(),
              completedDate: undefined,
            });
          });
        });

        describe('when inProgress is false', () => {
          describe('when startDate is null', () => {
            const jobLegacy = {
              ...generatePrismaJobLegacy({ inProgress: false, startDate: null }),
              lineItems,
            };
            const formattedJobLegacy = appHandler.formatJobLegacy(jobLegacy);

            it('should return a formatted jon legacy with a status of JobLegacyStatus.WillCall and empty startDate', () => {
              expect(formattedJobLegacy).toEqual({
                ...jobLegacy,
                lineItems: formattedLineItems,
                status: JobLegacyStatus.WillCall,
                createdTime: jobLegacy.createdTime.toJSON(),
                updatedTime: jobLegacy.updatedTime.toJSON(),
                startDate: undefined,
                completedDate: jobLegacy.completedDate?.toJSON(),
              });
            });
          });

          describe('when startDate is not null', () => {
            describe('when todayDate > startDate', () => {
              const jobLegacy = {
                ...generatePrismaJobLegacy({ inProgress: false, startDate: mockDates.yesterday }),
                lineItems,
              };
              const formattedJobLegacy = appHandler.formatJobLegacy(jobLegacy);

              it('should return a formatted job legacy with a status of JobLegacyStatus.PastDue', () => {
                expect(formattedJobLegacy).toEqual({
                  ...jobLegacy,
                  lineItems: formattedLineItems,
                  status: JobLegacyStatus.PastDue,
                  createdTime: jobLegacy.createdTime.toJSON(),
                  updatedTime: jobLegacy.updatedTime.toJSON(),
                  startDate: jobLegacy.startDate?.toJSON(),
                  completedDate: jobLegacy.completedDate?.toJSON(),
                });
              });
            });

            describe('when todayDate < startDate', () => {
              const jobLegacy = {
                ...generatePrismaJobLegacy({ inProgress: false, startDate: mockDates.tomorrow }),
                lineItems,
              };
              const formattedJobLegacy = appHandler.formatJobLegacy(jobLegacy);

              it('should return a formatted job legacy with a status of JobLegacyStatus.Planned', () => {
                expect(formattedJobLegacy).toEqual({
                  ...jobLegacy,
                  lineItems: formattedLineItems,
                  status: JobLegacyStatus.Planned,
                  createdTime: jobLegacy.createdTime.toJSON(),
                  updatedTime: jobLegacy.updatedTime.toJSON(),
                  startDate: jobLegacy.startDate?.toJSON(),
                  completedDate: jobLegacy.completedDate?.toJSON(),
                });
              });
            });

            describe('when todayDate === startDate', () => {
              const jobLegacy = {
                ...generatePrismaJobLegacy({ inProgress: false, startDate: mockDates.today }),
                lineItems,
              };
              const formattedJobLegacy = appHandler.formatJobLegacy(jobLegacy);

              it('should return a formatted job legacy with a status of JobLegacyStatus.Today', () => {
                expect(formattedJobLegacy).toEqual({
                  ...jobLegacy,
                  lineItems: formattedLineItems,
                  status: JobLegacyStatus.Today,
                  createdTime: jobLegacy.createdTime.toJSON(),
                  updatedTime: jobLegacy.updatedTime.toJSON(),
                  startDate: jobLegacy.startDate?.toJSON(),
                  completedDate: jobLegacy.completedDate?.toJSON(),
                });
              });
            });
          });
        });
      });

      describe('formatLineItemLegacy', () => {
        const lineItemLegacy = { ...mockLineItem, supplier: mockSupplier };
        const formattedLineItemLegacy = appHandler.formatLineItemLegacy(lineItemLegacy);

        it('should return a formatted line item legacy', () => {
          expect(formattedLineItemLegacy).toEqual({
            ...lineItemLegacy,
            supplier: appHandler.formatSupplier(lineItemLegacy.supplier),
            createdTime: lineItemLegacy.createdTime.toJSON(),
            updatedTime: lineItemLegacy.updatedTime.toJSON(),
          });
        });
      });
    });
  });
});
