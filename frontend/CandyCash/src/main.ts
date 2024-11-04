import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Assure-toi que le router est bien importé

// Importer le fichier CSS global
import './assets/styles.css';  // Assure-toi que le chemin est correct

createApp(App).use(router).mount('#app');

