import mongoose, { Model, Schema } from 'mongoose';

// Interface for Transaction data (optional, but improves type safety)
interface ITransaction {
  amount: number;
  date: Date;
  type: 'credit' | 'debit';
  status: 'pending' | 'completed' | 'failed';
  description?: string;
}

const transactionSchema = new Schema<ITransaction>({
  amount: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now },
  type: { type: String, enum: ['credit', 'debit'], required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], required: true },
  description: { type: String, default: '' },
});

const Transaction: Model<ITransaction> = mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction;
