// services/apiService.js
import axios from 'axios';

// Configurez l'instance Axios si nécessaire
const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Ajustez en fonction de votre baseURL
});

export async function fetchUserProfile() {
    try {
        const response = await api.get('/user/profile');
        return response.data; // Données utilisateur
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
}
