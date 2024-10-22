const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Route pour l'inscription des utilisateurs
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Vérifier que tous les champs sont remplis
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Tous les champs sont requis' });
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'L\'utilisateur existe déjà' });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Créer un nouvel utilisateur
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Sauvegarder l'utilisateur dans MongoDB
        await newUser.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        res.status(500).json({ error: 'Erreur lors de l\'inscription' });
    }
});

// Route pour la connexion des utilisateurs
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérifier que tous les champs sont remplis
        if (!email || !password) {
            return res.status(400).json({ error: 'Tous les champs sont requis' });
        }

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Mot de passe incorrect' });
        }

        // Créer un token JWT pour l'utilisateur
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
});

module.exports = router;

