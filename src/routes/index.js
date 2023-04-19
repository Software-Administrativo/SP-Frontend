import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/cost",
      name: "cost",
      component: () => import("../views/CostView.vue"),
    },
    {
      path: "/inventory",
      name: "inventory",
      component: () => import("../views/InventoryView.vue"),
    },
    {
      path: "/maintenance",
      name: "maintenance",
      component: () => import("../views/MaintenanceView.vue"),
    },
    {
      path: "/order",
      name: "order",
      component: () => import("../views/OrderView.vue"),
    },
    {
      path: "/report",
      name: "report",
      component: () => import("../views/ReportView.vue"),
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: () => import("../views/SignInView.vue"),
    },
    {
      path: "/system",
      name: "system",
      component: () => import("../views/SystemView.vue"),
    },
    {
      path: "/transformation",
      name: "transformation",
      component: () => import("../views/TransformationView.vue"),
    },
  ],
});

export default router;
