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
        <button class="ml-auto button col-4" @click="addItem">Add</button>
      </div>

      <select class="select col-12 mt-2" v-model="selectedItem">
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
  </div>
</template>
<!-- 
<script>
import Cliploader from "vue-spinner/src/ClipLoader.vue";
import axios from "axios";
export default {
  data() {
    return {
      inputValue: "",
      items: [],
      selectedItem: {},
      children: [],
      sortedChildren: [],
      teachers: [],
      loadingChildren: false,
    };
  },
  created: function () {
    axios.get("http://localhost:3000/api/getGroups").then((response) => {
      this.items = response.data;
    });
    axios.get("http://localhost:3000/api/child").then((response) => {
      this.children = response.data;
    });
  },
  watch: {
    selectedItem: function () {
      console.log(this.selectedItem);
      console.log("változott akijelölés");
      this.listChild();
      this.listTeacher();
    },
  },
  methods: {
    addItem() {
      if (this.inputValue) {
        axios.post("http://localhost:3000/api/addGroup", {
          name: this.inputValue,
        });
        this.items.push(this.inputValue);
        this.inputValue = "";
      }
    },
    
    },
    listTeacher() {
      // console.log("listázni kéne");
      // console.log(this.selectedItem);
      this.loadingChildren = true;
      axios
        .get(
          "http://localhost:3000/api/getGroupTeachers/" + this.selectedItem.id
        )
        .then((response) => {
          this.teachers = response.data;
          this.loadingChildren = false;
        });
    },
  },
};
</script> -->

<script setup>
import { ref, watch, onMounted } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import axios from "axios";
import Cliploader from "vue-spinner/src/ClipLoader.vue";
import store from "@/store";

const inputValue = ref("");
const items = ref([]);
const selectedItem = ref({});
const loadingChildren = ref(false);
const institutionId = store.getters.getInstitution;

const children = ref([]);
var newChild = ref();
var sortedChildren = ref([]);
var notGroupChildren = ref([]);

const teachers = ref([]);
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
    console.log("csoportok sikeresen lekérdezve");
  } catch (error) {
    console.error(error);
  }
};

// Get Instituition Children from DB
const getChildren = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/child/institution/" + institutionId
    );
    children.value = response.data;
    console.log("gyerekek adatai sikeresen lekérdezve");
  } catch (error) {
    console.error(error);
  }
};

// Get instituiton Teacher from DB
const getTeachers = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/groups/" + institutionId + "/getTeachers/"
    );
    teachers.value = response.data;
    console.log("tanárok sikeresen lekérdezve");
    console.log(teachers.value);
  } catch (error) {
    console.error(error);
  }
};

const addItem = async () => {
  if (inputValue.value) {
    try {
      await axios.post("http://localhost:3000/api/addGroup", {
        name: inputValue.value,
      });
      items.value.push({ name: inputValue.value });
      inputValue.value = "";
    } catch (error) {
      console.error(error);
    }
  }
};

function listChild() {
  sortedChildren = children.value.filter((child) => {
    return child.groupId == selectedItem.value.id;
  });
  notGroupChildren = children.value.filter((child) => {
    return child.groupId != selectedItem.value.id;
  });
  console.log("kiválogatott list:\n", sortedChildren);
}
function listTeacher() {
  sortedTeachers = teachers.value.filter((teacher) => {
    return teacher.groupId == selectedItem.value.id;
  });
  notGroupTeachers = teachers.value.filter((teacher) => {
    return teacher.groupId != selectedItem.value.id;
  });
}

const addTeacherToGroup = () => {
  newTeacher.value.groupId = selectedItem.value.id;
  listTeacher();
};

const addChildToGroup = () => {
  newChild.value.groupId = selectedItem.value.id;
  listChild();
};

watch(selectedItem, () => {
  console.log(selectedItem.value);

  listChild();
  listTeacher();
});

onMounted(() => {
  getGroups();
  getChildren();
  getTeachers();
});
onBeforeRouteLeave((to, from) => {
  const answer = window.confirm(
    "Do you really want to leave? you have unsaved changes!"
  );
  if (!answer) return false;
});
</script>
<style scoped>
/* Add your styles here */
</style>
