import { Request, Response } from 'express';
import * as yup from 'yup';

import { SubscriptionModel } from '../models';

const emailSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required')
});

export const subscribe = async (req: Request, res: Response): Promise<void> => {
  try {
    await emailSchema.validate(req.body);

    const { email } = req.body;
    const subscription = new SubscriptionModel({ email });

    await subscription.save();

    res.status(201).json('Subscribed successfully');
  } catch (err) {
     if (err instanceof yup.ValidationError) {
      res.status(400).json(err.errors[0]);
    } else {
      res.status(409).json('Email already exists');
    }
  }
};
