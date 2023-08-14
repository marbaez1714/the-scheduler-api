/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BuilderDataHandler } from '../../handlers';
import { MockData } from '../../__mocks__/data';
import { createMockContext } from '../../__mocks__/context';
import { BuilderDTOArgs, PermissionsEnum, PrismaModels } from '../../app/types';
import {
  ArchiveBuilderResponse,
  Builder,
  BuildersResponse,
  WriteBuilderResponse,
} from '../../generated';
import { GRAPHQL_ERRORS, RESPONSES } from '../../constants';

const mockContext = createMockContext([PermissionsEnum.Admin]);
const handler = new BuilderDataHandler(mockContext);
const mockCompanies = [MockData.dBCompany(0), MockData.dBCompany(1)];

describe('BuilderDataHandler', () => {
  beforeAll(async () => {
    // Add company to mock database
    await mockContext.prisma.company.createMany({ data: mockCompanies });
  });

  afterEach(async () => {
    // Reset all mocks
    jest.resetAllMocks();
    // Delete builders from mock database
    await mockContext.prisma.builder.deleteMany();
  });

  afterAll(async () => {
    // Delete builders and companies from mock database
    await mockContext.prisma.$transaction([
      mockContext.prisma.builder.deleteMany(),
      mockContext.prisma.company.deleteMany(),
    ]);
  });

  describe('methods', () => {
    describe('archive', () => {
      let doc: BuilderDTOArgs;
      let response: ArchiveBuilderResponse;

      beforeEach(async () => {
        // Create mock builder
        const mockBuilder = MockData.dBBuilder(0, { companyId: mockCompanies[0].id });

        // Add builder to mock database
        await mockContext.prisma.builder.create({ data: mockBuilder });

        // Call the archive method
        response = await handler.archive(mockBuilder.id);

        // Get the updated builder from the mock database
        doc = (await mockContext.prisma.builder.findUnique({
          where: { id: mockBuilder.id },
          include: { company: true },
        }))!;
      });

      it('returns a ArchiveBuilderResponseDTO', () => {
        expect(response).toEqual(handler.archiveBuilderResponseDTO(doc));
      });

      it('updates the archived and updatedBy fields', () => {
        expect(doc).toEqual(expect.objectContaining({ archived: true, updatedBy: handler.userId }));
      });
    });

    describe('create', () => {
      const mockInput = {
        name: 'some-name',
        companyId: mockCompanies[0].id,
        primaryPhone: 'some-primary-phone',
        notes: 'some-notes',
        primaryEmail: 'some-primary-email',
      };
      let response: WriteBuilderResponse;
      let doc: BuilderDTOArgs;

      beforeEach(async () => {
        // Call the create method
        response = await handler.create(mockInput);

        // Get the created builder from the mock database
        doc = (await mockContext.prisma.builder.findUnique({
          where: { id: response.data.id },
          include: { company: true },
        }))!;
      });

      it('returns a WriteBuilderResponseDTO', () => {
        expect(response).toEqual(
          handler.writeBuilderResponseDTO(doc, RESPONSES.createSuccess(doc.name))
        );
      });

      it('creates a builder in the database', () => {
        expect(doc).toEqual(
          expect.objectContaining({
            ...mockInput,
            updatedBy: handler.userId,
            createdBy: handler.userId,
          })
        );
      });
    });

    describe('modify', () => {
      const mockBuilder = MockData.dBBuilder(0, { companyId: mockCompanies[0].id });
      const mockInput = {
        name: 'some-new-name',
        companyId: mockCompanies[1].id,
        primaryPhone: 'some-new-phone',
        notes: 'some-new-notes',
        primaryEmail: 'some-new-email',
      };
      let response: WriteBuilderResponse;
      let doc: BuilderDTOArgs;

      beforeEach(async () => {
        // Add builder to mock database
        await mockContext.prisma.builder.create({ data: mockBuilder });

        // Call the modify method
        response = await handler.modify(mockBuilder.id, mockInput);

        // Get the updated builder from the mock database
        doc = (await mockContext.prisma.builder.findUnique({
          where: { id: mockBuilder.id },
          include: { company: true },
        }))!;
      });

      it('returns a WriteBuilderResponseDTO', () => {
        expect(response).toEqual(
          handler.writeBuilderResponseDTO(doc, RESPONSES.modifySuccess(doc.name))
        );
      });

      it('updates the builder in the database', () => {
        expect(doc).toEqual(
          expect.objectContaining({
            ...mockInput,
            updatedBy: handler.userId,
          })
        );
      });
    });

    describe('getById', () => {
      describe('when the builder does not exist', () => {
        it('throws an error', async () => {
          const mockId = 'some-id';

          await expect(handler.getById(mockId)).rejects.toThrow(GRAPHQL_ERRORS.idNotFound(mockId));
        });
      });

      describe('when the builder exists', () => {
        let response: Builder;
        let doc: BuilderDTOArgs;

        beforeEach(async () => {
          // Create mock builder
          const mockBuilder = MockData.dBBuilder(0, { companyId: mockCompanies[0].id });

          // Add builder to mock database
          await mockContext.prisma.builder.create({ data: mockBuilder });

          // Get builder from the mock database
          doc = (await mockContext.prisma.builder.findUnique({
            where: { id: mockBuilder.id },
            include: { company: true },
          }))!;

          // Call the getById method
          response = await handler.getById(mockBuilder.id);
        });

        it('returns a BuilderDTO', () => {
          expect(response).toEqual(handler.builderDTO(doc));
        });
      });
    });

    describe('getMany', () => {
      const mockBuilders = [
        MockData.dBBuilder(0, { companyId: mockCompanies[0].id }),
        MockData.dBBuilder(1, { companyId: mockCompanies[0].id }),
        MockData.dBBuilder(2, { companyId: mockCompanies[0].id }),
        MockData.dBBuilder(3, { companyId: mockCompanies[0].id }),
        MockData.dBBuilder(4, { companyId: mockCompanies[0].id }),
        MockData.dBBuilder(5, { companyId: mockCompanies[0].id }),
      ];

      const mockArchivedBuilders = [
        MockData.dBBuilder(6, { companyId: mockCompanies[0].id, archived: true }),
        MockData.dBBuilder(7, { companyId: mockCompanies[0].id, archived: true }),
        MockData.dBBuilder(8, { companyId: mockCompanies[0].id, archived: true }),
      ];

      beforeEach(async () => {
        // Add builders to mock database
        mockContext.prisma.builder.createMany({ data: [...mockBuilders, ...mockArchivedBuilders] });
      });

      describe('when no arguments are passed', () => {
        let docList: BuilderDTOArgs[];
        let count: number;
        let response: BuildersResponse;

        beforeEach(async () => {
          // Call the getMany method
          response = await handler.getMany();

          // Get the builders from the mock database
          [docList, count] = await mockContext.prisma.$transaction([
            mockContext.prisma.builder.findMany({
              where: { archived: false },
              include: { company: true },
            }),
            mockContext.prisma.builder.count({ where: { archived: false } }),
          ]);
        });

        it('returns a BuildersResponseDTO', () => {
          expect(response).toEqual(handler.buildersResponseDTO(docList, count));
        });
      });

      describe('when arguments are passed', () => {
        describe('when archived is true', () => {
          let docList: BuilderDTOArgs[];
          let count: number;
          let response: BuildersResponse;

          beforeEach(async () => {
            // Call the getMany method
            response = await handler.getMany(true);

            // Get the builders from the mock database
            [docList, count] = await mockContext.prisma.$transaction([
              mockContext.prisma.builder.findMany({
                where: { archived: true },
                include: { company: true },
              }),
              mockContext.prisma.builder.count({ where: { archived: true } }),
            ]);
          });

          it('returns a BuildersResponseDTO', () => {
            expect(response).toEqual(handler.buildersResponseDTO(docList, count));
          });
        });

        describe('when pagination is passed', () => {
          const pagination = { page: 2, pageSize: 2 };

          let docList: BuilderDTOArgs[];
          let count: number;
          let response: BuildersResponse;

          beforeEach(async () => {
            // Call the getMany method
            response = await handler.getMany(false, pagination);

            // Get the builders from the mock database
            [docList, count] = await mockContext.prisma.$transaction([
              mockContext.prisma.builder.findMany({
                where: { archived: false },
                include: { company: true },
                ...handler.generatePaginationArgs(pagination),
              }),
              mockContext.prisma.builder.count({ where: { archived: false } }),
            ]);
          });

          it('returns a BuildersResponseDTO', () => {
            expect(response).toEqual(handler.buildersResponseDTO(docList, count, pagination));
          });
        });
      });
    });
  });
});
