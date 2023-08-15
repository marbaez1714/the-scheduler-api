import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';
import { Twilio } from 'twilio';
import { Context } from '../context';

export const createMockContext = (permissions?: string[]) =>
  ({
    prisma: new PrismaClient(),
    twilio: mockDeep<Twilio>(),
    user: {
      permissions: permissions ?? ['some-permission'],
      sub: 'some-sub',
    },
  } as Context);
