<template>
  <div class="container mt-5">
    <div class="container">
      <div class="d-flex flex-row-reverse">
        <button class="button p-2" type="button" @click="saveGroups">
          Mentés
        </button>
      </div>

      <div class="d-flex flex-row">
        <input
          class="p-3"
          type="text"
          v-model="inputValue"
          placeholder="Enter value"
        />
        <button class="ml-auto button col-4" @click="addGroup">Add</button>
      </div>

      <select class="select col-12 mt-2" v-model="selectedItem">
        <!-- <option value="" selected disabled>Kérlek válassz csoportot</option> -->
        <option v-for="item in items" :key="item" :value="item">
          {{ item.name }}
        </option>
      </select>
    </div>
    <!-- <Cliploader v-if="loading" /> -->
    <table class="table table-hover mt-5 mb-5">
      <thead>
        <tr class="table-primary">
          <th>Kisérők</th>
        </tr>
        <tr class="table-primary">
          <th>Név</th>
          <!-- <th>Születési dátum</th> -->
          <th>Lakhely</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="table-primary"
          v-for="teacher in sortedTeachers"
          v-bind:key="teacher.id"
        >
          <td>{{ teacher.name }}</td>
          <!-- <td>{{ teacher }}</td> -->
          <td>{{ teacher.address }}</td>
        </tr>
        <tr>
          <td>
            <select v-model="newTeacher">
              <option
                v-for="teacher in notGroupTeachers"
                :key="teacher.id"
                :value="teacher"
              >
                {{ teacher.name + " " + teacher.address }}
              </option>
            </select>
          </td>
          <td><button @click="addTeacherToGroup">Add</button></td>
        </tr>
      </tbody>
    </table>
    <!-- <Cliploader v-if="loadingChildren" /> -->
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Gyerekek</th>
        </tr>
        <tr>
          <th>Név</th>
          <th>Szülő neve</th>
          <th>Születési dátum</th>
          <th>Lakhely</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="table-primary"
          v-for="child in sortedChildren"
          v-bind:key="child.id"
        >
          <td>{{ child.name }}</td>
          <td>{{ child.parentName }}</td>
          <td>{{ child.dateOfBirth }}</td>
          <td>{{ child.address }}</td>
        </tr>

        <tr>
          <td>
            <select v-model="newChild">
              <option
                v-for="child in notGroupChildren"
                :key="child.id"
                :value="child"
              >
                {{
                  child.name + " " + child.dateOfBirth + " " + child.parentName
                }}
              </option>
            </select>
          </td>
          <td><button @click="addChildToGroup">Add</button></td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div>
      <button @click="showConfirmDialog = true">Save changes</button>

      <div v-if="showConfirmDialog" class="confirm-dialog-overlay">
        <div class="confirm-dialog">
          <p>Nem mentetted a módosításokat. Szeretnéd elmenteni?</p>
          <button class="confirm-button" @click="saveAndClose">
            Yes, save
          </button>
          <button class="confirm-button" @click="cancelSave">No, cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useToast } from "vue-toastification";
import axios from "axios";
import Cliploader from "vue-spinner/src/ClipLoader.vue";
import store from "@/store";

const toast = useToast();
const inputValue = ref("");
const items = ref([]);
const selectedItem = ref({ id: "0", name: "Kérlek válassz csoportot" });
const loadingChildren = ref(false);
const institutionId = store.getters.getInstitution;
const saved = ref(true);
const showConfirmDialog = ref(false);

const children = ref([]);
const childrenBackup = ref([]);
var newChild = ref();
var sortedChildren = ref([]);
var notGroupChildren = ref([]);

const teachers = ref([]);
const teacherBackup = ref([]);
var newTeacher = ref();
var sortedTeachers = ref([]);
var notGroupTeachers = ref([]);

// Get Groups from DB
const getGroups = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/groups/" + institutionId + "/getGroups/"
    );
    items.value = response.data;
    // console.log("csoportok sikeresen lekérdezve");
  } catch (error) {
    console.error(error);
  }
};

