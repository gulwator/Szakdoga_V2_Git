import ChildList from "./components/ChildList.vue";
import AddChild from "./components/AddChild.vue";
import EditChild from "./components/EditChild.vue";
import LoginWithEmail from "./components/Login.vue";
import Registration from "./components/Registration.vue"
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name:"Registration",
    path:"/registration",
    component:Registration
  },
  {name:"LoginWithEmail",
    path:"/login-with-email",
    component:LoginWithEmail 
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
