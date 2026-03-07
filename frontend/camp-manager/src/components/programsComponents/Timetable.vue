<template>
  <div class="container py-4">
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
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import store from "@/store";
const toast = useToast();
const items = ref([]);

const institutionId = store.getters.getInstitution || 0;
const selectedItem = ref({ id: "0", name: "Kérlek válassz csoportot" });
const groupPrograms = ref([]);

const props = defineProps({
  apiBaseUrl: { type: String, default: import.meta.env.VITE_API_BASE_URL },
  getGroupsUrl: { type: String, default: null },
  getProgramsUrl: { type: String, default: null },
});

const getGroups = async () => {
  if (institutionId !== 0) {
    try {
      const url =
        props.getGroupsUrl ||
        `${props.apiBaseUrl}/groups/${institutionId}/getGroups/`;
      const response = await axios.get(url);
      items.value = response.data;
    } catch (error) {
      console.error(error);
      toast.error("Hiba az adatbázis lekérdezésekor", {
        position: "top-right",
        timeout: 2000,
      });
    }
  }
};

const getPrograms = async () => {
  try {
    const url =
      props.getProgramsUrl || `${props.apiBaseUrl}/programs/getPrograms/`;
    const response = await axios.get(url);
    groupPrograms.value = response.data;
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

const programsByDay = computed(() => {
  const grouped = {};
  for (const day of daysOfWeek) {
    grouped[day] = [];
  }

  for (const program of groupPrograms.value) {
    if (!program.datum) continue;
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
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const institution = localStorage.getItem("institution");
  if (token && role && institution) {
    store.dispatch("changeToken", token);
    store.dispatch("changeRole", role);
    store.dispatch("changeInstitution", institution);
  }
});
</script>

<style scoped>
/* Add your styles here */
</style>
