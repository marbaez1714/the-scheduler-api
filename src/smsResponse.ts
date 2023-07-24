import twilio from 'twilio';
import express from 'express';
import bodyParser from 'body-parser';

export const setupSMSResponse = () => {
  const isTest = process.env.NODE_ENV === 'test';

  const router = express.Router();

  router.use(bodyParser.urlencoded({ extended: false }));

  if (isTest) {
    router.post('/', twilio.webhook(), async (req, res) => {
      console.log(JSON.stringify(req.body, null, 2));
      const twilioResponse = new twilio.twiml.MessagingResponse();

      twilioResponse.message(`Success! Message from: ${req.body.From}`);

      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(twilioResponse.toString());
    });
  }

  return router;
};
