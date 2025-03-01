<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Camp Manager</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link class="nav-item nav-link active" to="/">Home</router-link>
      </div>
      <div class="navbar-nav" v-if="store.state.role === 'null'">
        <router-link class="nav-item nav-link" to="/registration"
          >Regisztráció</router-link
        >
        <router-link class="nav-item nav-link" to="/login-with-email"
          >Bejelentkezés emaillel</router-link
        >
      </div>
      <div class="navbar-nav" v-if="store.state.role === 'kisero'">
        <router-link class="nav-item nav-link active" to="/"
          >List Child</router-link
        >
        <router-link class="nav-item nav-link" to="/create-contact"
          >Add Child</router-link
        >
        <router-link class="nav-item nav-link" @click="logout" to="#"
          >Kijelentkezés</router-link
        >
      </div>
    </div>
  </nav>
</template>
<script setup>
import router from "@/routes";
import { useStore } from "vuex";

const store = useStore();

// Kilépés funkció
const logout = () => {
  sessionStorage.removeItem("role");
  store.commit("changeRoleToNone");
  router.push("/");
};
</script>
