<script setup>
import InvestmentsTable from '@/components/InvestmentsTable.vue';
import InvestmentsPieChart from '@/components/InvestmentsPieChart.vue';
import InvestmentsBarChart from '@/components/InvestmentsBarChart.vue';
import InvestmentsLineChart from '@/components/InvestmentsLineChart.vue';
</script>

<template>
  <div>
    <InvestmentsTable />
    <InvestmentsPieChart />
    <InvestmentsBarChart />
    <InvestmentsLineChart />
  </div>
</template>
