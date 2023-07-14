import { createMockContext } from '../../__mocks__/context';
import { PermissionsEnum } from '../../app/types';
import { AreaDataHandler } from '../../area/handlers';
import { generateAreaCreateInput } from '../../__mocks__/data';

const mockContext = createMockContext([PermissionsEnum.Admin]);
const mockAreas = [
  generateAreaCreateInput(0),
  generateAreaCreateInput(1, { archived: true, legacy: false }),
  generateAreaCreateInput(2, { archived: true, legacy: true }),
  generateAreaCreateInput(3, { archived: false, legacy: true }),
  generateAreaCreateInput(4, { archived: false, legacy: false }),
];

describe('AreaDataHandler', () => {
  const areaHandler = new AreaDataHandler(mockContext);

  beforeAll(async () => {
    await mockContext.prisma.area.createMany({ data: mockAreas });
  });

  afterAll(async () => {
    await mockContext.prisma.area.deleteMany();
    await mockContext.prisma.$disconnect();
  });

  describe('areaHandler fields', () => {
    it('should have a client field of area', () => {
      expect(areaHandler.client).toEqual('area');
    });

    it('should have a crud field of type Prisma.AreaDelegate', () => {
      expect(areaHandler.crud).toEqual(mockContext.prisma.area);
    });
  });

  describe('areaHandler methods', () => {
    describe('getMany', () => {
      describe('when no args are passed', () => {
        let getManyResult: Awaited<ReturnType<typeof areaHandler.getMany>>;

        beforeAll(async () => {
          getManyResult = await areaHandler.getMany();
        });

        // it('should return data with all areas', () => {
        //   expect(getManyResult.data).toEqual(mockAreas);
        // });

        it('should return all areas', () => {
          console.log(getManyResult);
          // await expect(areas).resolves.toHaveLength(mockAreas.length);
        });
      });
    });
  });
});
