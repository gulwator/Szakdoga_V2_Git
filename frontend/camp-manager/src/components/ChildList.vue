<template>
  <div class="container">
    <table class="table table-hover">
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
          <td>{{ child.dateOfbirth }}</td>
          <td>{{ child.parantName }}</td>
          <td>{{ child.parantPhone }}</td>
          <td>{{ child.address }}</td>
          <td>{{ child.schoolID }}</td>
          <td>{{ child.color }}</td>
          <td>{{ child.bandNumber }}</td>
          <td>{{ child.illness }}</td>
          <td>
            <a href="" class="btn btn-primary btn-sm mr-4">Edit</a>
            <button class="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import axios from "axios";
import { onMounted } from "vue";

const apiUrl = "http://localhost:3000/api/contacts";
const getContacts = async () => {
  try {
    const response = await axios.get(apiUrl);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  console.log("Contacts List Component mounted");
  getContacts();
});
</script>
