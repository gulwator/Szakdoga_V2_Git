<template>
  <div v-if="store.state.role != 'null'" class="container">
    <table class="table table-hover">
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
          <td>{{ child.parentName }}</td>
          <td>{{ child.parentPhone }}</td>
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
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";
const store = useStore();
const toast = useToast();

const institutionId = store.getters.getInstitution;
const children = ref([]);
const getContacts = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/child/institution/${institutionId}`,
    );

    children.value = response.data;
    return response;
  } catch (error) {
    console.log(error);
  } finally {
  }
};
const deleteChild = async (id) => {
  try {
    const url = `${import.meta.env.VITE_API_BASE_URL}/child/institution/${institutionId}/${id}`;
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
