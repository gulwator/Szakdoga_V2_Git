import ChildList from "./components/ChildComponents/ChildList.vue";
import AddChild from "./components/ChildComponents/AddChild.vue";
import EditChild from "./components/ChildComponents/EditChild.vue";
import LoginWithEmail from "./components/Authentication/Login.vue";
import Registration from "./components/Authentication/Registration.vue";
import { createRouter, createWebHistory } from "vue-router";
import RegistrationForm from "./components/Authentication/Register.vue";
import ManageGroups from "./components/ManageGroups.vue";
import EditPrograms from "./components/programsComponents/EditPrograms.vue";
import GroupsTimetable from "./components/programsComponents/GroupsTimetable.vue";
import Home from "./Home.vue";
import Schedule from "./components/programsComponents/WorkerTimeTable.vue";

const routes = [
  {
    name: "Registration",
    path: "/registration",
    component: Registration,
    props: true,
  },
  {
    name: "RegistrationForm",
    path: "/registration/:userType",
    component: RegistrationForm,
    props: true,
  },
  {
    name: "LoginWithEmail",
    path: "/login-with-email",
    component: LoginWithEmail,
  },
  // Kisérő route-ok
  {
    name: "ChildList",
    path: "/child-list",
    component: ChildList,
  },
  {
    name: "AddChild",
    path: "/create-contact",
    component: AddChild,
  },
  { name: "EditChild", path: "/contact/:id?", component: EditChild },
  {
    name: "ManageGroups",
    path: "/manage-groups",
    component: ManageGroups,
  },
  {
    name: "GroupsTimetable",
    path: "/groups-timetable",
    component: GroupsTimetable,
  },
  {
    name: "editPrograms",
    path: "/edit-programs",
    component: EditPrograms,
  },
  // Táboroztató route-ok
  {
    name: "Schedule",
    path: "/schedule",
    component: Schedule,
  },
  {
    name: "Home",
    path: "/",
    component: Home,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
