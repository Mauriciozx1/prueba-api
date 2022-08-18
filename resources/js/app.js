import './bootstrap';
import '../sass/app.scss'
import Router from './router.js'
import store from './store/index.js'
import { createApp } from 'vue';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const options = {};
const app = createApp({});

//Herramientas que utilizara el frontend
app.use(Router);
app.use(store);
app.use(Toast, options);
app.use(VueSweetalert2);

app.mount('#app');
