<template>
  <div class="container mt-5">
    <ProgramTable />
  </div>
</template>

<script setup>
import ProgramTable from "./ProgramTable.vue";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
</script>

<style scoped></style>
