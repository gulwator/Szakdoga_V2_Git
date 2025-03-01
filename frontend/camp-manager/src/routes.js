import ChildList from "./components/ChildList.vue";
import AddChild from "./components/AddChild.vue";
import EditChild from "./components/EditChild.vue";
import LoginWithEmail from "./components/Authentication/Login.vue";
import Registration from "./components/Authentication/Registration.vue";
import { createRouter, createWebHistory } from "vue-router";
import RegistrationForm from "./components/Authentication/Register.vue";

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
    path: "/",
    component: ChildList,
  },
  {
    name: "AddChild",
    path: "/create-contact",
    component: AddChild,
  },
  { name: "EditChild", path: "/contact/:id?", component: EditChild },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
