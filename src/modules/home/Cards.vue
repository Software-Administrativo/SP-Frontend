<template>
  <div class="container-view">
    <div class="item-card-module">
      <div class="q-mt-lg" v-for="item in infoModules">
        <p class="title-module text-center">{{ item.name }}</p>
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
.container-view {
  max-width: 1200px;
  margin: 0 auto;
}
.item-card-module {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 10px;
  width: 100%;
  max-height: 70vh;
  padding-bottom: 20px;
  place-items: center;
  overflow-y: scroll;
}
.item-card-module::-webkit-scrollbar {
  display: none;
}
.icon-section-card {
  padding-top: 26px;
  padding-bottom: 23px;
}
.my-card {
  width: 280px;
  border-radius: 10px;
}
.my-card:hover {
  cursor: pointer;
  background-color: var(--color-gray);
}
.title-module {
  font-size: var(--font-subtitle);
}
.icon {
  color: var(--color-blue);
  font-size: 50px;
  margin: calc(50% - 25px);
}
.enter-card {
  font-size: var(--font-large);
}

@media (max-width: 600px) {
  .my-card {
    width: 200px;
    border-radius: 10px;
    /* border: 1.8px solid var(--color-gray); */
  }
}
</style>
