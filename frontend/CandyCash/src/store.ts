import { createStore } from 'vuex';

export const store = createStore({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
  },
  mutations: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
  actions: {
    login({ commit }, token) {
      localStorage.setItem('token', token);
      commit('login'); // Mets à jour l'état `isLoggedIn` après avoir stocké le token
    },
    logout({ commit }) {
      localStorage.removeItem('token');
      commit('logout'); // Mets à jour l'état `isLoggedIn` en cas de déconnexion
    },
  },
});
