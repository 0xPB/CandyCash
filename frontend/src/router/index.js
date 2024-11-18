import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import InvestmentPage from '@/views/InvestmentPage.vue';
import StatisticsPage from '@/views/StatisticsPage.vue';
import LiveStockPricePage from '@/views/LiveStockPricePage.vue';
import CryptoIndicatorsPage from '@/views/CryptoIndicatorsPage.vue';
import PreciousMetals from '@/views/PreciousMetals.vue';
import EditInvestments from '@/views/EditInvestments.vue';

const routes = [
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/investment', component: InvestmentPage },
  { path: '/statistics', component: StatisticsPage },
  { path: '/live-price', name: 'LiveStockPrice', component: LiveStockPricePage },
  { path: '/indicators', name: 'Indicators', component: CryptoIndicatorsPage },
  { path: '/precious-metals', name: 'Precious Metals', component: PreciousMetals },
  { path: '/precious-metals', name: 'Precious Metals', component: PreciousMetals },
  { path: '/edit-invest', name: 'Edit Investments', component: EditInvestments },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;