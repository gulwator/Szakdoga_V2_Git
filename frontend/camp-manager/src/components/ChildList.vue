<template>
  <div class="container">
    <Cliploader v-if="loading" />
    <table v-else class="table table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Date of Birth</th>
          <th>Parent name</th>
          <th>Parent Phone</th>
          <th>Address</th>
          <th>SchooldID</th>
          <th>Color</th>
          <th>Band Number</th>
          <th>Illness</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-for="child in children" v-bind:key="child.id">
        <tr class="table-secondary">
          <td>{{ child.name }}</td>
          <td>{{ child.dateOfBirth }}</td>
          <td>{{ child.parantName }}</td>
          <td>{{ child.parantPhone }}</td>
          <td>{{ child.address }}</td>
          <td>{{ child.schoolID }}</td>
          <td>{{ child.color }}</td>
          <td>{{ child.BandNumber }}</td>
          <td>{{ child.illness }}</td>
          <td>
            <router-link
              :to="{ name: 'EditChild', params: { id: child.id } }"
              class="btn btn-primary btn-sm mr-4"
              >Edit</router-link
            >
            <button
              class="btn btn-danger btn-sm"
              @click="deleteChild(child.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import Cliploader from "vue-spinner/src/ClipLoader.vue";
import { useToast } from "vue-toastification";

const apiUrl = "http://localhost:3000/api/child";
const children = ref([]);
const loading = ref(true);
const toast = useToast();
const getContacts = async () => {
  try {
    const response = await axios.get(apiUrl);
    console.log(response.data);
    children.value = response.data;
    return response;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
const deleteChild = async (id) => {
  console.log(id);
  try {
    const url = `${apiUrl}/${id}`;
    if (confirm("All you sure you want to delete the child")) {
      const response = await axios.delete(url);

      console.log(response);
      if (response.status === 200) {
        toast.success("Child deleted succesfully");
        getContacts();
      }
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  console.log("Contacts List Component mounted");
  getContacts();
});
</script>
