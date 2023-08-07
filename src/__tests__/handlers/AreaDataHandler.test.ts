import { AreaDataHandler } from '../../handlers';
import { MockData } from '../../__mocks__/data';
import { createMockContext } from '../../__mocks__/context';
import { PermissionsEnum, PrismaModels } from '../../app/types';
import { ArchiveAreaResponse, Area, WriteAreaResponse } from '../../generated';
import { GRAPHQL_ERRORS, RESPONSES } from '../../constants';

const mockContext = createMockContext([PermissionsEnum.Admin]);
const areaDataHandler = new AreaDataHandler(mockContext);

describe('AreaDataHandler', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('methods', () => {
    const mockAreaToArchive = MockData.dBArea(0, { archived: false });
    const mockAreaToGetById = MockData.dBArea(1, { archived: false });
    const mockAreaToModify = MockData.dBArea(2, { archived: false });

    beforeAll(async () => {
      // Create the area to be modified in the database
      await mockContext.prisma.area.createMany({
        data: [mockAreaToArchive, mockAreaToModify, mockAreaToGetById],
      });
    });

    afterAll(async () => {
      // Delete the area from the database
      await mockContext.prisma.$transaction([
        mockContext.prisma.area.delete({ where: { id: mockAreaToArchive.id } }),
        mockContext.prisma.area.delete({ where: { id: mockAreaToModify.id } }),
        mockContext.prisma.area.delete({ where: { id: mockAreaToGetById.id } }),
      ]);
    });

    describe('archive', () => {
      let archiveResponse: ArchiveAreaResponse;
      let updatedArea: PrismaModels['area'];

      beforeEach(async () => {
        // Archive the area
        archiveResponse = await areaDataHandler.archive(mockAreaToArchive.id);

        // Get the updated area from the database
        updatedArea = (await mockContext.prisma.area.findUnique({
          where: { id: mockAreaToArchive.id },
        })) as PrismaModels['area'];
      });

      it('modifies the archived and updatedBy fields in the database', async () => {
        expect(updatedArea).toEqual(
          expect.objectContaining({ archived: true, updatedBy: mockContext.user.sub })
        );
      });

      it('returns an ArchiveAreaResponse', () => {
        expect(archiveResponse).toEqual({
          data: areaDataHandler.areaDTO(updatedArea),
          message: RESPONSES.archiveSuccess(updatedArea.name),
        });
      });
    });

    describe('create', () => {
      let writeResponse: WriteAreaResponse;
      let createdArea: PrismaModels['area'];
      const mockWriteAreaInput = {
        name: 'some-name',
        nameSpanish: 'some-name-spanish',
        notes: 'some-notes',
      };

      beforeAll(async () => {
        // Create the area
        writeResponse = await areaDataHandler.create(mockWriteAreaInput);

        createdArea = (await mockContext.prisma.area.findUnique({
          where: { id: writeResponse.data.id },
        })) as PrismaModels['area'];
      });

      afterAll(async () => {
        // Delete the area from the database
        await mockContext.prisma.area.delete({ where: { id: createdArea.id } });
      });

      it('creates a new area in the database with matching data', async () => {
        expect(createdArea).toEqual(
          expect.objectContaining({
            ...mockWriteAreaInput,
            updatedBy: mockContext.user.sub,
            createdBy: mockContext.user.sub,
          })
        );
      });

      it('returns a WriteAreaResponse', () => {
        expect(writeResponse).toEqual({
          data: areaDataHandler.areaDTO(createdArea),
          message: RESPONSES.createSuccess(createdArea.name),
        });
      });
    });

    describe('modify', () => {
      let writeResponse: WriteAreaResponse;
      let modifiedArea: PrismaModels['area'];
      const modifyData = {
        name: 'new-name',
        nameSpanish: 'new-name-spanish',
        notes: 'new-notes',
      };

      beforeAll(async () => {
        writeResponse = await areaDataHandler.modify(mockAreaToModify.id, modifyData);

        modifiedArea = (await mockContext.prisma.area.findUnique({
          where: { id: mockAreaToModify.id },
        })) as PrismaModels['area'];
      });

      it('modifies the area in the database with matching data', async () => {
        expect(modifiedArea).toEqual(
          expect.objectContaining({ ...modifyData, updatedBy: mockContext.user.sub })
        );
      });

      it('returns a WriteAreaResponse', () => {
        expect(writeResponse).toEqual({
          data: areaDataHandler.areaDTO(modifiedArea),
          message: RESPONSES.modifySuccess(modifiedArea.name),
        });
      });
    });

    describe('getById', () => {
      describe('when the area exists', () => {
        let getByIdResponse: Area;

        beforeEach(async () => {
          getByIdResponse = await areaDataHandler.getById(mockAreaToGetById.id);
        });

        it('returns the area', () => {
          expect(getByIdResponse).toEqual(areaDataHandler.areaDTO(mockAreaToGetById));
        });
      });

      describe('when the area does not exist', () => {
        it('throws an error', async () => {
          await expect(areaDataHandler.getById('some-id')).rejects.toThrowError(
            GRAPHQL_ERRORS.idNotFound('some-id')
          );
        });
      });
    });

    describe('getMany', () => {
      //
    });
  });
});
