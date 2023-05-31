<template>
  <div :style="props.styles">
    <span :for="props.label"
      >{{ props.label
      }}<span class="text-red">{{ props.required ? "*" : "" }}</span></span
    >
    <q-input
      v-model="data"
      dense
      filled
      :name="props.label"
      :rules="rules"
      :type="props.type"
    >
    </q-input>
  </div>
</template>
<script setup>
// Imports
import { ref, watch } from "vue";

// Data
const data = ref(props.value);

const rules = [
  (val) => {
    if (!val) {
      return "Email requerido";
    }
    if (!val.match(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/)) {
      return "El email no es valido";
    }
    return true;
  },
];

const props = defineProps({
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
  value: {
    required: false,
    default: "",
  },
});

const emits = defineEmits({
  onEmail: null,
});

watch(data, () => {
  emits("onEmail", data.value);
});
</script>
