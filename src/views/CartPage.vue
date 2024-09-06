<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from '../axios';

const cartItems = ref([]);
const loading = ref(true);

const fetchCartItems = async () => {
  try {
    const response = await axios.get('/cart-items');
    cartItems.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des articles du panier:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchCartItems);

const total = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    return sum + (item.produit.prix || 0) * (item.quantity || 0);
  }, 0);
});
</script>

<template>
  <div class="cart-page">
    <h1>Mon Panier</h1>
    <div v-if="loading">Chargement...</div>
    <div v-else-if="cartItems.length === 0">Votre panier est vide.</div>
    <div v-else>
      <ul>
        <li v-for="item in cartItems" :key="item.id">
          <h2>{{ item.produit.nom }}</h2>
          <p>Prix : {{ item.produit.prix }} EUR</p>
          <p>Quantité : {{ item.quantity }}</p>
        </li>
      </ul>
      <h3>Total : {{ total }} EUR</h3>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  padding: 2rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  border-bottom: 1px solid #ddd;
  padding: 1rem 0;
}
</style>
