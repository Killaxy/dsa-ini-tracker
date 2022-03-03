import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App).mount('#app')

window.app = app; // Only for debug reasons, delete on build