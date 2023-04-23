<template>
  <div class="row">
    <div class="col-3">
      <label for="type">Tipo</label>
      <q-select
        class="select-type-document q-pa-none"
        dense
        filled
        name="type"
        v-model="typeDocument"
        :options="types"
      />
    </div>
    <div class="col">
      <label for="document">Número de documento</label>
      <q-input
        class=""
        dense
        filled
        name="document"
        v-model="documentUser"
        type="number"
      />
    </div>
  </div>
  <div class="row q-mt-md">
    <label>Contraseña</label>
    <q-input
      class="col-12"
      v-model="password"
      dense
      filled
      :type="isPasswordType ? 'password' : 'text'"
      :hint="error"
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
  <q-btn @click="sendProperties()" class="btn-login text-white full-width q-mt-lg">Entrar</q-btn>
</template>

<script setup>
// Imports
import { ref } from "vue";

// Data - mocked data just for testing routes and its permissions
const typeDocument = ref("CC");
const documentUser = ref("1234");
const password = ref("1234");
const isPasswordType = ref(true);
const types = ["CC", "CE", "NIT", "NIP", "NUIP", "PA"];

// Props
const props = defineProps({
  error: {
    type: String,
    default: null,
  },
})

// Emits
const emits = defineEmits({
  onForm: null
})

// Functions
const sendProperties = () => {
  emits('onForm', {typeDocument, documentUser, password})
}

</script>
<style scoped>
.select-type-document {
  margin-right: 8.3%;
}

.btn-login {
  background-color: #0068a5;
}
</style>
