// stores/authStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

// Intercepteur global pour gérer les erreurs
axios.interceptors.response.use(
  response => response,
  error => {
      if (error.response && error.response.status === 401) {
          // Redirection ou gestion spécifique pour les erreurs 401
          const authStore = useAuthStore();
          authStore.logout();
          router.push('/login');
      }
      return Promise.reject(error);
  }
);

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        user: null,
    }),
    actions: {
        checkAuthentication() {
            const token = localStorage.getItem('auth_token');
            this.isAuthenticated = !!token;
            if (this.isAuthenticated) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } else {
                delete axios.defaults.headers.common['Authorization'];
            }
        },
        login(user, token) {
            this.isAuthenticated = true;
            this.user = user;
            localStorage.setItem('auth_token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        },
        logout() {
            this.isAuthenticated = false;
            this.user = null;
            localStorage.removeItem('auth_token');
            delete axios.defaults.headers.common['Authorization'];
        },
        async checkAuth() {
            try {
                const token = localStorage.getItem('auth_token');
                if (token) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const response = await axios.get('/auth/check');
                    this.isAuthenticated = response.status === 200;
                    if (this.isAuthenticated) {
                        this.user = response.data.user;
                    }
                } else {
                    this.isAuthenticated = false;
                }
            } catch (error) {
                console.error('Erreur lors de la vérification de l\'authentification:', error);
                this.logout();
            }
        },
        async fetchUserProfile() {
            try {
                const response = await axios.get('/user/profile');
                return response.data;
            } catch (error) {
                if (error.response) {
                    console.error('Erreur du serveur:', error.response.data);
                } else if (error.request) {
                    console.error('Erreur réseau:', error.request);
                } else {
                    console.error('Erreur:', error.message);
                }
                throw error;
            }
        },
        async loadUserProfile() {
            try {
                this.user = await this.fetchUserProfile();
            } catch (error) {
                console.error('Erreur lors de la récupération du profil utilisateur:', error);
            }
        }
    }
});
