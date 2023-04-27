<template>
  <ListModules
    v-if="routeName == 'maintenance'"
    title="MANTENIMIENTO"
    :items="itemsListModules"
  />
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
    name: "maintenance-pays",
  },
  {
    label: "Tipo labores",
    icon: "icon icon-type-labors",
    name: "maintenance-labors",
  },
  {
    label: "Tipo gastos",
    icon: "icon icon-cost",
    name: "maintenance-spents",
  },
  {
    label: "Unidades de medida",
    icon: "icon icon-unit-extent",
    name: "maintenance-units-measurement",
  },
  {
    label: "EPS",
    icon: "icon icon-eps",
    name: "maintenance-eps",
  },
  {
    label: "Lotes",
    icon: "icon icon-lots",
    name: "maintenance-lots",
  },
  {
    label: "Etapas",
    icon: "icon icon-tages",
    name: "maintenance-stages",
  },
  {
    label: "Finca",
    icon: "icon icon-create-estate",
    name: "maintenance-farm",
  },
  {
    label: "Personas",
    icon: "icon icon-persons",
    name: "maintenance-people",
  },
]);
</script>

<style scoped></style>
