<template>
  <h1>Hola pdf</h1>
</template>
<script setup>
import { modalState } from "@/stores/modal.js";
import { modalShowState } from "@/stores/details.js";

const modal = modalState();
const modalShow = modalShowState();

const props = defineProps({
  propertiesPdf: {
    type: Object,
    required: false,
  },
});
</script>
<style scoped></style>
