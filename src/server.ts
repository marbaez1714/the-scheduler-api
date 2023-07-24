import express from 'express';
import http from 'http';
import { setupApolloServer } from './apolloServer';
import { setupSMSResponse } from './smsResponse';

async function startServer() {
  try {
    // Configure Port
    const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;

    // setup express
    const app = express();

    // setup http server
    const httpServer = http.createServer(app);

    // setup graphql router
    app.use('/graphql', await setupApolloServer(httpServer));

    // setup sms router
    app.use('/sms', setupSMSResponse());

    // start the http server
    await httpServer.listen(port);

    // log the port
    console.log(`Server is running on http://localhost:${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startServer();
