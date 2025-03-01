<template>
  <div class="h-100 d-flex justify-content-center align-items-center">
    <form class="form" @submit.prevent="register">
      <div class="mb-3">
        <div data-mdb-input-init class="">
          <label class="form-label" for="name">Név</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="user.name"
          />
        </div>
        <div data-mdb-input-init class="">
          <label class="form-label" for="passworf-first">Jelszó</label>
          <input
            type="password"
            id="password-first"
            class="form-control"
            v-model="user.name"
          />
        </div>
        <div data-mdb-input-init class="">
          <label class="form-label" for="name">Név</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="user.name"
          />
        </div>
        <div data-mdb-input-init class="">
          <label class="form-label" for="name">Név</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="user.name"
          />
        </div>
        <div data-mdb-input-init class="">
          <label class="form-label" for="name">Név</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="user.name"
          />
        </div>
        <div data-mdb-input-init class="">
          <label class="form-label" for="name">Név</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="user.name"
          />
        </div>
        <div data-mdb-input-init class="">
          <label class="form-label" for="name">Név</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="user.name"
          />
        </div>
        <div data-mdb-input-init class="">
          <label class="form-label" for="name">Név</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="user.name"
          />
        </div>
        <div data-mdb-input-init class="">
          <label class="form-label" for="name">Név</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="user.name"
          />
        </div>
        <div data-mdb-input-init class="">
          <label class="form-label" for="name">Név</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="user.name"
          />
        </div>
        <div data-mdb-input-init class="">
          <label class="form-label" for="name">Név</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="user.name"
          />
        </div>
        <div data-mdb-input-init class="">
          <label class="form-label" for="name">Név</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="user.name"
          />
        </div>
        <div data-mdb-input-init class="">
          <label class="form-label" for="name">Név</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="user.name"
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary btn-lg">Register</button>
    </form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
const route = useRoute();
const user = ref({
  username: "",
  password: "",
  checkpassword: "",
  email: "",
  userType: "",
  institution: "",
  address: {
    zipcode: "",
    city: "",
    street: "",
    number: "",
    floor: "",
    door: "",
  },
});
console.log(ref(route.params));
user.userType = ref(route.params.userType);
const toast = useToast();
const register = async () => {
  console.log(user.value);
  if (
    !user.value.username ||
    !user.value.password ||
    !user.value.checkpassword ||
    !user.value.email ||
    user.value.password != user.value.checkpassword
  ) {
    toast.error("Please fill all fields");
  }
  try {
    const response = await axios.post("http://localhost:3000/api/register", {
      username: user.value.username,
      email: user.value.email,
      password: user.value.password,
      role: user.value.userType,
    });
    console.log(response.data);
    toast.success("User registered successfully");
  } catch (error) {
    console.log(error);
  }
};
</script>
<style></style>
