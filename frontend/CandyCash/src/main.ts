import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store'; // Importe bien le store

// Importer le fichier CSS global
import './assets/styles.css';

createApp(App)
  .use(router)
  .use(store) // Ajoute le store Vuex
  .mount('#app');

