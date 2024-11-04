const express = require('express');
const Investment = require('../models/Investment');

const router = express.Router();

// Ajouter un nouvel investissement
router.post('/', async (req, res) => {
    const { name, amount, userId } = req.body;

    try {
        const newInvestment = new Investment({ name, amount, userId });
        await newInvestment.save();
        res.status(201).json(newInvestment);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'investissement' });
    }
});

// Récupérer les investissements de l'utilisateur
router.get('/:userId', async (req, res) => {
    try {
        const investments = await Investment.find({ userId: req.params.userId });
        res.status(200).json(investments);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des investissements' });
    }
});

// Mettre à jour un investissement
router.put('/:id', async (req, res) => {
    try {
        const updatedInvestment = await Investment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedInvestment);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'investissement' });
    }
});

// Supprimer un investissement
router.delete('/:id', async (req, res) => {
    try {
        await Investment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Investissement supprimé' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'investissement' });
    }
});

module.exports = router;
