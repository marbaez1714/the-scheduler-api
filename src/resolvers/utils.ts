import { AuthenticationError } from 'apollo-server-core';
import { Context } from './../context';
import { Area, Metadata } from './../generated/graphql';
import { Area as AreaPrisma } from '@prisma/client';

type PrismaMetadata = {
  legacy: boolean;
  archived: boolean;
  createdBy: string;
  updatedBy: string;
  createdTime: Date;
  updatedTime: Date;
};

export enum Permissions {
  Admin = 'admin',
}

const formatMeta = (data: PrismaMetadata): Metadata => ({
  legacy: data.legacy,
  archived: data.archived,
  createdBy: data.createdBy,
  updatedBy: data.updatedBy,
  createdTime: data.createdTime.toJSON(),
  updatedTime: data.updatedTime.toJSON(),
});

export const checkPermission = (permission: Permissions, context: Context) => {
  if (!context.user.permissions?.includes(permission)) {
    throw new AuthenticationError('Missing permissions');
  }
};

export const formatArea = (data: AreaPrisma | null): Area | null => {
  if (data) {
    return {
      id: data.id,
      name: data.name,
      nameSpanish: data.nameSpanish,
      notes: data.notes,
      metadata: formatMeta(data),
    };
  }
  return null;
};
