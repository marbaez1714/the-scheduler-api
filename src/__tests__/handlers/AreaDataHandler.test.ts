import { AreaDataHandler } from '../../handlers';
import { MockData } from '../../__mocks__/data';
import { createMockContext } from '../../__mocks__/context';
import { PermissionsEnum } from '../../app/types';

const mockContext = createMockContext([PermissionsEnum.Admin]);
const areaDataHandler = new AreaDataHandler(mockContext);

describe('AreaDataHandler', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
});
