<template>
  <div class="container-fluid p-0">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark w-100">
      <router-link class="navbar-brand" to="/">Camp Manager</router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        data-testid="header-navbar-toggler"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <component :is="headerComponent" :logout="logout" />
      </div>
    </nav>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import router from "@/routes";
import HeaderKisero from "./HeaderKisero.vue";
import HeaderTaboroztato from "./HeaderTaboroztato.vue";
import HeaderVendeg from "./HeaderVendeg.vue";

const store = useStore();
const role = computed(() => store.getters.getRole);

const headerComponent = computed(() => {
  if (role.value === "Kisero") return HeaderKisero;
  if (role.value === "Taboroztato") return HeaderTaboroztato;
  return HeaderVendeg;
});

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("institution");
  store.dispatch("changeToken", "null");
  store.dispatch("changeRole", "null");
  store.dispatch("changeInstitution", "null");
  router.push("/");
};
</script>

<style scoped>
.custom-dropdown {
  background-color: #212529; /* megegyezik a bg-dark színnel */
  border-radius: 0; /* nincs lekerekítés */
  border: none;
  box-shadow: none;
}

.custom-dropdown .dropdown-item:hover {
  background-color: #343a40; /* kissé világosabb a navbar színénél */
}
</style>
