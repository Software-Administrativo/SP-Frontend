<template>
  <div class="q-py-md table-container">
    <div class="row">
      <i class="icon icon-backRoute q-pt-lg" @click="$router.back()" />
      <h6 class="title q-my-lg">LOTES</h6>
    </div>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd @onClick="clickButton" label="Crear nuevo lote" />
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
                title="Lotes"
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
                        class="col text-bold q-pa-none icon-table"
                        @click="editLotMaintenance(props.row)"
                      >
                        <q-tooltip class="bg-indigo" :offset="[10, 10]">
                          Editar
                        </q-tooltip>
                      </q-btn>
                      <q-btn
                        icon="highlight_off"
                        text-color="blue-10"
                        class="col text-bold q-pa-none icon-table"
                        @click="inactiveLotMaintenance(props.row._id)"
                      >
                        <q-tooltip class="bg-indigo" :offset="[10, 10]">
                          Desactivar
                        </q-tooltip>
                      </q-btn>
                    </q-btn-group>
                  </td>
                </template>
              </q-table>
            </q-tab-panel>
            <q-tab-panel name="inactive">
              <q-table
                flat
                bordered
                title="Lotes"
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
                        @click="activeLotMaintenance(props.row._id)"
                      >
                        <i class="icon icon-check"></i>
                        <q-tooltip class="bg-indigo" :offset="[10, 10]">
                          Activar
                        </q-tooltip>
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
      <div class="modal-lots">
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
              v-model="nameLots"
              @onWrite="getInputName"
            />
            <Input
              class="q-pb-xs"
              label="Tamaño"
              type="number"
              :required="true"
              :ruless="rules"
              :value="valueInputAreaSize"
              v-model="areaSizeLots"
              @onWrite="getInputAreaSize"
            />
            <Select
              class="q-pb-lg"
              label="Estado del lote"
              type="lotState"
              :required="true"
              :ruless="rules"
              :value="valueSelectLoteState"
              v-model="lotStateLots"
              @onSelect="getSelectLoteState"
            />
            <Select
              class="q-pb-lg"
              label="Estado del suelo"
              type="soildState"
              :required="true"
              :ruless="rules"
              :value="valueSelectSoildState"
              v-model="soildStateLots"
              @onSelect="getSelectSoildState"
            />
            <Select
              class="q-pb-lg"
              label="Clase"
              type="typeLot"
              :required="true"
              :ruless="rules"
              :value="valueSelectClass"
              v-model="classLots"
              @onSelect="getSelectClass"
            />
            <Select
              v-if="classLots == 'HIJO' || classLots == 'PADRE-HIJO'"
              class="q-pb-lg"
              label="Lote padre"
              type="fatherLot"
              :required="true"
              :ruless="rules"
              :value="valueSelectFather"
              v-model="fatherLot"
              @onSelect="getSelectFather"
            />
            <Input
              class="q-pb-xs"
              label="Densidad de siembra"
              type="number"
              :required="true"
              :ruless="rules"
              :value="valueInputSowingDensity"
              v-model="sowingDensityLots"
              @onWrite="getInputSowingDensity"
            />
            <Input
              class="q-pb-xs"
              label="Descripción"
              type="text"
              :required="false"
              :value="valueInputDescription"
              v-model="descriptionLots"
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
                @onClick="postDataLot"
              />
              <ButtonSave
                v-else
                :disable="disableSave"
                @onClick="updateDataLot"
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
  activeLot,
  getLots,
  inactiveLot,
  postLot,
  updateLot,
} from "@/api/maintenance/lots";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";
import Input from "@/commons/forms/Input.vue";
import ModalForm from "@/modules/global/ModalForm.vue";
import { modalState } from "@/stores/modal.js";
import { useQuasar } from "quasar";
import Select from "@/commons/forms/Select.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useStorage } from "@/stores/localStorage.js";

const $q = useQuasar();

const modal = modalState();
const titleModal = ref("");
const loading = ref(false);
const typeAction = ref(true);
const rows = ref([]);
const inactiveRows = ref([]);
const idLot = ref();
const storage = useStorage();
const isLoading = ref(false);

