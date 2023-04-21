<template>
  <div class="container row">
    <div class="col-12 row">
      <div class="col-12 row">
        <p class="select-type-document col-3">Tipo</p>
        <p class="col-8">Número de Documento</p>
      </div>
      <q-select
        class="select-type-document col-3 q-pa-none"
        filled
        v-model="typeDocument"
        :options="types"
      />
      <q-input class="col-8" filled v-model="documentUser" type="number" />
    </div>
    <div class="col-12 row q-mt-md">
    <div class="col-12 row"> <p>Contraseña</p></div>
      <q-input
        class="col-12"
        v-model="password"
        filled
        :type="isPwd ? 'password' : 'text'"
        hint="Contraseña incorrecta"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
    </div>
    <q-btn class="btn-login text-white full-width q-mt-lg">Entrar</q-btn>
  </div>
</template>

<script setup>
import { ref } from "vue";

const typeDocument = ref(null);
const documentUser = ref("");
const password = ref("");
const isPwd = ref(true);

const types = ["CC", "CE", "NIT", "NIP", "NUIP", "PA"];
</script>
<style scoped>
.select-type-document {
  margin-right: 8.3%;
}

.btn-login {
  background-color: #0068a5;
}

.container {
  width: 470px;
}


</style>
