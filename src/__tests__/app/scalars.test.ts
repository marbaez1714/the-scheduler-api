import { ScalarDefs } from '../../app/scalars';

const phoneNumberDef = ScalarDefs.PhoneNumber;

describe('ScalarDefs', () => {
  describe('PhoneNumber', () => {
    describe('parseValue', () => {
      describe('when value is not a string', () => {
        it('throws an error', () => {
          expect(() => phoneNumberDef.parseValue(123)).toThrowError(
            'Phone Number must be a string'
          );
        });
      });

      describe('when value is not a valid phone number', () => {
        it('throws an error', () => {
          expect(() => phoneNumberDef.parseValue('123')).toThrowError('Invalid phone format - 123');
        });
      });

      describe('when value is a valid phone number', () => {
        it('returns the value', () => {
          expect(phoneNumberDef.parseValue('1234567890')).toEqual('1234567890');
        });
      });
    });
  });
});
