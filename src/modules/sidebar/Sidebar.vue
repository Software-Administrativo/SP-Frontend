<template>
  <div class="sidebar">
    <div class="user-sidebar">
      <div class="q-py-sm">
        <i class="icon-type-document icon-user"
        />
        <h6 class="name-user text-center q-ma-none q-pb-sm">{{ nameUser }}</h6>
      </div>
    </div>
    <q-separator class="separator" />
    <div v-for="item in paths" :key="item.name" @click="clickRoute">
      <RouterLink class="item" :to="item.path">
        <i class="icon-module" v-bind:class="item.icon"></i>
        <h5 class="name">{{ item.name }}</h5>
      </RouterLink>
      <q-separator class="separator" />
    </div>
    <img
      src="../../assets/global/project-logo.svg"
      alt="logo"
      class="logo-global"
    />
  </div>
</template>

<script setup>
import { useStorage } from "@/stores/localStorage.js";
import { menuState } from "@/stores/menu";
import { event } from "quasar";
import { computed, onMounted, ref } from "vue";

const nameUser = ref("Hola");
const token = useStorage();

const isValidateJWT = token.decodeJwt();

const paths = [
  {
    name: "Inicio",
    path: "/home",
    icon: "icon icon-home",
    rol: ["admin", "user"],
  },
  {
    name: "Mantenimiento",
    path: "/maintenance",
    icon: "icon icon-maintenance",
    rol: ["admin", "user"],
  },
  {
    name: "Inventario",
    path: "/inventory",
    icon: "icon icon-inventory",
    rol: ["admin", "user"],
  },
  {
    name: "Costos",
    path: "/cost",
    icon: "icon icon-cost",
    rol: ["admin", "user"],
  },
  {
    name: "Pedidos",
    path: "/order",
    icon: "icon icon-order",
    rol: ["admin", "user"],
  },
  {
    name: "Transformación",
    path: "/transformation",
    icon: "icon icon-transformation",
    rol: ["admin", "user"],
  },
  {
    name: "Reportes",
    path: "/report",
    icon: "icon icon-report",
    rol: ["admin", "user"],
  },
  {
    name: "Acceso al sistema",
    path: "/system",
    icon: "icon icon-system",
    rol: ["admin"],
  },
];

const menu = menuState();

onMounted(() => {
  nameUser.value = isValidateJWT.name
});

const emits = defineEmits({
  onRoute: null,
});

const clickRoute = computed(() => {
  emits("onRoute", event);
});
</script>

<style scoped>
.router-link-active {
  background-color: var(--color-gray);
}

.sidebar {
  height: calc(100vh - 50px);
  width: 220px;
  background-color: white;
  border-right: 3px solid var(--color-gray);
  position: relative;
}
.user-sidebar{
  background-image: url(../../assets/sidebar/background.png);
  background-repeat: no-repeat;
  background-size: cover;
}

.separator {
  border: 1.8px solid var(--color-gray);
}

.item {
  text-decoration: none;
  display: flex;
  color: black;
}
.icon-user{
  font-size: 50px;
  margin-left: calc(50% - 20px);
  color: white;
}

.item:hover {
  background-color: var(--color-gray);
}

.name {
  margin-left: 20px !important;
  font-size: var(--font-large);
  margin: 7px;
}

.name-user {
  font-size: var(--font-large);
  color: white;
}

.logo-global {
  position: absolute;
  width: 60px;
  bottom: 20px;
  left: calc(50% - 30px);
}

.icon {
  font-size: var(--font-large);
  color: var(--color-blue);
  margin-left: 10px;
  padding-top: 10px;
}
</style>
