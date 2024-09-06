<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from '../axios'; // Assurez-vous que axios est correctement configuré
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../stores/authStore'; // Assurez-vous d'importer le store

const authStore = useAuthStore(); // Utilisation du store Pinia
const router = useRouter();
const toast = useToast();
const error = ref('');

const checkAuthentication = async () => {
  await authStore.checkAuthentication(); // Utiliser la méthode du store pour vérifier l'authentification
};

onMounted(() => {
  checkAuthentication();
});

watch(() => authStore.isAuthenticated, (newValue) => {
  if (!newValue) {
    router.push('/login');
  }
}, { immediate: true }); // Ajoutez `immediate: true` pour la redirection immédiate si non authentifié

const logout = async () => {
  try {
    const response = await axios.post('/logout'); // Assurez-vous que l'URL est correcte
    if (response.status === 200) {
      // Appeler la méthode logout du store pour mettre à jour l'état global
      authStore.logout();

      toast.success('Déconnexion réussie!');
      router.push('/login');
    } else {
      throw new Error('Erreur lors de la déconnexion du serveur');
    }
  } catch (err) {
    error.value = 'Erreur lors de la déconnexion.';
    toast.error('Erreur lors de la déconnexion.');
    console.error('Logout error:', err);
  }
};
</script>

<template>
  <div class="container">
    <button class="logout-button" @click="logout">Logout</button>
    <div v-if="authStore.isAuthenticated">
      <p>Bonjour, {{ authStore.user?.name }}</p>
    </div>
    <div v-else>
      <p>Vous n'êtes pas connecté.</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 1rem;
  display: flex;
  justify-content: end;
  width: 100%;
}

.logout-button {
  background-color: #f56c6c; /* Couleur de fond rouge clair */
  color: white; /* Couleur du texte */
  border: none; /* Supprimer les bordures par défaut */
  border-radius: 4px; /* Coins arrondis */
  padding: 10px 20px; /* Espacement interne */
  margin-right: 20px;
  font-size: 16px; /* Taille de la police */
  cursor: pointer; /* Changer le curseur en main */
  transition: background-color 0.3s, transform 0.3s; /* Effet de transition */
}

.logout-button:hover {
  background-color: #d43f3a; /* Couleur de fond plus foncée au survol */
  transform: scale(1.05); /* Agrandir légèrement le bouton */
}

.logout-button:active {
  background-color: #b52b25; /* Couleur de fond encore plus foncée lors du clic */
}
</style>
