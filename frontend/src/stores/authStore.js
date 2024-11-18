import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false, // Indique si l'utilisateur est connecté
    userId: null, // Stocke l'ID de l'utilisateur
    username: null, // Stocke le nom d'utilisateur
  }),

  actions: {
    // Action pour se connecter
    login(userId, username) {
      this.isLoggedIn = true;
      this.userId = userId;
      this.username = username; // Enregistre le nom d'utilisateur
      localStorage.setItem('userId', userId); // Stocke l'ID dans le localStorage
      localStorage.setItem('username', username); // Stocke le nom d'utilisateur dans le localStorage
    },

    // Action pour se déconnecter
    logout() {
      this.isLoggedIn = false;
      this.userId = null;
      this.username = null;
      localStorage.removeItem('userId'); // Supprime l'ID du localStorage
      localStorage.removeItem('username'); // Supprime le nom d'utilisateur du localStorage
    },

    // Vérifie si l'utilisateur est connecté
    checkLogin() {
      const userId = localStorage.getItem('userId');
      const username = localStorage.getItem('username'); // Récupère le nom d'utilisateur
      if (userId && username) {
        this.isLoggedIn = true;
        this.userId = userId;
        this.username = username; // Récupère le nom d'utilisateur du localStorage
      }
    },
  },
});
