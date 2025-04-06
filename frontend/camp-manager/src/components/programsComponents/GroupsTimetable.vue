<template>
  <div class="container py-4">
    <h1 class="mb-4 text-center">Heti Órarend</h1>
    <select class="select" v-model="selectedItem">
      <!-- <option value="" selected disabled>Kérlek válassz csoportot</option> -->
      <option v-for="item in items" :key="item" :value="item">
        {{ item.name }}
      </option>
    </select>
    <div class="row row-cols-1 row-cols-md-7 g-3">
      <div class="col-md" v-for="day in daysOfWeek" :key="day">
        <div class="schedule-day">
          <div class="day-name">{{ capitalize(day) }}</div>
          <div
            v-for="program in programsByDay[day]"
            :key="program.id"
            class="program-card border p-2 my-1 bg-light rounded"
          >
            <strong>{{ program.program }}</strong
            ><br />
            <small>{{ program.datum }} - {{ program.idopont }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProgramCard from "@/components/ProgramCard.vue";
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import store from "@/store";
const toast = useToast();
const items = ref([]);
const institutionId = store.getters.getInstitution;
const selectedItem = ref({ id: "0", name: "Kérlek válassz csoportot" });
const groupPrograms = ref([]);

const getGroups = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/groups/" + institutionId + "/getGroups/"
    );
    items.value = response.data;
    // console.log("csoportok sikeresen lekérdezve");
  } catch (error) {
    console.error(error);
    toast.error("Hiba az adatbázis lekérdezésekor", {
      position: "top-right",
      timeout: 2000,
    });
  }
};

const getPrograms = async () => {
  console.log("selectedItem.value.id: ", selectedItem.value.id);
  try {
    const response = await axios.get(
      "http://localhost:3000/api/programs/" +
        selectedItem.value.id +
        "/getPrograms/"
    );
    groupPrograms.value = response.data;
    console.log("groupPrograms.value: ", groupPrograms.value);
    // console.log("csoportok sikeresen lekérdezve");
  } catch (error) {
    console.error(error);
    toast.error("Hiba az adatbázis lekérdezésekor", {
      position: "top-right",
      timeout: 2000,
    });
  }
};

const daysOfWeek = [
  "hétfő",
  "kedd",
  "szerda",
  "csütörtök",
  "péntek",
  "szombat",
  "vasárnap",
];
function getDayNameFromDate(dateString) {
  const parts = dateString.split(".");
  if (parts.length !== 3) return null;

  const year = parts[0];
  const month = parts[1].padStart(2, "0");
  const day = parts[2].padStart(2, "0");

  const date = new Date(`${year}-${month}-${day}`);
  const dayIndex = date.getDay(); // 0 = vasárnap, 1 = hétfő, ..., 6 = szombat

  return daysOfWeek[(dayIndex + 6) % 7]; // magyar napnév
}

// Csoportosítás napok szerint
const programsByDay = computed(() => {
  const grouped = {};
  for (const day of daysOfWeek) {
    grouped[day] = [];
  }

  for (const program of groupPrograms.value) {
    if (!program.datum) continue;
    console.log("program.datum: ", program.datum);
    const day = getDayNameFromDate(program.datum.toString().trim());
    if (grouped[day]) {
      grouped[day].push(program);
    }
  }

  return grouped;
});

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);
watch(selectedItem, () => {
  getPrograms();
});

onMounted(() => {
  getGroups();
});
</script>

<style></style>
-->
