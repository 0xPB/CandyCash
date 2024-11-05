const mongoose = require('mongoose');

// Schéma de l'utilisateur
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // Stocke le mot de passe en clair
  postalAddress: { type: String, required: true },
});

// Supprimer le middleware de hachage pour stocker le mot de passe en clair

const User = mongoose.model('User', userSchema);
module.exports = User;
