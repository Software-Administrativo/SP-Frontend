<template>
  <div class="q-py-sm table-container">
    <h6 class="title q-my-lg">EPS</h6>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd @onClick="clickButton" label="Crear nueva EPS" />
      <div class="container-table q-mt-md q-pa-md" rounded>
        <q-card>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="active" label="Activos" />
            <q-tab name="inactive" label="Inactivos" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="active">
              <q-table
                flat
                bordered
                title="EPS"
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
                <template v-slot:body-cell-Acciones="props">
                  <td class="accions-td">
                    <q-btn-group class="full-width full-height" outline square>
                      <q-btn
                        icon="edit_note"
                        text-color="blue-10"
                        class="col text-bold q-pa-none"
                        @click="editEpsMaintenance(props.row)"
                      />
                      <q-btn
                        icon="highlight_off"
                        text-color="blue-10"
                        class="col text-bold q-pa-none"
                        @click="inactiveEpsMaintenance(props.row._id)"
                      />
                    </q-btn-group>
                  </td>
                </template>
              </q-table>
            </q-tab-panel>
            <q-tab-panel name="inactive">
              <q-table
                flat
                bordered
                title="EPS"
                row-key="name"
                :rows="inactiveRows"
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
                <template v-slot:body-cell-Acciones="props">
                  <td class="accions-td">
                    <q-btn-group class="full-width full-height" outline square>
                      <q-btn
                        text-color="blue-10"
                        class="col q-pa-none"
                        @click="activeEpsMaintenance(props.row._id)"
                      >
                        <i class="icon icon-check"></i>
                      </q-btn>
                    </q-btn-group>
                  </td>
                </template>
              </q-table>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </div>
  <template v-if="modal.modalIsOpen">
    <ModalForm>
      <h6 class="q-my-md text-center">{{ titleModal }}</h6>
      <div class="row q-px-xl">
        <div class="col-12">
          <Input
            label="Nombre"
            :required="true"
            type="text"
            :ruless="rules"
            :value="valueInputName"
            v-model="nameEps"
            @onWrite="getInputName"
          />
          <Input
            class="q-mb-md"
            label="Descripción"
            type="text"
            :required="false"
            :value="valueInputDescription"
            v-model="descriptionEps"
            @onWrite="getInputDescription"
          />
          <Input
            class="q-pb-xs"
            label="Observación"
            type="text"
            :required="false"
            :value="valueInputObservation"
            v-model="observationEps"
            @onWrite="getInputObservation"
          />
          <span class="text-required q-pb-sm"
            >Todos los campos con <span class="text-red">*</span> son
            obligatorios</span
          >
          <div class="row justify-center">
            <ButtonSave
              v-if="typeAction"
              :disable="disableSave"
              @onClick="postDataEps"
            />
            <ButtonSave
              v-else
              :disable="disableSave"
              @onClick="updateDataEps"
            />
          </div>
        </div>
      </div>
    </ModalForm>
  </template>
</template>
<script setup>
import {
  activeEps,
  getEps,
  inactiveEps,
  postEps,
  updateEps,
} from "@/api/maintenance/eps";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";
import Input from "@/commons/forms/Input.vue";
import ModalForm from "@/modules/global/ModalForm.vue";
import { modalState } from "@/stores/modal.js";
import { useQuasar } from "quasar";
import { computed, onMounted, ref } from "vue";

const modal = modalState();
const titleModal = ref("");
const loading = ref(false);
const typeAction = ref(true);
const rows = ref([]);
const inactiveRows = ref([]);
const idEps = ref();

const disableSave = computed(() => {
  return nameEps.value == "";
});
const rules = [(v) => !!v || "Este campo es requerido"];

let filter = ref("");
let nameEps = ref("");
let descriptionEps = ref("");
let observationEps = ref("");
let valueInputName = ref("");
let valueInputDescription = ref("");
let valueInputObservation = ref("");
let tab = ref("active");

