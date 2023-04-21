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
      :hint="messageError"
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
  <q-btn class="btn-login text-white full-width q-mt-lg" to="/home">Entrar</q-btn>
</template>

<script setup>
import { ref } from "vue";

const typeDocument = ref(null);
const documentUser = ref("");
const password = ref("");
const isPasswordType = ref(true);
let messageError = ref()

const types = ["CC", "CE", "NIT", "NIP", "NUIP", "PA"];
</script>
<style scoped>
.select-type-document {
  margin-right: 8.3%;
}

.btn-login {
  background-color: #0068a5;
}
</style>
