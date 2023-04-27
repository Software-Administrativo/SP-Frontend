<template>
  <div class="q-py-md table-container">
    <h6 class="q-my-lg">ETAPAS</h6>
    <q-separator class="separator" />
    <ButtonAdd @onClick="clickButton" label="Crear nueva etapa" />
    <div class="container-table q-mt-lg q-pa-md" rounded>
      <q-table
        class="my-sticky-header-table"
        flat
        bordered
        title="Etapas"
        :rows="rows"
        :columns="columns"
        row-key="name"
        v-model:pagination="pagination"
      />
    </div>
  </div>
  <template v-if="modal.modalIsOpen">
    <ModalForm>
      <h6 class="q-my-md text-center">REGISTRAR ETAPA</h6>
      <div class="row q-px-xl">
        <div class="col-12">
          <q-select
            class="q-pb-xs"
            filled
            dense
            label="Finca"
            :required="true"
            type="text"
            :ruless="rules"
            v-model="model"
            :options="options"
          />
          <Input
            class="q-pb-xs"
            label="Nombre"
            :required="true"
            type="text"
            :ruless="rules"
            v-model="nameStages"
            @onWrite="getInputName"
          />
          <Input
            class="q-pb-xs"
            label="Descripción"
            type="text"
            :required="false"
            :ruless="rules"
            v-model="descriptionStages"
            @onWrite="getInputDescription"
          />
          <Input
            label="Padre"
            :required="true"
            type="text"
            :ruless="rules"
            v-model="fatherStages"
            @onWrite="getInputFather"
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
import { getStages, postStages } from "@/api/maintenance/stages";
import { modalState } from "@/stores/modal.js";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ModalForm from "@/modules/global/ModalForm.vue";
import Input from "@/commons/forms/Input.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";

const modal = modalState();

let model = ref(null);
const options = ["1", "2", "3", "4", "5"];

let nameStages = ref("");
let descriptionStages = ref("");
let fatherStages = ref("");
let disableSave = computed(() => {
  return nameStages.value == "";
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
    name: "father",
    label: "Padre",
    field: "father",
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
  nameStages.value = "";
  descriptionStages.value = "";
  fatherStages.value = "";
};

const getInputName = (value) => {
  nameStages.value = value;
};

const getInputDescription = (value) => {
  descriptionStages.value = value;
};

const getInputFather = (value) => {
  fatherStages.value = value;
};

const saveInfo = () => {
  postDataStages();
  modal.toggleModal();
};

const postDataStages = async () => {
  //falta peticion del backend
  const { stages } = await postStages({
    name: nameStages.value,
    description: descriptionStages.value,
  });
  getDataStages();
};

const getDataStages = async () => {
  const { stages } = await getStages();
  let count = 1;
  stages.forEach((item) => {
    item.status = item.status ? "Inactivo" : "Activo";
    item.id = count++;
    item.description =
      item.description == ""
        ? "No registra"
        : item.description || item.description == null
        ? "No registra"
        : item.description;
  });
  rows.value = stages;
};

onMounted(() => {
  getDataStages();
});
</script>
<style scoped>
.text-required {
  display: inline-block;
  font-size: 12px;
}
.table-container {
  position: relative;
}
.separator {
  border: 1.8px solid var(--color-gray);
}
.container-content {
  max-width: 900px;
  margin: 0 auto;
}
.container-table {
  border-radius: 15px;
  height: 80%;
  max-height: 50vh;
  border: 2px solid var(--color-gray);
  box-shadow: 2px 3px 3px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
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
