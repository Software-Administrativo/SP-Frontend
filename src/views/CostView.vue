<template>
  <ListModules title="INVENTARIO" :items="itemsListModules" />
</template>

<script setup>
import ListModules from "@/modules/global/ListModules.vue";
import { ref } from "vue";

const itemsListModules = ref([
  {
    name: "Gastos de siembra",
    icon: "icon icon-wineries",
    path: "/home"
  },
  {
    name: "Gastos de actividades",
    icon: "icon icon-brands",
    path: "/home"
  },
  {
    name: "Gastos administrativos",
    icon: "icon icon-product",
    path: "/home"
  },
  {
    name: "Otro tipo de gasto",
    icon: "icon icon-categories",
    path: "/home"
  },
]);
</script>

<style scoped>
</style>
