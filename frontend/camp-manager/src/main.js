import { createApp } from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "vue-router";
import router from "./routes";

const app = createApp(App);
app.use(Toast).use(router);
app.mount("#app");

// createApp(App).mount("#app");
