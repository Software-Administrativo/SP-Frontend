<template>
  <div class="q-py-md table-container">
    <h6 class="title q-my-lg">TIPOS DE PAGO</h6>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd @onClick="clickButton" label="Crear tipo de pago" />
      <div class="container-table q-mt-lg q-pa-md" rounded>
        <q-table
          flat
          bordered
          :rows="rows"
          :columns="columns"
          row-key="name"
          :rows-per-page-options="[5, 10, 20]"
          :loading="loading"
        >
          <template v-slot:top>
            <img
              src="../../assets/sign-in/sign-in-logo.svg"
              alt=""
              width="100"
            />

            <q-space />
            <div class="row">
              <i class="icon icon-close self-center" />
              <q-input></q-input>
            </div>

            <!-- <q-select
              v-model="filter"
              multiple
              outlined
              dense
              options-dense
              :display-value="$q.lang.table.columns"
              emit-value
              map-options
              :options="columns"
              option-value="name"
              options-cover
              style="min-width: 150px"
            /> -->
          </template>
        </q-table>
      </div>
    </div>
  </div>
  <template v-if="modal.modalIsOpen">
    <ModalForm>
      <h6 class="q-my-md text-center">REGISTRAR PAGO</h6>
      <div class="row q-px-xl">
        <div class="col-12">
          <Input
            class="q-pb-xs"
            label="Nombre"
            :required="true"
            type="text"
            :ruless="rules"
            v-model="nameTypePays"
            @onWrite="getInputName"
          />
          <Input
            label="Descripción"
            type="text"
            :required="false"
            v-model="descriptionTypePays"
            @onWrite="getInputDescription"
          />
          <span class="text-required q-pb-sm"
            >Todos los campos con <span class="text-red">*</span> son
            obligatorios</span
          >
          <div class="row justify-center">
            <ButtonSave :disable="disableSave" @onClick="saveInfo" />
          </div>
        </div>
      </div>
    </ModalForm>
  </template>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { getTypePays, postTypePays } from "@/api/maintenance/type-pays";
import { modalState } from "@/stores/modal.js";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ModalForm from "@/modules/global/ModalForm.vue";
import Input from "@/commons/forms/Input.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";

const modal = modalState();
const loading = ref(false);

let nameTypePays = ref("");
let descriptionTypePays = ref("");
let disableSave = computed(() => {
  return nameTypePays.value == "";
});

const rules = [(v) => !!v || "Este campo es requerido"];

const rows = ref([]);
const columns = ref([
  {
    name: "id",
    label: "#",
    field: "id",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large);",
    style: "font-size: var(--font-medium);",
  },
  {
    name: "name",
    label: "Nombre",
    field: "name",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large);",
    style: "font-size: var(--font-medium);",
  },
  {
    name: "description",
    label: "Descripción",
    field: "description",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large);",
    style: "font-size: var(--font-medium);",
  },
  {
    name: "status",
    label: "Estado",
    field: "status",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large);",
    style: "font-size: var(--font-medium);",
  },
]);

const clickButton = () => {
  modal.toggleModal();
  nameTypePays.value = "";
  descriptionTypePays.value = "";
};

const getInputName = (value) => {
  nameTypePays.value = value;
};

const getInputDescription = (value) => {
  descriptionTypePays.value = value;
};

const saveInfo = () => {
  postDataTypePays();
  modal.toggleModal();
};

const postDataTypePays = async () => {
  const { pays } = await postTypePays({
    name: nameTypePays.value,
    description: descriptionTypePays.value,
  });
  getDataTypePays();
};

const getDataTypePays = async () => {
  loading.value = true;
  const { pays } = await getTypePays();
  let count = 1;
  pays.forEach((item) => {
    item.status = item.status ? "Inactivo" : "Activo";
    item.id = count++;
    item.description =
      item.description.trim() == "" ? "No registra" : item.description;
  });
  rows.value = pays;
  loading.value = false;
};

onMounted(() => {
  getDataTypePays();
});
</script>
<style scoped>
.text-required {
  display: inline-block;
  font-size: 12px;
}
.title {
  font-size: var(--font-title);
}
.table-container {
  position: relative;
}
.separator {
  border: 1.8px solid var(--color-gray);
}
.container-content {
  max-width: 1200px;
  margin: 0 auto;
}
.container-table {
  border-radius: 15px;
  height: 80%;
  max-height: 60vh;
  border: 2px solid var(--color-gray);
  box-shadow: 2px 3px 3px 0px rgba(0, 0, 0, 0.2);
  overflow-y: scroll;
}
.container-table::-webkit-scrollbar {
  display: none;
}
@media (min-width: 0px) and (max-width: 400px) {
  .container-table {
    max-width: 300px;
  }
}
@media (min-width: 401px) and (max-width: 520px) {
  .container-table {
    max-width: 410px;
  }
}
@media (min-width: 521px) and (max-width: 620px) {
  .container-table {
    max-width: 510px;
  }
}
</style>
