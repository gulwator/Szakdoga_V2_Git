<template>
  <div class="mt-5 w-100 d-flex justify-content-center align-items-center">
    <form class="form" @submit.prevent="register">
      <div class="mb-3">
        <div data-mdb-input-init class="mb-5">
          <label class="form-label" for="name">Név</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="user.name"
          />
        </div>
        <div data-mdb-input-init class="mb-5">
          <label class="form-label" for="username">Felhasználó név</label>
          <input
            type="text"
            id="username"
            class="form-control"
            v-model="user.username"
          />
        </div>
        <div data-mdb-input-init class="mb-5">
          <label class="form-label" for="email">E-mail</label>
          <input
            type="email"
            id="email"
            class="form-control"
            v-model="user.email"
          />
        </div>
        <div data-mdb-input-init class="mb-5">
          <label class="form-label" for="password-first">Jelszó</label>
          <input
            type="password"
            id="password-first"
            class="form-control"
            v-model="user.password"
          />
        </div>
        <div data-mdb-input-init class="mb-5">
          <label class="form-label" for="password-second"
            >Jelszó megerősítése</label
          >
          <input
            type="password"
            id="password-second"
            class="form-control"
            v-model="user.checkpassword"
          />
        </div>
        <div
          data-mdb-input-init
          v-if="route.params.userType == 'Kisero'"
          class="mb-5"
        >
          <label class="form-label" for="institution">Intézmény</label>
          <select class="form-select" v-model="user.institution" name="" id="">
            <option
              v-for="institution in institutions"
              v-bind:key="institution.om"
              v-bind:value="institution.om"
            >
              {{ institution.om + " " + institution.name }}
            </option>
          </select>
        </div>
        <div data-mdb-input-init class="mb-5">
          <label class="form-label" for="zipcode">Irányítószám</label>
          <input
            type="text"
            id="zipcode"
            class="form-control"
            v-model="user.address.zipcode"
          />
        </div>
        <div data-mdb-input-init class="mb-5">
          <label class="form-label" for="city">Város</label>
          <input
            type="text"
            id="city"
            class="form-control"
            v-model="user.address.city"
          />
        </div>
        <div data-mdb-input-init class="mb-5">
          <label class="form-label" for="street">Utca</label>
          <input
            type="text"
            id="street"
            class="form-control"
            v-model="user.address.street"
          />
        </div>
        <div data-mdb-input-init class="mb-5">
          <label class="form-label" for="number">Házszám</label>
          <input
            type="text"
            id="number"
            class="form-control"
            v-model="user.address.number"
          />
        </div>
        <div data-mdb-input-init class="mb-5">
          <label class="form-label" for="floor">Emelet</label>
          <input
            type="text"
            id="floor"
            class="form-control"
            v-model="user.address.floor"
          />
        </div>
        <div data-mdb-input-init class="mb-5">
          <label class="form-label" for="door">Ajtó</label>
          <input
            type="text"
            id="door"
            class="form-control"
            v-model="user.address.door"
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary btn-lg">Register</button>
    </form>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
const route = useRoute();
const user = ref({
  role: "",
  username: "",
  name: "",
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

user.userType = ref(route.params.userType);
const toast = useToast();
const institutions = ref([]);

const getInstitutions = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/institutions");
    console.log(response.data);
    institutions.value = response.data;
  } catch (error) {
    console.log(error);
  }
  console.log(user.userType.value);
};

// REGISTER METHOD
const register = async () => {
  console.log(user.userType);
  if (
    !user.value.username ||
    !user.value.password ||
    !user.value.name ||
    !user.value.checkpassword ||
    !user.value.email ||
    user.value.password !== user.value.checkpassword ||
    !user.value.address.zipcode ||
    !user.value.address.city ||
    !user.value.address.street
  ) {
    toast.error("Please fill all fields");
  } else {
    let userAddress =
      user.value.address.zipcode +
      " " +
      user.value.address.city +
      " " +
      user.value.address.street +
      " " +
      user.value.address.number +
      " " +
      user.value.address.floor +
      " " +
      user.value.address.door;
    console.log(userAddress.trim());
    console.log(
      "username: ",
      user.value.username,
      "\n email: ",
      user.value.email,
      "\n name: ",
      user.value.name,
      "\n password: ",
      user.value.password,
      "\n role: ",
      user.userType.value,
      "\n institution: ",
      user.value.institution,
      "\n address: ",
      userAddress.trim()
    );
    try {
      const response = await axios.post("http://localhost:3000/api/register", {
        username: user.value.username,
        email: user.value.email,
        name: user.value.name,
        password: user.value.password,
        role: user.userType.value,
        institution: user.value.institution,
        address: userAddress.trim(),
      });

      console.log("server válasza:", response.data);
    } catch (error) {
      console.log(error);
    }
    toast.success("User registered successfully");
    router.push("/");
  }
};

onMounted(() => {
  if (user.userType.value == "Kisero") {
    getInstitutions();
  }
});
</script>
<style></style>
