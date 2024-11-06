const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Inscription
router.post('/register', async (req, res) => {
    const { firstName, lastName, age, gender, email, password, postalAddress } = req.body;

    try {
        // Vérifier que tous les champs sont remplis
        if (!firstName || !lastName || !age || !gender || !email || !password || !postalAddress) {
            return res.status(400).json({ error: 'Tous les champs sont requis' });
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'L\'utilisateur existe déjà' });
        }

        // Créer un nouvel utilisateur sans hachage du mot de passe
        const newUser = new User({
            firstName,
            lastName,
            age,
            gender,
            email,
            password,  // Mot de passe en clair (non sécurisé)
            postalAddress,
        });

        // Sauvegarder l'utilisateur dans la base de données
        await newUser.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'inscription' });
    }
});

// Connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        // Comparaison directe du mot de passe en clair
        if (user.password !== password) {
            return res.status(400).json({ error: 'Mot de passe incorrect' });
        }

        res.status(200).json({ message: 'Connexion réussie', user: { _id: user._id, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
});

module.exports = router;
