<template>
  <div class="q-py-md table-container">
    <div class="row">
      <i class="icon icon-backRoute q-pt-lg" @click="$router.back()" />
      <h6 class="title q-my-lg">FINCA</h6>
    </div>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd @onClick="clickButton" label="Crear nueva finca" />
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
                title="Finca"
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
                        @click="editFarmMaintenance(props.row)"
                      >
                      <q-tooltip class="bg-indigo" :offset="[10, 10]">
                          Editar
                        </q-tooltip>
                      </q-btn>
                      <q-btn
                        icon="highlight_off"
                        text-color="blue-10"
                        class="col text-bold q-pa-none icon-table"
                        @click="inactiveFarmMaintenance(props.row._id)"
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
                title="Finca"
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
                        @click="activeFarmMaintenance(props.row._id)"
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
      <div class="modal-farm">
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
              v-model="nameFarm"
              @onWrite="getInputName"
            />
            <Input
              class="q-pb-xs"
              label="Ubicación"
              type="text"
              :required="true"
              :ruless="rules"
              :value="valueInputAddress"
              v-model="addressFarm"
              @onWrite="getInputAddress"
            />
            <Input
              class="q-pb-xs"
              label="Propietario"
              :required="true"
              type="text"
              :ruless="rules"
              :value="valueInputOwner"
              v-model="ownerFarm"
              @onWrite="getInputOwner"
            />
            <span class="text-required q-pb-sm"
              >Todos los campos con <span class="text-red">*</span> son
              obligatorios</span
            >
            <div class="row justify-center">
              <ButtonSave
                v-if="typeAction"
                :disable="disableSave"
                @onClick="postDataFarm"
              />
              <ButtonSave
                v-else
                :disable="disableSave"
                @onClick="updateDataFarm"
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
  activeFarm,
  getFarms,
  inactiveFarm,
  postFarm,
  updateFarm,
} from "@/api/maintenance/farm";
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
const isLoading = ref(false);
const rows = ref([]);
const inactiveRows = ref([]);
const idFarm = ref();

const disableSave = computed(() => {
  if (
    nameFarm.value == "" ||
    addressFarm.value == "" ||
    ownerFarm.value == ""
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
let nameFarm = ref("");
let addressFarm = ref("");
let ownerFarm = ref("");
let valueInputName = ref("");
let valueInputAddress = ref("");
let valueInputOwner = ref("");
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
    name: "address",
    label: "Ubicación",
    field: "address",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
  {
    name: "owner",
    label: "Propietario",
    field: "owner",
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
    headerStyle: "font-size: var(--font-medium); font-weight: bold;",
    style: "font-size: var(--font-medium);",
  },
]);

const getInputName = (value) => {
  nameFarm.value = value;
};

const getInputAddress = (value) => {
  addressFarm.value = value;
};

const getInputOwner = (value) => {
  ownerFarm.value = value;
};

const clickButton = () => {
  titleModal.value = "REGISTRAR FINCA";
  valueInputName.value = "";
  valueInputAddress.value = "";
  valueInputOwner.value = "";
  typeAction.value = true;
  modal.toggleModal();
  nameFarm.value = "";
  addressFarm.value = "";
  ownerFarm.value = "";
};

const editFarmMaintenance = (item) => {
  titleModal.value = "EDITAR FINCA";
  typeAction.value = false;
  idFarm.value = item._id;
  valueInputName.value = item.name;
  valueInputAddress.value = item.address;
  valueInputOwner.value = item.owner;
  nameFarm.value = item.name;
  addressFarm.value = item.address;
  ownerFarm.value = item.owner;
  modal.toggleModal();
};

const showNotification = (type, message) => {
  $q.notify({
    type: type,
    message: message,
    position: "top",
  });
};

async function getDataFarms() {
  rows.value = [];
  inactiveRows.value = [];
  loading.value = true;
  try {
    const { farms } = await getFarms();
    let countActive = 1;
    let countInactive = 1;
    farms.forEach((item) => {
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
}

async function postDataFarm() {
  isLoading.value = true;
  try {
    const farm = await postFarm({
      name: nameFarm.value,
      address: addressFarm.value,
      owner: ownerFarm.value,
    });
    isLoading.value = false;
    modal.toggleModal();
    showNotification("positive", "Finca registrada correctamente");
    rows.value = [];
    getDataFarms();
  } catch {
    isLoading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

async function updateDataFarm() {
  isLoading.value = true;
  try {
    const response = await updateFarm({
      id: idFarm.value,
      name: nameFarm.value,
      address: addressFarm.value,
      owner: ownerFarm.value,
    });
    isLoading.value = false;
    showNotification("positive", "Finca actualizada correctamente");
    modal.toggleModal();
    rows.value = [];
    getDataFarms();
  } catch {
    isLoading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
  nameFarm.value = "";
  addressFarm.value = "";
  ownerFarm.value = "";
}

async function activeFarmMaintenance(id) {
  loading.value = true;
  try {
    const intive = await activeFarm(id);
    loading.value = false;
    showNotification("positive", "Finca activada correctamente");
    rows.value = [];
    inactiveRows.value = [];
    getDataFarms();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

async function inactiveFarmMaintenance(id) {
  loading.value = true;
  try {
    const inactive = await inactiveFarm(id);
    loading.value = false;
    showNotification("positive", "Finca desactivada correctamente");
    rows.value = [];
    inactiveRows.value = [];
    getDataFarms();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

onMounted(() => {
  getDataFarms();
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
.modal-farm {
  overflow-y: scroll;
  max-height: 450px;
}
.modal-farm::-webkit-scrollbar {
  display: none;
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
  font-size: var(--font-small);
}
.separator {
  border: 1.8px solid var(--color-gray);
}
.container-content {
  max-width: 800px;
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
.icon-table {
  font-size: 18px;
}
.title {
  font-size: var(--font-title);
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
