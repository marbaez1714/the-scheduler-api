import { GraphQLScalarType } from 'graphql';
import { regexPatterns } from '../utils';
import { GRAPHQL_ERRORS } from '../constants';

export const ScalarDefs = {
  PhoneNumber: new GraphQLScalarType<string, string>({
    name: 'PhoneNumber',
    description: 'Formatted phone number with only numeric characters.',
    parseValue: (value) => {
      // Check if the value is a string
      if (typeof value !== 'string') {
        throw GRAPHQL_ERRORS.phoneNumberMustBeString;
      }

      // Check if the value is a valid phone number
      if (!regexPatterns.phoneNumber.test(value)) {
        throw GRAPHQL_ERRORS.phoneNumberFormatInvalid(value);
      }

      // Remove all special characters and return the value
      return value.replace(/\D/g, '');
    },
  }),
};
