<template>
  <div class="d-flex w-100">
    <ul class="navbar-nav">
      <HeaderHome />
    </ul>

    <AuthActions :logout="logout" />
  </div>
</template>

<script setup>
import AuthActions from "./AuthActions.vue";
import HeaderHome from "./HeaderHome.vue";
const { logout } = defineProps({ logout: Function });
</script>
