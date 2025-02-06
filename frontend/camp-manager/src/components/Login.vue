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
        v-model="user.name"
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
<script>
import { ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
const user = ref({
  name: "",
  password: "",
});

const toast = useToast();

const logIn = async () => {
  if (!user.value.name || !user.value.password) {
    toast.error("Please fill all fields");
  }
};
const response = await axios.post("http://localhost:3000/login", user.value);
if (response.data.success) {
  var token = result.data.token;
  console.log(token);
  toast.success("Logged in successfully");
} else {
  toast.error("Invalid credentials");
}
</script>
<style></style>
