<template>
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign up
                </p>

                <form class="mx-1 mx-md-4" @submit.prevent="register">
                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div
                      data-mdb-input-init
                      class="form-outline flex-fill mb-0"
                    >
                      <input
                        type="text"
                        id="form3Example1c"
                        class="form-control"
                        v-model="user.name"
                      />
                      <label class="form-label" for="form3Example1c"
                        >Your Name</label
                      >
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div
                      data-mdb-input-init
                      class="form-outline flex-fill mb-0"
                    >
                      <input
                        type="email"
                        id="form3Example3c"
                        class="form-control"
                        v-model="user.email"
                      />
                      <label class="form-label" for="form3Example3c"
                        >Your Email</label
                      >
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div
                      data-mdb-input-init
                      class="form-outline flex-fill mb-0"
                    >
                      <input
                        type="password"
                        id="form3Example4c"
                        class="form-control"
                        v-model="user.password"
                      />
                      <label class="form-label" for="form3Example4c"
                        >Password</label
                      >
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div
                      data-mdb-input-init
                      class="form-outline flex-fill mb-0"
                    >
                      <input
                        type="password"
                        id="form3Example4cd"
                        class="form-control"
                        v-model="user.checkpassword"
                      />
                      <label class="form-label" for="form3Example4cd"
                        >Repeat your password</label
                      >
                    </div>
                  </div>

                  <div class="form-check d-flex justify-content-center mb-5">
                    <input
                      class="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example3c"
                    />
                    <label class="form-check-label" for="form2Example3">
                      I agree all statements in
                      <a href="#!">Terms of service</a>
                    </label>
                  </div>

                  <div
                    class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                  ></div>
                  <button type="submit" class="btn btn-primary btn-lg">
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
const user = ref({
  name: "",
  password: "",
  checkpassword: "",
  email: "",
});

const toast = useToast();
const register = async () => {
  console.log(user.value);
  if (
    !user.value.name ||
    !user.value.password ||
    !user.value.checkpassword ||
    !user.value.email ||
    user.value.password != user.value.checkpassword
  ) {
    toast.error("Please fill all fields");
  }
  try {
    const response = await axios.post("http://localhost:3000/api/register", {
      name: user.value.name,
      email: user.value.email,
      password: user.value.password,
    });
    console.log(response.data);
    toast.success("User registered successfully");
  } catch (error) {
    console.log(error);
  }
};
</script>
<style></style>
