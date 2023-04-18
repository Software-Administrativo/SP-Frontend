<template>
  <span v-if="pokemon">{{ pokemon }}</span>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { getPokemon } from '../api/sign-in'

const pokemon = ref({});

// Ciclo de vida de Vue
onMounted(async () => {
  pokemon.value = await getPokemon('ditto');
});
</script>
<style scoped></style>