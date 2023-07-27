import { RequestHandler } from 'express';
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';

export const smsResponse: RequestHandler = (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('The Robots are coming! Head for the hills!');

  res.set('Content-Type', 'text/xml');
  res.send(twiml.toString());
};
