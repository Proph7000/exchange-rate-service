import axios from 'axios';

import { IGetExchangeRateResponse } from './types';

export const getExchangeRate = async (): Promise<number> => {
  const response = await axios.get<IGetExchangeRateResponse>(
    'https://api.exchangerate-api.com/v4/latest/USD'
  );

  return response.data.rates.UAH;
};
