import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import './style.css';
import VueCookies from 'vue-cookies';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

loadFonts();
const app = createApp(App);
app.use(vuetify);
app.use(Toast);
app.mount('#app');
