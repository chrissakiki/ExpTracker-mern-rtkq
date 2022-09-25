import mongoose from "mongoose";

interface ITransaction {
  name: string;
  type: string;
  amount: number;
  date: Date;
}

const TransactionSchema = new mongoose.Schema<ITransaction>({
  name: {
    type: String,
    default: "Unknown",
  },
  type: {
    type: String,
    default: "Investment",
  },
  amount: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Transaction", TransactionSchema);
