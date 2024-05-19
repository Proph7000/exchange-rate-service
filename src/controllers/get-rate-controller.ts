import { Request, Response } from 'express';

import { getExchangeRate } from "../services";

export const getRate = async (req: Request, res: Response): Promise<void> => {
  try {
    const rate = await getExchangeRate();

    res.status(200).json(rate);
  } catch {
    res.status(400).json('Invalid status value');
  }
};