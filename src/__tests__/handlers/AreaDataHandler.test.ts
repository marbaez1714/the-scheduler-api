/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AreaDataHandler } from '../../handlers';
import { MockData } from '../../__mocks__/data';
import { createMockContext } from '../../__mocks__/context';
import { PermissionsEnum, PrismaModels } from '../../app/types';
import { ArchiveAreaResponse, Area, AreasResponse, WriteAreaResponse } from '../../generated';
import { GRAPHQL_ERRORS, RESPONSES } from '../../constants';

const mockContext = createMockContext([PermissionsEnum.Admin]);
const areaDataHandler = new AreaDataHandler(mockContext);

describe('AreaDataHandler', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(async () => {
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
        response = await areaDataHandler.archive(mockArea.id);

        // Get the updated area from the mock database
        updatedDoc = (await mockContext.prisma.area.findUnique({ where: { id: mockArea.id } }))!;
      });

      it('returns an ArchiveAreaResponse', () => {
        expect(response).toEqual({
          data: areaDataHandler.areaDTO(updatedDoc),
          message: RESPONSES.archiveSuccess(updatedDoc.name),
        });
      });

      it('updates the archive field of the area to true', async () => {
        expect(updatedDoc?.archived).toBe(true);
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
        response = await areaDataHandler.create(mockInput);

        // Get the created area from the mock database
        createdDoc = (await mockContext.prisma.area.findUnique({
          where: { id: response.data.id },
        }))!;
      });

      it('returns a WriteAreaResponse', () => {
        expect(response).toEqual({
          data: areaDataHandler.areaDTO(createdDoc),
          message: RESPONSES.createSuccess(createdDoc.name),
        });
      });

      it('creates a new area in the database', async () => {
        expect(createdDoc).toEqual(expect.objectContaining({ ...mockInput }));
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
        response = await areaDataHandler.modify(mockArea.id, mockInput);

        // Get the updated area from the mock database
        updatedDoc = (await mockContext.prisma.area.findUnique({ where: { id: mockArea.id } }))!;
      });

      it('returns a WriteAreaResponse', () => {
        expect(response).toEqual({
          data: areaDataHandler.areaDTO(updatedDoc),
          message: RESPONSES.modifySuccess(updatedDoc.name),
        });
      });

      it('updates the area in the database', async () => {
        expect(updatedDoc).toEqual(
          expect.objectContaining({ ...mockInput, updatedBy: areaDataHandler.userId })
        );
      });
    });

    describe('getById', () => {
      describe('when the area does not exist', () => {
        it('throws an error', async () => {
          const mockId = 'some-id';

          await expect(areaDataHandler.getById(mockId)).rejects.toThrow(
            GRAPHQL_ERRORS.idNotFound(mockId)
          );
        });
      });

      describe('when the area exists', () => {
        const mockArea = MockData.dBArea();
        let response: Area;

        beforeEach(async () => {
          // Add area to mock database
          await mockContext.prisma.area.create({ data: mockArea });

          // Call the getById method
          response = await areaDataHandler.getById(mockArea.id);
        });

        it('returns an Area', () => {
          expect(response).toEqual(areaDataHandler.areaDTO(mockArea));
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
          response = await areaDataHandler.getMany();

          // Get the areas from the mock database
          [areaDocs, areasCount] = await mockContext.prisma.$transaction([
            mockContext.prisma.area.findMany({ where: { archived: false } }),
            mockContext.prisma.area.count({ where: { archived: false } }),
          ]);
        });

        it('returns an AreasResponse', () => {
          expect(response).toEqual({
            data: areaDocs.map((doc) => areaDataHandler.areaDTO(doc)),
            pagination: areaDataHandler.generatePaginationResponse(areasCount),
          });
        });
      });

      describe('when arguments are passed', () => {
        describe('when archived is true', () => {
          let areaDocs: PrismaModels['area'][];
          let areasCount: number;
          let response: AreasResponse;

          beforeEach(async () => {
            // Call the getMany method
            response = await areaDataHandler.getMany(true);

            // Get the areas from the mock database
            [areaDocs, areasCount] = await mockContext.prisma.$transaction([
              mockContext.prisma.area.findMany({ where: { archived: true } }),
              mockContext.prisma.area.count({ where: { archived: true } }),
            ]);
          });

          it('returns an AreasResponse', () => {
            expect(response).toEqual({
              data: areaDocs.map((doc) => areaDataHandler.areaDTO(doc)),
              pagination: areaDataHandler.generatePaginationResponse(areasCount),
            });
          });
        });

        describe('when pagination is passed', () => {
          const pagination = { page: 2, pageSize: 2 };

          let areaDocs: PrismaModels['area'][];
          let areasCount: number;
          let response: AreasResponse;

          beforeEach(async () => {
            // Call the getMany method
            response = await areaDataHandler.getMany(false, pagination);

            // Get the areas from the mock database
            [areaDocs, areasCount] = await mockContext.prisma.$transaction([
              mockContext.prisma.area.findMany({
                where: { archived: false },
                ...areaDataHandler.generatePaginationArgs(pagination),
              }),
              mockContext.prisma.area.count({ where: { archived: false } }),
            ]);
          });

          it('returns an AreasResponse', () => {
            expect(response).toEqual({
              data: areaDocs.map((doc) => areaDataHandler.areaDTO(doc)),
              pagination: areaDataHandler.generatePaginationResponse(areasCount, pagination),
            });
          });
        });
      });
    });
  });
});
