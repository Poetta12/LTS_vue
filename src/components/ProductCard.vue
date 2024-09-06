<script setup>
import { defineProps } from 'vue';
import axios from '../axios';

// définition des propriétés (props) que le composant accepte. Ici, deux props sont définies : "product" et "apiUrl".
const props = defineProps({
  product: {
    type: Object, // "product" doit être un objet
    required: true // cette prop est obligatoire
  },
  apiUrl: {
    type: String, // "apiUrl" doit être une chaîne de caractères
    required: true // cette prop est obligatoire
  }
});

// fonction pour ajouter le produit au panier
const addToCart = async (productRef) => {
  try {
    await axios.post('/carts/add-product', { produit_id: productRef, quantity: 1 });
    alert('Produit ajouté au panier !');
  } catch (error) {
    console.error('Erreur lors de l\'ajout au panier:', error.response?.data?.message || error.message);
    alert('Erreur lors de l\'ajout au panier : ' + (error.response?.data?.message || 'Erreur inconnue'));
  }
};

</script>

<template>
  <!-- affiche l'image du produit avec une URL dynamique en utilisant "apiUrl" et "product.image" -->
  <img :src="`${apiUrl}/${product.image}`" :alt="`Image ${product.nom}`" class="product-image" />

  <!-- section contenant les détails du produit -->
  <div class="product-details">
    <!-- nom du produit -->
    <h2 class="product-name">{{ product.nom }}</h2>

    <!-- description du produit -->
    <p class="product-description">{{ product.description }}</p>

    <!-- informations supplémentaires comme le prix et la quantité -->
    <div class="product-info">
      <!-- prix du produit -->
      <p class="product-price">Prix : {{ product.prix }} EUR</p>

      <!-- quantité du produit disponible -->
      <p class="product-quantity">Quantité : {{ product.quantite }}</p>
    </div>

    <!-- bouton pour ajouter le produit au panier, déclenche la fonction addToCart avec l'ID du produit -->
    <button @click="addToCart(product.id)">Ajouter au panier</button>
  </div>
</template>


<style scoped>
.product-details button {
  margin: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #007BFF;
  color: white;
  cursor: pointer;
}
.product-card button:hover {
  background-color: #0056b3;
}

.product-image {
  width: 100%; /* L'image prend toute la largeur disponible */
  height: 200px; /* Hauteur fixe pour uniformiser les images */
  object-fit: cover; /* Couvrir l'espace sans déformer l'image */
}

.product-details {
  padding: 1rem; /* Espacement interne autour des détails */
}

.product-name {
  font-size: 1.25rem; /* Taille de la police pour le nom du produit */
  margin: 0; /* Supprimer les marges par défaut */
}

.product-description {
  font-size: 0.875rem; /* Taille de la police pour la description */
  color: #666; /* Couleur de texte gris clair pour la description */
}

.product-info {
  display: flex; /* Disposer les informations horizontalement */
  justify-content: space-between; /* Espacer les éléments de manière égale */
  margin-top: 0.5rem; /* Espacement au-dessus des informations */
}

.product-price {
  font-weight: bold; /* Mettre le prix en gras */
}

.product-quantity {
  color: #888; /* Couleur de texte gris pour la quantité */
}
</style>
