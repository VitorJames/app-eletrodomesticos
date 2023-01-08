import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/ListAppliance"),
  },
  {
    path: "/create",
    name: "create",
    component: () => import("../views/CreateAppliance"),
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: () => import("../views/EditAppliance"),
  },
  {
    path: "/delete/:id",
    name: "delete",
    component: () => import("../views/DeleteAppliance"),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
