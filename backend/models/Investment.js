import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }, // Ajout du champ quantité
  total: { type: Number, required: true }, // Ajout du champ total
});

const Investment = mongoose.model('Investment', investmentSchema);

export default Investment;
