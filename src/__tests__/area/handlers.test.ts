import { createMockContext } from '../../__mocks__/context';
import { PermissionsEnum } from '../../app/types';
import { AreaDataHandler } from '../../area/handlers';

const mockContext = createMockContext([PermissionsEnum.Admin]);
const areaHandler = new AreaDataHandler(mockContext);

describe('AreaDataHandler', () => {
  describe('areaHandler fields', () => {
    it('should have a client field of area', () => {
      expect(areaHandler.client).toEqual('area');
    });

    it('should have a crud field of type Prisma.AreaDelegate', () => {
      expect(areaHandler.crud).toEqual(mockContext.prisma.area);
    });
  });
});
