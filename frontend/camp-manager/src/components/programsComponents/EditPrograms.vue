<template>
  <div class="container mt-5">
    <h2 class="mb-4">Programok</h2>
    <table class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th>Dátum</th>
          <th>Időpont</th>
          <th>Program neve</th>
          <th>Résztvevők száma</th>
          <th>Maximális férőhely</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="program in programs"
          :key="program.id"
          @click="openModal(program)"
          style="cursor: pointer"
        >
          <td>{{ program.datum }}</td>
          <td>{{ program.idopont }}</td>
          <td>{{ program.program }}</td>
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

          <!-- Legördülő menü -->
          <label for="kategoriaSelect"
            ><strong>Csoport regisztrálása:</strong></label
          >
          <select id="kategoriaSelect" v-model="selectedGroup" class="dropdown">
            <option disabled value="">Kérlek válassz</option>
            <option v-for="option in groups" :key="option" :value="option">
              {{ option.name }}
            </option>
          </select>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="saveProgram">Mentés</button>
          <button class="btn btn-secondary" @click="closeModal">Bezárás</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import store from "@/store";

const institutionId = store.getters.getInstitution;
const groups = ref([]);
const programs = ref([]);
const selectedProgram = ref(null);
const selectedGroup = ref(null);
const showModal = ref(false);

const getGroups = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/groups/" +
        institutionId +
        "/getGroupsWithCount"
    );
    groups.value = response.data;
    console.log(groups.value);
  } catch (error) {
    console.log(error);
  }
};
const getPrograms = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/programs/getProgramsWithLimits"
    );
    programs.value = response.data;
  } catch (error) {
    console.log(error);
  }
};

const saveProgram = async () => {
  if(selectedGroup.value.count + selectedProgram.value.regisztraltakszama <= selectedProgram.value.regisztraltakszama ){

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
  getGroups();
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
