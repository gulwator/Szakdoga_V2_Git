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
      <!--                 BEJELENTKEZÉS NÉLKÜLI           -->
      <div class="navbar-nav" v-if="role === 'null'">
        <router-link class="nav-item nav-link" to="/registration"
          >Regisztráció</router-link
        >
        <router-link class="nav-item nav-link" to="/login-with-email"
          >Bejelentkezés emaillel</router-link
        >
      </div>
      <!--                KISÉRŐI BELÉPÉS                    -->
      <div class="navbar-nav" v-if="role === 'Kisero'">
        <router-link class="nav-item nav-link active" to="/child-list"
          >Gyerekek listája</router-link
        >
        <router-link class="nav-item nav-link" to="/create-contact"
          >Gyerek hozzáadása</router-link
        >
        <router-link class="nav-item nav-link" to="/manage-groups"
          >Csoportok kezelése</router-link
        >
        <router-link class="nav-item nav-link" @click="logout" to="/"
          >Kijelentkezés</router-link
        >
      </div>
    </div>
  </nav>
</template>
<script setup>
import router from "@/routes";
import { computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();

const role = computed(() => store.getters.getRole);
const institution = computed(() => store.getters.getInstitution);
const token = computed(() => store.getters.getToken);

watch(role, (newRole, oldRole) => {
  console.log(`Role megváltozott: ${oldRole} → ${newRole}`);
});
watch(institution, (newInstitution, oldInstitution) => {
  console.log(
    `Institution megváltozott: ${oldInstitution} → ${newInstitution}`
  );
});
watch(token, (newToken, oldToken) => {
  console.log(`Token megváltozott: ${oldToken} → ${newToken}`);
});
// Kilépés funkció
const logout = () => {
  store.dispatch("changeToken", "null");
  store.dispatch("changeInstitution", "null");
  store.dispatch("changeRole", "null");
  router.push("/");
};
</script>
