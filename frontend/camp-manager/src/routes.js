import ChildList from "./components/ChildList.vue";
import AddChild from "./components/AddChild.vue";
import EditChild from "./components/EditChild.vue";
import LoginWithEmail from "./components/Authentication/Login.vue";
import Registration from "./components/Authentication/Registration.vue";
import { createRouter, createWebHistory } from "vue-router";
import RegistrationForm from "./components/Authentication/Register.vue";
import ManageGroups from "./components/ManageGroups.vue";
import GroupsTimetable from "./components/programsComponents/GroupsTimetable.vue";
import Home from "./Home.vue";

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
