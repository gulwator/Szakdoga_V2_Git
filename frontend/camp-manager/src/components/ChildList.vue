<template>
  <div v-if="store.state.role != 'null'" class="container">
    <Cliploader v-if="loading" />
    <table v-else class="table table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Date of Birth</th>
          <th>Parent name</th>
          <th>Parent Phone</th>
          <th>Address</th>
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
            <button @click="Modal"></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import axios from "axios";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { ref, onMounted } from "vue";
import Cliploader from "vue-spinner/src/ClipLoader.vue";
import { useToast } from "vue-toastification";

import { useStore } from "vuex";

const store = useStore();

const institutionId = store.getters.getInstitution;
const apiUrl = "http://localhost:3000/api/child/institution/" + institutionId;
const children = ref([]);
const loading = ref(true);
const toast = useToast();
const getContacts = async () => {
  try {
    const response = await axios.get(apiUrl);

    children.value = response.data;
    return response;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
const deleteChild = async (id) => {
  try {
    const url = `${apiUrl}/${id}`;
    if (confirm("All you sure you want to delete the child")) {
      const response = await axios.delete(url);

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
  getContacts();
});
</script>
