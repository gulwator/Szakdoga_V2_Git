<template>
  <div class="container m,t-4">
    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="updateChild">
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
              v-model="child.dateOfBirth"
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
              v-model="child.parentName"
              class="form-control"
              placeholder="Parent Name"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              v-model="child.parentPhone"
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
              disabled
              type="text"
              v-model="child.bandNumber"
              class="form-control"
              placeholder="Band number"
            />
          </div>
          <button type="submit" class="btn btn-dark btn-sm mt-4">Update</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const child = ref({
  name: "",
  dateOfBirth: "",
  parentName: "",
  parentPhone: "",
  address: "",
  schoolId: "",
  color: "",
  bandNumber: "",
  illness: "",
});

const getChildById = async () => {
  try {
    const url = `http://localhost:3000/api/child/${route.params.id}`;
    const response = await axios.get(url);
    child.value = response.data;
    console.log(child.value.dateOfBirth);
    child.value.dateOfBirth = child.value.dateOfBirth.replace(/\./g, "-");
    console.log(child.value.dateOfBirth);
    // console.log(child);
  } catch (error) {
    console.log(error);
  }
};
const updateChild = async () => {
  console.log("Child values:", child.value);
  if (
    !child.value.name ||
    !child.value.dateOfBirth ||
    !child.value.parantName ||
    !child.value.parantPhone ||
    !child.value.address ||
    !child.value.schoolId ||
    !child.value.illness
  ) {
    toast.error("Fields are required");
  } else {
    try {
      child.value.dateOfBirth = child.value.dateOfBirth.replace(/\-/g, ".");
      console.log(child.value);
      const url = `http://localhost:3000/api/child/${route.params.id}`;
      const response = await axios.put(url, child.value);
      console.log(response.status);
      if (response.status === 201) {
        toast.success("Contact Updated Successfully");
        router.push({ name: "ChildList" });
      }
    } catch (error) {
      console.log(error);
    }
  }
};
onMounted(() => {
  getChildById();
});
</script>
