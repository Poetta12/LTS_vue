<script setup>
import { ref } from 'vue';
import axios from '../axios'; // Assurez-vous que axios est correctement configuré
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../stores/authStore';

const form = ref({
  email: '',
  password: '',
});

const error = ref('');
const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

const login = async () => {
  try {
    const response = await axios.post('/login', form.value);
    const token = response.data.token;
    localStorage.setItem('auth_token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    authStore.login(response.data.user, token); // Mettez à jour le store d'authentification
    toast.success('Connexion réussie!');
    router.push('/products');
  } catch (err) {
    error.value = 'Erreur lors de la connexion: ' + (err.response ? err.response.data.message : err.message);
    console.error('Login error:', err);
  }
};
</script>


<template>
  <div>
    <h1>Connexion</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="form.email" type="email" id="email" required/>
      </div>
      <div class="form-group">
        <label for="password">Mot de passe:</label>
        <input v-model="form.password" type="password" id="password" required/>
      </div>
      <button type="submit">Se connecter</button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<style scoped>
/* Styles pour le formulaire de connexion */
div {
  margin: 0 auto;
  max-width: 900px;
  width: 50%;
  padding: 1rem;
}

h1 {
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 0.25rem;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>