//Get Children from db
const getChildren = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/child/institution/" + institutionId
    );
    children.value = response.data;
    childrenBackup.value = response.data;
    // console.log("gyerekek adatai sikeresen lekérdezve");
  } catch (error) {
    console.error(error);
  }
};

// Get Teachers from DB
const getTeachers = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/groups/" + institutionId + "/getTeachers/"
    );
    teachers.value = response.data;
    teacherBackup.value = JSON.parse(JSON.stringify(response.data));
    // console.log("tanárok sikeresen lekérdezve");
    // console.log(teachers.value);
  } catch (error) {
    console.error(error);
  }
};

//Add group to db
const addGroup = async () => {
  if (inputValue.value) {
    try {
      await axios.post("http://localhost:3000/api/groups/addGroup", {
        name: inputValue.value,
      });
      items.value.push({ name: inputValue.value });
      inputValue.value = "";
    } catch (error) {
      console.error(error);
    }
  }
};

// Sort children by group
function listChild() {
  sortedChildren.value = children.value.filter((child) => {
    return child.groupId == selectedItem.value.id;
  });
  notGroupChildren.value = children.value.filter((child) => {
    return child.groupId != selectedItem.value.id;
  });
  // console.log("kiválogatott list:\n", sortedChildren);
}

// Add child to opened group
const addChildToGroup = () => {
  newChild.value.groupId = selectedItem.value.id;
  saved.value = false;

  listChild();
};

// Add Teacher to opened group
const addTeacherToGroup = () => {
  newTeacher.value.groupId = selectedItem.value.id;
  listTeacher();
  saved.value = false;
  // console.log(sortedTeachers.value);
};

// Sort teachers to opened group
function listTeacher() {
  sortedTeachers.value = teachers.value.filter((teacher) => {
    return teacher.groupId == selectedItem.value.id;
  });
  // console.log("sorted teachers", sortedTeachers);
  notGroupTeachers.value = teachers.value.filter((teacher) => {
    return teacher.groupId != selectedItem.value.id;
  });
}

// Save groups
const saveGroups = async (groupId) => {
  console.log("users:", JSON.stringify(sortedTeachers.value));
  console.log("children: ", JSON.stringify(sortedChildren.value));
  try {
    await axios.put("http://localhost:3000/api/groups/saveGroups", {
      users: sortedTeachers.value,
      children: sortedChildren.value,
    });
    teacherBackup.value = JSON.parse(JSON.stringify(teachers.value));
    childrenBackup.value = JSON.parse(JSON.stringify(children.value));
    toast.success("Csoportok sikeresen mentve!");
    saved.value = true;
  } catch (error) {
    console.error(error);
  }
};

watch(
  selectedItem,
  (newValue, oldValue) => {
    console.log("mentes allapota: ", saved.value);
    if (saved.value === false) {
      // TODO: A sortedGroup az már a befrissült verzió amikor mentek.
      console.log("watched sort:", sortedTeachers.value);
      showConfirmDialog.value = true;
      console.log("nincs mentve");
    }

    // console.log(selectedItem.value);

    listChild();
    listTeacher();
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  getGroups();
  getChildren();
  getTeachers();
});

// Modal
const saveAndClose = () => {
  saveGroups();
  showConfirmDialog.value = false;
  saved.value = true;
  listTeacher;
};
const cancelSave = () => {
  teachers.value = JSON.parse(JSON.stringify(teacherBackup.value));
  children.value = JSON.parse(JSON.stringify(childrenBackup.value));
  showConfirmDialog.value = false;
  saved.value = true;
  listTeacher();
  listChild();
};
</script>

<style scoped>
.confirm-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.confirm-dialog {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10000;
}

.confirm-button {
  padding: 10px 20px;
  margin: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.confirm-button:hover {
  background-color: #0056b3;
}
</style>
