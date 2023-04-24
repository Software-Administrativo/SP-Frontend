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
    label: "Tipo pagos",
    icon: "icon icon-type-money",
    name: "maintenance-pays"
  },
  {
    label: "Tipo labores",
    icon: "icon icon-type-labors",
    name: "maintenance-labors"
  },
  {
    label: "Tipo gastos",
    icon: "icon icon-cost",
    name: "/home"
  },  
  {
    label: "Unidades de medida",
    icon: "icon icon-unit-extent",
    name: "/home"
  },
  {
    label: "EPS",
    icon: "icon icon-eps",
    name: "/home"
  },
  {
    label: "Tipo de documento",
    icon: "icon icon-type-document",
    name: "/home"
  },
  {
    label: "Lotes",
    icon: "icon icon-lots",
    name: "/home"
  },
  {
    label: "Etapas",
    icon: "icon icon-tages",
    name: "/home"
  },
  {
    label: "Finca",
    icon: "icon icon-create-estate",
    name: "/home"
  },
  {
    label: "Personas",
    icon: "icon icon-persons",
    name: "/home"
  },
]);
</script>

<style scoped>
</style>
