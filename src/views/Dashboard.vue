<template>
  <div>
    <h1>Tableau de Bord</h1>
    <div class="summary">
      <div class="widget">
        <h2>Utilisateurs</h2>
        <p>{{ userCount }}</p>
      </div>
      <div class="widget">
        <h2>Ventes</h2>
        <p>{{ salesTotal }}</p>
      </div>
      <!-- Ajoutez plus de widgets ici -->
    </div>
    <div class="charts">
      <!-- Graphiques ou autres représentations visuelles -->
      <line-chart :data="salesData"></line-chart>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '../axios'; // Assurez-vous que axios est configuré

const userCount = ref(0);
const salesTotal = ref(0);
const salesData = ref([]);

onMounted(async () => {
  try {
    const userResponse = await axios.get('/users/count');
    userCount.value = userResponse.data.count;

    const salesResponse = await axios.get('/sales/total');
    salesTotal.value = salesResponse.data.total;

    const salesChartResponse = await axios.get('/sales/chart-data');
    salesData.value = salesChartResponse.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données du dashboard:', error);
  }
});
</script>

<style scoped>
.summary {
  display: flex;
  gap: 1rem;
}

.widget {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 200px;
}
</style>
