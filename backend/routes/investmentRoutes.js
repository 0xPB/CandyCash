// investmentRoutes.js
const express = require('express');
const axios = require('axios');
const Investment = require('../models/Investment'); // Modèle MongoDB
const router = express.Router();

// Route pour récupérer tous les investissements
router.get('/all', async (req, res) => {
    try {
        const investments = await Investment.find();
        res.json(investments);
    } catch (error) {
        console.error("Erreur lors de la récupération des investissements:", error);
        res.status(500).json({ error: "Erreur lors de la récupération des investissements" });
    }
});

// Route pour récupérer le prix d'une action spécifique
router.get('/stocks/:ticker', async (req, res) => {
    const { ticker } = req.params;
    try {
        const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${ticker}/prev`, {
            params: {
                adjusted: true,
                apiKey: process.env.POLYGON_API_KEY,
            },
        });
        const price = response.data.results[0]?.c;
        if (price) {
            res.json({ price });
        } else {
            res.status(404).json({ error: "Données non trouvées pour l'action sélectionnée." });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du prix de l’action:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données de Polygon pour les actions.' });
    }
});

// Nouvelle route pour enregistrer l'investissement
router.post('/save', async (req, res) => {
    const { stock, quantity, price } = req.body;
    try {
        const newInvestment = new Investment({ stock, quantity, price });
        await newInvestment.save();
        res.status(201).json({ message: "Investissement enregistré avec succès" });
    } catch (error) {
        console.error("Erreur lors de l'enregistrement de l'investissement:", error);
        res.status(500).json({ error: "Erreur lors de l'enregistrement de l'investissement" });
    }
});

module.exports = router;
