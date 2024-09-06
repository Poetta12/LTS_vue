import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductList from '../views/ProductList.vue';
import ProductDetail from '../views/ProductDetail.vue';
import CartDetail from '../views/CartPage.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Profile from '../views/Profile.vue';
import { useAuthStore } from '../stores/authStore';
import { storeToRefs } from 'pinia'; // Pour accéder facilement aux données du store

const routes = [
  {
    path: '/',
    name: 'register',
    component: Register,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/products',
    name: 'product-list',
    component: ProductList,
    meta: { requiresAuth: true }
  },
  {
    path: '/products/:id',
    name: 'product-detail',
    component: ProductDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/cart/:id',
    name: 'cart-detail',
    component: CartDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Gérer les redirections en fonction de l'authentification
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const { isAuthenticated } = storeToRefs(authStore);

  // Assurer que le store est synchronisé avec le localStorage
  await authStore.checkAuthentication();

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next('/login'); // Redirige vers login si non authentifié
  } else if (to.path === '/login' && isAuthenticated.value) {
    next('/login'); // Si l'utilisateur est déjà connecté, rediriger vers le dashboard
  } else {
    next(); // Continuer vers la route demandée
  }
});

export default router;
