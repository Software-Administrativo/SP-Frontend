<template>
  <div class="q-py-md table-container">
    <h6 class="title q-my-lg">TIPOS ETAPAS</h6>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd @onClick="clickButton" label="Crear nueva etapa" />
      <div class="container-table q-mt-md q-pa-md" rounded>
        <q-table
          flat
          bordered
          title="Etapas"
          row-key="name"
          :rows="rows"
          :columns="columns"
          :filter="filter"
          :loading="loading"
          :rows-per-page-options="[5, 10, 20]"
        >
          <template v-slot:top-right>
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
        </q-table>
      </div>
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
import { getStages, postStages } from "@/api/maintenance/stages";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";
import Input from "@/commons/forms/Input.vue";
import ModalForm from "@/modules/global/ModalForm.vue";
import { modalState } from "@/stores/modal.js";
import { computed, onMounted, ref } from "vue";

const modal = modalState();

const options = ["1", "2", "3", "4", "5"];
const loading = ref(false);

let model = ref(null);
let nameStages = ref("");
let filter = ref("");
let descriptionStages = ref("");
let fatherStages = ref("");
let disableSave = computed(() => {
  return nameStages.value == "";
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
    headerStyle: "font-size: var(--font-medium); font-weight: bold;",
    style: "font-size: var(--font-medium);",
  },
  {
    name: "name",
    label: "Nombre",
    field: "name",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-medium); font-weight: bold;",
    style: "font-size: var(--font-medium);",
  },
  {
    name: "description",
    label: "Descripción",
    field: "description",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-medium); font-weight: bold;",
    style: "font-size: var(--font-medium);",
  },
  {
    name: "father",
    label: "Padre",
    field: "father",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-medium); font-weight: bold;",
    style: "font-size: var(--font-medium);",
  },
  {
    name: "status",
    label: "Estado",
    field: "status",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-medium); font-weight: bold;",
    style: "font-size: var(--font-medium);",
  },
]);

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
  loading.value = true;
  const { stages } = await getStages();
  let count = 1;
  stages.forEach((item) => {
    item.status = item.status ? "Inactivo" : "Activo";
    item.id = count++;
    item.description =
      item.description.trim() == "" ? "No registra" : item.description;
  });
  rows.value = stages;
  loading.value = false;
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
