<template>
  <div class="row">
    <div class="col-3">
      <Select
        @onSelect="getSelectData"
        :style="selectStyles"
        :required="true"
        type="documents"
        label="Tipo"
      ></Select>
    </div>
    <div class="col">
      <Input
        @onWrite="getInputData"
        label="Número documento"
        type="number"
        :required="true"
      />
    </div>
  </div>
  <div class="row q-mt-md">
    <div class="col-12">
      <Password
        @onPassword="getPasswordData"
        label="Contraseña"
        :required="true"
      />
    </div>
    <div class="col-12">
      <div class="forgot-password-link">
        <a href="#">¿Olvidaste la contraseña?</a>
      </div>
    </div>
  </div>
  <span class="invalidateData" v-if="props.error"
    >Credenciales Incorrectas</span
  >
  <template v-if="isInactive">
    <q-btn
      disable
      @click="sendProperties()"
      class="btn-login text-white full-width q-mt-lg"
      >Entrar</q-btn
    >
  </template>
  <template v-else>
    <q-btn
      @click="sendProperties()"
      class="btn-login text-white full-width q-mt-lg"
      >Entrar</q-btn
    >
  </template>
</template>

<script setup>
// Imports
import Input from "@/commons/forms/Input.vue";
import Password from "@/commons/forms/Password.vue";
import Select from "@/commons/forms/Select.vue";
import { computed, ref } from "vue";

// Data - mocked data just for testing routes and its permissions
const typeDocument = ref("");
const documentUser = ref("");
const password = ref("");
const isInactive = computed(() => {
  return (
    typeDocument.value === "" ||
    documentUser.value === "" ||
    password.value === ""
  );
});

const props = defineProps({
  error: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const selectStyles = ref({
  marginRight: "8.3%",
});

// Emits
const emits = defineEmits({
  onForm: null,
});

// Functions
const sendProperties = () => {
  emits("onForm", {
    typeDocument: typeDocument.value,
    documentUser: documentUser.value,
    password: password.value,
  });
};

// Función que se activa cuando el componente Select emite el evento onSelect y recibimos su valor
const getSelectData = (value) => {
  typeDocument.value = value;
};

const getInputData = (value) => {
  documentUser.value = value;
};

const getPasswordData = (value) => {
  password.value = value;
};
</script>
<style scoped>
.btn-login {
  background-color: #0068a5;
}
.invalidateData {
  background-color: rgba(255, 0, 0, 0.288);
  border-radius: 5px;
  padding: 5px 15px;
}

</style>
