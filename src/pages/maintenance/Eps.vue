<template>
  <div class="q-py-sm table-container">
    <h6 class="title q-my-lg">EPS</h6>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd @onClick="clickButton" label="Crear nueva EPS" />
      <div class="container-table q-mt-md q-pa-md" rounded>
        <q-table
          flat
          bordered
          title="EPS"
          row-key="name"
          :rows="rows"
          :columns="columns"
          :filter="filter"
          :rows-per-page-options="[5, 10, 20]"
          :loading="loading"
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
      <h6 class="q-my-md text-center">REGISTRAR EPS</h6>
      <div class="row q-px-xl">
        <div class="col-12">
          <Input
            label="Nombre"
            :required="true"
            type="text"
            :ruless="rules"
            v-model="nameEps"
            @onWrite="getInputName"
          />
          <Input
            class="q-mb-md"
            label="Descripción"
            type="text"
            :required="false"
            v-model="descriptionEps"
            @onWrite="getInputDescription"
          />
          <Input
            class="q-pb-xs"
            label="Observación"
            type="text"
            :required="false"
            v-model="observationEps"
            @onWrite="getInputObservation"
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
import { getEps, postEps } from "@/api/maintenance/eps";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";
import Input from "@/commons/forms/Input.vue";
import ModalForm from "@/modules/global/ModalForm.vue";
import { modalState } from "@/stores/modal.js";
import { computed, onMounted, ref } from "vue";

const modal = modalState();
const loading = ref(false);

let nameEps = ref("");
let descriptionEps = ref("");
let observationEps = ref("");
let filter = ref("");
let disableSave = computed(() => {
  return nameEps.value == "";
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
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
  {
    name: "name",
    label: "Nombre",
    field: "name",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
  {
    name: "description",
    label: "Descripción",
    field: "description",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
  {
    name: "observation",
    label: "Observación",
    field: "observation",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
  {
    name: "status",
    label: "Estado",
    field: "status",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
]);

const clickButton = () => {
  modal.toggleModal();
  nameEps.value = "";
  descriptionEps.value = "";
  observationEps.value = "";
};

const getInputName = (value) => {
  nameEps.value = value;
};

const getInputDescription = (value) => {
  descriptionEps.value = value;
};

const getInputObservation = (value) => {
  observationEps.value = value;
};

const saveInfo = () => {
  postDataEps();
  modal.toggleModal();
};

const postDataEps = async () => {
  const { eps } = await postEps({
    name: nameEps.value,
    description: descriptionEps.value,
    observation: observationEps.value,
  });
  getDataEps();
};

const getDataEps = async () => {
  loading.value = true;
  const { eps } = await getEps();
  let count = 1;
  eps.forEach((item) => {
    item.status = item.status ? "Inactivo" : "Activo";
    item.id = count++;
    item.description =
      item.description.trim() == "" ? "No registra" : item.description;
    item.observation =
      item.observation.trim() == "" ? "No registra" : item.observation;
  });
  rows.value = eps;
  loading.value = false;
};

onMounted(() => {
  getDataEps();
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
  max-width: 1200px;
  margin: 0 auto;
}
.title {
  font-size: var(--font-title);
}
.container-table {
  border-radius: 15px;
  height: 80%;
  max-height: 60vh;
  background-color: white;
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
