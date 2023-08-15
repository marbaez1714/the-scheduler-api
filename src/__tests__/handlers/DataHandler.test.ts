/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MockData } from '../../__mocks__/data';
import { createMockContext } from '../../__mocks__/context';
import { PermissionsEnum } from '../../app/types';
import { JobLegacyStatus, SortDirection } from '../../generated';
import { SMSConsent } from '@prisma/client';
import { GRAPHQL_ERRORS, RESPONSES, SMS_MESSAGES } from '../../constants';
import { DataHandler } from '../../handlers';

const mockClient = 'area';
const mockTotalCount = 100;
const mockPaginationInput = MockData.paginationInput();
const mockMessage = 'some-message';
const mockSMSMessage = 'some-sms-message';

describe('DataHandler', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when user is not an admin', () => {
    const mockContext = createMockContext();

    it('throws an error', () => {
      expect(() => new DataHandler(mockContext, mockClient)).toThrowError();
    });
  });

  describe('when user is an admin', () => {
    const mockContext = createMockContext([PermissionsEnum.Admin]);
    const dataHandler = new DataHandler(mockContext, mockClient);

    describe('fields', () => {
      it('has a context field', () => {
        expect(dataHandler.context).toEqual(mockContext);
      });

      it('has a client field', () => {
        expect(dataHandler.client).toEqual(mockClient);
      });

      it('has a crud field', () => {
        expect(dataHandler.crud).toEqual(mockContext.prisma[mockClient]);
      });

      it('has a userId field', () => {
        expect(dataHandler.userId).toEqual(mockContext.user.sub);
      });

      it('has a todayDate field', () => {
        expect(dataHandler.todayDate).toEqual(MockData.dates.today);
      });
    });

    describe('methods', () => {
      describe('Argument Generators', () => {
        describe('generatePaginationArgs', () => {
          describe('when pagination is not passed', () => {
            const args = dataHandler.generatePaginationArgs();

            it('returns undefined', () => {
              expect(args).toBeUndefined();
            });
          });

          describe('when pagination is passed', () => {
            const args = dataHandler.generatePaginationArgs(mockPaginationInput);

            it('returns pagination args if pagination is passed', () => {
              expect(args).toEqual({ take: 10, skip: 0 });
            });
          });
        });

        describe('generateFilterArgs', () => {
          describe('when filter is not passed', () => {
            const args = dataHandler.generateFilterArgs();

            it('returns undefined', () => {
              expect(args).toBeUndefined();
            });
          });

          describe('when filter is passed', () => {
            const input = { field: 'some-field', term: 'some-term' };
            const args = dataHandler.generateFilterArgs(input);

            it('returns filter args', () => {
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
            const args = dataHandler.generateSortingArgs();

            it('returns undefined', () => {
              expect(args).toBeUndefined();
            });
          });

          describe('when sorting is passed', () => {
            describe('when sort.field is area', () => {
              const input = MockData.sortInput({ field: 'area' });
              const args = dataHandler.generateSortingArgs(input);

              it('returns area sort args', () => {
                const expectedSortArgs = { [input.field]: { name: input.direction } };

                expect(args).toEqual(expectedSortArgs);
              });
            });

            describe('when sort.field is builder', () => {
              const input = MockData.sortInput({ field: 'builder' });
              const args = dataHandler.generateSortingArgs(input);

              it('returns builder sort args', () => {
                const expectedSortArgs = { [input.field]: { name: input.direction } };

                expect(args).toEqual(expectedSortArgs);
              });
            });

            describe('when sort.field is community', () => {
              const input = MockData.sortInput({ field: 'community' });
              const args = dataHandler.generateSortingArgs(input);

              it('returns community sort args', () => {
                const expectedSortArgs = { [input.field]: { name: input.direction } };

                expect(args).toEqual(expectedSortArgs);
              });
            });

            describe('when sort.field is company', () => {
              const input = MockData.sortInput({ field: 'company' });
              const args = dataHandler.generateSortingArgs(input);

              it('returns company sort args', () => {
                const expectedSortArgs = { [input.field]: { name: input.direction } };

                expect(args).toEqual(expectedSortArgs);
              });
            });

            describe('when sort.field is contractor', () => {
              const input = MockData.sortInput({ field: 'contractor' });
              const args = dataHandler.generateSortingArgs(input);

              it('returns contractor sort args', () => {
                const expectedSortArgs = { [input.field]: { name: input.direction } };

                expect(args).toEqual(expectedSortArgs);
              });
            });

            describe('when sort.field is jobLegacy', () => {
              const input = MockData.sortInput({ field: 'jobLegacy' });
              const args = dataHandler.generateSortingArgs(input);

              it('returns jobLegacy sort args', () => {
                const expectedSortArgs = { [input.field]: { name: input.direction } };

                expect(args).toEqual(expectedSortArgs);
              });
            });

            describe('when sort.field is reporter', () => {
              const input = MockData.sortInput({ field: 'reporter' });
              const args = dataHandler.generateSortingArgs(input);

              it('returns reporter sort args', () => {
                const expectedSortArgs = { [input.field]: { name: input.direction } };

                expect(args).toEqual(expectedSortArgs);
              });
            });

            describe('when sort.field is scope', () => {
              const input = MockData.sortInput({ field: 'scope' });
              const args = dataHandler.generateSortingArgs(input);

              it('returns scope sort args', () => {
                const expectedSortArgs = { [input.field]: { name: input.direction } };

                expect(args).toEqual(expectedSortArgs);
              });
            });

            describe('when sort.field is supplier', () => {
              const input = MockData.sortInput({ field: 'supplier' });
              const args = dataHandler.generateSortingArgs(input);

              it('returns supplier sort args', () => {
                const expectedSortArgs = { [input.field]: { name: input.direction } };

                expect(args).toEqual(expectedSortArgs);
              });
            });

            describe('when sort.field is some-field', () => {
              const input = MockData.sortInput({ field: 'some-field' });
              const args = dataHandler.generateSortingArgs(input);

              it('returns default sort args', () => {
                const expectedSortArgs = { [input.field]: input.direction };

                expect(args).toEqual(expectedSortArgs);
              });
            });
          });
        });
      });

      describe('DB Formatting', () => {
        describe('formatDBArea', () => {
          const mockDBArea = MockData.dBArea();
          const formattedArea = dataHandler.formatDBArea(mockDBArea);

          it('returns a formatted area', () => {
            expect(formattedArea).toEqual({
              ...mockDBArea,
              createdTime: MockData.dates.createTimeJSON,
              updatedTime: MockData.dates.updatedTimeJSON,
            });
          });
        });

        describe('formatDBBuilder', () => {
          const mockDBBuilder = MockData.dBBuilder();
          const formattedBuilder = dataHandler.formatDBBuilder(mockDBBuilder);

          it('returns a formatted builder', () => {
            expect(formattedBuilder).toEqual({
              ...mockDBBuilder,
              createdTime: MockData.dates.createTimeJSON,
              updatedTime: MockData.dates.updatedTimeJSON,
            });
          });
        });

        describe('formatDBCommunity', () => {
          const mockDBCommunity = MockData.dBCommunity();
          const formattedCommunity = dataHandler.formatDBCommunity(mockDBCommunity);

          it('returns a formatted community', () => {
            expect(formattedCommunity).toEqual({
              ...mockDBCommunity,
              createdTime: MockData.dates.createTimeJSON,
              updatedTime: MockData.dates.updatedTimeJSON,
            });
          });
        });

        describe('formatDBCompany', () => {
          const mockDBCompany = MockData.dBCompany();
          const formattedCompany = dataHandler.formatDBCompany(mockDBCompany);

          it('returns a formatted company', () => {
            expect(formattedCompany).toEqual({
              ...mockDBCompany,
              createdTime: MockData.dates.createTimeJSON,
              updatedTime: MockData.dates.updatedTimeJSON,
            });
          });
        });

        describe('formatDBContractor', () => {
          const mockDBContractor = MockData.dBContractor();
          const formattedContractor = dataHandler.formatDBContractor(mockDBContractor);

          it('returns a formatted contractor', () => {
            expect(formattedContractor).toEqual({
              ...mockDBContractor,
              createdTime: MockData.dates.createTimeJSON,
              updatedTime: MockData.dates.updatedTimeJSON,
            });
          });
        });

        describe('formatDBJobLegacy', () => {
          describe('when inProgress is true', () => {
            const mockDBJobLegacy = MockData.dBJobLegacy(0, { inProgress: true });
            const formattedJobLegacy = dataHandler.formatDBJobLegacy(mockDBJobLegacy);

            it('returns a formatted jobLegacy with status = JobLegacyStatus.InProgress', () => {
              expect(formattedJobLegacy).toEqual({
                ...mockDBJobLegacy,
                createdTime: MockData.dates.createTimeJSON,
                updatedTime: MockData.dates.updatedTimeJSON,
                status: JobLegacyStatus.InProgress,
              });
            });
          });

          describe('when inProgress is false', () => {
            describe('when startDate is null', () => {
              const mockDBJobLegacy = MockData.dBJobLegacy(0, {
                inProgress: false,
                startDate: null,
              });
              const formattedJobLegacy = dataHandler.formatDBJobLegacy(mockDBJobLegacy);

              it('returns a formatted jobLegacy with status = JobLegacyStatus.WillCall', () => {
                expect(formattedJobLegacy).toEqual({
                  ...mockDBJobLegacy,
                  createdTime: MockData.dates.createTimeJSON,
                  updatedTime: MockData.dates.updatedTimeJSON,
                  status: JobLegacyStatus.WillCall,
                });
              });
            });

            describe('when startDate is not null', () => {
              describe('when todayDate > startDate', () => {
                const mockDBJobLegacy = MockData.dBJobLegacy(0, {
                  inProgress: false,
                  startDate: MockData.dates.yesterday,
                });
                const formattedJobLegacy = dataHandler.formatDBJobLegacy(mockDBJobLegacy);

                it('returns a formatted jobLegacy with status = JobLegacyStatus.PastDue', () => {
                  expect(formattedJobLegacy).toEqual({
                    ...mockDBJobLegacy,
                    startDate: mockDBJobLegacy.startDate?.toJSON(),
                    createdTime: MockData.dates.createTimeJSON,
                    updatedTime: MockData.dates.updatedTimeJSON,
                    status: JobLegacyStatus.PastDue,
                  });
                });
              });

              describe('when todayDate < startDate', () => {
                const mockDBJobLegacy = MockData.dBJobLegacy(0, {
                  inProgress: false,
                  startDate: MockData.dates.tomorrow,
                });

                const formattedJobLegacy = dataHandler.formatDBJobLegacy(mockDBJobLegacy);

                it('returns a formatted jobLegacy with status = JobLegacyStatus.Planned', () => {
                  expect(formattedJobLegacy).toEqual({
                    ...mockDBJobLegacy,
                    startDate: mockDBJobLegacy.startDate?.toJSON(),
                    createdTime: MockData.dates.createTimeJSON,
                    updatedTime: MockData.dates.updatedTimeJSON,
                    status: JobLegacyStatus.Planned,
                  });
                });
              });

              describe('when todayDate = startDate', () => {
                const mockDBJobLegacy = MockData.dBJobLegacy(0, {
                  inProgress: false,
                  startDate: MockData.dates.today,
                });

                const formattedJobLegacy = dataHandler.formatDBJobLegacy(mockDBJobLegacy);

                it('returns a formatted jobLegacy with status = JobLegacyStatus.Today', () => {
                  expect(formattedJobLegacy).toEqual({
                    ...mockDBJobLegacy,
                    startDate: mockDBJobLegacy.startDate?.toJSON(),
                    createdTime: MockData.dates.createTimeJSON,
                    updatedTime: MockData.dates.updatedTimeJSON,
                    status: JobLegacyStatus.Today,
                  });
                });
              });
            });
          });

          describe('when completedDate is not null', () => {
            const mockDBJobLegacy = MockData.dBJobLegacy(0, {
              completedDate: MockData.dates.yesterday,
            });
            const formattedJobLegacy = dataHandler.formatDBJobLegacy(mockDBJobLegacy);

            it('returns a formatted jobLegacy with a completedDate', () => {
              expect(formattedJobLegacy).toEqual({
                ...mockDBJobLegacy,
                completedDate: mockDBJobLegacy.completedDate?.toJSON(),
                createdTime: MockData.dates.createTimeJSON,
                updatedTime: MockData.dates.updatedTimeJSON,
                status: JobLegacyStatus.WillCall,
              });
            });
          });
        });

        describe('formatDBReporter', () => {
          const mockDBReporter = MockData.dBReporter();
          const formattedReporter = dataHandler.formatDBReporter(mockDBReporter);

          it('returns a formatted reporter', () => {
            expect(formattedReporter).toEqual({
              ...mockDBReporter,
              createdTime: MockData.dates.createTimeJSON,
              updatedTime: MockData.dates.updatedTimeJSON,
            });
          });
        });

        describe('formatDBScope', () => {
          const mockDBScope = MockData.dBScope();
          const formattedScope = dataHandler.formatDBScope(mockDBScope);

          it('returns a formatted scope', () => {
            expect(formattedScope).toEqual({
              ...mockDBScope,
              createdTime: MockData.dates.createTimeJSON,
              updatedTime: MockData.dates.updatedTimeJSON,
            });
          });
        });

        describe('formatDBSupplier', () => {
          const mockDBSupplier = MockData.dBSupplier();
          const formattedSupplier = dataHandler.formatDBSupplier(mockDBSupplier);

          it('returns a formatted supplier', () => {
            expect(formattedSupplier).toEqual({
              ...mockDBSupplier,
              createdTime: MockData.dates.createTimeJSON,
              updatedTime: MockData.dates.updatedTimeJSON,
            });
          });
        });

        describe('formatDBLineItemLegacy', () => {
          const mockDBLineItemLegacy = MockData.dBLineItemLegacy();
          const formattedLineItemLegacy = dataHandler.formatDBLineItemLegacy(mockDBLineItemLegacy);

          it('returns a formatted lineItemLegacy', () => {
            expect(formattedLineItemLegacy).toEqual({
              ...mockDBLineItemLegacy,
              createdTime: MockData.dates.createTimeJSON,
              updatedTime: MockData.dates.updatedTimeJSON,
            });
          });
        });
      });

      describe('GraphQL DTOs', () => {
        describe('paginationResponseDTO', () => {
          describe('when pagination is not passed', () => {
            const response = dataHandler.paginationResponseDTO(mockTotalCount);

            it('returns a response with only totalCount and totalPages', () => {
              expect(response).toEqual({ totalCount: mockTotalCount, totalPages: 1 });
            });
          });

          describe('when pagination is passed', () => {
            const response = dataHandler.paginationResponseDTO(mockTotalCount, mockPaginationInput);

            it('returns a response with totalCount, totalPages, page, and pageSize', () => {
              expect(response).toEqual({
                totalCount: mockTotalCount,
                totalPages: 10,
                ...mockPaginationInput,
              });
            });
          });
        });

        describe('sortResponseDTO', () => {
          describe('when sort is not passed', () => {
            const response = dataHandler.sortResponseDTO();

            it('returns a default SortResponse', () => {
              expect(response).toEqual({
                field: '',
                direction: SortDirection.Asc,
              });
            });
          });

          describe('when sort is passed', () => {
            const input = { field: 'some-field', direction: SortDirection.Desc };
            const response = dataHandler.sortResponseDTO(input);

            it('returns a SortResponse', () => {
              expect(response).toEqual({
                field: input.field,
                direction: input.direction,
              });
            });
          });
        });

        describe('filterResponseDTO', () => {
          describe('when filter is not passed', () => {
            const response = dataHandler.filterResponseDTO();

            it('returns a default FilterResponse', () => {
              expect(response).toEqual({ field: '', term: '' });
            });
          });

          describe('when filter is passed', () => {
            const input = { field: 'some-field', term: 'some-term' };
            const response = dataHandler.filterResponseDTO(input);

            it('returns a FilterResponse', () => {
              expect(response).toEqual({ field: input.field, term: input.term });
            });
          });
        });

        describe('Area', () => {
          const mockDoc = MockData.dBArea();
          const mockDocList = [mockDoc, MockData.dBArea(1), MockData.dBArea(2)];

          describe('areaDTO', () => {
            const areaDTO = dataHandler.areaDTO(mockDoc);

            it('returns an Area', () => {
              expect(areaDTO).toEqual(dataHandler.formatDBArea(mockDoc));
            });
          });

          describe('archiveAreaResponseDTO', () => {
            const archiveAreaResponseDTO = dataHandler.archiveAreaResponseDTO(mockDoc);

            it('returns an ArchiveAreaResponse', () => {
              expect(archiveAreaResponseDTO).toEqual({
                data: dataHandler.areaDTO(mockDoc),
                message: RESPONSES.archiveSuccess(mockDoc.name),
              });
            });
          });

          describe('writeAreaResponseDTO', () => {
            const writeAreaResponseDTO = dataHandler.writeAreaResponseDTO(mockDoc, mockMessage);

            it('returns a WriteAreaResponse', () => {
              expect(writeAreaResponseDTO).toEqual({
                data: dataHandler.areaDTO(mockDoc),
                message: mockMessage,
              });
            });
          });

          describe('areasResponseDTO', () => {
            describe('when pagination is not passed', () => {
              const areasResponseDTO = dataHandler.areasResponseDTO(mockDocList, mockTotalCount);

              it('returns an AreasResponse', () => {
                expect(areasResponseDTO).toEqual({
                  data: mockDocList.map((doc) => dataHandler.areaDTO(doc)),
                  pagination: dataHandler.paginationResponseDTO(mockTotalCount),
                });
              });
            });

            describe('when pagination is passed', () => {
              const areasResponseDTO = dataHandler.areasResponseDTO(
                mockDocList,
                mockTotalCount,
                mockPaginationInput
              );

              it('returns an AreasResponse', () => {
                expect(areasResponseDTO).toEqual({
                  data: mockDocList.map((doc) => dataHandler.areaDTO(doc)),
                  pagination: dataHandler.paginationResponseDTO(
                    mockTotalCount,
                    mockPaginationInput
                  ),
                });
              });
            });
          });
        });

        describe('Builder', () => {
          const mockBuilderDoc = MockData.dBBuilder();
          const mockCompanyDoc = MockData.dBCompany();
          const mockDoc = { ...mockBuilderDoc, company: mockCompanyDoc };
          const mockDocList = [
            mockDoc,
            { ...MockData.dBBuilder(1), company: MockData.dBCompany(1) },
            { ...MockData.dBBuilder(2), company: MockData.dBCompany(2) },
          ];

          describe('builderDTO', () => {
            const builderDTO = dataHandler.builderDTO(mockDoc);

            it('returns a Builder', () => {
              expect(builderDTO).toEqual({
                ...dataHandler.formatDBBuilder(mockBuilderDoc),
                company: dataHandler.formatDBCompany(mockCompanyDoc),
              });
            });
          });

          describe('archiveBuilderResponseDTO', () => {
            const archiveBuilderResponseDTO = dataHandler.archiveBuilderResponseDTO(mockDoc);

            it('returns an ArchiveBuilderResponse', () => {
              expect(archiveBuilderResponseDTO).toEqual({
                data: dataHandler.builderDTO(mockDoc),
                message: RESPONSES.archiveSuccess(mockDoc.name),
              });
            });
          });

          describe('writeBuilderResponseDTO', () => {
            const writeBuilderResponseDTO = dataHandler.writeBuilderResponseDTO(
              mockDoc,
              mockMessage
            );

            it('returns a WriteBuilderResponse', () => {
              expect(writeBuilderResponseDTO).toEqual({
                data: dataHandler.builderDTO(mockDoc),
                message: mockMessage,
              });
            });
          });

          describe('buildersResponseDTO', () => {
            describe('when pagination is not passed', () => {
              const buildersResponseDTO = dataHandler.buildersResponseDTO(
                mockDocList,
                mockTotalCount
              );

              it('returns a BuildersResponse', () => {
                expect(buildersResponseDTO).toEqual({
                  data: mockDocList.map((doc) => dataHandler.builderDTO(doc)),
                  pagination: dataHandler.paginationResponseDTO(mockTotalCount),
                });
              });
            });

            describe('when pagination is passed', () => {
              const buildersResponseDTO = dataHandler.buildersResponseDTO(
                mockDocList,
                mockTotalCount,
                mockPaginationInput
              );

              it('returns a BuildersResponse', () => {
                expect(buildersResponseDTO).toEqual({
                  data: mockDocList.map((doc) => dataHandler.builderDTO(doc)),
                  pagination: dataHandler.paginationResponseDTO(
                    mockTotalCount,
                    mockPaginationInput
                  ),
                });
              });
            });
          });
        });

        describe('Company', () => {
          const mockDoc = MockData.dBCompany();
          const mockDocList = [mockDoc, MockData.dBCompany(1), MockData.dBCompany(2)];

          describe('companyDTO', () => {
            const companyDTO = dataHandler.companyDTO(mockDoc);

            it('returns a Company', () => {
              expect(companyDTO).toEqual(dataHandler.formatDBCompany(mockDoc));
            });
          });

          describe('archiveCompanyResponseDTO', () => {
            const archiveCompanyResponseDTO = dataHandler.archiveCompanyResponseDTO(mockDoc);

            it('returns an ArchiveCompanyResponse', () => {
              expect(archiveCompanyResponseDTO).toEqual({
                data: dataHandler.companyDTO(mockDoc),
                message: RESPONSES.archiveSuccess(mockDoc.name),
              });
            });
          });

          describe('writeCompanyResponseDTO', () => {
            const writeCompanyResponseDTO = dataHandler.writeCompanyResponseDTO(
              mockDoc,
              mockMessage
            );

            it('returns a WriteCompanyResponse', () => {
              expect(writeCompanyResponseDTO).toEqual({
                data: dataHandler.companyDTO(mockDoc),
                message: mockMessage,
              });
            });
          });

          describe('companiesResponseDTO', () => {
            describe('when pagination is not passed', () => {
              const companiesResponseDTO = dataHandler.companiesResponseDTO(
                mockDocList,
                mockTotalCount
              );

              it('returns a CompaniesResponse', () => {
                expect(companiesResponseDTO).toEqual({
                  data: mockDocList.map((doc) => dataHandler.companyDTO(doc)),
                  pagination: dataHandler.paginationResponseDTO(mockTotalCount),
                });
              });
            });

            describe('when pagination is passed', () => {
              const companiesResponseDTO = dataHandler.companiesResponseDTO(
                mockDocList,
                mockTotalCount,
                mockPaginationInput
              );

              it('returns a CompaniesResponse', () => {
                expect(companiesResponseDTO).toEqual({
                  data: mockDocList.map((doc) => dataHandler.companyDTO(doc)),
                  pagination: dataHandler.paginationResponseDTO(
                    mockTotalCount,
                    mockPaginationInput
                  ),
                });
              });
            });
          });
        });

        describe('Community', () => {
          const mockCommunityDoc = MockData.dBCommunity();
          const mockCompanyDoc = MockData.dBCompany();
          const mockDoc = { ...mockCommunityDoc, company: mockCompanyDoc };
          const mockDocList = [
            mockDoc,
            { ...MockData.dBCommunity(1), company: MockData.dBCompany(1) },
            { ...MockData.dBCommunity(2), company: MockData.dBCompany(2) },
          ];

          describe('communityDTO', () => {
            const communityDTO = dataHandler.communityDTO(mockDoc);

            it('returns a Community', () => {
              expect(communityDTO).toEqual({
                ...dataHandler.formatDBCommunity(mockCommunityDoc),
                company: dataHandler.formatDBCompany(mockCompanyDoc),
              });
            });
          });

          describe('archiveCommunityResponseDTO', () => {
            const archiveCommunityResponseDTO = dataHandler.archiveCommunityResponseDTO(mockDoc);

            it('returns an ArchiveCommunityResponse', () => {
              expect(archiveCommunityResponseDTO).toEqual({
                data: dataHandler.communityDTO(mockDoc),
                message: RESPONSES.archiveSuccess(mockDoc.name),
              });
            });
          });

          describe('writeCommunityResponseDTO', () => {
            const writeCommunityResponseDTO = dataHandler.writeCommunityResponseDTO(
              mockDoc,
              mockMessage
            );

            it('returns a WriteCommunityResponse', () => {
              expect(writeCommunityResponseDTO).toEqual({
                data: dataHandler.communityDTO(mockDoc),
                message: mockMessage,
              });
            });
          });

          describe('communitiesResponseDTO', () => {
            describe('when pagination is not passed', () => {
              const communitiesResponseDTO = dataHandler.communitiesResponseDTO(
                mockDocList,
                mockTotalCount
              );

              it('returns a CommunitiesResponse', () => {
                expect(communitiesResponseDTO).toEqual({
                  data: mockDocList.map((doc) => dataHandler.communityDTO(doc)),
                  pagination: dataHandler.paginationResponseDTO(mockTotalCount),
                });
              });
            });

            describe('when pagination is passed', () => {
              const communitiesResponseDTO = dataHandler.communitiesResponseDTO(
                mockDocList,
                mockTotalCount,
                mockPaginationInput
              );

              it('returns a CommunitiesResponse', () => {
                expect(communitiesResponseDTO).toEqual({
                  data: mockDocList.map((doc) => dataHandler.communityDTO(doc)),
                  pagination: dataHandler.paginationResponseDTO(
                    mockTotalCount,
                    mockPaginationInput
                  ),
                });
              });
            });
          });
        });

        describe('Contactor', () => {
          const mockSupplierDoc = MockData.dBSupplier();
          const mockLineItemLegacyDoc = MockData.dBLineItemLegacy();
          const mockJobLegacyDoc = MockData.dBJobLegacy();
          const mockContractorDoc = MockData.dBContractor();
          const mockDoc = {
            ...mockContractorDoc,
            jobsLegacy: [
              {
                ...mockJobLegacyDoc,
                lineItems: [{ ...mockLineItemLegacyDoc, supplier: mockSupplierDoc }],
              },
            ],
          };
          const mockDocList = [
            mockDoc,
            {
              ...MockData.dBContractor(1),
              jobsLegacy: [
                {
                  ...MockData.dBJobLegacy(1),
                  lineItems: [
                    { ...MockData.dBLineItemLegacy(1), supplier: MockData.dBSupplier(1) },
                  ],
                },
              ],
            },
            {
              ...MockData.dBContractor(2),
              jobsLegacy: [
                {
                  ...MockData.dBJobLegacy(2),
                  lineItems: [
                    { ...MockData.dBLineItemLegacy(2), supplier: MockData.dBSupplier(2) },
                  ],
                },
              ],
            },
          ];

          describe('contractorDTO', () => {
            const contractorDTO = dataHandler.contractorDTO(mockDoc);

            it('returns a Contractor', () => {
              expect(contractorDTO).toEqual({
                ...dataHandler.formatDBContractor(mockContractorDoc),
                jobsLegacy: [
                  {
                    ...dataHandler.formatDBJobLegacy(mockJobLegacyDoc),
                    lineItems: [
                      {
                        ...dataHandler.formatDBLineItemLegacy(mockLineItemLegacyDoc),
                        supplier: dataHandler.formatDBSupplier(mockSupplierDoc),
                      },
                    ],
                  },
                ],
              });
            });
          });

          describe('archiveContractorResponseDTO', () => {
            const archiveContractorResponseDTO = dataHandler.archiveContractorResponseDTO(mockDoc);

            it('returns an ArchiveContractorResponse', () => {
              expect(archiveContractorResponseDTO).toEqual({
                data: dataHandler.contractorDTO(mockDoc),
                message: RESPONSES.archiveSuccess(mockDoc.name),
              });
            });
          });

          describe('writeContractorResponseDTO', () => {
            const writeContractorResponseDTO = dataHandler.writeContractorResponseDTO(
              mockDoc,
              mockMessage
            );

            it('returns a WriteContractorResponse', () => {
              expect(writeContractorResponseDTO).toEqual({
                data: dataHandler.contractorDTO(mockDoc),
                message: mockMessage,
              });
            });
          });

          describe('contractorsResponseDTO', () => {
            describe('when pagination is not passed', () => {
              const contractorsResponseDTO = dataHandler.contractorsResponseDTO(
                mockDocList,
                mockTotalCount
              );

              it('returns a ContractorsResponse', () => {
                expect(contractorsResponseDTO).toEqual({
                  data: mockDocList.map((doc) => dataHandler.contractorDTO(doc)),
                  pagination: dataHandler.paginationResponseDTO(mockTotalCount),
                });
              });
            });

            describe('when pagination is passed', () => {
              const contractorsResponseDTO = dataHandler.contractorsResponseDTO(
                mockDocList,
                mockTotalCount,
                mockPaginationInput
              );

              it('returns a ContractorsResponse', () => {
                expect(contractorsResponseDTO).toEqual({
                  data: mockDocList.map((doc) => dataHandler.contractorDTO(doc)),
                  pagination: dataHandler.paginationResponseDTO(
                    mockTotalCount,
                    mockPaginationInput
                  ),
                });
              });
            });
          });

          describe('assignedContractorsResponseDTO', () => {
            const assignedContractorsResponseDTO =
              dataHandler.assignedContractorsResponseDTO(mockDocList);

            it('returns an AssignedContractorsResponse', () => {
              expect(assignedContractorsResponseDTO).toEqual({
                data: mockDocList.map((doc) => dataHandler.contractorDTO(doc)),
              });
            });
          });
        });

        describe('JobLegacy', () => {
          const mockSupplierDoc = MockData.dBSupplier();
          const mockLineItemLegacyDoc = MockData.dBLineItemLegacy();
          const mockJobLegacyDoc = MockData.dBJobLegacy();
          const mockFilterInput = MockData.filterInput({
            field: 'some-filter-field',
            term: 'some-filter-term',
          });
          const mockSortInput = MockData.sortInput({
            field: 'some-sort-field',
            direction: SortDirection.Desc,
          });
          const mockDoc = {
            ...mockJobLegacyDoc,
            lineItems: [{ ...mockLineItemLegacyDoc, supplier: mockSupplierDoc }],
          };
          const mockDocList = [
            mockDoc,
            {
              ...MockData.dBJobLegacy(1),
              lineItems: [{ ...MockData.dBLineItemLegacy(1), supplier: MockData.dBSupplier(1) }],
            },
            {
              ...MockData.dBJobLegacy(2),
              lineItems: [{ ...MockData.dBLineItemLegacy(2), supplier: MockData.dBSupplier(2) }],
            },
          ];

          describe('jobLegacyDTO', () => {
            const jobLegacyDTO = dataHandler.jobLegacyDTO(mockDoc);

            it('returns a JobLegacy', () => {
              expect(jobLegacyDTO).toEqual({
                ...dataHandler.formatDBJobLegacy(mockJobLegacyDoc),
                lineItems: [
                  {
                    ...dataHandler.formatDBLineItemLegacy(mockLineItemLegacyDoc),
                    supplier: dataHandler.formatDBSupplier(mockSupplierDoc),
                  },
                ],
              });
            });
          });

          describe('archiveJobLegacyResponseDTO', () => {
            const archiveJobLegacyResponseDTO = dataHandler.archiveJobLegacyResponseDTO(mockDoc);

            it('returns an ArchiveJobLegacyResponse', () => {
              expect(archiveJobLegacyResponseDTO).toEqual({
                data: dataHandler.jobLegacyDTO(mockDoc),
                message: RESPONSES.archiveSuccess(mockDoc.name),
              });
            });
          });

          describe('writeJobLegacyResponseDTO', () => {
            const writeJobLegacyResponseDTO = dataHandler.writeJobLegacyResponseDTO(
              mockDoc,
              mockMessage
            );

            it('returns a WriteJobLegacyResponse', () => {
              expect(writeJobLegacyResponseDTO).toEqual({
                data: dataHandler.jobLegacyDTO(mockDoc),
                message: mockMessage,
              });
            });
          });

          describe('jobsLegacyResponseDTO', () => {
            describe('when pagination, filterInput, and sortInput are not passed', () => {
              const jobsLegacyResponseDTO = dataHandler.jobsLegacyResponseDTO(
                mockDocList,
                mockTotalCount
              );

              it('returns a JobsLegacyResponse', () => {
                expect(jobsLegacyResponseDTO).toEqual({
                  data: mockDocList.map((doc) => dataHandler.jobLegacyDTO(doc)),
                  filter: dataHandler.filterResponseDTO(),
                  sort: dataHandler.sortResponseDTO(),
                  pagination: dataHandler.paginationResponseDTO(mockTotalCount),
                });
              });
            });

            describe('when pagination, filterInput, and sortInput are passed', () => {
              const jobsLegacyResponseDTO = dataHandler.jobsLegacyResponseDTO(
                mockDocList,
                mockTotalCount,
                mockPaginationInput,
                mockFilterInput,
                mockSortInput
              );

              it('returns a JobsLegacyResponse', () => {
                expect(jobsLegacyResponseDTO).toEqual({
                  data: mockDocList.map((doc) => dataHandler.jobLegacyDTO(doc)),
                  filter: dataHandler.filterResponseDTO(mockFilterInput),
                  sort: dataHandler.sortResponseDTO(mockSortInput),
                  pagination: dataHandler.paginationResponseDTO(
                    mockTotalCount,
                    mockPaginationInput
                  ),
                });
              });
            });
          });
        });

        describe('LineItemLegacy', () => {
          const mockSupplierDoc = MockData.dBSupplier();
          const mockLineItemLegacyDoc = MockData.dBLineItemLegacy();
          const mockDoc = { ...mockLineItemLegacyDoc, supplier: mockSupplierDoc };

          describe('lineItemLegacyDTO', () => {
            const lineItemLegacyDTO = dataHandler.lineItemLegacyDTO(mockDoc);

            it('returns a LineItemLegacy', () => {
              expect(lineItemLegacyDTO).toEqual({
                ...dataHandler.formatDBLineItemLegacy(mockLineItemLegacyDoc),
                supplier: dataHandler.formatDBSupplier(mockSupplierDoc),
              });
            });
          });
        });

        describe('Reporter', () => {
          const mockDoc = MockData.dBReporter();
          const mockDocList = [mockDoc, MockData.dBReporter(1), MockData.dBReporter(2)];

          describe('reporterDTO', () => {
            const reporterDTO = dataHandler.reporterDTO(mockDoc);

            it('returns a Reporter', () => {
              expect(reporterDTO).toEqual(dataHandler.formatDBReporter(mockDoc));
            });
          });

          describe('archiveReporterResponseDTO', () => {
            const archiveReporterResponseDTO = dataHandler.archiveReporterResponseDTO(mockDoc);

            it('returns an ArchiveReporterResponse', () => {
              expect(archiveReporterResponseDTO).toEqual({
                data: dataHandler.reporterDTO(mockDoc),
                message: RESPONSES.archiveSuccess(mockDoc.name),
              });
            });
          });

          describe('writeReporterResponseDTO', () => {
            const writeReporterResponseDTO = dataHandler.writeReporterResponseDTO(
              mockDoc,
              mockMessage
            );

            it('returns a WriteReporterResponse', () => {
              expect(writeReporterResponseDTO).toEqual({
                data: dataHandler.reporterDTO(mockDoc),
                message: mockMessage,
              });
            });
          });

          describe('reportersResponseDTO', () => {
            describe('when pagination is not passed', () => {
              const reportersResponseDTO = dataHandler.reportersResponseDTO(
                mockDocList,
                mockTotalCount
              );

              it('returns a ReportersResponse', () => {
                expect(reportersResponseDTO).toEqual({
                  data: mockDocList.map((doc) => dataHandler.reporterDTO(doc)),
                  pagination: dataHandler.paginationResponseDTO(mockTotalCount),
                });
              });
            });

            describe('when pagination is passed', () => {
              const reportersResponseDTO = dataHandler.reportersResponseDTO(
                mockDocList,
                mockTotalCount,
                mockPaginationInput
              );

              it('returns a ReportersResponse', () => {
                expect(reportersResponseDTO).toEqual({
                  data: mockDocList.map((doc) => dataHandler.reporterDTO(doc)),
                  pagination: dataHandler.paginationResponseDTO(
                    mockTotalCount,
                    mockPaginationInput
                  ),
                });
              });
            });
          });
        });

        describe('Scope', () => {
          const mockDoc = MockData.dBScope();
          const mockDocList = [mockDoc, MockData.dBScope(1), MockData.dBScope(2)];

          describe('scopeDTO', () => {
            const scopeDTO = dataHandler.scopeDTO(mockDoc);

            it('returns a Scope', () => {
              expect(scopeDTO).toEqual(dataHandler.formatDBScope(mockDoc));
            });
          });

          describe('archiveScopeResponseDTO', () => {
            const archiveScopeResponseDTO = dataHandler.archiveScopeResponseDTO(mockDoc);

            it('returns an ArchiveScopeResponse', () => {
              expect(archiveScopeResponseDTO).toEqual({
                data: dataHandler.scopeDTO(mockDoc),
                message: RESPONSES.archiveSuccess(mockDoc.name),
              });
            });
          });

          describe('writeScopeResponseDTO', () => {
            const writeScopeResponseDTO = dataHandler.writeScopeResponseDTO(mockDoc, mockMessage);

            it('returns a WriteScopeResponse', () => {
              expect(writeScopeResponseDTO).toEqual({
                data: dataHandler.scopeDTO(mockDoc),
                message: mockMessage,
              });
            });
          });

          describe('scopesResponseDTO', () => {
            describe('when pagination is not passed', () => {
              const scopesResponseDTO = dataHandler.scopesResponseDTO(mockDocList, mockTotalCount);

              it('returns a ScopesResponse', () => {
                expect(scopesResponseDTO).toEqual({
                  data: mockDocList.map((doc) => dataHandler.scopeDTO(doc)),
                  pagination: dataHandler.paginationResponseDTO(mockTotalCount),
                });
              });
            });

            describe('when pagination is passed', () => {
              const scopesResponseDTO = dataHandler.scopesResponseDTO(
                mockDocList,
                mockTotalCount,
                mockPaginationInput
              );

              it('returns a ScopesResponse', () => {
                expect(scopesResponseDTO).toEqual({
                  data: mockDocList.map((doc) => dataHandler.scopeDTO(doc)),
                  pagination: dataHandler.paginationResponseDTO(
                    mockTotalCount,
                    mockPaginationInput
                  ),
                });
              });
            });
          });
        });

        describe('Supplier', () => {
          const mockDoc = MockData.dBSupplier();
          const mockDocList = [mockDoc, MockData.dBSupplier(1), MockData.dBSupplier(2)];

          describe('supplierDTO', () => {
            const supplierDTO = dataHandler.supplierDTO(mockDoc);

            it('returns a Supplier', () => {
              expect(supplierDTO).toEqual(dataHandler.formatDBSupplier(mockDoc));
            });
          });

          describe('archiveSupplierResponseDTO', () => {
            const archiveSupplierResponseDTO = dataHandler.archiveSupplierResponseDTO(mockDoc);

            it('returns an ArchiveSupplierResponse', () => {
              expect(archiveSupplierResponseDTO).toEqual({
                data: dataHandler.supplierDTO(mockDoc),
                message: RESPONSES.archiveSuccess(mockDoc.name),
              });
            });
          });

          describe('writeSupplierResponseDTO', () => {
            const writeSupplierResponseDTO = dataHandler.writeSupplierResponseDTO(
              mockDoc,
              mockMessage
            );

            it('returns a WriteSupplierResponse', () => {
              expect(writeSupplierResponseDTO).toEqual({
                data: dataHandler.supplierDTO(mockDoc),
                message: mockMessage,
              });
            });
          });

          describe('suppliersResponseDTO', () => {
            describe('when pagination is not passed', () => {
              const suppliersResponseDTO = dataHandler.suppliersResponseDTO(
                mockDocList,
                mockTotalCount
              );

              it('returns a SuppliersResponse', () => {
                expect(suppliersResponseDTO).toEqual({
                  data: mockDocList.map((doc) => dataHandler.supplierDTO(doc)),
                  pagination: dataHandler.paginationResponseDTO(mockTotalCount),
                });
              });
            });

            describe('when pagination is passed', () => {
              const suppliersResponseDTO = dataHandler.suppliersResponseDTO(
                mockDocList,
                mockTotalCount,
                mockPaginationInput
              );

              it('returns a SuppliersResponse', () => {
                expect(suppliersResponseDTO).toEqual({
                  data: mockDocList.map((doc) => dataHandler.supplierDTO(doc)),
                  pagination: dataHandler.paginationResponseDTO(
                    mockTotalCount,
                    mockPaginationInput
                  ),
                });
              });
            });
          });
        });
      });

      describe('sendSMS', () => {
        const mockDBContractor = MockData.dBContractor();

        describe('when the recipient.primaryPhone is empty', () => {
          it('throws an error', async () => {
            await expect(
              dataHandler.sendSMS(
                { id: '', primaryPhone: '', smsConsent: SMSConsent.NEEDED },
                'contractor',
                mockSMSMessage
              )
            ).rejects.toThrowError(GRAPHQL_ERRORS.phoneNumberRequired);
          });
        });

        describe('when the message is empty', () => {
          it('throws an error', async () => {
            await expect(
              dataHandler.sendSMS(
                {
                  id: '',
                  primaryPhone: mockDBContractor.primaryPhone,
                  smsConsent: SMSConsent.NEEDED,
                },
                'contractor',
                ''
              )
            ).rejects.toThrowError(GRAPHQL_ERRORS.messageRequired);
          });
        });

        describe('when recipient.smsConsent = SMSConsent.NEEDED', () => {
          const mockContactorRecipient = MockData.dBContractor(0, {
            smsConsent: SMSConsent.NEEDED,
            primaryPhone: '123-456-7890',
          });

          const mockReporterRecipient = MockData.dBReporter(0, {
            smsConsent: SMSConsent.NEEDED,
            primaryPhone: '123-456-7890',
          });

          beforeAll(async () => {
            // Create contractor and reporter in the database
            await mockContext.prisma.$transaction([
              mockContext.prisma.contractor.create({ data: mockContactorRecipient }),
              mockContext.prisma.reporter.create({ data: mockReporterRecipient }),
            ]);
          });

          afterAll(async () => {
            // Delete the contractor and reporter from the database
            await mockContext.prisma.$transaction([
              mockContext.prisma.contractor.delete({ where: { id: mockContactorRecipient.id } }),
              mockContext.prisma.reporter.delete({ where: { id: mockReporterRecipient.id } }),
            ]);
          });

          describe('when recipientType = contractor', () => {
            beforeEach(async () => {
              // Send the SMS
              await dataHandler.sendSMS(mockContactorRecipient, 'contractor', mockSMSMessage);
            });

            it('calls this.context.twilio.messages.create with body = SMS_MESSAGES.optInRequest', () => {
              expect(mockContext.twilio.messages.create).toHaveBeenNthCalledWith(1, {
                to: '+11234567890',
                messagingServiceSid: dataHandler.messagingServiceSid,
                body: SMS_MESSAGES.optInRequest,
              });
            });

            it('updates the contractor with smsConsent = SMSConsent.PENDING', async () => {
              const updatedRecipient = (await mockContext.prisma.contractor.findUnique({
                where: { id: mockContactorRecipient.id },
              }))!;

              expect(updatedRecipient.smsConsent).toBe(SMSConsent.PENDING);
            });

            it('calls this.context.twilio.messages.create with body = message', () => {
              expect(mockContext.twilio.messages.create).toHaveBeenNthCalledWith(2, {
                to: '+11234567890',
                messagingServiceSid: dataHandler.messagingServiceSid,
                body: mockSMSMessage,
              });
            });
          });

          describe('when recipientType = reporter', () => {
            beforeEach(async () => {
              // Send the SMS
              await dataHandler.sendSMS(mockReporterRecipient, 'reporter', mockSMSMessage);
            });

            it('calls this.context.twilio.messages.create with body = SMS_MESSAGES.optInRequest', () => {
              expect(mockContext.twilio.messages.create).toHaveBeenNthCalledWith(1, {
                to: '+11234567890',
                messagingServiceSid: dataHandler.messagingServiceSid,
                body: SMS_MESSAGES.optInRequest,
              });
            });

            it('updates the reporter with smsConsent = SMSConsent.PENDING', async () => {
              const updatedRecipient = (await mockContext.prisma.reporter.findUnique({
                where: { id: mockReporterRecipient.id },
              }))!;

              expect(updatedRecipient.smsConsent).toBe(SMSConsent.PENDING);
            });

            it('calls this.context.twilio.messages.create with body = message', () => {
              expect(mockContext.twilio.messages.create).toHaveBeenNthCalledWith(2, {
                to: '+11234567890',
                messagingServiceSid: dataHandler.messagingServiceSid,
                body: mockSMSMessage,
              });
            });
          });
        });

        describe('when recipient.smsConsent = SMSConsent.PENDING', () => {
          beforeEach(async () => {
            await dataHandler.sendSMS(
              { ...mockDBContractor, smsConsent: SMSConsent.PENDING },
              'contractor',
              mockSMSMessage
            );
          });

          it('calls this.context.twilio.messages.create with body = SMS_MESSAGES.optInReminder', () => {
            expect(mockContext.twilio.messages.create).toHaveBeenNthCalledWith(1, {
              to: '+10',
              messagingServiceSid: dataHandler.messagingServiceSid,
              body: SMS_MESSAGES.optInReminder,
            });
          });

          it('calls this.context.twilio.messages.create with body = message', () => {
            expect(mockContext.twilio.messages.create).toHaveBeenNthCalledWith(2, {
              to: '+10',
              messagingServiceSid: dataHandler.messagingServiceSid,
              body: mockSMSMessage,
            });
          });
        });

        describe('when recipient.smsConsent = SMSConsent.OPTED_OUT', () => {
          it('throws an error', async () => {
            await expect(
              dataHandler.sendSMS(
                { ...mockDBContractor, smsConsent: SMSConsent.OPTED_OUT },
                'contractor',
                mockSMSMessage
              )
            ).rejects.toThrowError(GRAPHQL_ERRORS.userSMSOptedOut);
          });
        });

        describe('when recipient.smsConsent = SMSConsent.OPTED_IN', () => {
          beforeEach(async () => {
            await dataHandler.sendSMS(
              { ...mockDBContractor, smsConsent: SMSConsent.OPTED_IN },
              'contractor',
              mockSMSMessage
            );
          });

          it('calls this.context.twilio.messages.create with body = message', () => {
            expect(mockContext.twilio.messages.create).toHaveBeenNthCalledWith(1, {
              to: '+10',
              messagingServiceSid: dataHandler.messagingServiceSid,
              body: mockSMSMessage,
            });
          });
        });
      });
    });
  });
});
