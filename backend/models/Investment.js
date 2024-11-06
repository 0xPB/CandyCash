const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
    stock: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Assurez-vous que c'est un ObjectId
});

module.exports = mongoose.model('Investment', investmentSchema);

