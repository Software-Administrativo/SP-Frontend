import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "sign-in",
      component: () => import("../views/SignInView.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/HomeView.vue"),
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
