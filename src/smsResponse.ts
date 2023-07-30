import twilio from 'twilio';
import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient, SMSConsent } from '@prisma/client';
import { SMS_KEYWORDS, SMS_MESSAGES } from './constants';

// Prisma client
const prisma = new PrismaClient();

// Twilio webhook request handler for handling user opt in and out messages
const twilioWebhookRequestHandler: express.RequestHandler = async (req, res) => {
  // Format the message body and phone number
  const messageBody =
    typeof req.body.Body === 'string' ? (req.body.Body as string).trim().toLowerCase() : '';
  const messagePhoneNumber =
    typeof req.body.From === 'string' ? (req.body.From as string).slice(-10) : '';

  // Check if the request has a body and if it has a message and a from number
  if (!messageBody || !messagePhoneNumber) {
    res.status(400).send('Bad Request');
    return;
  }

  // Check if the message is an opt in or out message
  const isOptIn = SMS_KEYWORDS.optIn.includes(messageBody.toLowerCase());
  const isOptOut = SMS_KEYWORDS.optOut.includes(messageBody.toLowerCase());

  if (!isOptOut && !isOptIn) {
    res.status(400).send('Bad Request');
    return;
  }

  try {
    // Create a Twilio response
    const twilioResponse = new twilio.twiml.MessagingResponse();
    // Response message
    const responseMessage = isOptIn ? SMS_MESSAGES.optIn : SMS_MESSAGES.optOut;
    // Prisma transaction helpers
    const searchCondition = { primaryPhone: messagePhoneNumber };
    const updateData = { smsConsent: isOptIn ? SMSConsent.OPTED_IN : SMSConsent.OPTED_OUT };

    await prisma.$transaction([
      prisma.contractor.updateMany({ where: searchCondition, data: updateData }),
      prisma.reporter.updateMany({ where: searchCondition, data: updateData }),
    ]);

    // Send the response
    twilioResponse.message(responseMessage);
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twilioResponse.toString());
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

/**
 * Create a Twilio webhook response
 * @returns express.Router
 */
export const setupSMSResponse = () => {
  // Check if in development mode
  const isDev = process.env.NODE_ENV === 'dev';

  // Create router and setup body parser
  const router = express.Router();
  router.use(bodyParser.urlencoded({ extended: false }));

  // Setup Twilio webhook
  const twilioWebhookMiddleware = twilio.webhook({ validate: !isDev }) as express.RequestHandler;

  // Handle incoming messages
  router.post('/', twilioWebhookMiddleware, twilioWebhookRequestHandler);

  return router;
};
