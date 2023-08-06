import { MockData } from '../../__mocks__/data';
import { createMockContext } from '../../__mocks__/context';
import { PermissionsEnum } from '../../app/types';
import { JobLegacyStatus } from '../../generated';
import { SMSConsent } from '@prisma/client';
import { GRAPHQL_ERRORS, SMS_MESSAGES } from '../../constants';
import { DataHandler } from '../../handlers';

const mockClient = 'area';
const mockTotalCount = 100;

const mockDBArea = MockData.dBArea();
const mockDBBuilder = MockData.dBBuilder();
const mockDBCompany = MockData.dBCompany();
const mockDBContractor = MockData.dBContractor();
const mockDBCommunity = MockData.dBCommunity();
const mockDBReporter = MockData.dBReporter();
const mockDBScope = MockData.dBScope();
const mockDBSupplier = MockData.dBSupplier();
const mockDBLineItemLegacy = MockData.dBLineItemLegacy();
const mockDBJobLegacy = MockData.dBJobLegacy();

const mockSMSMessage = 'some-message';

describe('DataHandler', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('when user is not an admin', () => {
    const mockContext = createMockContext();

    it('should throw an error', () => {
      expect(() => new DataHandler(mockContext, mockClient)).toThrowError();
    });
  });

  describe('when user is an admin', () => {
    const mockContext = createMockContext([PermissionsEnum.Admin]);
    const dataHandler = new DataHandler(mockContext, mockClient);

    describe('appHandler fields', () => {
      it('should have a context field', () => {
        expect(dataHandler.context).toEqual(mockContext);
      });

      it('should have a client', () => {
        expect(dataHandler.client).toEqual(mockClient);
      });

      it('should have a crud', () => {
        expect(dataHandler.crud).toEqual(mockContext.prisma[mockClient]);
      });

      it('should have a userId', () => {
        expect(dataHandler.userId).toEqual(mockContext.user.sub);
      });

      it('should have a archiveData', () => {
        expect(dataHandler.archiveData).toEqual({
          archived: true,
          updatedBy: mockContext.user.sub,
        });
      });

      it('should have a todayDate', () => {
        expect(dataHandler.todayDate).toEqual(MockData.dates.today);
      });
    });

    describe('appHandler methods', () => {
      describe('generatePaginationArgs', () => {
        describe('when pagination is not passed', () => {
          const args = dataHandler.generatePaginationArgs();

          it('returns undefined', () => {
            expect(args).toBeUndefined();
          });
        });

        describe('when pagination is passed', () => {
          const args = dataHandler.generatePaginationArgs(MockData.paginationInput());

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

      describe('generatePaginationResponse', () => {
        describe('when pagination is not passed', () => {
          const response = dataHandler.generatePaginationResponse(mockTotalCount);

          it('returns a response with only totalCount and totalPages', () => {
            expect(response).toEqual({ totalCount: mockTotalCount, totalPages: 1 });
          });
        });

        describe('when pagination is passed', () => {
          const response = dataHandler.generatePaginationResponse(
            mockTotalCount,
            MockData.paginationInput()
          );

          it('returns a response with totalCount, totalPages, page, and pageSize', () => {
            expect(response).toEqual({
              totalCount: mockTotalCount,
              totalPages: 10,
              ...MockData.paginationInput(),
            });
          });
        });
      });

      describe('formatDBArea', () => {
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
            const mockDBJobLegacy = MockData.dBJobLegacy(0, { inProgress: false, startDate: null });
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
        const formattedLineItemLegacy = dataHandler.formatDBLineItemLegacy(mockDBLineItemLegacy);

        it('returns a formatted lineItemLegacy', () => {
          expect(formattedLineItemLegacy).toEqual({
            ...mockDBLineItemLegacy,
            createdTime: MockData.dates.createTimeJSON,
            updatedTime: MockData.dates.updatedTimeJSON,
          });
        });
      });

      describe('areaDTO', () => {
        const areaDTO = dataHandler.areaDTO(mockDBArea);

        const formattedArea = dataHandler.formatDBArea(mockDBArea);

        it('returns an Area', () => {
          expect(areaDTO).toEqual(formattedArea);
        });
      });

      describe('builderDTO', () => {
        const builderDTO = dataHandler.builderDTO({ ...mockDBBuilder, company: mockDBCompany });

        const formattedCompany = dataHandler.formatDBCompany(mockDBCompany);
        const formattedBuilder = dataHandler.formatDBBuilder(mockDBBuilder);

        it('returns a Builder', () => {
          expect(builderDTO).toEqual({ ...formattedBuilder, company: formattedCompany });
        });
      });

      describe('companyDTO', () => {
        const companyDTO = dataHandler.companyDTO(mockDBCompany);

        const formattedCompany = dataHandler.formatDBCompany(mockDBCompany);

        it('returns a Company', () => {
          expect(companyDTO).toEqual(formattedCompany);
        });
      });

      describe('communityDTO', () => {
        const communityDTO = dataHandler.communityDTO({
          ...mockDBCommunity,
          company: mockDBCompany,
        });

        const formattedCompany = dataHandler.formatDBCompany(mockDBCompany);
        const formattedCommunity = dataHandler.formatDBCommunity(mockDBCommunity);

        it('returns a Community', () => {
          expect(communityDTO).toEqual({ ...formattedCommunity, company: formattedCompany });
        });
      });

      describe('contractorDTO', () => {
        const contractorDTO = dataHandler.contractorDTO({
          ...mockDBContractor,
          jobsLegacy: [
            {
              ...mockDBJobLegacy,
              lineItems: [{ ...mockDBLineItemLegacy, supplier: mockDBSupplier }],
            },
          ],
        });

        const formattedContractor = dataHandler.formatDBContractor(mockDBContractor);
        const formattedJobLegacy = dataHandler.formatDBJobLegacy(mockDBJobLegacy);
        const formattedLineItemLegacy = dataHandler.formatDBLineItemLegacy(mockDBLineItemLegacy);
        const formattedSupplier = dataHandler.formatDBSupplier(mockDBSupplier);

        it('returns a Contractor', () => {
          expect(contractorDTO).toEqual({
            ...formattedContractor,
            jobsLegacy: [
              {
                ...formattedJobLegacy,
                lineItems: [{ ...formattedLineItemLegacy, supplier: formattedSupplier }],
              },
            ],
          });
        });
      });

      describe('jobLegacyDTO', () => {
        const jobLegacyDTO = dataHandler.jobLegacyDTO({
          ...mockDBJobLegacy,
          lineItems: [{ ...mockDBLineItemLegacy, supplier: mockDBSupplier }],
        });

        const formattedJobLegacy = dataHandler.formatDBJobLegacy(mockDBJobLegacy);
        const formattedLineItemLegacy = dataHandler.formatDBLineItemLegacy(mockDBLineItemLegacy);
        const formattedSupplier = dataHandler.formatDBSupplier(mockDBSupplier);

        it('returns a JobLegacy', () => {
          expect(jobLegacyDTO).toEqual({
            ...formattedJobLegacy,
            lineItems: [{ ...formattedLineItemLegacy, supplier: formattedSupplier }],
          });
        });
      });

      describe('lineItemLegacyDTO', () => {
        const lineItemLegacyDTO = dataHandler.lineItemLegacyDTO({
          ...mockDBLineItemLegacy,
          supplier: mockDBSupplier,
        });

        const formattedLineItemLegacy = dataHandler.formatDBLineItemLegacy(mockDBLineItemLegacy);
        const formattedSupplier = dataHandler.formatDBSupplier(mockDBSupplier);

        it('returns a LineItemLegacy', () => {
          expect(lineItemLegacyDTO).toEqual({
            ...formattedLineItemLegacy,
            supplier: formattedSupplier,
          });
        });
      });

      describe('reporterDTO', () => {
        const reporterDTO = dataHandler.reporterDTO(mockDBReporter);

        const formattedReporter = dataHandler.formatDBReporter(mockDBReporter);

        it('returns a Reporter', () => {
          expect(reporterDTO).toEqual(formattedReporter);
        });
      });

      describe('scopeDTO', () => {
        const scopeDTO = dataHandler.scopeDTO(mockDBScope);

        const formattedScope = dataHandler.formatDBScope(mockDBScope);

        it('returns a Scope', () => {
          expect(scopeDTO).toEqual(formattedScope);
        });
      });

      describe('supplierDTO', () => {
        const supplierDTO = dataHandler.supplierDTO(mockDBSupplier);

        const formattedSupplier = dataHandler.formatDBSupplier(mockDBSupplier);

        it('returns a Supplier', () => {
          expect(supplierDTO).toEqual(formattedSupplier);
        });
      });

      describe('sendSMS', () => {
        beforeAll(async () => {
          await dataHandler.context.prisma.$transaction([
            dataHandler.context.prisma.contractor.create({ data: mockDBContractor }),
            dataHandler.context.prisma.reporter.create({ data: mockDBReporter }),
          ]);
        });

        afterAll(async () => {
          await dataHandler.context.prisma.$transaction([
            dataHandler.context.prisma.contractor.deleteMany(),
            dataHandler.context.prisma.reporter.deleteMany(),
          ]);
        });

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
          describe('when recipientType = contractor', () => {
            beforeEach(async () => {
              await dataHandler.sendSMS(
                { ...mockDBContractor, smsConsent: SMSConsent.NEEDED },
                'contractor',
                mockSMSMessage
              );
            });

            it('calls this.context.twilio.messages.create with body = SMS_MESSAGES.optInRequest', () => {
              expect(mockContext.twilio.messages.create).toHaveBeenNthCalledWith(1, {
                to: '+10',
                messagingServiceSid: dataHandler.messagingServiceSid,
                body: SMS_MESSAGES.optInRequest,
              });
            });

            it('updates the contractor with smsConsent = SMSConsent.PENDING', async () => {
              const doc = await dataHandler.context.prisma.contractor.findUnique({
                where: { id: mockDBContractor.id },
              });

              expect(doc?.smsConsent).toBe(SMSConsent.PENDING);
            });

            it('calls this.context.twilio.messages.create with body = message', () => {
              expect(mockContext.twilio.messages.create).toHaveBeenNthCalledWith(2, {
                to: '+10',
                messagingServiceSid: dataHandler.messagingServiceSid,
                body: mockSMSMessage,
              });
            });
          });

          describe('when recipientType = reporter', () => {
            beforeEach(async () => {
              await dataHandler.sendSMS(
                { ...mockDBReporter, smsConsent: SMSConsent.NEEDED },
                'reporter',
                mockSMSMessage
              );
            });

            it('calls this.context.twilio.messages.create with body = SMS_MESSAGES.optInRequest', () => {
              expect(mockContext.twilio.messages.create).toHaveBeenNthCalledWith(1, {
                to: '+10',
                messagingServiceSid: dataHandler.messagingServiceSid,
                body: SMS_MESSAGES.optInRequest,
              });
            });

            it('updates the reporter with smsConsent = SMSConsent.PENDING', async () => {
              const doc = await dataHandler.context.prisma.reporter.findUnique({
                where: { id: mockDBReporter.id },
              });

              expect(doc?.smsConsent).toBe(SMSConsent.PENDING);
            });

            it('calls this.context.twilio.messages.create with body = message', () => {
              expect(mockContext.twilio.messages.create).toHaveBeenNthCalledWith(2, {
                to: '+10',
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
