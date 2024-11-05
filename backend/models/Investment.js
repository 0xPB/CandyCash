// models/Investment.js
const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
    stock: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Investment', investmentSchema);
