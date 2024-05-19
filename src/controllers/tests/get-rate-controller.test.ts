import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { Request, Response } from 'express';

import { getRate } from '../get-rate-controller';
import * as service from '../../services/exchange-rate-service';

describe('getRate Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let json: Mock;
  let status: Mock;

  beforeEach(() => {
    req = {};
    json = vi.fn();
    status = vi.fn().mockReturnValue({ json });

    res = {
      status,
    };
  });

  it('should respond with the exchange rate on success', async () => {
    const mockRate = 1.2;

    vi.spyOn(service, 'getExchangeRate').mockResolvedValue(mockRate);

    await getRate(req as Request, res as Response);

    expect(service.getExchangeRate).toHaveBeenCalled();

    expect(status).toHaveBeenCalledWith(200);

    expect(json).toHaveBeenCalledWith(mockRate);
  });

  it('should respond with status 400 on error', async () => {
    vi.spyOn(service, 'getExchangeRate').mockRejectedValue(
      new Error('Service error')
    );

    await getRate(req as Request, res as Response);

    expect(service.getExchangeRate).toHaveBeenCalled();

    expect(status).toHaveBeenCalledWith(400);

    expect(json).toHaveBeenCalledWith('Invalid status value');
  });
});
