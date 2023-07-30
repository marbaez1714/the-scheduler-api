import { GraphQLError, GraphQLScalarType } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { regexPatterns } from '../utils';

export const ScalarDefs = {
  PhoneNumber: new GraphQLScalarType<string, string>({
    name: 'PhoneNumber',
    description: 'Formatted phone number with only numeric characters.',
    parseValue: (value) => {
      // Check if the value is a string
      if (typeof value !== 'string') {
        throw new GraphQLError('Phone Number must be a string', {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
      }

      // Check if the value is a valid phone number
      if (!regexPatterns.phoneNumber.test(value)) {
        throw new GraphQLError(`Invalid phone format - ${value}`, {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
      }

      // Remove all special characters and return the value
      return value.replace(/\D/g, '');
    },
  }),
};
