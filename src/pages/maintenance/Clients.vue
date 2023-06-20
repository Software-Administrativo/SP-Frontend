<template>
  <div class="q-py-sm table-container">
    <div class="row">
      <i class="icon icon-backRoute q-pt-lg" @click="$router.back()" />
      <h6 class="title q-my-lg">Clientes</h6>
    </div>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd @onClick="clickButton" label="Crear nuevo cliente" />
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
                title="Clientes"
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
                        @click="editClientMaintenance(props.row)"
                      >
                        <q-tooltip class="bg-indigo" :offset="[10, 10]">
                          Editar
                        </q-tooltip>
                      </q-btn>
                      <q-btn
                        icon="highlight_off"
                        text-color="blue-10"
                        class="col text-bold q-pa-none icon-table"
                        @click="inactiveClientMaintenance(props.row._id)"
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
                title="Clientes"
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
                        @click="activeClientMaintenance(props.row._id)"
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
      <div class="modal-eps">
        <h6 class="q-my-md text-center">{{ titleModal }}</h6>
        <div class="row q-px-xl">
          <div class="col-12">
            <Input
              label="Nombre"
              :required="true"
              type="text"
              :ruless="rules"
              :value="valueInputName"
              v-model="nameClient"
              @onWrite="getInputName"
            />
            <Input
              class="q-mb-md"
              :required="true"
              label="Teléfono"
              type="text"
              :ruless="rules"
              :value="valueInputPhone"
              v-model="phoneClient"
              @onWrite="getInputPhone"
            />
            <Input
              class="q-pb-xs"
              label="N° Documento"
              :required="true"
              type="text"
              :ruless="rules"
              :value="valueInputDocument"
              v-model="documentClient"
              @onWrite="getInputDocument"
            />
            <Input
              class="q-pb-xs"
              label="Dirección"
              :required="true"
              type="text"
              :ruless="rules"
              :value="valueInputAddress"
              v-model="addressClient"
              @onWrite="getInputAddress"
            />
            <span class="text-required q-pb-sm"
              >Todos los campos con <span class="text-red">*</span> son
              obligatorios</span
            >
            <div class="row justify-center">
              <ButtonSave
                v-if="typeAction"
                :disable="disableSave"
                @onClick="postDataClient"
              />
              <ButtonSave
                v-else
                :disable="disableSave"
                @onClick="updateDataClient"
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
  activeClients,
  getClients,
  inactiveClients,
  postClients,
  updateClients,
} from "@/api/maintenance/clientss";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";
import Input from "@/commons/forms/Input.vue";
import ModalForm from "@/modules/global/ModalForm.vue";
import { RESPONSES } from "@/helpers";
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
const idClient = ref();
const storage = useStorage();
const isLoading = ref(false);

const disableSave = computed(() => {
  if (
    nameClient.value == "" ||
    phoneClient.value == "" ||
    documentClient.value == "" ||
    addressClient.value == ""
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

let nameClient = ref("");
let phoneClient = ref("");
let documentClient = ref("");
let addressClient = ref("");

let valueInputName = ref("");
let valueInputPhone = ref("");
let valueInputDocument = ref("");
let valueInputAddress = ref("");

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
    name: "document",
    label: "N° Documento",
    field: "document",
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
    name: "phone",
    label: "Teléfono",
    field: "phone",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
  {
    name: "address",
    label: "Dirección",
    field: "address",
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
  nameClient.value = value;
};

const getInputPhone = (value) => {
  phoneClient.value = value;
};

const getInputDocument = (value) => {
  documentClient.value = value;
};

const getInputAddress = (value) => {
  addressClient.value = value;
};

const clickButton = () => {
  titleModal.value = "REGISTRAR CLIENTE";
  resetValuesForm();
  typeAction.value = true;
  modal.toggleModal();
};

const resetValuesForm = () => {
  valueInputName.value = "";
  valueInputPhone.value = "";
  valueInputDocument.value = "";
  valueInputAddress.value = "";
  nameClient.value = "";
  phoneClient.value = "";
  documentClient.value = "";
  addressClient.value = "";
};

const editClientMaintenance = (item) => {
  titleModal.value = "EDITAR CLIENTE";
  typeAction.value = false;
  idClient.value = item._id;
  valueInputName.value = item.name;
  valueInputPhone.value = item.phone;
  valueInputDocument.value = item.document;
  valueInputAddress.value = item.address;
  nameClient.value = item.name;
  phoneClient.value = item.phone;
  documentClient.value = item.document;
  addressClient.value = item.address;
  modal.toggleModal();
};

const showNotification = (type, message) => {
  $q.notify({
    type: type,
    message: message,
    position: "top",
  });
};

const getDataClients = async () => {
  rows.value = [];
  inactiveRows.value = [];
  loading.value = true;
  try {
    const { client } = await getClients(idFarm.value);
    let countActive = 1;
    let countInactive = 1;
    client.forEach((item) => {
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

async function postDataClient() {
  isLoading.value = true;
  try {
    const data = await postClients(
      {
        name: nameClient.value,
        phone: phoneClient.value,
        document: documentClient.value,
        address: addressClient.value,
      },
      idFarm.value
    );
    isLoading.value = false;
    let response = data?.response?.data?.errors[0]?.msg;

    if (response == RESPONSES.LENGHTDOCUMENT) {
      showNotification("negative", "El documento es muy corto");
    } else {
      showNotification("positive", "Cliente registrado correctamente");
      modal.toggleModal();
      rows.value = [];
      getDataClients();
    }
  } catch {
    isLoading.value = false;
    showNotification(
      "negative",
      "Ocurrió un error, por favor verifique los datos"
    );
  }
}

async function updateDataClient() {
  isLoading.value = true;
  try {
    const data = await updateClients(
      {
        id: idClient.value,
        name: nameClient.value,
        phone: phoneClient.value,
        document: documentClient.value,
        address: addressClient.value,
      },
      idFarm.value
    );
    isLoading.value = false;

    let response = data?.response?.data?.errors[0]?.msg;

    if (response == RESPONSES.LENGHTDOCUMENT) {
      showNotification("negative", "El documento es muy corto");
    } else {
      showNotification("positive", "Cliente actualizado correctamente");
      modal.toggleModal();
      rows.value = [];
      getDataClients();
    }
  } catch {
    isLoading.value = false;
    showNotification(
      "negative",
      "Ocurrió un error, por favor verifique los datos"
    );
  }
  nameClient.value = "";
  phoneClient.value = "";
  documentClient.value = "";
  addressClient.value = "";
}

async function activeClientMaintenance(id) {
  loading.value = true;
  try {
    await activeClients(id, idFarm.value);
    showNotification("positive", "Cliente activado correctamente");
    loading.value = false;
    rows.value = [];
    inactiveRows.value = [];
    getDataClients();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

async function inactiveClientMaintenance(id) {
  loading.value = false;
  try {
    await inactiveClients(id, idFarm.value);
    loading.value = false;
    showNotification("positive", "Cliente desactivado correctamente");
    rows.value = [];
    inactiveRows.value = [];
    getDataClients();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

const idFarm = computed(() => {
  return storage.idSelected;
});

watch(idFarm, () => {
  getDataClients();
});

onMounted(() => {
  getDataClients();
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

.modal-eps {
  overflow-y: scroll;
  max-height: 450px;
}

.modal-eps::-webkit-scrollbar {
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
