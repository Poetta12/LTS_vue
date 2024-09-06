import axios from 'axios';
import { useAuthStore } from './stores/authStore';

// Créez une instance Axios avec des configurations par défaut
const instance = axios.create({
  baseURL: 'http://localhost:8000/api', //
});

// Configurez Axios pour inclure le token d'authentification dans les en-têtes de toutes les requêtes
const token = localStorage.getItem('auth_token');
if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Intercepteur pour gérer les erreurs 401 (non autorisé)
instance.interceptors.response.use(
  response => response,
  error => {
    const authStore = useAuthStore();
    if (error.response && error.response.status === 401) {
      // Non autorisé, déconnecter l'utilisateur et rediriger vers la page de connexion
      authStore.logout();
    }
    return Promise.reject(error);
  }
);

// Exporte l'instance configurée
export default instance;
