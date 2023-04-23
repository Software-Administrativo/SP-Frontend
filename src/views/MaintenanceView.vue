<template>
  <ListModules title="MANTENIMIENTO" :items="itemsListModules" />
</template>

<script setup>
import ListModules from "@/modules/global/ListModules.vue";
import { ref } from "vue";

const itemsListModules = ref([
  {
    name: "Tipo pagos",
    icon: "icon icon-type-money",
    path: "/home"
  },
  {
    name: "Tipo gastos",
    icon: "icon icon-cost",
    path: "/home"
  },
  {
    name: "Tipo labores",
    icon: "icon icon-type-labors",
    path: "/home"
  },
  {
    name: "Unidades de medida",
    icon: "icon icon-unit-extent",
    path: "/home"
  },
  {
    name: "EPS",
    icon: "icon icon-eps",
    path: "/home"
  },
  {
    name: "Tipo de documento",
    icon: "icon icon-type-document",
    path: "/home"
  },
  {
    name: "Lotes",
    icon: "icon icon-lots",
    path: "/home"
  },
  {
    name: "Etapas",
    icon: "icon icon-tages",
    path: "/home"
  },
  {
    name: "Finca",
    icon: "icon icon-create-estate",
    path: "/home"
  },
  {
    name: "Personas",
    icon: "icon icon-persons",
    path: "/home"
  },
]);
</script>

<style scoped>
</style>
