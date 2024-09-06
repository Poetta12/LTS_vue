<script setup>
import { defineProps } from 'vue';
import axios from '../axios';

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  cartId: {
    type: Number,
    required: true
  },
  apiUrl: {
    type: String,
    required: true
  }
});

const addToCart = async (productId) => {
  try {
    const userId = localStorage.getItem('user_id');
    await axios.post('/carts/add-product', {
      quantity: 1, // Quantité par défaut à 1
      user_id: userId // Inclure user_id ici
    });
    alert('Produit ajouté au panier !');
  } catch (error) {
    console.error('Erreur lors de l\'ajout au panier :', error.response.data);
    alert('Erreur lors de l\'ajout au panier : ' + error.response.data.message);
  }
};

</script>

<template>
  <img :src="`${apiUrl}/${product.image}`" :alt="`Image ${product.nom}`" class="product-image"/>
  <div class="product-details">
    <h2 class="product-name">{{ product.nom }}</h2>
    <p class="product-description">{{ product.description }}</p>
    <div class="product-info">
      <p class="product-price">Prix : {{ product.prix }} EUR</p>
      <p class="product-quantity">Quantité : {{ product.quantite }}</p>
    </div>
    <button @click="addToCart(product.id)">Ajouter au panier</button>
  </div>
</template>

<style scoped>
/* Styles ici */
</style>
