<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="saveContact">
          <div class="form-group">
            <input
              data-testid="nameTb"
              type="text"
              v-model="child.name"
              class="form-control"
              placeholder="Enter Name"
            />
          </div>
          <div class="form-group">
            <input
              data-testid="dateOfBirthDp"
              type="date"
              v-model="child.dateOfbirth"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <input
              data-testid="addressTb"
              type="text"
              v-model="child.address"
              class="form-control"
              placeholder="Address"
            />
          </div>
          <div class="form-group">
            <input
              data-testid="colorTb"
              type="text"
              v-model="child.color"
              class="form-control"
              placeholder="color"
            />
          </div>
          <div class="form-group">
            <input
              data-testid="parentNameTb"
              type="text"
              v-model="child.parentName"
              class="form-control"
              placeholder="Parent Name"
            />
          </div>
          <div class="form-group">
            <input
              data-testid="parentPhoneTb"
              type="text"
              v-model="child.parentPhone"
              class="form-control"
              placeholder="Parent Phone number"
            />
          </div>
          <div class="form-group">
            <input
              data-testid="illnessTb"
              type="text"
              v-model="child.illness"
              class="form-control"
              placeholder="illness"
            />
          </div>
          <div class="form-group">
            <input
              data-testid="bandNumberTb"
              type="text"
              v-model="child.bandNumber"
              class="form-control"
              placeholder="Band number"
            />
          </div>
          <button
            data-testid="AddChildSubmitBtn"
            type="submit"
            class="btn btn-dark btn-sm mt-4"
          >
            Gyerek hozzáadása
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import store from "@/store";

const child = ref({
  name: "",
  dateOfbirth: "",
  parentName: "",
  parentPhone: "",
  address: "",
  institutionId: store.getters.getInstitution,
  groupId: "",
  color: "",
  bandNumber: "",
  illness: "",
});
const toast = useToast();

const saveContact = async () => {
  console.log("Child values:", child.value);
  if (
    !child.value.name ||
    !child.value.dateOfbirth ||
    !child.value.parentName ||
    !child.value.parentPhone ||
    !child.value.address
  ) {
    toast.error("Kérem, töltse ki az összes kötelező mezőt!");
    return;
  }
  try {
    const url = `${import.meta.env.VITE_API_BASE_URL}/child`;
    const response = await axios.post(url, child.value);
    console.log(response);
    if (response.status === 201) {
      toast.success("Gyerek hozzáadva");
      child.value.name = "";
      child.value.dateOfbirth = "";
      child.value.parentName = "";
      child.value.parentPhone = "";
      child.value.address = "";
      child.value.institutionId = store.getters.getInstitution;
      child.value.illness = "";
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
