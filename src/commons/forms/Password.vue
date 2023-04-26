<template>
  <div :style="props.styles">
    <label>{{ props.label }}</label>
    <q-input
      v-model="password"
      dense
      filled
      :rules="[(val) => !!val || 'Contraseña requerida']"
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
const password = ref("");
const isPasswordType = ref(true);

const props = defineProps({
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
  onPassword: null,
});

watch(password, () => {
  emits("onPassword", password.value);
});
</script>
