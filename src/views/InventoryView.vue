<template>
  <ListModules title="INVENTARIO" :items="itemsListModules" />
</template>

<script setup>
import ListModules from "@/modules/global/ListModules.vue";
import { ref } from "vue";

const itemsListModules = ref([
  {
    name: "Bodegas",
    icon: "icon icon-wineries",
    path: "/home"
  },
  {
    name: "Marcas",
    icon: "icon icon-brands",
    path: "/home"
  },
  {
    name: "Categorias",
    icon: "icon icon-categories",
    path: "/home"
  },
  {
    name: "Productos",
    icon: "icon icon-product",
    path: "/home"
  },
  {
    name: "Entrada al inventario",
    icon: "icon icon-inventory-entries",
    path: "/home"
  },
  {
    name: "Ajustes de existencia",
    icon: "icon icon-inventory-adjust",
    path: "/home"
  }
]);
</script>

<style scoped>
</style>
