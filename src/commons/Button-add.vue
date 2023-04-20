<template>
  <q-btn
    class="q-mt-md q-px-sm"
    :label=defineLabel()
    icon="add"
    @click="handleClick"
  />
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  }
});

// Definimos los eventos que va a emitir el componente
const emits = defineEmits({
  onClick: null,
});

const handleClick = (event) => {
  emits("onClick", event)
};

const defineLabel = () => {
  return props.label
}

</script>