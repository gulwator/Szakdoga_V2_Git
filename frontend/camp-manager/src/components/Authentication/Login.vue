<template>
  <form @submit.prevent="logIn">
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder="Enter email"
        v-model="user.email"
      />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        placeholder="Password"
        v-model="user.password"
      />
    </div>
    <div class="form-group form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1" />
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
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
      store.dispatch("changeRole", role);
      store.dispatch("changeInstitution", response.data.institution);
      store.dispatch("changeToken", token);
      toast.success("Sikeres bejelentkezés");
      if (role == "Kisero") {
        router.push("/child-list");
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
        toast.error(`Szerverhiba: ${error.response.status} (${error.response.statusText})`);
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
<style></style>
