import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { connect } from '../connect';

dotenv.config();

describe('MongoDB Connection', () => {
  let mongoConnection: mongoose.Mongoose;

  beforeAll(async () => {
    vi.spyOn(mongoose, 'connect').mockImplementationOnce(async () => {
      mongoConnection = await mongoose.connect(process.env.MONGO_URI || '');

      return mongoConnection;
    });

    mongoConnection = await connect();
  });

  afterAll(async () => {
    if (mongoConnection) {
      await mongoConnection.disconnect();
    }
  });

  it('should connect to the database successfully', async () => {
    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI || '');
    
    expect(mongoConnection.connection.readyState).toBe(1);
  });
});
