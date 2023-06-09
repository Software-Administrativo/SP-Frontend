<template>
  <ListModules
    v-if="routeName == 'order'"
    title="PEDIDOS"
    :items="itemsListModules"
  />
  <template v-if="routeName != 'order'">
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
    label: "Historial de Pedidos",
    icon: "icon icon-inventory",
    name: "order-history",
  },
  {
    label: "Pedidos actuales",
    icon: "icon icon-tages",
    name: "order-queue",
  },
]);
</script>

<style scoped></style>
