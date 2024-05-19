import { describe, expect, vi, test, beforeEach, Mock } from 'vitest';
import axios from 'axios';

import { getExchangeRate } from '../exchange-rate-service';

vi.mock('axios');

describe('exchange-rate-service', () => {
  beforeEach(() => {
    (axios.get as Mock).mockReset();
  });

  describe('fetchRate', () => {
    test('makes a GET request to fetch rate', async () => {
      const expectedRate = 39.5;

      (axios.get as Mock).mockResolvedValue({
        data: {
          rates: {
            UAH: expectedRate,
          },
        },
      });

      const rate = await getExchangeRate();

      expect(axios.get).toHaveBeenCalledWith(
        'https://api.exchangerate-api.com/v4/latest/USD'
      );

      expect(rate).toStrictEqual(expectedRate);
    });
  });
});
