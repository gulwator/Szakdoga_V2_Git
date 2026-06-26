<template>
  <div>
    <h1 class="mb-4 text-center">Heti Beosztás</h1>
    <!-- create button to add program to my timetable -->
    <button
      class="btn btn-primary mb-3"
      @click="$router.push('/staff-assign-to-program')"
    >
      Program Hozzáadása
    </button>

    <Timetable
      :apiBaseUrl="baseUrl"
      :getProgramsUrl="`${baseUrl}/programs/getPrograms`"
    />
  </div>
</template>

<script setup>
import Timetable from "../programsComponents/Timetable.vue";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
</script>

<style></style>
