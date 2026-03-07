import { createApp, ref } from "vue";
import store from "./store";
import Toast from "vue-toastification";

import "vue-toastification/dist/index.css";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "vue-router";
import router from "./routes";
import axios from "axios";

//TODO:Localhost hozzáférést kiszervezni dotenv fájlba
console.log(import.meta.env.VITE_API_BASE_URL);
const app = createApp(App);

app.use(Toast).use(router).use(store);

app.mount("#app");

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const institution = localStorage.getItem("institution");
if (token) store.dispatch("changeToken", token);
if (role) store.dispatch("changeRole", role);
if (institution) store.dispatch("changeInstitution", institution);
// createApp(App).mount("#app");
