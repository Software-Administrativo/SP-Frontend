<template>
  <div :style="props.styles">
    <label for="type"
      >{{ props.label
      }}<span class="text-red">{{ props.required ? "*" : "" }}</span></label
    >
    <q-select
      class="q-pa-none"
      dense
      filled
      name="type"
      v-model="typeDocument"
      :options="types"
      :rules="defaultRules"
    />
  </div>
</template>
<script setup>
// Imports
import { onMounted, ref, watch, computed } from "vue";
import { useStorage } from "@/stores/localStorage.js";

// Data
const typeDocument = ref(props.value);
const types = ref([]);
const storage = useStorage();
const namesFarms = ref([]);

const defaultRules = computed(() => {
  if(props.ruless){
    return props.ruless;
  } else{
    return [(val) => !!val || props.message];
  }
});

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
  message: {
    type: String,
    required: false,
    default: "Tipo requerido",
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
    types.value = ["CC", "CE", "NIT", "NIP", "NUIP", "PA"];
  } else if (props.type === "roles") {
    types.value = ["ADMIN"].map((item) => {
      return `${item[0].toUpperCase()}${item.slice(1)}`;
    });
  } else if (props.type === "farms") {
    const isValidateJWT = storage.decodeJwt();
    const farms = isValidateJWT.farms;

    const names = farms.forEach((element) => {
      namesFarms.value.push(element.name);
    });
    types.value = namesFarms.value;
  }
});
</script>
