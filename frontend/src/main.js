import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Assurez-vous que votre router est configuré correctement
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');




