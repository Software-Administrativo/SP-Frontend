<template>
  <div :style="props.styles">
    <label :for="props.label"
      >{{ props.label }}
      <span class="text-red">{{ props.required ? "*" : "" }}</span>
    </label>
    <q-input
      dense
      filled
      :name="props.label"
      v-model="data"
      :type="props.type"
      :rules="props.ruless"
    />
  </div>
</template>
<script setup>
// Imports
import { ref, watch } from "vue";

// Data
const data = ref(props.value);

watch(() => props.value, (newValue) => {
  data.value = newValue;
});

// Props
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  styles: {
    type: Object,
    required: false,
  },
  required: {
    type: Boolean,
    required: false,
    default: false,
  },
  ruless: {
    type: Array,
    required: false,
    default: () => [],
  },
  value: {
    type: String,
    required: false,
    default: "",
  },
});

// Emits
const emits = defineEmits({
  onWrite: null,
});

// Watchers
watch(data, () => {
  emits("onWrite", data.value);
});
</script>
