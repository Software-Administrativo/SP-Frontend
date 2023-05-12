<template>
  <div class="sidebar-close">
    <div
      v-for="item in pathsRender"
      :key="item.name"
      @click="clickRoute"
      class="hola"
    >
      <RouterLink class="item-close" :to="item.path">
        <i class="icon-module-close" v-bind:class="item.icon"></i>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useStorage } from "@/stores/localStorage.js";
import { menuState } from "@/stores/menu";
import { event } from "quasar";
import { computed, onMounted, ref } from "vue";

const nameUser = ref("");

const validateToken = useStorage();
const isValidateJWT = validateToken.decodeJwt();
const pathsRender = ref([]);

function validatePaths() {
  const pathsValidate = paths.filter((item) => {
    return item.rol.includes(isValidateJWT.rol);
  });
  pathsRender.value = pathsValidate;
}

const paths = [
  {
    name: "Inicio",
    path: "/home",
    icon: "icon icon-home",
    rol: ["ADMIN", "SUPER"],
  },
  {
    name: "Mantenimiento",
    path: "/maintenance",
    icon: "icon icon-maintenance",
    rol: ["ADMIN", "SUPER"],
  },
  {
    name: "Inventario",
    path: "/inventory",
    icon: "icon icon-inventory",
    rol: ["ADMIN", "SUPER"],
  },
  {
    name: "Costos",
    path: "/cost",
    icon: "icon icon-cost",
    rol: ["ADMIN", "SUPER"],
  },
  {
    name: "Pedidos",
    path: "/order",
    icon: "icon icon-order",
    rol: ["ADMIN", "SUPER"],
  },
  {
    name: "Transformación",
    path: "/transformation",
    icon: "icon icon-transformation",
    rol: ["ADMIN", "SUPER"],
  },
  {
    name: "Reportes",
    path: "/report",
    icon: "icon icon-report",
    rol: ["ADMIN", "SUPER"],
  },
  {
    name: "Acceso al sistema",
    path: "/system",
    icon: "icon icon-system",
    rol: ["SUPER"],
  },
];

const menu = menuState();

onMounted(() => {
  nameUser.value = isValidateJWT.name;
  validatePaths();
});

const emits = defineEmits({
  onRoute: null,
});

const clickRoute = computed(() => {
  emits("onRoute", event);
});
</script>

<style scoped>
.hola {
  margin-top: 5.5px;
}
.router-link-active {
  background-color: var(--color-gray);
}

.sidebar {
  height: calc(100vh - 50px);
  width: 230px;
  min-height: 610px;
  background-color: white;
  overflow-y: scroll;
  position: relative;
}

.sidebar-close {
  width: 70px;
  padding-top: 92px;
  height: calc(100vh - 50px);
  background-color: white;
}

.sidebar::-webkit-scrollbar {
  display: none;
}

.user-sidebar {
  background-image: url(../../assets/sidebar/background.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.icon-module-close {
  padding: 0 !important;
  margin: 14px;
}
.item {
  text-decoration: none;
  display: flex;
  color: black;
  margin: 5px 15px;
  border-radius: 10px;
}
.item-close {
  text-decoration: none;
  display: flex;
  color: black;
  border-radius: 10px;
  margin: 0px 15px;
}
.icon-user {
  font-size: 50px;
  margin-left: calc(50% - 20px);
  color: white;
}

.item:hover {
  background-color: var(--color-gray);
}

.name {
  margin-left: 20px !important;
  font-size: 18px;
  margin: 7px;
}

.name-user {
  font-size: var(--font-large);
  color: white;
}
.logo-global {
  position: absolute;
  bottom: 20px;
  width: 60px;
  left: calc(50% - 30px);
}

.icon {
  font-size: var(--font-large);
  color: var(--color-blue);
  margin-left: 10px;
  padding-top: 12px;
}
</style>
