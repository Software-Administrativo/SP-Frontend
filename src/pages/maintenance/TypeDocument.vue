<template>
  <div class="q-py-md table-container">
    <h6 class="q-my-lg">TIPO DE DOCUMENTO</h6>
    <q-separator class="separator" />
    <ButtonAdd @onClick="clickButton" label="Crear nuevo tipo de documento" />
    <div class="container-table q-mt-lg q-pa-md" rounded>
      <q-table
        class="my-sticky-header-table"
        flat
        bordered
        title="Usuarios"
        :rows="rows"
        :columns="columns"
        row-key="name"
        v-model:pagination="pagination"
      />
    </div>
  </div>
  <template v-if="modal.modalIsOpen">
    <ModalForm>
      <h6 class="q-my-md text-center">REGISTRAR TIPO DOCUMENTO</h6>
      <div class="row q-px-xl">
        <div class="col-12">
          <Input
            class="q-pb-xs"
            label="Nombre"
            :required=true
            type="text"
            :ruless=rules
            v-model="nameTypeDocument"
            @onWrite="getInputName"
          />
          <Input
            class="q-pb-xs"
            label="Descripción"
            type="text"
            :required=false 
            :ruless=rules
            v-model="descriptionTypeDocument"
            @onWrite="getInputDescription"
          />
          <span class="text-required q-pb-sm">Todos los campos con 
          <span class="text-red">*</span> son obligatorios</span>
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
import { getTypeDocument, postTypeDocument } from "@/api/maintenance/type-document";
import { modalState } from "@/stores/modal.js";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ModalForm from "@/modules/global/ModalForm.vue";
import Input from "@/commons/forms/Input.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";

const modal = modalState();

let nameTypeDocument = ref("");
let descriptionTypeDocument = ref("");
let disableSave = computed(() => {
  return nameTypeDocument.value == "";
});

const rules = [
  (v) => !!v || "Este campo es requerido",
  (v) => (v && v.length <= 10) || "El nombre debe tener menos de 10 caracteres",
];

const rows = ref([]);
const columns = ref([
  { name: "id", label: "#", field: "id", align: "left", sortable: true },
  {
    name: "name",
    label: "Nombre",
    field: "name",
    align: "left",
    sortable: true,
  },
  {
    name: "description",
    label: "Descripción",
    field: "description",
    align: "left",
    sortable: true,
  },
  {
    name: "status",
    label: "Estado",
    field: "status",
    align: "left",
    sortable: true,
  },
]);

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  sortBy: "id",
  descending: false,
});

const clickButton = () => {
  modal.toggleModal();
  nameTypeDocument.value = ""
  descriptionTypeDocument.value = ""
  observationtypeDocument.value = ""
};

const getInputName = (value) => {
  nameTypeDocument.value = value;
};

const getInputDescription = (value) => {
  descriptionTypeDocument.value = value;
};



const saveInfo = () => {
  postDataTypeDocument();
  modal.toggleModal();
};

const postDataTypeDocument = async () => {
  //falta peticion del backend
  const { typeDocument } = await postTypeDocument({
    name: nameTypeDocument.value,
    description: descriptionTypeDocument.value,
  });
  getDataTypeDocument();
}

const getDataTypeDocument = async () => {
  const { typeDocument } = await getTypeDocument();
  let count = 1;
  typeDocument.forEach((item) => {
    item.status = item.status ? "Inactivo" : "Activo";
    item.id = count++;
    item.description = item.description=='' ? "No registra" : item.description || item.description == null ? "No registra" : item.description;
  });
  rows.value = typeDocument;
};

onMounted(() => {
  getDataTypeDocument();
});
</script>
<style scoped>
.text-required{
  display: inline-block;
  font-size: 12px;
}
.table-container {
  position: relative;
}
.separator {
  border: 1.8px solid var(--color-gray);
}
.container-table {
  border-radius: 15px;
  height: 100%;
  max-height: 50vh;
  border: 2px solid var(--color-gray);
  box-shadow: 2px 3px 3px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
</style>
