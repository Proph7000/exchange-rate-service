import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { sendDailyEmails } from '../send-daily-emails-controller';
import { SubscriptionModel } from '../../models';
import { getExchangeRate, sendEmail } from '../../services';

vi.mock('../../models');
vi.mock('../../services');

describe('sendDailyEmails Function', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should send daily emails with the current exchange rate', async () => {
    const mockRate = 27.5;
    const mockSubscriptions = [
      { email: 'test1@example.com' },
      { email: 'test2@example.com' },
    ];

    (getExchangeRate as Mock).mockResolvedValue(mockRate);

    (SubscriptionModel.find as Mock).mockResolvedValue(mockSubscriptions);

    const sendEmailMock = sendEmail as Mock;

    sendEmailMock.mockResolvedValue(undefined);

    await sendDailyEmails();

    expect(getExchangeRate).toHaveBeenCalled();

    expect(SubscriptionModel.find).toHaveBeenCalled();

    expect(sendEmailMock).toHaveBeenCalledTimes(mockSubscriptions.length);

    expect(sendEmailMock).toHaveBeenCalledWith(
      'test1@example.com',
      'Daily Exchange Rate',
      `The current USD to UAH rate is ${mockRate}`
    );
    
    expect(sendEmailMock).toHaveBeenCalledWith(
      'test2@example.com',
      'Daily Exchange Rate',
      `The current USD to UAH rate is ${mockRate}`
    );
  });
});
