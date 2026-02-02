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
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <!-- BAL OLDAL -->
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/" exact-active-class="active"
              >Home</router-link
            >
          </li>

          <template v-if="role === 'Kisero'">
            <!-- Gyerekek dropdown -->
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Gyerekek
              </a>
              <ul class="dropdown-menu custom-dropdown">
                <li>
                  <router-link class="dropdown-item text-light" to="/child-list"
                    >Gyerekek listája</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="dropdown-item text-light"
                    to="/create-contact"
                    >Gyerek hozzáadása</router-link
                  >
                </li>
              </ul>
            </li>

            <!-- Csoportok dropdown -->
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Csoportok
              </a>
              <ul class="dropdown-menu custom-dropdown">
                <li>
                  <router-link
                    class="dropdown-item text-light"
                    to="/manage-groups"
                    >Csoportok kezelése</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="dropdown-item text-light"
                    to="/groups-timetable"
                    >Csoportok órarendje</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="dropdown-item text-light"
                    to="/edit-programs"
                    >Programok</router-link
                  >
                </li>
              </ul>
            </li>
          </template>
          <!-- Taboroztato menü -->
          <template v-else-if="role === 'Taboroztato'">
            <li class="nav-item">
              <router-link class="nav-link" to="/schedule"
                >Beosztás</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/taborozok"
                >Táborozók</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/tabor-programok"
                >Programok</router-link
              >
            </li>
          </template>
        </ul>

        <!-- JOBB OLDAL -->
        <ul class="navbar-nav ms-auto">
          <template v-if="role === 'null'">
            <li class="nav-item">
              <router-link class="nav-link" to="/registration"
                >Regisztráció</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login-with-email"
                >Bejelentkezés</router-link
              >
            </li>
          </template>

          <template v-else-if="role !== 'null'">
            <li class="nav-item">
              <router-link class="nav-link" @click.prevent="logout" to="/"
                >Kijelentkezés</router-link
              >
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </div>
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
