import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';

export const SMS_KEYWORDS = {
  optIn: ['start', 'yes', 'unstop'],
  optOut: ['cancel', 'end', 'quit', 'stop', 'stopall', 'unsubscribe'],
};

export const SMS_MESSAGES = {
  optInRequest:
    'Would you like to receive text messages from Baez Flooring? Reply "YES" to opt in.\n¿Le gustaría recibir mensajes de texto de Baez Flooring? Responda "YES" para aceptar.',
  optInReminder: 'Reply "YES" to opt in.\nResponda "YES" para aceptar.',
  optInResponse:
    'Thank you for opting in to receive text messages from Baez Flooring. You can opt out at any time by texting STOP to this number.',
  outOutResponse:
    'You have successfully opted out of receiving text messages from Baez Flooring. You can opt back in at any time by texting START to this number.',
};

export const GRAPHQL_ERRORS = {
  userSMSOptedOut: new GraphQLError('User has opted out of receiving text messages.', {
    extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
  }),
  messageRequired: new GraphQLError('Message is required.', {
    extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
  }),
  contractorNotFound: new GraphQLError('Contractor not found.', {
    extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
  }),
  contractorSMSOptedOut: new GraphQLError('Contractor has opted out of receiving text messages.', {
    extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
  }),
  reporterNotFound: new GraphQLError('Reporter not found.', {
    extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
  }),
  reporterSMSOptedOut: new GraphQLError('Reporter has opted out of receiving text messages.', {
    extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
  }),
  phoneNumberMustBeString: new GraphQLError('Phone Number must be a string', {
    extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
  }),
  phoneNumberFormatInvalid: (value: string) =>
    new GraphQLError(`Invalid phone format - ${value}`, {
      extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
    }),
  smsFailed: new GraphQLError('SMS failed to send.', {
    extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
  }),
  smsConsentRequestFailed: new GraphQLError('SMS consent request failed to send.', {
    extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
  }),
  smsConsentReminderFailed: new GraphQLError('SMS consent reminder failed to send.', {
    extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
  }),
  contractorSMSFailed: new GraphQLError('Contractor SMS failed to send.', {
    extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
  }),
  reporterSMSFailed: new GraphQLError('Reporter SMS failed to send.', {
    extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
  }),
  phoneNumberRequired: new GraphQLError('Phone Number is required.', {
    extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
  }),
  invalidRecipient: new GraphQLError('Invalid recipient.', {
    extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
  }),
  jobNotFound: new GraphQLError('Job not found.', {
    extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
  }),
  invalidRecipientType: new GraphQLError('Invalid recipient type.', {
    extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
  }),
  missingPermissions: new GraphQLError('Missing permissions.', {
    extensions: { code: 'UNAUTHENTICATED' },
  }),
  missingToken: new GraphQLError('Missing token.', {
    extensions: { code: 'UNAUTHENTICATED' },
  }),
  idNotFound: (id: string) =>
    new GraphQLError(`${id} does not exist.`, {
      extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
    }),
};

export const RESPONSES = {
  archiveSuccess: (value: string) => `Successfully archived ${value}.`,
  createSuccess: (value: string) => `Successfully created ${value}.`,
  modifySuccess: (value: string) => `Successfully modified ${value}.`,
  jobLegacyReenableSuccess: (value: string) => `Successfully re-enabled ${value}.`,
  deleted: (value: string) => `Successfully deleted ${value}.`,
  updated: (value: string) => `Successfully updated ${value}.`,
};
