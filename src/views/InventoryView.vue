<template>
  <ListModules v-if="routeName == 'inventory'" title="INVENTARIO" :items="itemsListModules" />
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
    name: "Bodegas",
    icon: "icon icon-wineries",
    path: "inventory-cellars"
  },
  {
    name: "Marcas",
    icon: "icon icon-brands",
    path: "inventory-brands"
  },
  {
    name: "Categorias",
    icon: "icon icon-categories",
    path: "inventory-categories"
  },
  {
    name: "Productos",
    icon: "icon icon-product",
    path: "inventory-products"
  },
  {
    name: "Entradas al inventario",
    icon: "icon icon-inventory-entries",
    path: "inventory-entries"
  },
  {
    name: "Ajustes de existencia",
    icon: "icon icon-inventory-adjust",
    path: "inventory-stock"
  }
]);
</script>

<style scoped>
</style>
