<template>
  <div class="q-py-md table-container">
    <div class="row">
      <i class="icon icon-backRoute q-pt-lg" @click="$router.back()" />
      <h6 class="title q-my-lg">TIPOS DE PAGO</h6>
    </div>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd @onClick="clickButton" label="Crear tipo de pago" />
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
                title="Pagos"
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
                    placeholder="Buscar"
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
                        @click="editPayMaintenance(props.row)"
                      />
                      <q-btn
                        icon="highlight_off"
                        text-color="blue-10"
                        class="col text-bold q-pa-none icon-table"
                        @click="inactivePayMaintenance(props.row._id)"
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
                title="Pagos"
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
                    placeholder="Buscar"
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
                        @click="activePayMaintenance(props.row._id)"
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
      <div class="modal-pays">
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
              v-model="nameTypePays"
              @onWrite="getInputName"
            />
            <Input
              label="Descripción"
              type="text"
              :required="false"
              :value="valueInputDescription"
              :v-model="descriptionTypePays"
              @onWrite="getInputDescription"
            />
            <span class="text-required q-py-sm"
              >Todos los campos con <span class="text-red">*</span> son
              obligatorios</span
            >
            <div class="row justify-center">
              <ButtonSave
                v-if="typeAction"
                :disable="disableSave"
                @onClick="postDataTypePays"
              />
              <ButtonSave
                v-else
                :disable="disableSave"
                @onClick="updateDataTypePays"
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
  activeTypePay,
  getTypePays,
  inactiveTypePay,
  postTypePay,
  updateTypePay,
} from "@/api/maintenance/type-pays";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";
import Input from "@/commons/forms/Input.vue";
import ModalForm from "@/modules/global/ModalForm.vue";
import { useStorage } from "@/stores/localStorage.js";
import { modalState } from "@/stores/modal.js";
import { useQuasar } from "quasar";
import { computed, onMounted, ref, watch } from "vue";

const $q = useQuasar();
const modal = modalState();

const titleModal = ref("");
const loading = ref(false);
const typeAction = ref(true);
const rows = ref([]);
const inactiveRows = ref([]);
const idTypePays = ref();
const storage = useStorage();
const isLoading = ref(false);

const disableSave = computed(() => {
  if (nameTypePays.value == "") {
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
let nameTypePays = ref("");
let descriptionTypePays = ref("");
let valueInputName = ref("");
let valueInputDescription = ref("");

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
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
]);

const getInputName = (value) => {
  nameTypePays.value = value;
};

const getInputDescription = (value) => {
  descriptionTypePays.value = value;
};

const clickButton = () => {
  titleModal.value = "REGISTRAR TIPO DE PAGO";
  resetValuesForm();
  typeAction.value = true;
  modal.toggleModal();
};

const resetValuesForm = () => {
  valueInputDescription.value = "";
  valueInputName.value = "";
  nameTypePays.value = "";
  descriptionTypePays.value = "";
};

const editPayMaintenance = (item) => {
  titleModal.value = "EDITAR TIPO DE PAGO";
  typeAction.value = false;
  idTypePays.value = item._id;
  valueInputDescription.value = item.description;
  valueInputName.value = item.name;
  nameTypePays.value = item.name;
  descriptionTypePays.value = item.description;
  modal.toggleModal();
};

const showNotification = (type, message) => {
  $q.notify({
    type: type,
    message: message,
    position: "top",
  });
};

async function getDataTypePays() {
  rows.value = [];
  inactiveRows.value = [];
  loading.value = true;
  try {
    const { pays } = await getTypePays(idFarm.value);
    let countActive = 1;
    let countInactive = 1;
    pays.forEach((item) => {
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
}

async function postDataTypePays() {
  isLoading.value = true;
  try {
    const pays = await postTypePay(
      {
        name: nameTypePays.value,
        description: descriptionTypePays.value,
      },
      idFarm.value
    );
    isLoading.value = false;
    showNotification("positive", "Tipo de pago registrado correctamente");
    modal.toggleModal();
    rows.value = [];
    getDataTypePays();
  } catch {
    isLoading.value = false;
    showNotification(
      "negative",
      "Ocurrió un error, por favor verifique los datos"
    );
  }
}

async function updateDataTypePays() {
  isLoading.value = true;
  try {
    const response = await updateTypePay(
      {
        id: idTypePays.value,
        name: nameTypePays.value,
        description: descriptionTypePays.value,
      },
      idFarm.value
    );
    isLoading.value = false;
    showNotification("positive", "Tipo de pago actualizado correctamente");
    modal.toggleModal();
    rows.value = [];
    getDataTypePays();
  } catch {
    isLoading.value = false;
    showNotification(
      "negative",
      "Ocurrió un error, por favor verifique los datos"
    );
  }
  nameTypePays.value = "";
  descriptionTypePays.value = "";
}

async function activePayMaintenance(id) {
  loading.value = true;
  try {
    const active = await activeTypePay(id, idFarm.value);
    showNotification("positive", "Tipo de pago activado correctamente");
    loading.value = false;
    rows.value = [];
    inactiveRows.value = [];
    getDataTypePays();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

async function inactivePayMaintenance(id) {
  loading.value = false;
  try {
    const inactive = await inactiveTypePay(id, idFarm.value);
    loading.value = false;
    showNotification("positive", "Tipo de pago desactivado correctamente");
    rows.value = [];
    inactiveRows.value = [];
    getDataTypePays();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

const idFarm = computed(() => {
  return storage.idSelected;
});

watch(idFarm, () => {
  getDataTypePays();
});

onMounted(() => {
  getDataTypePays();
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
.modal-pays {
  overflow-y: scroll;
  max-height: 450px;
}
.modal-pays::-webkit-scrollbar {
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
