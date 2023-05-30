<template>
  <div class="q-py-md table-container">
    <div class="row">
      <i class="icon icon-backRoute q-pt-lg" @click="$router.back()" />
      <h6 class="title q-my-lg">UNIDADES DE MEDIDA</h6>
    </div>
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
    <ModalForm class="modal">
      <div class="modal-units">
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
          <div class="spinner" v-if="isLoading">
            <q-spinner-ios color="primary" size="2.5em" />
          </div>
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
import { computed, onMounted, ref, watch } from "vue";
import { useStorage } from "@/stores/localStorage.js";

const $q = useQuasar();

const modal = modalState();
const titleModal = ref("");
const loading = ref(false);
const typeAction = ref(true);
const rows = ref([]);
const inactiveRows = ref([]);
const idUnitsMeasurement = ref();
const storage = useStorage();
const isLoading = ref(false);

const disableSave = computed(() => {
  if (
    nameUnitsMeasurement.value == "" ||
    unitTypeUnitsMeasurement.value == ""
  ) {
    return true;
  } else if (isLoading.value == true) {
    return true;
  } else {
    return false;
  }
});

const rules = [(v) => !!v || "Este campo es requerido"];

let filter = ref("");
let tab = ref("active");

let nameUnitsMeasurement = ref("");
let unitTypeUnitsMeasurement = ref("");

let valueInputName = ref("");
let valueInputUnitType = ref("");

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
    name: "unittype",
    label: "Tipo de unidad",
    field: "unittype",
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
  nameUnitsMeasurement.value = value;
};

const getInputunittype = (value) => {
  unitTypeUnitsMeasurement.value = value;
};

const clickButton = () => {
  titleModal.value = "REGISTRAR UNIDAD DE MEDIDA";
  resetValuesForm();
  typeAction.value = true;
  modal.toggleModal();
};

const resetValuesForm = () => {
  valueInputUnitType.value = "";
  valueInputName.value = "";
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

const showNotification = (type, message) => {
  $q.notify({
    type: type,
    message: message,
    position: "top",
  });
};

const getDataUnitsMeasurement = async () => {
  rows.value = [];
  inactiveRows.value = [];
  loading.value = true;
  try {
    const { unitType } = await getUnitsMeasurement(idFarm.value);
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
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
};

async function postDataUnitMeasurement() {
  isLoading.value = true;
  try {
    const unitType = await postUnitMeasurement(
      {
        name: nameUnitsMeasurement.value,
        unittype: unitTypeUnitsMeasurement.value,
      },
      idFarm.value
    );
    isLoading.value = false;
    showNotification("positive", "Unidad de medidad registrada correctamente");
    modal.toggleModal();
    rows.value = [];
    getDataUnitsMeasurement();
  } catch {
    isLoading.value = false;
    showNotification(
      "negative",
      "Ocurrió un error, por favor verifique los datos"
    );
  }
}

async function updateDataUnitMeasurement() {
  isLoading.value = true;
  try {
    const response = await updateUnitMeasurement(
      {
        id: idUnitsMeasurement.value,
        name: nameUnitsMeasurement.value,
        unittype: unitTypeUnitsMeasurement.value,
      },
      idFarm.value
    );
    isLoading.value = false;
    showNotification("positive", "Unidad de medida actualizada correctamente");
    modal.toggleModal();
    rows.value = [];
    getDataUnitsMeasurement();
  } catch {
    isLoading.value = false;
    showNotification(
      "negative",
      "Ocurrió un error, por favor verifique los datos"
    );
  }
  nameUnitsMeasurement.value = "";
  unitTypeUnitsMeasurement.value = "";
}

async function activeUnitMaintenance(id) {
  loading.value = true;
  try {
    const active = await activeUnitMeasurement(id, idFarm.value);
    showNotification("positive", "Unidad de medida activada correctamente");
    loading.value = false;
    rows.value = [];
    inactiveRows.value = [];
    getDataUnitsMeasurement();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

async function inactiveUnitMaintenance(id) {
  loading.value = false;
  try {
    const inactive = await inactiveUnitMeasurement(id, idFarm.value);
    loading.value = false;
    showNotification("positive", "Unidad de medida desactivada correctamente");
    rows.value = [];
    inactiveRows.value = [];
    getDataUnitsMeasurement();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

const idFarm = computed(() => {
  return storage.idSelected;
});

watch(idFarm, () => {
  getDataUnitsMeasurement();
});

onMounted(() => {
  getDataUnitsMeasurement();
});
</script>
<style scoped>
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
.modal-units {
  overflow-y: scroll;
  max-height: 450px;
}
.modal-units::-webkit-scrollbar {
  display: none;
}
.icon-backRoute {
  font-size: 30px;
  padding-right: 20px;
}
.icon-backRoute:hover {
  cursor: pointer;
}
.accions-td {
  padding: 0px;
  margin: 0px;
  min-width: 100px;
  max-width: 100px;
}
.text-required {
  display: inline-block;
  font-size: var(--font-small);
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
.icon-table {
  font-size: 18px;
}
.icon-check {
  font-size: 25px;
}
.container-table {
  border-radius: 15px;
  background-color: white;
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
