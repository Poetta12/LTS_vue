<script setup>
import { defineProps } from 'vue';
import ProductCard from '../components/ProductCard.vue';
const apiUrl = import.meta.env.VITE_API_URL

// Définir les propriétés (props) que le composant va recevoir
const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  apiUrl: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="product-card">
   <ProductCard :product="product" :apiUrl="apiUrl"/>
  </div>
</template>

<style scoped>
/* Styles pour la carte du produit */
.product-card {
  border: 1px solid #ddd; /* Bordure légère autour de la carte */
  border-radius: 8px; /* Coins arrondis pour un effet plus doux */
  overflow: hidden; /* Masquer les débordements pour des coins arrondis */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Ombre portée pour un effet de profondeur */
  display: flex;
  flex-direction: column; /* Disposer les éléments verticalement */
  transition: transform 0.3s; /* Effet de transition lors du survol */
  max-width: 300px; /* Largeur maximale pour la carte du produit */
}

.product-card:hover {
  transform: scale(1.02); /* Agrandir légèrement la carte lors du survol */
}
</style>
