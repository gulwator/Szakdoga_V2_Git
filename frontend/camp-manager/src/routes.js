import ChildList from "./components/ChildList.vue";
import AddChild from "./components/AddChild.vue";
import EditChild from "./components/EditChild.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
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
