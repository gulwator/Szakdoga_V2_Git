<!--
  ========================================
  StaffSchedule komponens - Tényleges felhasználó felület (Template)
  ========================================
  Ez a szakasz határozza meg, hogy mit lát a felhasználó a képernyőn.
  A v-model köti össze az input mezőket a script-ben lévő adatokkal.
  A v-for létrehozza az összes program sorát a táblázatban.
-->
<template>
  <div class="container mt-5">
    <h2 class="mb-4">Programok</h2>
    <table class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th>Dátum</th>
          <th>Időpont</th>
          <th>Program neve</th>
          <th>Tartja</th>
          <th>Résztvevők száma</th>
          <th>Maximális férőhely</th>
        </tr>
        <tr>
          <th class="date">
            <input type="date" name="" id="" v-model="filter.date" />
          </th>
          <th class="time">
            <input type="time" name="" id="" v-model="filter.time" />
          </th>
          <th class="program-name">
            <input
              type="text"
              name=""
              id=""
              v-model="filter.programName"
              placeholder="Program neve"
            />
          </th>
          <th class="staff">
            <input
              type="text"
              name=""
              id=""
              v-model="filter.staff"
              placeholder="Személyzet"
            />
          </th>
          <th class="participants">
            <input
              type="number"
              name=""
              id=""
              v-model="filter.participants"
              placeholder="Min"
            />
            <input
              type="number"
              name=""
              id=""
              v-model="filter.participants"
              placeholder="Max"
            />
          </th>
          <th class="MaxParticipants">
            <input
              type="number"
              name=""
              id=""
              v-model="filter.Maxparticipants"
              placeholder="Min"
            />
            <input
              type="number"
              name=""
              id=""
              v-model="filter.Maxparticipants"
              placeholder="Max"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="program in filterData"
          :key="program.id"
          @click="openModal(program)"
          style="cursor: pointer"
        >
          <td>{{ program.datum }}</td>
          <td>{{ program.idopont }}</td>
          <td>{{ program.program }}</td>
          <td>{{ program.tartja }}</td>
          <td>{{ program.regisztraltakszama }}</td>
          <td>{{ program.maxFerohely }}</td>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ selectedProgram?.program || "Program részletei" }}
          </h5>
          <button class="close-btn" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
          <p><strong>Dátum:</strong> {{ selectedProgram?.datum }}</p>
          <p><strong>Időpont:</strong> {{ selectedProgram?.idopont }}</p>
          <p><strong>Leírás:</strong> {{ selectedProgram?.leiras }}</p>
          <p>
            <strong>Résztvevők:</strong>
            {{ selectedProgram?.regisztraltakszama }}
          </p>
          <p>
            <strong>Max. férőhely:</strong> {{ selectedProgram?.maxFerohely }}
          </p>
          <p v-if="role === 'Kisero'">
            <strong>Tartja:</strong> {{ selectedProgram?.tartja }}
          </p>
          <!-- <p v-if="role === 'Admin'"><strong>Tartja:</strong> {{ selectedProgram?.tartja }}</p> -->
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="saveProgram">
            Megtartom a programot
          </button>
          <button class="btn btn-secondary" @click="closeModal">Bezárás</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const programs = ref([]);
const selectedProgram = ref(null);
const showModal = ref(false);

const filter = ref({
  date: "",
  time: "",
  programName: "",
  programHolder: "",
});

const getPrograms = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/programs/WithNullStaff`,
    );
    programs.value = response.data;
  } catch (error) {
    console.log(error);
  }
};
const filterData = computed(() => {
  return programs.value.filter((program) => {
    const matchesDate = filter.value.date
      ? program.datum === filter.value.date
      : true;
    const matchesTime = filter.value.time
      ? program.idopont === filter.value.time
      : true;
    const matchesProgramName = filter.value.programName
      ? program.program
          .toLowerCase()
          .includes(filter.value.programName.toLowerCase())
      : true;

    return matchesDate && matchesTime && matchesProgramName;
  });
});

const saveProgram = async () => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/programs/saveProgram`,
      selectedProgram.value,
    );
    closeModal();
    getPrograms();
  } catch (error) {
    console.log(error);
  }
};
const openModal = (program) => {
  selectedProgram.value = program;
  showModal.value = true;
};

const closeModal = () => {
  selectedProgram.value = null;
  showModal.value = false;
};

onMounted(() => {
  getPrograms();
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-container {
  background: white;
  padding: 20px;
  width: 500px;
  border-radius: 10px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.dropdown {
  width: 100%;
  padding: 8px;
  margin-top: 8px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-container {
  background: white;
  padding: 20px;
  width: 500px;
  border-radius: 10px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.dropdown {
  width: 100%;
  padding: 8px;
  margin-top: 8px;
}
</style>
