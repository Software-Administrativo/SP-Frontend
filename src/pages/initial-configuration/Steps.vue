<template>
  <div class="q-pa-md">
    <div class="container-steps">
      <span class="title-steps">Crea tu primera finca</span>
      <Input
        class="q-pb-xs"
        label="Nombre"
        :required="true"
        type="text"
        :ruless="rules"
        v-model="nameFarm"
        @onWrite="getInputName"
      />
      <Input
        class="q-pb-xs"
        label="Ubicación"
        type="text"
        :required="true"
        :ruless="rules"
        v-model="addressFarm"
        @onWrite="getInputAddress"
      />
      <Input
        class="q-pb-xs"
        label="Propietario"
        :required="true"
        type="text"
        :ruless="rules"
        v-model="ownerFarm"
        @onWrite="getInputOwner"
      />
      <span class="text-required q-pb-sm"
        >Todos los campos con <span class="text-red">*</span> son
        obligatorios</span
      >
      <div class="row justify-center q-mt-md">
        <ButtonSave :disable="disableSave" @onClick="postDataFarm" />
      </div>
      <div class="spinner" v-if="isLoading">
        <q-spinner-ios color="primary" size="2.5em" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Input from "@/commons/forms/Input.vue";
import { postFarm } from "@/api/maintenance/farm";
import ButtonSave from "@/commons/forms/ButtonSave.vue";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const $q = useQuasar();

const router = useRouter();

const isLoading = ref(false);
let nameFarm = ref("");
let addressFarm = ref("");
let ownerFarm = ref("");

const rules = [(v) => !!v || "Este campo es requerido"];

const disableSave = computed(() => {
  if (
    nameFarm.value == "" ||
    addressFarm.value == "" ||
    ownerFarm.value == ""
  ) {
    return true;
  } else if (isLoading.value == true) {
    return true;
  } else {
    return false;
  }
});

const getInputName = (value) => {
  nameFarm.value = value;
};

const getInputAddress = (value) => {
  addressFarm.value = value;
};

const getInputOwner = (value) => {
  ownerFarm.value = value;
};

async function postDataFarm() {
  console.log(nameFarm.value, addressFarm.value, ownerFarm.value);
  isLoading.value = true;
  try {
    await postFarm({
      name: nameFarm.value,
      address: addressFarm.value,
      owner: ownerFarm.value,
    });
    isLoading.value = false;
    showNotification("positive", "Bienvenido");
    router.push({ name: "home" });
  } catch (error) {
    console.log(error);
    isLoading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

const showNotification = (type, message) => {
  $q.notify({
    type: type,
    message: message,
    position: "top",
  });
};
</script>
<style scoped>
.title-steps {
  font-size: 25px;
}
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 2px solid var(--color-gray);
  border-radius: 10px;
}
.container-steps {
  position: relative;
  max-width: 500px;
  min-width: 280px;
  background-color: white;
  padding: 50px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 2px 3px 3px 0px rgba(0, 0, 0, 0.2);
  overflow-y: scroll;
}
.container-steps::-webkit-scrollbar {
  display: none;
}
</style>
