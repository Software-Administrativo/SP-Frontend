import { useStorage } from "@/stores/localStorage.js";
import SignInView from "@/views/SignInView.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:catchAll(.*)",
      redirect: "/",
    },
    {
      path: "/",
      name: "sign-in",
      component: SignInView,
      meta: {
        requiresAuth: false,
      },
      beforeEnter: (to, from, next) => {
        const { token } = useStorage();
        if (token) {
          next("/home");
        } else {
          next();
        }
      },
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: {
        requiresAuth: true,
        rol: ["ADMIN", "SUPER"],
      },
    },
    {
      path: "/cost",
      name: "cost",
      meta: {
        requiresAuth: true,
        rol: ["ADMIN", "SUPER"],
      },
      component: () => import("../views/CostView.vue"),
    },
    {
      path: "/inventory",
      name: "inventory",
      component: () => import("../views/InventoryView.vue"),
      meta: {
        requiresAuth: true,
        rol: ["ADMIN", "SUPER"],
      },
      children: [
        {
          path: "cellars",
          name: "inventory-cellars",
          component: () => import("../pages/inventory/Cellars.vue"),
        },
        {
          path: "brands",
          name: "inventory-brands",
          component: () => import("../pages/inventory/Brands.vue"),
        },
        {
          path: "categories",
          name: "inventory-categories",
          component: () => import("../pages/inventory/Categories.vue"),
        },
        {
          path: "products",
          name: "inventory-products",
          component: () => import("../pages/inventory/Products.vue"),
        },
        {
          path: "entries",
          name: "inventory-entries",
          component: () => import("../pages/inventory/InventoryEntries.vue"),
        },
        {
          path: "stock",
          name: "inventory-stock-adjustments",
          component: () => import("../pages/inventory/StockAdjustments.vue"),
        },
      ],
    },
    {
      path: "/maintenance",
      name: "maintenance",
      meta: {
        requiresAuth: true,
        rol: ["ADMIN", "SUPER"],
      },
      component: () => import("../views/MaintenanceView.vue"),
      children: [
        {
          path: "pays",
          name: "maintenance-pays",
          component: () => import("../pages/maintenance/TypePays.vue"),
        },
        {
          path: "labors",
          name: "maintenance-labors",
          component: () => import("../pages/maintenance/TypeLabors.vue"),
        },
        {
          path: "spents",
          name: "maintenance-spents",
          component: () => import("../pages/maintenance/TypeSpents.vue"),
        },
        {
          path: "units-measurement",
          name: "maintenance-units-measurement",
          component: () => import("../pages/maintenance/UnitsMeasurement.vue"),
        },
        {
          path: "eps",
          name: "maintenance-eps",
          component: () => import("../pages/maintenance/Eps.vue"),
        },
        {
          path: "lots",
          name: "maintenance-lots",
          component: () => import("../pages/maintenance/Lots.vue"),
        },
        {
          path: "stages",
          name: "maintenance-stages",
          component: () => import("../pages/maintenance/Stages.vue"),
        },
        {
          path: "farm",
          name: "maintenance-farm",
          component: () => import("../pages/maintenance/Farm.vue"),
        },
        {
          path: "people",
          name: "maintenance-people",
          component: () => import("../pages/maintenance/People.vue"),
        },
      ],
    },
    {
      path: "/order",
      name: "order",
      meta: {
        requiresAuth: true,
        rol: ["ADMIN", "SUPER"],
      },
      component: () => import("../views/OrderView.vue"),
    },
    {
      path: "/report",
      name: "report",
      meta: {
        requiresAuth: true,
        rol: ["ADMIN", "SUPER"],
      },
      component: () => import("../views/ReportView.vue"),
    },
    {
      path: "/system",
      name: "system",
      meta: {
        requiresAuth: true,
        rol: ["SUPER"],
      },
      component: () => import("../views/SystemView.vue"),
    },
    {
      path: "/transformation",
      name: "transformation",
      meta: {
        requiresAuth: true,
        rol: ["ADMIN", "SUPER"],
      },
      component: () => import("../views/TransformationView.vue"),
    },
  ],
});

// Validate if USER can access to route / obtener el rol del usuario, validar el token
router.beforeEach((to, from) => {
  if (to.meta.requiresAuth) {
    const { token } = useStorage();
    if (!token) {
      return {
        path: "/",
      };
    } else {
      const validateToken = useStorage();
      const isValidateJWT = validateToken.decodeJwt();
      const userRole = isValidateJWT.rol;
      const allowedRoles = to.meta.rol; // obtener los roles permitidos para la ruta actual
      if (!allowedRoles.includes(userRole)) { 
        // si el rol del usuario no está incluido en los permitidos
        // redirigir al usuario a una ruta de la página de inicio
        return {
          path: "/:catchAll(.*)",
        };
      }
      if (!isValidateJWT) {
        return {
          path: "/",
        };
      } else if (isValidateJWT.rol == 'ADMIN') {

      }
    }
  }
});

export default router;
