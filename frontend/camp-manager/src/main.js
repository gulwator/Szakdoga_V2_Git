import { createApp, ref } from "vue";
import store from "./store";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "vue-router";
import router from "./routes";

//TODO:Localhost hozzáférést kiszervezni dotenv fájlba
const app = createApp(App);

app.use(Toast).use(router).use(store);

app.mount("#app");

// createApp(App).mount("#app");
