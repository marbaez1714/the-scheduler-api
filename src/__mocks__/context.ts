import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { Twilio } from 'twilio';
import { DecodedUserToken, Context } from '../context';

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>;
  twilio: DeepMockProxy<Twilio>;
  user: DecodedUserToken;
};

export const createMockContext = (permissions?: string[]) =>
  ({
    prisma: mockDeep<PrismaClient>(),
    twilio: mockDeep<Twilio>(),
    user: {
      permissions: permissions ?? ['some-permission'],
      sub: 'some-sub',
    },
  } as Context);
