<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from '../axios';
import ProductSearch from '../components/ProductSearch.vue';
import ProductItem from '../components/ProductItem.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const products = ref([]);
const searchQuery = ref('');
const loading = ref(true);
const router = useRouter();
const authStore = useAuthStore();

const fetchProducts = async () => {
  try {
    if (authStore.isAuthenticated) {
      const response = await axios.get('/products');
      products.value = response.data;
    } else {
      router.push('/login');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error.response ? error.response.data : error.message);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (authStore.isAuthenticated) {
    fetchProducts();
  } else {
    router.push('/login');
  }
});

const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) {
    return products.value;
  }
  return products.value.filter(product =>
      product.nom.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const navigateToDetail = (productId) => {
  router.push({ name: 'product-detail', params: { id: productId } });
};
</script>


<template>
  <div class="catalogue-container">
    <header class="catalogue-header">
      <h1>Catalogue des Produits</h1>
      <ProductSearch
          :searchQuery="searchQuery"
          @update:searchQuery="searchQuery = $event"
      />
    </header>
    <main class="catalogue-main">
      <div v-if="loading" class="loading">Chargement...</div>
      <div v-else-if="filteredProducts.length === 0" class="no-products">Aucun produit trouvé.</div>
      <div v-else class="product-grid">
        <ProductItem
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            @click="navigateToDetail(product.id)"
        />
      </div>
    </main>
  </div>
</template>

<style scoped>
.catalogue-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.catalogue-header {
  text-align: center;
  margin-bottom: 2rem;
}

.catalogue-main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading, .no-products {
  font-size: 1.25rem;
  color: #666;
}

.product-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  width: 100%;
}
</style>
