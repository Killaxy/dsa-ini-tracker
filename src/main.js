import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import en from "./locales/en.json";
import de from "./locales/de.json";

const messages = {
    en, de
}

const i18n = createI18n({
    locale: navigator.language.split('-')[0], // set locale
    fallbackLocale: 'en', // set fallback locale
    messages,
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')