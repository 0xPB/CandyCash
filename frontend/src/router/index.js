import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import InvestmentPage from '@/views/InvestmentPage.vue';
import StatisticsPage from '@/views/StatisticsPage.vue';
import LiveStockPricePage from '@/views/LiveStockPricePage.vue';
import CryptoIndicatorsPage from '@/views/CryptoIndicatorsPage.vue';


const routes = [
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/investment', component: InvestmentPage },
  { path: '/statistics', component: StatisticsPage },
  {
    path: '/live-price',
    name: 'LiveStockPrice',
    component: LiveStockPricePage,
  },
  {
    path: '/crypto-indicators',
    name: 'CryptoIndicators',
    component: CryptoIndicatorsPage,
  },
  { path: '/crypto-indicators', name: 'CryptoIndicators', component: CryptoIndicatorsPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
