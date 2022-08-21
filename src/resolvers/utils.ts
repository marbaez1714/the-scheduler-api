import { AuthenticationError } from 'apollo-server-core';

import { Context } from './../context';
import { BaseDocument, PermissionsEnum, PrismaData } from './types';

/******************************/
/* Authentication             */
/******************************/
export const checkPermission = (permission: PermissionsEnum, context: Partial<Context>) => {
  if (!context.user?.permissions?.includes(permission)) {
    throw new AuthenticationError('Missing permissions');
  }
};
