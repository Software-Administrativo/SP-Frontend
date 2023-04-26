<template>
  <ListModules
    v-if="routeName == 'inventory'"
    title="INVENTARIO"
    :items="itemsListModules"
  />
  <template v-if="routeName != 'inventory'">
    <RouterView></RouterView>
  </template>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import ListModules from "@/modules/global/ListModules.vue";

const routeName = computed(() => {
  return useRoute().name;
});

const itemsListModules = ref([
  {
    label: "Bodegas",
    icon: "icon icon-wineries",
    name: "inventory-cellars",
  },
  {
    label: "Marcas",
    icon: "icon icon-brands",
    name: "inventory-brands",
  },
  {
    label: "Categorias",
    icon: "icon icon-categories",
    name: "inventory-categories",
  },
  {
    label: "Productos",
    icon: "icon icon-product",
    name: "inventory-products",
  },
  {
    label: "Entradas al inventario",
    icon: "icon icon-inventory-entries",
    name: "inventory-entries",
  },
  {
    label: "Ajustes de existencia",
    icon: "icon icon-inventory-adjust",
    name: "inventory-stock-adjustments",
  },
]);
</script>

<style scoped></style>
