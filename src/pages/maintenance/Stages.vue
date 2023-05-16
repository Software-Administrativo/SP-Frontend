<template>
  <div class="q-py-md table-container">
    <h6 class="title q-my-lg">TIPOS ETAPAS</h6>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd @onClick="clickButton" label="Crear nueva etapa" />
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
                <template v-slot:body-cell-Acciones="props">
                  <td class="accions-td">
                    <q-btn-group class="full-width full-height" outline square>
                      <q-btn
                        icon="edit_note"
                        text-color="blue-10"
                        class="col text-bold q-pa-none"
                        @click="editStageMaintenance(props.row)"
                      />
                      <q-btn
                        icon="highlight_off"
                        text-color="blue-10"
                        class="col text-bold q-pa-none"
                        @click="inactiveStageMaintenance(props.row._id)"
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
                title="Etapas"
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
                        @click="activeStageMaintenance(props.row._id)"
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
            class="q-pb-xs"
            label="Nombre"
            :required="true"
            type="text"
            :ruless="rules"
            :value="valueInputName"
            v-model="nameStages"
            @onWrite="getInputName"
          />
          <Input
            class="q-pb-xs"
            label="Lote"
            type="text"
            :required="true"
            :ruless="rules"
            :value="valueInputLot"
            v-model="lotStages"
            @onWrite="getInputLot"
          />
          <Input
            class="q-pb-xs"
            label="Descripción"
            type="text"
            :required="false"
            :value="valueInputDescription"
            v-model="descriptionStages"
            @onWrite="getInputDescription"
          />
          <span class="text-required q-pb-sm"
            >Todos los campos con <span class="text-red">*</span> son
            obligatorios</span
          >
          <div class="row justify-center">
            <ButtonSave
              v-if="typeAction"
              :disable="disableSave"
              @onClick="postDataStages"
            />
            <ButtonSave
              v-else
              :disable="disableSave"
              @onClick="updateDataStage"
            />
          </div>
        </div>
      </div>
    </ModalForm>
  </template>
</template>
<script setup>
import {
activeStage,
getStages,
inactiveStage,
postStage,
updateStage,
} from "@/api/maintenance/stages";
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
const idStage = ref();

const disableSave = computed(() => {
  return nameStages.value == "";
});
const rules = [(v) => !!v || "Este campo es requerido"];

let filter = ref("");
let nameStages = ref("");
let lotStages = ref("");
let descriptionStages = ref("");
let valueInputName = ref("");
let valueInputDescription = ref("");
let valueInputLot = ref("");
let tab = ref("active");

const $q = useQuasar();

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
    name: "lot",
    label: "Lote",
    field: "lot",
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
    name: "status",
    label: "Estado",
    field: "status",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
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
  nameStages.value = value;
};

const getInputLot = (value) => {
  lotStages.value = value;
};

const getInputDescription = (value) => {
  descriptionStages.value = value;
};

const clickButton = () => {
  titleModal.value = "REGISTRAR ETAPA";
  valueInputName.value = "";
  valueInputDescription.value = "";
  valueInputLot.value = "";
  typeAction.value = true;
  modal.toggleModal();
  nameStages.value = "";
  lotStages.value = "";
  descriptionStages.value = "";
};

const editStageMaintenance = (item) => {
  titleModal.value = "EDITAR ETAPA";
  typeAction.value = false;
  idStage.value = item._id;
  valueInputName.value = item.name;
  valueInputLot.value = item.lot;
  valueInputDescription.value = item.description;
  nameStages.value = item.name;
  lotStages.value = item.lot;
  descriptionStages.value = item.description;
  modal.toggleModal();
};

async function inactiveStageMaintenance(id) {
  try {
    const inactive = await inactiveStage(id);
    $q.notify({
      type: "positive",
      message: "Etapa desactivada correctamente",
      position: "top",
    });
    rows.value = [];
    inactiveRows.value = [];
    getDataStages();
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Ocurrió un error",
      position: "top",
    });
  }
}

async function postDataStages() {
  modal.toggleModal();
  try {
    const stages = await postStage({
      name: nameStages.value,
      lot: lotStages.value,
      description: descriptionStages.value,
    });
    $q.notify({
      type: "positive",
      message: "Etapa registrada correctamente",
      position: "top",
    });
    rows.value = [];
    getDataStages();
  } catch {
    $q.notify({
      type: "negative",
      message: "Ocurrió un error",
      position: "top",
    });
  }
}

const getDataStages = async () => {
  rows.value = [];
  inactiveRows.value = [];
  loading.value = true;
  try {
    const { stages } = await getStages();
    let countActive = 1;
    let countInactive = 1;
    stages.forEach((item) => {
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

async function updateDataStage() {
  try {
    const response = await updateStage({
      id: idStage.value,
      name: nameStages.value,
      lot: lotStages.value,
      description: descriptionStages.value,
    });
    $q.notify({
      type: "positive",
      position: "top",
      message: "Etapa actualizada correctamente",
    });
    modal.toggleModal();
    rows.value = [];
    getDataStages();
  } catch {
    $q.notify({
      type: "negative",
      position: "top",
      message: "Ocurrió un error",
    });
  }
  nameStages.value = "";
  lotStages.value = "";
  descriptionStages.value = "";
}

async function activeStageMaintenance(id) {
  try {
    const active = await activeStage(id);
    $q.notify({
      type: "positive",
      message: "Etapa activada correctamente",
      position: "top",
    });
    rows.value = [];
    inactiveRows.value = [];
    getDataStages();
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Ocurrió un error",
      position: "top",
    });
  }
}

onMounted(() => {
  getDataStages();
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
.icon {
  font-size: 1.5rem;
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
@media (min-width: 621px) and (max-width: 720px) {
  .container-table {
    max-width: 610px;
  }
}
@media (min-width: 721px) and (max-width: 920px) {
  .container-table {
    max-width: 710px;
  }
}
@media (min-width: 921px) and (max-width: 1020px) {
  .container-table {
    max-width: 810px;
  }
}
@media (min-width: 1021px) and (max-width: 1320px) {
  .container-table {
    max-width: 1010px;
  }
}
</style>
