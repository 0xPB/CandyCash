import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js'; // Assurez-vous que ces méthodes existent

const router = express.Router();

// Route pour enregistrer un utilisateur
router.post('/register', registerUser);

// Route pour se connecter (login)
router.post('/login', loginUser);

export default router;
