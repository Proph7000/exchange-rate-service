import { Schema, model, Document } from 'mongoose';

interface ISubscription extends Document {
  email: string;
}

const subscriptionSchema = new Schema<ISubscription>({
  email: { type: String, required: true, unique: true }
});

export default model<ISubscription>('Subscribers', subscriptionSchema);
