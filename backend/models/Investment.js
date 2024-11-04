const mongoose = require('mongoose');

// Schéma des investissements
const investmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Investment = mongoose.model('Investment', investmentSchema);
module.exports = Investment;
