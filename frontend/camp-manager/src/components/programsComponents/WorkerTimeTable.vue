<template>
  <div>
    <h1 class="mb-4 text-center">Heti Beosztás</h1>

    <Timetable
      :apiBaseUrl="baseUrl"
      :getProgramsUrl="`${baseUrl}/programs/getPrograms`"
    />
  </div>
</template>

<script setup>
import Timetable from "./Timetable.vue";
import store from "@/store";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
</script>

<style></style>
