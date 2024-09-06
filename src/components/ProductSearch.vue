<script setup>
import { defineEmits, defineProps } from 'vue';

/**
 * Déclaration des événements que le composant peut émettre. Ici, on déclare un événement 'update:searchQuery'
 * qui sera déclenché chaque fois que la valeur de recherche change. Cela permet au composant parent d'être
 * informé des mises à jour de la recherche.
 *
 * @type {EmitFn<string[]>}
 */
const emit = defineEmits(['update:searchQuery']);

/**
 * Déclaration des propriétés (props) que le composant peut recevoir. Ici, le composant reçoit une prop
 * appelée 'searchQuery', qui est de type String. On définit une valeur par défaut vide pour cette prop.
 *
 * @type {Prettify<Readonly<ExtractPropTypes<{searchQuery: {default: string, type: StringConstructor}}>>>}
 */
const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  }
});

/**
 * Création de la fonction handleInput qui sera appelée chaque fois que l'utilisateur tape quelque chose dans
 * le champ de recherche. Cette fonction récupère la valeur actuelle du champ de saisie et déclenche l'événement
 * 'update:searchQuery' en passant cette nouvelle valeur. Cela permet de mettre à jour la valeur de recherche
 * dans le composant parent.
 *
 * @param event - L'événement d'entrée contenant la valeur actuelle du champ de recherche.
 */
const handleInput = (event) => {
  emit('update:searchQuery', event.target.value);
};
</script>

<template>
  <!-- Création d'un conteneur pour la barre de recherche avec une classe CSS 'search-container' pour la styliser facilement -->
  <div class="search-container">
    <!-- Champ de saisie pour la recherche, lié à la prop 'searchQuery' du composant parent avec la directive :value.
         On écoute les changements dans le champ avec @input pour appeler la fonction handleInput chaque fois que
         l'utilisateur tape quelque chose. -->
    <input
        :value="searchQuery"
        @input="handleInput"
        type="text"
        placeholder="Rechercher un produit..."
        class="search-input"
    />
  </div>
</template>

<style scoped>
/* J'ai ajouté un peu de marge en bas du conteneur pour espacer la barre de recherche des autres éléments */
.search-container {
  margin-bottom: 1rem;
}

/* J'ai stylisé le champ de saisie pour qu'il prenne toute la largeur disponible, avec un padding pour le rendre plus agréable à utiliser, et une bordure et un ombrage léger pour le rendre visuellement attrayant. */
.search-input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
