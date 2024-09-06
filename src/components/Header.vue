<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import LogoutBtn from './LogoutBtn.vue';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
const router = useRouter();

const checkAuthentication = () => {
  authStore.checkAuthentication();
};

onMounted(() => {
  checkAuthentication();
});

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};

watch(() => authStore.isAuthenticated, (newValue) => {
  if (!newValue) {
    router.push('/login');
  }
});
</script>

<template>
  <header>
    <h1>ESHOP LARAVEL / VUE</h1>
    <div class="navBlock">
      <nav>
        <router-link v-if="!authStore.isAuthenticated" class="nav-link" to="/">Register</router-link>
        <router-link v-if="!authStore.isAuthenticated" class="nav-link" to="/login">Login</router-link>
        <router-link v-if="authStore.isAuthenticated" class="nav-link" to="/products">Catalogue</router-link>
        <router-link v-if="authStore.isAuthenticated" class="nav-link" to="/cart">Panier</router-link>
        <router-link v-if="authStore.isAuthenticated" class="nav-link" to="/dashboard">Dashboard</router-link>
        <router-link v-if="authStore.isAuthenticated" class="nav-link" to="/profile">Profile</router-link>
      </nav>
      <LogoutBtn v-if="authStore.isAuthenticated" @logout="handleLogout" />
    </div>
  </header>
</template>

<style scoped>
nav {
  width: 100%;
  display: flex;
  align-items: center;
}

.navBlock {
  display: flex;
  align-items: center;
}

.nav-link {
  margin-right: 30px;
  text-decoration: none;
  color: #999;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: color 0.3s, background-color 0.3s;
}

.nav-link:hover {
  color: #fff;
  background-color: #007bff;
}

.nav-link.active {
  font-weight: bold;
  color: #007bff;
}
</style>
