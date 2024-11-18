import express from 'express';
import { getCurrentStockPrice } from '../controllers/investmentController.js';
import { addInvestment, getInvestments, updateInvestment, deleteInvestment } from '../controllers/investmentController.js';

const router = express.Router();

router.post('/', addInvestment); // Ajouter un investissement
router.get('/:userId', getInvestments); // Récupérer les investissements d'un utilisateur

// Récupérer le cours d'un actif spécifique
router.get('/price/:symbol', getCurrentStockPrice);

router.put('/:id', updateInvestment); // Mettre à jour un investissement
router.delete('/:id', deleteInvestment); // Supprimer un investissement

export default router;