<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="logIn">
      <h2 class="login-title">Bejelentkezés</h2>
      <div class="form-group">
        <label for="exampleInputEmail1">Email cím</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          data-testid="email-input"
          placeholder="Email"
          v-model="user.email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Jelszó</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          data-testid="password-input"
          placeholder="Jelszó"
          v-model="user.password"
        />
      </div>
      <button type="submit" data-testid="login-sbmt" class="btn btn-primary btn-block">
        Bejelentkezés
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";
const user = ref({
  email: "",
  password: "",
});
const router = useRouter();
const toast = useToast();
const store = useStore();

const logIn = async () => {
  if (!user.value.email || !user.value.password) {
    toast.error("Please fill all fields");
  }
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/login`,
      user.value,
    );

    if (response.data.message == 1) {
      var token = response.data.token;
      var role = response.data.role;
      console.log(response.data);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      store.dispatch("changeToken", token);
      store.dispatch("changeRole", role);
      toast.success("Sikeres bejelentkezés");
      if (role == "Kisero") {
        var institution = response.data.institution;
        router.push("/child-list");
        localStorage.setItem("institution", response.data.institution);
        store.dispatch("changeInstitution", institution);
      }
      if (role == "Taboroztato") {
        router.push("/programs");
      }
    } else {
      toast.error("Hibás e-mail vagy jelszó");
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      // A szerver válaszolt, de hibás státuszkóddal (pl. 401, 500)
      if (error.response.status === 401) {
        toast.error("Hibás e-mail vagy jelszó");
      } else {
        toast.error(
          `Szerverhiba: ${error.response.status} (${error.response.statusText})`,
        );
      }
    } else if (error.request) {
      // Nem érkezett válasz a szervertől
      toast.error("Nem elérhető a szerver. Próbáld újra később!");
    } else {
      // Egyéb hiba
      toast.error("Ismeretlen hiba történt a bejelentkezés során.");
    }
  }
};
</script>
<style>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f6fa;
}

.login-form {
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  width: 100%;
  max-width: 400px;
}

.login-title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: bold;
  color: #2d3436;
}

.form-group {
  margin-bottom: 1rem;
}

.form-control {
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 1rem;
}

.btn-block {
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
}

@media (max-width: 600px) {
  .login-form {
    padding: 1rem;
    max-width: 90vw;
  }
}
</style>
