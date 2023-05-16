<template>
  <div class="sidebar">
    <div class="user-sidebar">
      <div class="q-py-xs">
        <i class="icon-type-document icon-user" />
        <h6 class="name-user text-center q-ma-none">{{ nameUser }}</h6>
      </div>
    </div>
    <Select
      class="select-farm"
      @onSelect="getSelectData"
      type="farms"
      label="Finca"
      message="Finca requerida"
    ></Select>
    <q-separator class="separator" />
    <div v-for="item in pathsRender" :key="item.name" @click="clickRoute">
      <RouterLink class="item" :to="item.path">
        <i class="icon-module" v-bind:class="item.icon"></i>
        <h5 class="name">{{ item.name }}</h5>
      </RouterLink>
    </div>
    <img
      src="../../assets/global/project-logo.svg"
      alt="logo"
      class="logo-global"
    />
  </div>
</template>

<script setup>
import Select from "@/commons/forms/Select.vue";
import { useStorage } from "@/stores/localStorage.js";
import { event } from "quasar";
import { computed, onMounted, ref } from "vue";

const nameUser = ref("");

const storage = useStorage();
const isValidateJWT = storage.decodeJwt();
const pathsRender = ref([]);

function validatePaths() {
  const pathsValidate = paths.filter((item) => {
    return item.rol.includes(isValidateJWT.rol);
  });
  pathsRender.value = pathsValidate;
}

const getSelectData = (value) => {
  storage.setFarm(value);
};

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
.select-farm{
  margin: 15px;
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
.sidebar::-webkit-scrollbar {
  display: none;
}
.user-sidebar {
  background-image: url(../../assets/sidebar/background.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.item {
  text-decoration: none;
  display: flex;
  color: black;
  margin: 5px 15px;
  border-radius: 10px;
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
