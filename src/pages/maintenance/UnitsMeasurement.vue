<template>
  <div class="q-py-md table-container">
    <h6 class="title q-my-lg">UNIDADES DE MEDIDA</h6>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd @onClick="clickButton" label="Crear unidad de medida" />
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
                title="Unidades de medida"
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
                        @click="editUnitMaintenance(props.row)"
                      />
                      <q-btn
                        icon="highlight_off"
                        text-color="blue-10"
                        class="col text-bold q-pa-none"
                        @click="inactiveUnitMaintenance(props.row._id)"
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
                title="Unidades de medida"
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
                        @click="activeUnitMaintenance(props.row._id)"
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
            v-model="nameUnitsMeasurement"
            @onWrite="getInputName"
          />
          <Input
            label="Tipo de Unidad"
            :required="true"
            type="text"
            :ruless="rules"
            :value="valueInputUnitType"
            v-model="unitTypeUnitsMeasurement"
            @onWrite="getInputunittype"
          />
          <span class="text-required q-pb-sm"
            >Todos los campos con <span class="text-red">*</span> son
            obligatorios</span
          >
          <div class="row justify-center">
            <ButtonSave
              v-if="typeAction"
              :disable="disableSave"
              @onClick="postDataUnitMeasurement"
            />
            <ButtonSave
              v-else
              :disable="disableSave"
              @onClick="updateDataUnitMeasurement"
            />
          </div>
        </div>
      </div>
    </ModalForm>
  </template>
</template>
<script setup>
import {
  activeUnitMeasurement,
  getUnitsMeasurement,
  inactiveUnitMeasurement,
  postUnitMeasurement,
  updateUnitMeasurement,
} from "@/api/maintenance/units-measurement";
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
const idUnitsMeasurement = ref();

const disableSave = computed(() => {
  return (
    nameUnitsMeasurement.value == "" || unitTypeUnitsMeasurement.value == ""
  );
});
const rules = [(v) => !!v || "Este campo es requerido"];

let filter = ref("");
let nameUnitsMeasurement = ref("");
let unitTypeUnitsMeasurement = ref("");
let valueInputName = ref("");
let valueInputUnitType = ref("");
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
    name: "unittype",
    label: "Tipo de unidad",
    field: "unittype",
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
  nameUnitsMeasurement.value = value;
};

const getInputunittype = (value) => {
  unitTypeUnitsMeasurement.value = value;
};

const clickButton = () => {
  titleModal.value = "REGISTRAR UNIDAD DE MEDIDA";
  valueInputUnitType.value = "";
  valueInputName.value = "";
  typeAction.value = true;
  modal.toggleModal();
  nameUnitsMeasurement.value = "";
  unitTypeUnitsMeasurement.value = "";
};

const editUnitMaintenance = (item) => {
  titleModal.value = "EDITAR UNIDAD DE MEDIDA";
  typeAction.value = false;
  idUnitsMeasurement.value = item._id;
  valueInputUnitType.value = item.unittype;
  valueInputName.value = item.name;
  nameUnitsMeasurement.value = item.name;
  unitTypeUnitsMeasurement.value = item.unittype;
  modal.toggleModal();
};

async function inactiveUnitMaintenance(id) {
  try {
    const inactive = await inactiveUnitMeasurement(id);
    $q.notify({
      type: "positive",
      message: "Unidad de medida desactivada correctamente",
      position: "top",
    });
    rows.value = [];
    inactiveRows.value = [];
    getDataUnitsMeasurement();
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Ocurrió un error",
      position: "top",
    });
  }
}

async function postDataUnitMeasurement() {
  modal.toggleModal();
  try {
    const unitType = await postUnitMeasurement({
      name: nameUnitsMeasurement.value,
      unittype: unitTypeUnitsMeasurement.value,
    });
    $q.notify({
      type: "positive",
      message: "Unidad de medida registrada correctamente",
      position: "top",
    });
    rows.value = [];
    getDataUnitsMeasurement();
  } catch {
    $q.notify({
      type: "negative",
      message: "Ocurrió un error",
      position: "top",
    });
  }
}

const getDataUnitsMeasurement = async () => {
  rows.value = [];
  inactiveRows.value = [];
  loading.value = true;
  try {
    const { unitType } = await getUnitsMeasurement();
    let countActive = 1;
    let countInactive = 1;
    unitType.forEach((item) => {
      item.status = item.status ? "Inactivo" : "Activo";
      if (item.status == "Activo") {
        item.id = countActive++;
        rows.value.push(item);
      } else {
        item.id = countInactive++;
        inactiveRows.value.push(item);
      }
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

async function updateDataUnitMeasurement() {
  try {
    const response = await updateUnitMeasurement({
      id: idUnitsMeasurement.value,
      name: nameUnitsMeasurement.value,
      unittype: unitTypeUnitsMeasurement.value,
    });
    $q.notify({
      type: "positive",
      position: "top",
      message: "Unidad de medida actualizada correctamente",
    });
    modal.toggleModal();
    rows.value = [];
    getDataUnitsMeasurement();
  } catch {
    $q.notify({
      type: "negative",
      position: "top",
      message: "Ocurrió un error",
    });
  }
  nameUnitsMeasurement.value = "";
  unitTypeUnitsMeasurement.value = "";
}

async function activeUnitMaintenance(id) {
  try {
    const active = await activeUnitMeasurement(id);
    $q.notify({
      type: "positive",
      message: "Unidad de medida activada correctamente",
      position: "top",
    });
    rows.value = [];
    inactiveRows.value = [];
    getDataUnitsMeasurement();
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Ocurrió un error",
      position: "top",
    });
  }
}

onMounted(() => {
  getDataUnitsMeasurement();
});
</script>
<style scoped>
.accions-td {
  padding: 0px;
  margin: 0px;
  min-width: 100px;
  max-width: 100px;
}
.title {
  font-size: var(--font-title);
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
.container-table {
  border-radius: 15px;
  height: 80%;
  max-height: 70vh;
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
