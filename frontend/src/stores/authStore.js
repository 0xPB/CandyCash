import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false, // Indique si l'utilisateur est connecté
    userId: null,      // ID de l'utilisateur
    username: null,    // Nom d'utilisateur
  }),

  actions: {
    // Action de connexion
    login(userId, username) {
      this.isLoggedIn = true;
      this.userId = userId;
      this.username = username;
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username);
    },

    // Action de déconnexion
    logout() {
      this.isLoggedIn = false;
      this.userId = null;
      this.username = null;
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
    },

    // Vérifier l'état de connexion
    checkLogin() {
      const userId = localStorage.getItem('userId');
      const username = localStorage.getItem('username');
      if (userId && username) {
        this.isLoggedIn = true;
        this.userId = userId;
        this.username = username;
      }
    },
  },
});
