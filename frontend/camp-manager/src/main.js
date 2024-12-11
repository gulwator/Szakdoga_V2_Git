import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "vue-router";
import router from "./routes";

const app = createApp(App);
app.use(router);
app.mount("#app");

// createApp(App).mount("#app");
