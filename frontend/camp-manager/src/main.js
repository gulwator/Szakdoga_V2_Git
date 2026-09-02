import { createApp } from "vue";
import store from "./store";
import Toast from "vue-toastification";

import "vue-toastification/dist/index.css";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "vue-router";
import router from "./routes";
import axios from "axios";

const app = createApp(App);

axios.defaults.withCredentials = true;

const getCsrfToken = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/csrf`,
      {
        withCredentials: true,
      },
    );
    const csrfToken = response.data.csrfToken;
    store.dispatch("changeCsrfToken", csrfToken);
    return csrfToken;
  } catch (error) {
    console.error("Unable to load CSRF token", error);
    return null;
  }
};

axios.interceptors.request.use(
  (config) => {
    const token = store.state.token;
    const csrfToken = store.state.csrfToken;
    if (
      token &&
      token !== "null" &&
      config.headers &&
      !config.url?.includes("/login") &&
      !config.url?.includes("/refresh") &&
      !config.url?.includes("/logout")
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (
      config.headers &&
      (config.url?.includes("/refresh") || config.url?.includes("/logout")) &&
      csrfToken
    ) {
      config.headers["X-CSRF-Token"] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/refresh")
    ) {
      originalRequest._retry = true;
      try {
        const csrfToken = await getCsrfToken();
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/refresh`,
          {},
          {
            withCredentials: true,
            headers: {
              "X-CSRF-Token": csrfToken,
            },
          },
        );
        const newToken = refreshResponse.data.token;
        store.dispatch("changeToken", newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        store.dispatch("changeToken", null);
        store.dispatch("changeCsrfToken", null);
        store.dispatch("changeRole", "null");
        store.dispatch("changeInstitution", "null");
        store.dispatch("changeUser", null);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

app.use(Toast).use(router).use(store);

const storedToken = localStorage.getItem("token");
const storedRole = localStorage.getItem("role");
const storedInstitution = localStorage.getItem("institution");
const storedUser = localStorage.getItem("user");

if (storedToken) store.dispatch("changeToken", storedToken);
if (storedRole) store.dispatch("changeRole", storedRole);
if (storedInstitution) store.dispatch("changeInstitution", storedInstitution);
if (storedUser) store.dispatch("changeUser", JSON.parse(storedUser));

const clearAuthState = () => {
  store.dispatch("changeToken", null);
  store.dispatch("changeCsrfToken", null);
  store.dispatch("changeRole", "null");
  store.dispatch("changeInstitution", "null");
  store.dispatch("changeUser", null);
};

const hasStoredSession = Boolean(
  storedToken || (storedRole && storedRole !== "null") || storedUser,
);

app.mount("#app");

const initializeAuth = async () => {
  try {
    const csrfToken = await getCsrfToken();
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/refresh`,
      {},
      {
        withCredentials: true,
        headers: {
          "X-CSRF-Token": csrfToken,
        },
      },
    );

    if (response.data.message === 1) {
      store.dispatch("changeToken", response.data.token);
      store.dispatch("changeRole", response.data.role);
      store.dispatch("changeInstitution", response.data.institution);
      store.dispatch("changeUser", response.data.user);
    } else if (!hasStoredSession) {
      clearAuthState();
    }
  } catch (error) {
    if (!hasStoredSession) {
      clearAuthState();
    }
  }
};

initializeAuth();
