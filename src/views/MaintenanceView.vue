<template>
  <ListModules v-if="routeName == 'maintenance'" title="MANTENIMIENTO" :items="itemsListModules" />
  <template v-if="routeName != 'maintenance'">
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
    name: "Tipo pagos",
    icon: "icon icon-type-money",
    path: "maintenance-pays"
  },
  {
    name: "Tipo gastos",
    icon: "icon icon-cost",
    path: "/home"
  },
  {
    name: "Tipo labores",
    icon: "icon icon-type-labors",
    path: "maintenance-labors"
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
