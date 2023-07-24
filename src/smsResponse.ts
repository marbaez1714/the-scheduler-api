import twilio from 'twilio';
import express from 'express';
import bodyParser from 'body-parser';

export const setupSMSResponse = () => {
  const isTest = process.env.NODE_ENV === 'test';

  const router = express.Router();

  router.use(bodyParser.urlencoded({ extended: false }));

  if (isTest) {
    router.post('/', async (req, res) => {
      const twilioSignature = req.headers['x-twilio-signature'] as string;
      const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN as string;
      const url = `${process.env.URL}/sms`;
      const isTwilioRequestValid = twilio.validateRequest(
        twilioAuthToken,
        twilioSignature,
        url,
        req.body
      );

      if (!isTwilioRequestValid) {
        return res.status(403).send('Invalid Twilio request.');
      }

      const twilioResponse = new twilio.twiml.MessagingResponse();

      twilioResponse.message(`Success! Message from: ${req.body.From}`);

      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(twilioResponse.toString());
    });
  }

  return router;
};
