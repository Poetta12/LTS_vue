<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from './stores/authStore';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

const authStore = useAuthStore();

onMounted(() => {
  authStore.checkAuth();
});
</script>

<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

footer {
  margin-top: auto; /* Pousse le footer en bas */
}
</style>
