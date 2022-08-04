import { context } from './../context';
import { Permissions, checkPermission, formatArea } from './utils';

import { QueryResolvers } from './../generated/graphql';

export const queryResolvers: QueryResolvers = {
  areas: async (_, __, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    // Get all areas
    const areasList = await context.prisma.area.findMany();

    // return all areas
    return areasList.map(formatArea);
  },
  area: async (_, args, context) => {
    // Check for admin permissions
    checkPermission(Permissions.Admin, context);

    const areasList = await context.prisma.area.findUnique({ where: { id: args.id } });
  },
};
