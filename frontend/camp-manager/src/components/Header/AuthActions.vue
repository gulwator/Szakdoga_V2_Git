<template>
  <ul class="navbar-nav ms-auto">
    <template v-if="!hasRole">
      <li class="nav-item">
        <router-link
          class="nav-link"
          to="/registration"
          test-id="registrationRouterLink"
          >Regisztráció</router-link
        >
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          to="/login-with-email"
          test-id="loginRouterLink"
        >
          Bejelentkezés</router-link
        >
      </li>
    </template>
    <template v-else>
      <li class="nav-item">
        <a
          class="nav-link"
          href="#"
          @click.prevent="logout"
          test-id="LogOutRouterLink"
          >Kijelentkezés</a
        >
      </li>
    </template>
  </ul>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  logout: Function,
});

const store = useStore();
const role = computed(() => store.getters.getRole);
const hasRole = computed(
  () =>
    role.value !== null && role.value !== "null" && role.value !== undefined,
);

const logout = () => {
  if (props.logout) props.logout();
};
</script>

<style scoped></style>
