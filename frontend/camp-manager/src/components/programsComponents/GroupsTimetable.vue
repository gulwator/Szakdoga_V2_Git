<template>
  <div>
    <h1 class="mb-4 text-center">Heti Órarend</h1>

    <select class="select" v-model="selectedItem">
      <option v-for="item in items" :key="item" :value="item">
        {{ item.name }}
      </option>
    </select>
    <Timetable
      :apiBaseUrl="baseUrl"
      :getGroupsUrl="`${baseUrl}/groups/${institutionId}/getGroups/`"
      :getProgramsUrl="`${baseUrl}/programs/${selectedItem?.id || 0}/getPrograms/`"
    />
  </div>
</template>

<script setup>
import Timetable from "./Timetable.vue";
import store from "@/store";

const institutionId = store.getters.getInstitution;
const selectedItem = { id: "0" };
const baseUrl = import.meta.env.VITE_API_BASE_URL;
</script>

<style></style>
