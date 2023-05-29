<template>
  <div class="q-py-md table-container">
    <div class="row">
      <i class="icon icon-backRoute q-pt-lg" @click="$router.back()" />
      <h6 class="title q-my-lg">FINCA</h6>
    </div>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd @onClick="clickButton" label="Crear nueva bodega" />
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
                title="Bodegas"
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
                        @click="editCellarsInventory(props.row)"
                      />
                      <q-btn
                        icon="highlight_off"
                        text-color="blue-10"
                        class="col text-bold q-pa-none"
                        @click="inactiveCellarInventory(props.row._id)"
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
                title="Bodegas"
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
                        @click="activeCellarInventory(props.row._id)"
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
            v-model="nameCellars"
            @onWrite="getInputName"
          />
          <Input
            class="q-pb-xs"
            label="Tipo Contrato"
            :required="true"
            type="text"
            :ruless="rules"
            :value="valueInputTypeContract"
            v-model="typeContractCellars"
            @onWrite="getInputTypeContract"
          />
          <Input
            class="q-mb-md"
            label="Descripción"
            type="text"
            :required="false"
            :value="valueInputDescription"
            v-model="descriptionCellars"
            @onWrite="getInputDescription"
          />
          <Input
            class="q-pb-xs"
            label="Valor"
            :required="true"
            type="text"
            :ruless="rules"
            :value="valueInputValue"
            v-model="valueCellars"
            @onWrite="getInputValue"
          />
          <span class="text-required q-pb-sm"
            >Todos los campos con <span class="text-red">*</span> son
            obligatorios</span
          >
          <div class="row justify-center">
            <ButtonSave
              v-if="typeAction"
              :disable="disableSave"
              @onClick="postDataCellar"
            />
            <ButtonSave
              v-else
              :disable="disableSave"
              @onClick="updateDataCellar"
            />
          </div>
          <div class="spinner" v-if="isLoading">
            <q-spinner-ios color="primary" size="2.5em" />
          </div>
        </div>
      </div>
    </ModalForm>
  </template>
</template>
<script setup>
import {
  activeCellar,
  getCellars,
  inactiveCellar,
  postCellar,
  updateCellar,
} from "@/api/inventory/cellars";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";
import Input from "@/commons/forms/Input.vue";
import ModalForm from "@/modules/global/ModalForm.vue";
import { useStorage } from "@/stores/localStorage.js";
import { modalState } from "@/stores/modal.js";
import { useQuasar } from "quasar";
import { computed, onMounted, ref, watch } from "vue";

const modal = modalState();
const titleModal = ref("");
const loading = ref(false);
const typeAction = ref(true);
const rows = ref([]);
const inactiveRows = ref([]);
const idCellars = ref();
const storage = useStorage();
const isLoading = ref(false);

const disableSave = computed(() => {
  if (!nameCellars.value || !typeContractCellars.value || !valueCellars.value) {
    return true;
  } else if (isLoading.value == true) {
    return true;
  } else {
    return false;
  }
});
const rules = [(v) => !!v || "Este campo es requerido"];

let filter = ref("");
let nameCellars = ref("");
let typeContractCellars = ref("");
let descriptionCellars = ref("");
let valueCellars = ref("");
let valueInputName = ref("");
let valueInputTypeContract = ref("");
let valueInputDescription = ref("");
let valueInputValue = ref("");
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
    name: "typecontract",
    label: "Tipo Contrato",
    field: "tpcontrato",
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
    name: "value",
    label: "Valor",
    field: "valor",
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
  nameCellars.value = value;
};

const getInputTypeContract = (value) => {
  typeContractCellars.value = value;
};

const getInputDescription = (value) => {
  descriptionCellars.value = value;
};

const getInputValue = (value) => {
  valueCellars.value = value;
};

const clickButton = () => {
  titleModal.value = "REGISTRAR BODEGAS";
  valueInputName.value = "";
  valueInputTypeContract.value = "";
  valueInputDescription.value = "";
  valueInputValue.value = "";
  typeAction.value = true;
  modal.toggleModal();
  nameCellars.value = "";
  typeContractCellars.value = "";
  descriptionCellars.value = "";
  valueCellars.value = "";
};

const editCellarsInventory = (item) => {
  titleModal.value = "EDITAR BODEGAS";
  typeAction.value = false;
  idCellars.value = item._id;
  valueInputName.value = item.name;
  valueInputTypeContract.value = item.tpcontrato;
  valueInputDescription.value = item.description;
  valueInputValue.value = item.valor;
  nameCellars.value = item.name;
  typeContractCellars.value = item.tpcontrato;
  descriptionCellars.value = item.description;
  valueCellars.value = item.valor;
  modal.toggleModal();
};

const showNotification = (type, message) => {
  $q.notify({
    type: type,
    message: message,
    position: "top",
  });
};

const getDataCellars = async () => {
  rows.value = [];
  inactiveRows.value = [];
  loading.value = true;
  try {
    const { cellar } = await getCellars(idFarm.value);
    let countActive = 1;
    let countInactive = 1;
    cellar.forEach((item) => {
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
    showNotification("negative", "Ocurrió un error");
  }
};

async function postDataCellar() {
  isLoading.value = true;
  try {
    const cellars = await postCellar(
      {
        name: nameCellars.value,
        tpcontrato: typeContractCellars.value,
        description: descriptionCellars.value,
        valor: valueCellars.value,
      },
      idFarm.value
    );
    isLoading.value = false;
    loading.value = false;
    showNotification("positive", "Bodega registrada correctamente");
    modal.toggleModal();
    rows.value = [];
    getDataCellars();
  } catch {
    isLoading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

async function updateDataCellar() {
  isLoading.value = true;
  try {
    const response = await updateCellar(
      {
        id: idCellars.value,
        name: nameCellars.value,
        tpcontrato: typeContractCellars.value,
        description: descriptionCellars.value,
        valor: valueCellars.value,
      },
      idFarm.value
    );
    isLoading.value = false;
    showNotification("positive", "Bodega actualizada correctamente");
    modal.toggleModal();
    rows.value = [];
    getDataCellars();
  } catch {
    isLoading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
  nameCellars.value = "";
  descriptionCellars.value = "";
}

async function activeCellarInventory(id) {
  loading.value = true;
  try {
    const active = await activeCellar(id, idFarm.value);
    showNotification("positive", "Bodega activada correctamente");
    loading.value = false;
    rows.value = [];
    inactiveRows.value = [];
    getDataCellars();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

async function inactiveCellarInventory(id) {
  loading.value = true;
  try {
    const inactive = await inactiveCellar(id, idFarm.value);
    showNotification("positive", "Bodega desactivada correctamente");
    loading.value = false;
    rows.value = [];
    inactiveRows.value = [];
    getDataCellars();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

const idFarm = computed(() => {
  return storage.idSelected;
});

watch(idFarm, () => {
  getDataUsers();
});

onMounted(() => {
  getDataCellars();
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
.accions-td {
  padding: 0px;
  margin: 0px;
  min-width: 100px;
  max-width: 100px;
}
.icon-backRoute {
  font-size: 30px !important;
  padding-right: 20px;
}
.icon-backRoute:hover {
  cursor: pointer;
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
