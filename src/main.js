import { createApp } from 'vue'; // Import Vue
import App from './App.vue'; // Import the root component
import router from './router'; // Import the router
import { createPinia } from 'pinia'; // Import Pinia
import './assets/main.css'; // Import global styles

import Toast, { POSITION } from 'vue-toastification'; // Import Toastification and options
import 'vue-toastification/dist/index.css'; // Import styles needed for Toastification

const app = createApp(App); // Create the Vue application

const pinia = createPinia(); // Create a Pinia instance

app.use(pinia); // Use Pinia in the Vue application
app.use(router); // Configure the router

// Configure Toastification with options (optional)
app.use(Toast, {
    position: POSITION.TOP_RIGHT, // Set notification position
    timeout: 5000, // Duration before notification disappears automatically
    closeOnClick: true, // Close notification on click
    pauseOnFocusLoss: true, // Pause notification disappearance if window loses focus
    pauseOnHover: true, // Pause notification disappearance on hover
    draggable: true, // Allow dragging notification
    draggablePercent: 0.6, // Percentage from which notification can be dragged
    showCloseButtonOnHover: false, // Show close button on hover
    hideProgressBar: false, // Hide progress bar
    closeButton: 'button', // Type of close button
    icon: true, // Show icon
});

app.mount('#app'); // Mount Vue application on element with ID #app
