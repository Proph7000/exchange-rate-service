import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { Request, Response } from 'express';

import { subscribe } from '../subscribe-controller';
import { SubscriptionModel } from '../../models/';

describe('subscribe Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let json: Mock;
  let status: Mock;
  let save: Mock;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
      },
    };
    
    json = vi.fn();
    status = vi.fn().mockReturnValue({ json });

    res = {
      status,
    };

    save = vi.fn();

    vi.spyOn(SubscriptionModel.prototype, 'save').mockImplementation(save);
  });

  it('should respond with 201 on successful subscription', async () => {
    save.mockResolvedValueOnce({});

    await subscribe(req as Request, res as Response);

    expect(status).toHaveBeenCalledWith(201);

    expect(json).toHaveBeenCalledWith('Subscribed successfully');
  });

  it('should respond with 409 if email already exists', async () => {
    const error = new Error('Email already exists');
    error.name = 'MongoError';
    (error as any).code = 11000;

    save.mockRejectedValueOnce(error);

    await subscribe(req as Request, res as Response);

    expect(status).toHaveBeenCalledWith(409);
    expect(json).toHaveBeenCalledWith('Email already exists');
  });

  it('should respond with 400 if email is invalid', async () => {
    req.body.email = 'invalid-email';

    await subscribe(req as Request, res as Response);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith('Invalid email format');
  });

  it('should respond with 400 if email is missing', async () => {
    req.body.email = '';

    await subscribe(req as Request, res as Response);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith('Email is required');
  });
});
