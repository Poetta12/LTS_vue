<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from '../axios';
import ProductCard from '../components/ProductCard.vue';
import { useAuthStore } from '../stores/authStore';

const apiUrl = import.meta.env.VITE_API_URL;

const route = useRoute();
const product = ref({});
const error = ref('');
const authStore = useAuthStore();

const fetchProductDetail = async () => {
  try {
    const { id } = route.params;
    const response = await axios.get(`/products/${id}`);
    product.value = response.data;
  } catch (err) {
    error.value = 'Erreur lors de la récupération des détails du produit. Veuillez réessayer plus tard.';
    console.error('Erreur lors de la récupération des produits:', err.response ? err.response.data : err.message);
  }
};

onMounted(() => {
  if (authStore.isAuthenticated) {
    fetchProductDetail();
  } else {
    error.value = 'Vous devez être connecté pour voir les détails du produit.';
  }
});
</script>

<template>
  <div class="product-detail">
    <button class="btn-back" @click="$router.go(-1)">Retour</button>
    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-else class="product-container">
      <ProductCard :product="product" :apiUrl="apiUrl"/>
    </div>
  </div>
</template>

<style scoped>
.product-detail {
  padding: 2rem;
}

.product-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 900px;
  margin: auto;
}

.error-message {
  color: red;
}

.btn-back {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 1rem;
}

.btn-back:hover {
  background-color: #0056b3;
}

.btn-back:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>
