<template>
  <div class="item-card-module">
    <div class="q-mt-lg" v-for="item in infoModules">
      <p class="title-module">{{ item.name }}</p>
      <q-card class="my-card" @click="goToModule(item.path)">
        <q-card-section class="icon-section-card">
          <i v-bind:class="item.icon" />
        </q-card-section>
        <q-separator class="separator" />
        <div class="row justify-center">
          <span class="q-py-sm enter-card">Ingresar</span>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const infoModules = [
  {
    name: "Modulo Mantenimiento",
    path: "/maintenance",
    icon: "icon icon-maintenance",
    rol: "user",
  },
  {
    name: "Modulo Inventario",
    path: "/inventory",
    icon: "icon icon-inventory",
    rol: "user",
  },
  {
    name: "Modulo Costos",
    path: "/cost",
    icon: "icon icon-cost",
    rol: "user",
  },
  {
    name: "Modulo Pedidos",
    path: "/order",
    icon: "icon icon-order",
    rol: "user",
  },
  {
    name: "Modulo Transformación",
    path: "/transformation",
    icon: "icon icon-transformation",
    rol: "user",
  },
  {
    name: "Generar Informes",
    path: "/report",
    icon: "icon icon-report",
    rol: "user",
  },
];

const goToModule = (route) => {
  router.push(route);
};
</script>

<style scoped>
.item-card-module {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  grid-gap: 20px;
  place-items: center;
}
.icon-section-card {
  padding-top: 26px;
  padding-bottom: 23px;
}
.my-card {
  width: 230px;
  border-radius: 10px;
  border: 1.8px solid var(--color-gray);
}
.my-card:hover {
  cursor: pointer;
  background-color: var(--color-gray);
}
.title-module {
  font-size: 15px;
}
.icon {
  color: var(--color-blue);
  font-size: 30px;
  margin: calc(50% - 15px);
}
.separator {
  border: 1.8px solid var(--color-gray);
}
.enter-card {
  font-size: 12px;
}
</style>
