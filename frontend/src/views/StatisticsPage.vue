<script setup>
import InvestmentsTable from '@/components/InvestmentsTable.vue';
import InvestmentsPieChart from '@/components/InvestmentsPieChart.vue';
import InvestmentsBarChart from '@/components/InvestmentsBarChart.vue';
import InvestmentsLineChart from '@/components/InvestmentsLineChart.vue';
import PNL from '@/components/PNL.vue';
import ProfitLossChart from '@/components/ProfitLossChart.vue';
</script>

<template>
  <div>
    <InvestmentsTable />
    <InvestmentsPieChart />
    <InvestmentsBarChart />
    <InvestmentsLineChart />
    <PNL />
    <ProfitLossChart />
  </div>
</template>
