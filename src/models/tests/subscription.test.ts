import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import mongoose from 'mongoose';

import dotenv from 'dotenv';

import Subscription from '../subscription';
import { connect } from '../../db/connect';

dotenv.config();

beforeAll(async () => {
  let mongoConnection: mongoose.Mongoose;

  vi.spyOn(mongoose, 'connect').mockImplementationOnce(async () => {
    mongoConnection = await mongoose.connect(process.env.MONGO_URI || '');

    return mongoConnection;
  });

  mongoConnection = await connect();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

describe('Subscription Model', () => {
  it('should create a subscription successfully', async () => {
    const email = 'test@example.com';
    const subscription = new Subscription({ email });
    const savedSubscription = await subscription.save();

    expect(savedSubscription._id).toBeDefined();

    expect(savedSubscription.email).toBe(email);
  });

  it('should fail to create a subscription without email', async () => {
    const subscription = new Subscription({});

    try {
      await subscription.save();
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        expect(error).toBeInstanceOf(mongoose.Error.ValidationError);

        expect(error.errors.email).toBeDefined();
      } else {
        throw error;
      }
    }
  });

  it('should fail to create a subscription with duplicate email', async () => {
    const email = 'duplicate@example.com';
    const subscription1 = new Subscription({ email });
    const subscription2 = new Subscription({ email });

    await subscription1.save();

    try {
      await subscription2.save();
    } catch (error) {
      expect((error as any).errorResponse.code).toBe(11000); // 11000 is the code for duplicate key error in MongoDB
    }
  });
});
