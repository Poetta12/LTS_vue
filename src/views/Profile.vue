<template>
  <div class="profile">
    <h1>Mon Profil</h1>
    <form @submit.prevent="updateProfile">
      <div class="form-group">
        <label for="name">Nom :</label>
        <input type="text" id="name" v-model="user.name" class="form-control" />
      </div>
      <div class="form-group">
        <label for="email">Email :</label>
        <input type="email" id="email" v-model="user.email" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Mettre à jour</button>
    </form>
    <button @click="changePassword" class="btn btn-secondary">Changer le mot de passe</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '../axios'; // Assurez-vous que ce chemin est correct
import { useToast } from 'vue-toastification'; // Pour les notifications

const user = ref({
  name: '',
  email: ''
});

const toast = useToast();

const fetchProfile = async () => {
  try {
    const response = await axios.get('/user/profile');
    user.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données du profil:', error);
  }
};

const updateProfile = async () => {
  try {
    await axios.put('/user/profile', user.value);
    toast.success('Profil mis à jour avec succès !');
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    toast.error('Erreur lors de la mise à jour du profil.');
  }
};

const changePassword = () => {
  // Implémentez ici la logique pour changer le mot de passe
  toast.info('Cette fonctionnalité est en développement.');
};

onMounted(() => {
  fetchProfile();
});
</script>

<style scoped>
/* Styles de base pour la page de profil */
.profile {
  max-width: 600px;
  width: 100%;
  margin: 0 auto 50px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h1 {
  color: #999;
  font-size: 24px;
  margin-bottom: 1rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  color: #999;
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.form-group .form-control {
  width: calc(100% - 1rem); /* Ajuste la largeur pour éviter le débordement */
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  display: inline-block;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>
