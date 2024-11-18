import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false, // Indique si l'utilisateur est connecté
    userId: null, // Stocke l'ID de l'utilisateur
  }),

  actions: {
    login(userId) {
      this.isLoggedIn = true;
      this.userId = userId;
      localStorage.setItem('userId', userId); // Stocke l'ID dans le localStorage
    },

    logout() {
      this.isLoggedIn = false;
      this.userId = null;
      localStorage.removeItem('userId'); // Supprime l'ID du localStorage
    },

    checkLogin() {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.isLoggedIn = true;
        this.userId = userId;
      }
    },
  },
});