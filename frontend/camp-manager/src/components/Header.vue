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
          >List Child</router-link
        >
        <router-link class="nav-item nav-link" to="/create-contact"
          >Add Child</router-link
        >
      </div>
    </div>
  </nav>
</template>

<script setup>
import router from "@/routes";

const props = defineProps({
  title: String,
  Required: true,
});
</script>
