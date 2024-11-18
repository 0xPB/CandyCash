import express from 'express';
import { getCurrentStockPrice, getInvestmentsWithPrices } from '../controllers/investmentController.js';
import { addInvestment, getInvestments } from '../controllers/investmentController.js';

const router = express.Router();

router.post('/', addInvestment); // Ajouter un investissement
router.get('/:userId', getInvestments); // Récupérer les investissements d'un utilisateur

// Récupérer le cours d'un actif spécifique
router.get('/price/:symbol', getCurrentStockPrice);

router.get('/prices/:userId', getInvestmentsWithPrices); // Récupérer les investissements avec prix actuels

export default router;
