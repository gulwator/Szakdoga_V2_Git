<template>
  <div class="h-100 d-flex justify-content-center align-items-center">
    <div>
      <div
        @click="navigateToForm('teacher')"
        class="btn btn-outline-primary square-btn"
      >
        <img class="btn-img" src="/teacher_1995413.png" alt="Teacher" />

        <div>Register as Teacher</div>
      </div>
      <div
        @click="navigateToForm('worker')"
        class="btn btn-outline-primary square-btn"
      >
        <img class="btn-img" src="/burn_13350109.png" alt="Campside" />
        <div>Register as Worker</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const navigateToForm = (userType) => {
  console.log(userType);
  router.push({ name: "RegistrationForm", params: { userType } });
};
</script>
<style>
.btn {
  margin: 10px;
  padding: 20px;
  font-size: 20px;
}
.btn-img {
  width: 20rem;
  height: 20rem;
}

.square-btn {
  width: 25rem; /* Adjust the width as needed */
  height: 25rem; /* Adjust the height as needed */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
