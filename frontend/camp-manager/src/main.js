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
// enable sending cookies with requests
axios.defaults.withCredentials = true;

// fetch profile on startup to populate auth state (cookie-based)
axios
  .get(`${import.meta.env.VITE_API_BASE_URL}/profile`)
  .then((resp) => {
    if (resp.data && resp.data.role)
      store.dispatch("changeRole", resp.data.role);
    if (resp.data && resp.data.institutionId)
      store.dispatch("changeInstitution", resp.data.institutionId);
  })
  .catch(() => {
    // no-op if not authenticated
  });
// createApp(App).mount("#app");
