<template>
  <div class="q-py-md table-container">
    <h6 class="title q-my-lg">LOTES</h6>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd @onClick="clickButton" label="Crear nuevo lote" />
      <div class="container-table q-mt-lg q-pa-md" rounded>
        <q-table
          flat
          bordered
          title="Usuarios"
          :rows="rows"
          :columns="columns"
          row-key="name"
          :loading="loading"
          v-model:pagination="pagination"
        />
      </div>
    </div>
  </div>
  <template v-if="modal.modalIsOpen">
    <ModalForm>
      <h6 class="q-my-md text-center">REGISTRAR LOTE</h6>
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
            v-model="nameLots"
            @onWrite="getInputName"
          />
          <Input
            label="Descripción"
            :required="false"
            type="text"
            :ruless="rules"
            v-model="descriptionLots"
            @onWrite="getInputDescription"
          />
          <Input
            label="Tamaño"
            :required="true"
            type="text"
            :ruless="rules"
            v-model="sizeLots"
            @onWrite="getInputSize"
          />
          <Input
            label="Estado del suelo"
            :required="true"
            type="text"
            :ruless="rules"
            v-model="soilStateLots"
            @onWrite="getInputSoilState"
          />
          <Input
            label="Padre"
            :required="true"
            type="text"
            :ruless="rules"
            v-model="fatherLots"
            @onWrite="getInputFather"
          />
          <Input
            label="Densidad Siembra"
            :required="true"
            type="text"
            :ruless="rules"
            v-model="plantingDensityLots"
            @onWrite="getInputPlantingDensity"
          />
          <Input
            label="Número de Plantas"
            :required="true"
            type="number"
            :ruless="rules"
            v-model="plantsNumberLots"
            @onWrite="getInputPlantsNumber"
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
import { getLots, postLots } from "@/api/maintenance/lots";
import { modalState } from "@/stores/modal.js";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ModalForm from "@/modules/global/ModalForm.vue";
import Input from "@/commons/forms/Input.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";

const modal = modalState();
const loading = ref(false);

let model = ref(null);
const options = ["1", "2", "3", "4", "5"];

let nameLots = ref("");
let descriptionLots = ref("");
let sizeLots = ref("");
let soilStateLots = ref("");
let fatherLots = ref("");
let plantingDensityLots = ref("");
let plantsNumberLots = ref("");
let disableSave = computed(() => {
  return nameLots.value == "";
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
    name: "size",
    label: "Tamaño",
    field: "size",
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
  {
    name: "soilState",
    label: "Estado del Suelo",
    field: "soilState",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large);",
    style: "font-size: var(--font-medium);",
  },
  {
    name: "class",
    label: "Clase",
    field: "class",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large);",
    style: "font-size: var(--font-medium);",
  },
  {
    name: "father",
    label: "Padre",
    field: "father",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large);",
    style: "font-size: var(--font-medium);",
  },
  {
    name: "plantingDensity",
    label: "Densidad Siembra",
    field: "plantingDensity",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large);",
    style: "font-size: var(--font-medium);",
  },
  {
    name: "plantsNumber",
    label: "Número de Plantas",
    field: "plantsNumber",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large);",
    style: "font-size: var(--font-medium);",
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
  nameLots.value = "";
  descriptionLots.value = "";
  sizeLots.value = "";
  soilStateLots.value = "";
  fatherLots.value = "";
  plantingDensityLots.value = "";
  plantsNumberLots.value = "";
};

const getInputName = (value) => {
  nameLots.value = value;
};

const getInputDescription = (value) => {
  descriptionLots.value = value;
};

const getInputSize = (value) => {
  sizeLots.value = value;
};

const getInputSoilState = (value) => {
  soilStateLots.value = value;
};

const getInputFather = (value) => {
  fatherLots.value = value;
};

const getInputPlantingDensity = (value) => {
  plantingDensityLots.value = value;
};

const getInputPlantsNumber = (value) => {
  plantsNumberLots.value = value;
};

const saveInfo = () => {
  postDataLots();
  modal.toggleModal();
};

const postDataLots = async () => {
  console.log(
    plantsNumberLots.value,
    plantingDensityLots.value,
    fatherLots.value,
    soilStateLots.value,
    sizeLots.value,
    descriptionLots.value,
    nameLots.value
  );
  //falta peticion del backend
  /*  const { lots } = await postLots({
    name: nameLots.value,
    description: descriptionLots.value,
  });
  getDataLots(); */
};

const getDataLots = async () => {
  loading.value = true;
  const { lots } = await getLots();
  let count = 1;
  lots.forEach((item) => {
    item.status = item.status ? "Inactivo" : "Activo";
    item.id = count++;
    item.description =
      item.description.trim() == "" ? "No registra" : item.description;
  });
  rows.value = lots;
  loading.value = false;
};

onMounted(() => {
  getDataLots();
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
.title {
  font-size: var(--font-title);
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
