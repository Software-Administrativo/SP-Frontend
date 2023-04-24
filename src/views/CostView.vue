<template>
  <ListModules title="INVENTARIO" :items="itemsListModules" />
</template>

<script setup>
import ListModules from "@/modules/global/ListModules.vue";
import { ref } from "vue";

const itemsListModules = ref([
  {
    label: "Gastos de siembra",
    icon: "icon icon-wineries",
    name: "/home"
  },
  {
    label: "Gastos de actividades",
    icon: "icon icon-brands",
    name: "/home"
  },
  {
    label: "Gastos administrativos",
    icon: "icon icon-product",
    name: "/home"
  },
  {
    label: "Otro tipo de gasto",
    icon: "icon icon-categories",
    name: "/home"
  },
]);
</script>

<style scoped>
</style>
