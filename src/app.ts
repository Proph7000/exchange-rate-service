import express from 'express';
import dotenv from 'dotenv';
import cron from 'node-cron';

import { exchangeRateRoutes } from './routes';
import { sendDailyEmails } from './controllers';
import { connect } from './db';

dotenv.config();

async function bootstrap() {
  await connect();

  const app = express();

  app.use(express.json());
  app.use('/api', exchangeRateRoutes);

  cron.schedule('0 0 * * *', sendDailyEmails);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

bootstrap();
