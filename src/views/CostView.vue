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
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import ListModules from "@/modules/global/ListModules.vue";


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
]);
</script>

<style scoped></style>
