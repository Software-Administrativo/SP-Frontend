<template>
  <ListModules
    v-if="routeName == 'cost'"
    title="COSTOS"
    :items="itemsListModules"
  />
  <template v-if="routeName != 'cost'">
    <RouterView></RouterView>
  </template>
</template>

<script setup>
import ListModules from "@/modules/global/ListModules.vue";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const routeName = computed(() => {
  return useRoute().name;
});

const itemsListModules = ref([
  {
    label: "Gastos de siembra",
    icon: "icon icon-wineries",
    name: "cost-planting",
  },
  {
    label: "Gastos de actividades",
    icon: "icon icon-brands",
    name: "cost-activity-expenses",
  },
  {
    label: "Gastos administrativos",
    icon: "icon icon-product",
    name: "cost-admin-expenses",
  },
  {
    label: "Gastos de Nómina",
    icon: "icon icon-payroll",
    name: "cost-payroll-expenses",
  },
]);
</script>

<style scoped></style>