const $q = useQuasar();

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
    name: "observation",
    label: "Observación",
    field: "observation",
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
  {
    name: "Acciones",
    label: "Acciones",
    field: "acciones",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-medium); font-weight: bold;",
    style: "font-size: var(--font-medium);",
  },
]);

const getInputName = (value) => {
  nameEps.value = value;
};

const getInputDescription = (value) => {
  descriptionEps.value = value;
};

const getInputObservation = (value) => {
  observationEps.value = value;
};

const clickButton = () => {
  titleModal.value = "REGISTRAR EPS";
  valueInputName.value = "";
  valueInputDescription = "";
  valueInputObservation = "";
  typeAction.value = true;
  modal.toggleModal();
  nameEps.value = "";
  descriptionEps.value = "";
  observationEps.value = "";
};

const editEpsMaintenance = (item) => {
  titleModal.value = "EDITAR EPS";
  typeAction.value = false;
  idEps.value = item._id;
  valueInputName.value = item.name;
  valueInputDescription.value = item.description;
  valueInputObservation.value = item.observation;
  nameEps.value = item.name;
  descriptionEps.value = item.description;
  observationEps.value = item.observation;
  modal.toggleModal();
};

async function inactiveEpsMaintenance(id) {
  try {
    const inactive = await inactiveEps(id);
    $q.notify({
      type: "positive",
      message: "Eps desactivada correctamente",
      position: "top",
    });
    rows.value = [];
    inactiveRows.value = [];
    getDataEps();
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Ocurrió un error",
      position: "top",
    });
  }
}

async function postDataEps() {
  modal.toggleModal();
  try {
    const eps = await postEps({
      name: nameEps.value,
      description: descriptionEps.value,
      observation: observationEps.value,
    });
    $q.notify({
      type: "positive",
      message: "Unidad de medida registrada correctamente",
      position: "top",
    });
    rows.value = [];
    getDataEps();
  } catch {
    $q.notify({
      type: "negative",
      message: "Ocurrió un error",
      position: "top",
    });
  }
}

const getDataEps = async () => {
  rows.value = [];
  inactiveRows.value = [];
  loading.value = true;
  try {
    const { eps } = await getEps();
    let countActive = 1;
    let countInactive = 1;
    eps.forEach((item) => {
      item.status = item.status ? "Inactivo" : "Activo";
      if (item.status == "Activo") {
        item.id = countActive++;
        rows.value.push(item);
      } else {
        item.id = countInactive++;
        inactiveRows.value.push(item);
      }
      item.description =
        item.description.trim() == "" ? "No registra" : item.description;
      item.observation =
        item.observation.trim() == "" ? "No registra" : item.observation;
    });
    loading.value = false;
  } catch {
    $q.notify({
      type: "negative",
      message: "Ocurrió un error",
      position: "top",
    });
  }
};

async function updateDataEps() {
  try {
    const response = await updateEps({
      id: idEps.value,
      name: nameEps.value,
      description: descriptionEps.value,
      observation: observationEps.value,
    });
    $q.notify({
      type: "positive",
      position: "top",
      message: "Eps actualizada correctamente",
    });
    modal.toggleModal();
    rows.value = [];
    getDataEps();
  } catch {
    $q.notify({
      type: "negative",
      position: "top",
      message: "Ocurrió un error",
    });
  }
  nameEps.value = "";
  descriptionEps.value = "";
  observationEps.value = "";
}

async function activeEpsMaintenance(id) {
  try {
    const active = await activeEps(id);
    $q.notify({
      type: "positive",
      message: "Eps activada correctamente",
      position: "top",
    });
    rows.value = [];
    inactiveRows.value = [];
    getDataEps();
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Ocurrió un error",
      position: "top",
    });
  }
}

onMounted(() => {
  getDataEps();
});
</script>
<style scoped>
.accions-td {
  padding: 0px;
  margin: 0px;
  min-width: 100px;
  max-width: 100px;
}
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
.icon {
  font-size: 1.5rem;
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
