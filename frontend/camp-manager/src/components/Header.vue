<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">{{ title }}</a>
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
        <router-link class="nav-item nav-link active" to="/"
          >Home</router-link
        >

      </div>
      <div class="navbar-nav" v-if="token == null">

        <router-link class="nav-item nav-link" to="/registration" >Regisztráció</router-link>
        <router-link class="nav-item nav-link" to="/login-with-email">Bejelentkezés emaillel</router-link>
      </div>
      <div class="navbar-nav" v-if="token != null">
        
        <router-link class="nav-item nav-link active" to="/"
          >List Child</router-link
        >
        <router-link class="nav-item nav-link" to="/create-contact"
          >Add Child</router-link
        >
        <router-link class="nav-item nav-link" to="#"
          >Kijelentkezés</router-link
        >
      </div>
    </div>
  </nav>
</template>

<script setup>
import router from "@/routes";
let token = localStorage.getItem("token");
const props = defineProps({
  title: String,
  Required: true,
});
</script>