const disableSave = computed(() => {
  if (
    (!nameLots.value,
    !areaSizeLots.value,
    !lotStateLots.value,
    !soildStateLots.value,
    !classLots.value,
    !sowingDensityLots.value)
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

let nameLots = ref("");
let areaSizeLots = ref("");
let lotStateLots = ref("");
let soildStateLots = ref("");
let classLots = ref("");
let sowingDensityLots = ref("");
let descriptionLots = ref("");
let fatherLot = ref("");

let valueInputName = ref("");
let valueInputAreaSize = ref("");
let valueSelectLoteState = ref("");
let valueSelectSoildState = ref("");
let valueSelectClass = ref("");
let valueInputSowingDensity = ref("");
let valueInputDescription = ref("");
let valueSelectFather = ref("");

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
    name: "areasize",
    label: "Tamaño",
    field: "areasize",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
  {
    name: "soildstate",
    label: "Estado del suelo",
    field: "soildstate",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
  {
    name: "classlot",
    label: "Clase",
    field: "classlote",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
  {
    name: "fatherlot",
    label: "Lote padre",
    field: "fatherlot",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
  {
    name: "sowingdensity",
    label: "Densidad de siembra",
    field: "sowingdensity",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
  {
    name: "Acciones",
    label: "Acciones",
    field: "acciones",
    align: "center",
    sortable: true,
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
]);

const getInputName = (value) => {
  nameLots.value = value;
};

const getInputAreaSize = (value) => {
  areaSizeLots.value = value;
};

const getSelectLoteState = (value) => {
  lotStateLots.value = value;
};

const getSelectSoildState = (value) => {
  soildStateLots.value = value;
};

const getSelectClass = (value) => {
  classLots.value = value;
};

const getInputSowingDensity = (value) => {
  sowingDensityLots.value = value;
};

const getInputDescription = (value) => {
  descriptionLots.value = value;
};

const getSelectFather = (value) => {
  fatherLot.value = value;
};

const clickButton = () => {
  titleModal.value = "REGISTRAR LOTE";
  resetValuesForm();
  typeAction.value = true;
  modal.toggleModal();
};

const resetValuesForm = () => {
  valueInputName.value = "";
  valueInputAreaSize.value = "";
  valueSelectLoteState.value = "";
  valueSelectSoildState.value = "";
  valueSelectClass.value = "";
  valueInputSowingDensity.value = "";
  valueInputDescription.value = "";
  nameLots.value = "";
  areaSizeLots.value = "";
  lotStateLots.value = "";
  soildStateLots.value = "";
  classLots.value = "";
  sowingDensityLots.value = "";
  descriptionLots.value = "";
};

const editLotMaintenance = (item) => {
  titleModal.value = "EDITAR LOTE";
  typeAction.value = false;
  idLot.value = item._id;
  valueInputName.value = item.name;
  valueInputAreaSize.value = item.areasize;
  valueSelectLoteState.value = item.lotestate;
  valueSelectSoildState.value = item.soildstate;
  valueSelectClass.value = item.classlot;
  valueInputSowingDensity.value = item.sowingdensity;
  valueInputDescription.value = item.description;
  nameLots.value = item.name;
  areaSizeLots.value = item.areasize;
  lotStateLots.value = item.lotestate;
  soildStateLots.value = item.soildstate;
  classLots.value = item.classlot;
  sowingDensityLots.value = item.sowingdensity;
  descriptionLots.value = item.description;
  modal.toggleModal();
};

const showNotification = (type, message) => {
  $q.notify({
    type: type,
    message: message,
    position: "top",
  });
};

const getDataLots = async () => {
  rows.value = [];
  inactiveRows.value = [];
  loading.value = true;
  try {
    const { lots } = await getLots(idFarm.value);
    let countActive = 1;
    let countInactive = 1;
    lots.forEach((item) => {
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
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
};

async function postDataLot() {
  isLoading.value = true;
  try {
    await postLot(
      {
        name: nameLots.value,
        areasize: areaSizeLots.value,
        lotestate: lotStateLots.value,
        soildstate: soildStateLots.value,
        classlote: classLots.value,
        fatherlot: fatherLot.value,
        sowingdensity: sowingDensityLots.value,
        description: descriptionLots.value,
      },
      idFarm.value
    );
    isLoading.value = false;
    showNotification("positive", "Lote registrado correctamente");
    modal.toggleModal();
    rows.value = [];
    getDataLots();
  } catch {
    isLoading.value = false;
    showNotification(
      "negative",
      "Ocurrió un error, por favor verifique los datos"
    );
  }
}

async function updateDataLot() {
  isLoading.value = true;
  try {
    const response = await updateLot(
      {
        id: idLot.value,
        name: nameLots.value,
        areasize: areaSizeLots.value,
        lotestate: lotStateLots.value,
        soildstate: soildStateLots.value,
        classlot: classLots.value,
        fatherlot: fatherlot.value,
        sowingdensity: sowingDensityLots.value,
        description: descriptionLots.value,
      },
      idFarm.value
    );
    isLoading.value = false;
    showNotification("positive", "Lote actualizado correctamente");
    modal.toggleModal();
    rows.value = [];
    getDataLots();
  } catch {
    isLoading.value = false;
    showNotification(
      "negative",
      "Ocurrió un error, por favor verifique los datos"
    );
  }
}

async function activeLotMaintenance(id) {
  loading.value = true;
  try {
    const active = await activeLot(id, idFarm.value);
    showNotification("positive", "Eps activada correctamente");
    loading.value = false;
    rows.value = [];
    inactiveRows.value = [];
    getDataLots();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

async function inactiveLotMaintenance(id) {
  try {
    const inactive = await inactiveLot(id, idFarm.value);
    loading.value = false;
    showNotification("positive", "Eps desactivada correctamente");
    rows.value = [];
    inactiveRows.value = [];
    getDataLots();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

const idFarm = computed(() => {
  return storage.idSelected;
});

watch(idFarm, () => {
  getDataLots();
});

onMounted(() => {
  getDataLots();
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
.modal-lots {
  overflow-y: scroll;
  max-height: 450px;
}
.modal-lots::-webkit-scrollbar {
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
