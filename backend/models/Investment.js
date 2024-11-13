const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
    stock: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true }, // Ajout de la catégorie
    lastWeekClose: { type: Number, required: true }, // Ajout du prix de clôture de la semaine dernière
    purchaseDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Investment', investmentSchema);
