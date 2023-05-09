<template>
  <div :style="props.styles">
    <label
      >{{ props.label
      }}<span class="text-red">{{ props.required ? "*" : "" }}</span></label
    >
    <q-input
      v-model="data"
      dense
      filled
      :rules="rules"
      :type="isPasswordType ? 'password' : 'text'"
    >
      <template v-slot:append>
        <q-icon
          :name="isPasswordType ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPasswordType = !isPasswordType"
        />
      </template>
    </q-input>
  </div>
</template>
<script setup>
// Imports
import { ref, watch } from "vue";

// Data
const data = ref("");
const isPasswordType = ref(true);

const rules = [
  (val) => {
    if (!val) {
      return "Contraseña requerida";
    }
    if (val.length < 6 || val.length > 20) {
      return "La contraseña debe tener minimo 6 caracteres y maximo 20";
    }
    if (!val.match(/[a-z]/g)) {
      return "La contraseña debe contener al menos una letra minúscula";
    }
    if (!val.match(/[A-Z]/g)) {
      return "La contraseña debe contener al menos una letra mayúscula";
    }
    if (!val.match(/[0-9]/g)) {
      return "La contraseña debe contener al menos un número";
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
});

const emits = defineEmits({
  onPassword: null,
});

watch(data, () => {
  emits("onPassword", data.value);
});
</script>
