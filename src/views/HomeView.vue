<template>
  <div class="q-py-md">
    <h6 class="q-my-lg">LISTA DE MODULOS</h6>
    <q-separator class="separator" />
    <Cards />
  </div>
</template>
<script setup>
import Cards from "@/modules/home/Cards.vue";
</script>
<style scoped>
.separator {
  border: 1.8px solid var(--color-gray);
}
</style>
