import { GraphQLScalarType } from 'graphql';
import { UserInputError } from 'apollo-server';
import { regexPatterns } from '../utils';

export const ScalarDefs = {
  PhoneNumber: new GraphQLScalarType<string, string>({
    name: 'PhoneNumber',
    description: 'Formatted phone number with only numeric characters.',
    parseValue: (value) => {
      if (typeof value !== 'string') {
        throw new UserInputError('Phone Number must be a string');
      }

      if (!regexPatterns.phoneNumber.test(value)) {
        throw new UserInputError(`Invalid phone format - ${value}`);
      }

      return value;
    },
  }),
};
