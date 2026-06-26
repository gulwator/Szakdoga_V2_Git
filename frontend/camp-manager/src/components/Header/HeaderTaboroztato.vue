<template>
  <div class="d-flex w-100">
    <ul class="navbar-nav">
      <header-home />
      <li class="nav-item">
        <router-link class="nav-link" to="/staff-timetable"
          >Beosztás</router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/taborozok">Táborozók</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/all-programs">Programok</router-link>
      </li>
    </ul>

    <AuthActions :logout="logout" />
  </div>
</template>

<script setup>
import AuthActions from "./AuthActions.vue";
import HeaderHome from "./HeaderHome.vue";
const { logout } = defineProps({ logout: Function });
</script>
