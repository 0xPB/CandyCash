import mongoose from 'mongoose';

const profitLossSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  value: { type: Number, required: true },
  date: { type: Date, required: true },
});

const ProfitLoss = mongoose.model('ProfitLoss', profitLossSchema);

export default ProfitLoss;