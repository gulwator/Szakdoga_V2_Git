import { createApp, ref } from "vue";
import { createStore } from "vuex";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "vue-router";
import router from "./routes";
const store = createStore({
  state() {
    return { role: "null" };
  },
  mutations: {
    changeRoleToAdmin(state) {
      state.role = "admin";
    },
    changeRoleToNone(state) {
      state.role = "null";
    },
    changeRoleToKisero(state) {
      state.role = "kisero";
    },
  },
});

const app = createApp(App);

app.use(Toast).use(router).use(store);

app.mount("#app");

// createApp(App).mount("#app");
