import mongoose, { Mongoose } from 'mongoose';
import dote from 'dotenv';

dote.config();

const uri = process.env.MONGO_URI;

export async function connect(): Promise<Mongoose> {
  const mongo = await mongoose.connect(uri || '');
  console.info('\x1b[34m%s\x1b[0m', `[DB] Connected to: ${uri}`);

  return mongo;
}
