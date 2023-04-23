<template>
  <div :style="props.styles">
      <label :for="props.label">{{ props.label }}</label>
      <q-input
        dense
        filled
        :name="props.label"
        v-model="data"
        :type="props.type"
      />
  </div>
</template>
<script setup>
// Imports
import { ref, watch } from 'vue';

// Data
const data = ref("");

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true
  },
  styles: {
    type: Object,
    required: false
  }
})

const emits = defineEmits({
  onWrite: null
})

watch(data, () => {
  emits('onWrite', data.value)
})
</script>