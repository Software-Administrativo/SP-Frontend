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
    icon: "icon icon-home",
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
    icon: "icon icon-inventory",
    name: "inventory-products",
  },
]);
</script>

<style scoped></style>
