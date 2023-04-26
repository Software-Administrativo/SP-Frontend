<template>
  <div :style="props.styles">
    <label for="type">{{ props.label }}</label>
    <q-select
      class="q-pa-none"
      dense
      filled
      name="type"
      v-model="typeDocument"
      :options="types"
      :rules="[(val) => !!val || 'Tipo requerido']"
    />
  </div>
</template>
<script setup>
// Imports
import { onMounted, ref, watch } from "vue";

// Data
const typeDocument = ref("");
const types = ref([]);

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
});

const emits = defineEmits({
  onSelect: null,
});

// Cuando la variable typeDocument cambia, emitimos el valor del input gracias al v-model
watch(typeDocument, () => {
  emits("onSelect", typeDocument.value);
});

// onMounted(async () => {
onMounted(() => {
  if (props.type === "documents") {
    // AQUI HACEMOS LA PETICION AL BACKEND PARA TRAER LOS DOCUMENTOS
    // types.value = await getAllDocuments()
    types.value = ["CC", "CE", "NIT", "NIP", "NUIP", "PA"];
  } else if (props.type === "pays") {
    types.value = ["debito", "credito"].map((item) => {
      return `${item[0].toUpperCase()}${item.slice(1)}`;
    });
  }
});
</script>
