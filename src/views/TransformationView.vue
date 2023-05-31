<template>
  <ListModules
    v-if="routeName == 'transformation'"
    title="TRANSFORMACION"
    :items="itemsListModules"
  />
  <template v-if="routeName != 'transformation'">
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
    label: "Modelos de trasformacion",
    icon: "icon icon-inventory",
    name: "trasformation-model",
  },
  {
    label: "Costos de transformacion",
    icon: "icon icon-tages",
    name: "transformation-cost",
  },
]);
</script>

<style scoped></style>
