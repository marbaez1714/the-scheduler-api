/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AreaDataHandler } from '../../handlers';
import { MockData } from '../../__mocks__/data';
import { createMockContext } from '../../__mocks__/context';
import { PermissionsEnum, PrismaModels } from '../../app/types';
import { ArchiveAreaResponse, Area, AreasResponse, WriteAreaResponse } from '../../generated';
import { GRAPHQL_ERRORS, RESPONSES } from '../../constants';

const mockContext = createMockContext([PermissionsEnum.Admin]);
const handler = new AreaDataHandler(mockContext);

describe('AreaDataHandler', () => {
  afterEach(async () => {
    jest.resetAllMocks();

    // Delete area from mock database
    await mockContext.prisma.area.deleteMany();
  });

  describe('methods', () => {
    describe('archive', () => {
      let response: ArchiveAreaResponse;
      let updatedDoc: PrismaModels['area'];

      beforeEach(async () => {
        // Create mock area
        const mockArea = MockData.dBArea(0, { archived: false });

        // Add area to mock database
        await mockContext.prisma.area.create({ data: mockArea });

        // Call the archive method
        response = await handler.archive(mockArea.id);

        // Get the updated area from the mock database
        updatedDoc = (await mockContext.prisma.area.findUnique({ where: { id: mockArea.id } }))!;
      });

      it('returns an ArchiveAreaResponse', () => {
        expect(response).toEqual(handler.archiveAreaResponseDTO(updatedDoc));
      });

      it('updates the archived and updatedBy fields', () => {
        expect(updatedDoc).toEqual(
          expect.objectContaining({ archived: true, updatedBy: handler.userId })
        );
      });
    });

    describe('create', () => {
      const mockInput = {
        name: 'some-name',
        nameSpanish: 'some-name-spanish',
        notes: 'some-notes',
      };
      let response: WriteAreaResponse;
      let createdDoc: PrismaModels['area'];

      beforeEach(async () => {
        // Call the create method
        response = await handler.create(mockInput);

        // Get the created area from the mock database
        createdDoc = (await mockContext.prisma.area.findUnique({
          where: { id: response.data.id },
        }))!;
      });

      it('returns a WriteAreaResponse', () => {
        expect(response).toEqual(
          handler.writeAreaResponseDTO(createdDoc, RESPONSES.createSuccess(createdDoc.name))
        );
      });

      it('creates a new area in the database', async () => {
        expect(createdDoc).toEqual(
          expect.objectContaining({
            ...mockInput,
            updatedBy: handler.userId,
            createdBy: handler.userId,
          })
        );
      });
    });

    describe('modify', () => {
      const mockInput = {
        name: 'some-new-name',
        nameSpanish: 'some-new-name-spanish',
        notes: 'some-new-notes',
      };
      let response: WriteAreaResponse;
      let updatedDoc: PrismaModels['area'];

      beforeEach(async () => {
        // Create mock area
        const mockArea = MockData.dBArea();

        // Add area to mock database
        await mockContext.prisma.area.create({ data: mockArea });

        // Call the modify method
        response = await handler.modify(mockArea.id, mockInput);

        // Get the updated area from the mock database
        updatedDoc = (await mockContext.prisma.area.findUnique({ where: { id: mockArea.id } }))!;
      });

      it('returns a WriteAreaResponse', () => {
        expect(response).toEqual(
          handler.writeAreaResponseDTO(updatedDoc, RESPONSES.modifySuccess(updatedDoc.name))
        );
      });

      it('updates the area in the database', async () => {
        expect(updatedDoc).toEqual(
          expect.objectContaining({ ...mockInput, updatedBy: handler.userId })
        );
      });
    });

    describe('getById', () => {
      describe('when the area does not exist', () => {
        it('throws an error', async () => {
          const mockId = 'some-id';

          await expect(handler.getById(mockId)).rejects.toThrow(GRAPHQL_ERRORS.idNotFound(mockId));
        });
      });

      describe('when the area exists', () => {
        const mockArea = MockData.dBArea();
        let response: Area;

        beforeEach(async () => {
          // Add area to mock database
          await mockContext.prisma.area.create({ data: mockArea });

          // Call the getById method
          response = await handler.getById(mockArea.id);
        });

        it('returns an Area', () => {
          expect(response).toEqual(handler.areaDTO(mockArea));
        });
      });
    });

    describe('getMany', () => {
      const mockAreas = [
        MockData.dBArea(0, { archived: false }),
        MockData.dBArea(1, { archived: false }),
        MockData.dBArea(2, { archived: false }),
        MockData.dBArea(3, { archived: false }),
        MockData.dBArea(4, { archived: false }),
        MockData.dBArea(5, { archived: false }),
        MockData.dBArea(6, { archived: false }),
      ];

      const mockArchivedAreas = [
        MockData.dBArea(7, { archived: true }),
        MockData.dBArea(8, { archived: true }),
        MockData.dBArea(9, { archived: true }),
        MockData.dBArea(10, { archived: true }),
      ];

      beforeEach(async () => {
        // Add areas to mock database
        await mockContext.prisma.area.createMany({ data: [...mockAreas, ...mockArchivedAreas] });
      });

      describe('when no arguments are passed', () => {
        let areaDocs: PrismaModels['area'][];
        let areasCount: number;
        let response: AreasResponse;

        beforeEach(async () => {
          // Call the getMany method
          response = await handler.getMany();

          // Get the areas from the mock database
          [areaDocs, areasCount] = await mockContext.prisma.$transaction([
            mockContext.prisma.area.findMany({ where: { archived: false } }),
            mockContext.prisma.area.count({ where: { archived: false } }),
          ]);
        });

        it('returns an AreasResponse', () => {
          expect(response).toEqual(handler.areasResponseDTO(areaDocs, areasCount));
        });
      });

      describe('when arguments are passed', () => {
        describe('when archived is true', () => {
          let areaDocs: PrismaModels['area'][];
          let areasCount: number;
          let response: AreasResponse;

          beforeEach(async () => {
            // Call the getMany method
            response = await handler.getMany(true);

            // Get the areas from the mock database
            [areaDocs, areasCount] = await mockContext.prisma.$transaction([
              mockContext.prisma.area.findMany({ where: { archived: true } }),
              mockContext.prisma.area.count({ where: { archived: true } }),
            ]);
          });

          it('returns an AreasResponse', () => {
            expect(response).toEqual(handler.areasResponseDTO(areaDocs, areasCount));
          });
        });

        describe('when pagination is passed', () => {
          const pagination = { page: 2, pageSize: 2 };

          let areaDocs: PrismaModels['area'][];
          let areasCount: number;
          let response: AreasResponse;

          beforeEach(async () => {
            // Call the getMany method
            response = await handler.getMany(false, pagination);

            // Get the areas from the mock database
            [areaDocs, areasCount] = await mockContext.prisma.$transaction([
              mockContext.prisma.area.findMany({
                where: { archived: false },
                ...handler.generatePaginationArgs(pagination),
              }),
              mockContext.prisma.area.count({ where: { archived: false } }),
            ]);
          });

          it('returns an AreasResponse', () => {
            expect(response).toEqual(handler.areasResponseDTO(areaDocs, areasCount, pagination));
          });
        });
      });
    });
  });
});
