<template>
  <div class="container m,t-4">
    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="saveContact">
          <div class="form-group">
            <input
              type="text"
              v-model="child.name"
              class="form-control"
              placeholder="Enter Name"
            />
          </div>
          <div class="form-group">
            <input
              type="date"
              v-model="child.dateOfbirth"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              v-model="child.address"
              class="form-control"
              placeholder="Address"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              v-model="child.color"
              class="form-control"
              placeholder="color"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              v-model="child.parantName"
              class="form-control"
              placeholder="Parent Name"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              v-model="child.parantPhone"
              class="form-control"
              placeholder="Parent Phone number"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              v-model="child.illness"
              class="form-control"
              placeholder="illness"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              v-model="child.bandNumber"
              class="form-control"
              placeholder="Band number"
            />
          </div>
          <button type="submit" class="btn btn-dark btn-sm mt-4">Submit</button>
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
  parantName: "",
  parantPhone: "",
  address: "",
  schoolId: "",
  groupId: "",
  color: "",
  bandNumber: "",
  illness: "",
});
const toast = useToast();

const groups = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/group");
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const saveContact = async () => {
  console.log("Child values:", child.value);
  if (
    !child.value.name ||
    !child.value.dateOfbirth ||
    !child.value.parantName ||
    !child.value.parantPhone ||
    !child.value.address ||
    !child.value.illness
  ) {
    toast.error("Fields are required");
  }
  try {
    const url = "http://localhost:3000/api/child";
    const response = await axios.post(url, child.value);
    console.log(response);
    if (response.status === 201) {
      toast.success = "Child Added Succesfully";
      child.value.name = "";
      child.value.dateOfbirth = "";
      child.value.parantName = "";
      child.value.parantPhone = "";
      child.value.address = "";
      child.value.schoolId = store.getters.getInstitution;
      child.value.illness = "";
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
