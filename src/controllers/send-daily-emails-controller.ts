import { SubscriptionModel } from '../models';
import { getExchangeRate, sendEmail } from '../services';

export const sendDailyEmails = async (): Promise<void> => {
  const rate = await getExchangeRate();
  const subscriptions = await SubscriptionModel.find();

  subscriptions.forEach(async (sub) => {
    await sendEmail(
      sub.email,
      'Daily Exchange Rate',
      `The current USD to UAH rate is ${rate}`
    );
  });
};
