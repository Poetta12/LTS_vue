<script setup>
import {ref} from 'vue'; // On importe la fonction ref depuis Vue pour gérer les données réactives
import axios from '../axios'; // On importe axios pour faire des requêtes HTTP. Assure-toi que le chemin vers le fichier axios est correct
import {useRouter} from 'vue-router'; // On importe useRouter pour gérer la navigation après la soumission du formulaire

// On définit les données du formulaire sous forme de référence réactive
const form = ref({
  name: '', // Prénom de l'utilisateur
  lastname: '', // Nom de l'utilisateur
  birthday: '', // Date de naissance de l'utilisateur
  gender: '', // Genre de l'utilisateur, M ou F
  phone: '', // Numéro de téléphone de l'utilisateur
  address: '', // Adresse principale de l'utilisateur
  address2: '', // Adresse complémentaire de l'utilisateur (facultatif)
  zipcode: '', // Code postal de l'utilisateur
  town: '', // Ville de l'utilisateur
  country: '', // Pays de l'utilisateur
  email: '', // Adresse email de l'utilisateur
  password: '', // Mot de passe de l'utilisateur
  password_confirmation: '' // Confirmation du mot de passe
});

const error = ref(''); // Variable pour stocker les messages d'erreur

// On crée une instance du routeur pour pouvoir naviguer vers d'autres pages après la soumission du formulaire
const router = useRouter();

// Fonction pour gérer l'inscription de l'utilisateur
const register = async () => {
  try {
    // On prépare les données à envoyer en clonant les données du formulaire
    const dataToSend = {...form.value};

    // On envoie les données au serveur en utilisant axios
    const response = await axios.post('/users', dataToSend);
    alert('Inscription réussie !'); // On affiche une alerte pour indiquer que l'inscription a réussi
    router.push('/login'); // On redirige l'utilisateur vers la page de connexion après une inscription réussie
  } catch (err) {
    if (err.response && err.response.status === 422) {
      // Si le serveur renvoie une erreur de validation (erreur 422), on extrait les messages d'erreur et on les affiche
      error.value = Object.values(err.response.data.errors).flat().join(', ');
    } else {
      // Sinon, on affiche un message d'erreur générique
      error.value = 'Erreur lors de l\'inscription. Veuillez vérifier vos informations.';
    }
    console.error(err); // On affiche l'erreur dans la console pour le débogage
  }
};
</script>

<template>
  <div class="container">
    <h1>Inscription</h1>
    <!-- Formulaire d'inscription -->
    <form @submit.prevent="register">
      <div class="form-group">
        <input v-model="form.name" type="text" id="name" placeholder="Prénom" required/> <!-- Champ pour le prénom -->
      </div>
      <div class="form-group">
        <input v-model="form.lastname" type="text" id="lastname" placeholder="Nom" required/> <!-- Champ pour le nom -->
      </div>
      <div class="form-group">
        <input v-model="form.birthday" type="date" id="birthday" placeholder="Date de naissance" required/>
        <!-- Champ pour la date de naissance -->
      </div>
      <div class="form-group radio-group">
        <label>Genre</label>
        <div>
          <label>
            <input v-model="form.gender" type="radio" value="M" required/> <!-- Radio bouton pour le genre masculin -->
            Masculin
          </label>
          <label>
            <input v-model="form.gender" type="radio" value="F" required/> <!-- Radio bouton pour le genre féminin -->
            Féminin
          </label>
        </div>
      </div>
      <div class="form-group">
        <input v-model="form.phone" type="tel" id="phone" placeholder="Téléphone" required/>
        <!-- Champ pour le téléphone -->
      </div>
      <div class="form-group">
        <input v-model="form.address" type="text" id="address" placeholder="Adresse" required/>
        <!-- Champ pour l'adresse principale -->
      </div>
      <div class="form-group">
        <input v-model="form.address2" type="text" id="address2" placeholder="Adresse complémentaire"/>
        <!-- Champ pour l'adresse complémentaire -->
      </div>
      <div class="form-group">
        <input v-model="form.zipcode" type="text" id="zipcode" placeholder="Code postal" required/>
        <!-- Champ pour le code postal -->
      </div>
      <div class="form-group">
        <input v-model="form.town" type="text" id="town" placeholder="Ville" required/> <!-- Champ pour la ville -->
      </div>
      <div class="form-group">
        <input v-model="form.country" type="text" id="country" placeholder="Pays" required/> <!-- Champ pour le pays -->
      </div>
      <div class="form-group">
        <input v-model="form.email" type="email" id="email" placeholder="Email" required/> <!-- Champ pour l'email -->
      </div>
      <div class="form-group">
        <input v-model="form.password" type="password" id="password" placeholder="Mot de passe" required/>
        <!-- Champ pour le mot de passe -->
      </div>
      <div class="form-group">
        <input v-model="form.password_confirmation" type="password" id="password_confirmation"
               placeholder="Confirmer le mot de passe" required/> <!-- Champ pour confirmer le mot de passe -->
      </div>
      <button type="submit">S'inscrire</button> <!-- Bouton pour soumettre le formulaire -->
      <div v-if="error" class="error">{{ error }}</div> <!-- Affichage du message d'erreur si il y en a -->
    </form>
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  max-width: 900px;
  width: 90%;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

input,
select, .radio-group {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  box-sizing: border-box;
  font-size: 1rem;
}

.radio-group, .radio-group > div, .radio-group > div > label {
  display: flex !important;
  flex-direction: row;
  justify-content: space-between;;
}

.radio-group > div {
  width: 50%;
}

input::placeholder {
  color: #888;
}

button {
  grid-column: span 2;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 0.25rem;
  margin-top: 1rem;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  grid-column: span 2;
  margin-top: 1rem;
}
</style>
