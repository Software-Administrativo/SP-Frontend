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
      children: [
        {
          path: 'cellars',
          name: 'inventory-cellars',
          component: () => import("../pages/inventory/Cellars.vue"),
        },
        {
          path: 'brands',
          name: 'inventory-brands',
          component: () => import("../pages/inventory/Brands.vue"),
        },
        {
          path: 'categories',
          name: 'inventory-categories',
          component: () => import("../pages/inventory/Categories.vue"),
        },
        {
          path: 'products',
          name: 'inventory-products',
          component: () => import("../pages/inventory/Products.vue"),
        },
        {
          path: 'entries',
          name: 'inventory-entries',
          component: () => import("../pages/inventory/InventoryEntries.vue"),
        },
        {
          path: 'stock',
          name: 'inventory-stock-adjustments',
          component: () => import("../pages/inventory/StockAdjustments.vue"),
        },
      ]
    },
    {
      path: "/maintenance",
      name: "maintenance",
      component: () => import("../views/MaintenanceView.vue"),
      children: [
        {
          path: 'pays',
          name: 'maintenance-pays',
          component: () => import("../pages/maintenance/TypePays.vue"),
        },
        {
          path: 'labors',
          name: 'maintenance-labors',
          component: () => import("../pages/maintenance/TypeLabors.vue"),
        },
      ]
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
