<template>
  <div class="q-py-sm table-container">
    <div class="row">
      <i class="icon icon-backRoute q-pt-lg" @click="$router.back()" />
      <h6 class="title q-my-lg">Modelos de transformacion</h6>
    </div>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd @onClick="clickButton" label="Registrar nuevo modelo" />
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
                title="Modelos de transformación"
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
                        @click="editTransformationModel(props.row)"
                      />
                      <q-btn
                        icon="highlight_off"
                        text-color="blue-10"
                        class="col text-bold q-pa-none icon-table"
                        @click="inactiveTransformationModels(props.row._id)"
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
                title="Modelos"
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
                        @click="activeTransformationModels(props.row._id)"
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
      <div class="modal-activity">
        <h6 class="q-my-md text-center">{{ titleModal }}</h6>
        <div class="row q-px-xl">
          <div class="col-12">
            <Input
              label="Nombre"
              :required="true"
              type="text"
              :ruless="rules"
              :value="valueInputName"
              v-model="nameTransformationModel"
              @onWrite="getInputName"
            />
            <Input
              label="Descripción"
              :required="true"
              type="text"
              :ruless="rules"
              :value="valueInputDescription"
              v-model="descriptionTransformationModel"
              @onWrite="getInputDescription"
            />
            <Input
              class="q-pb-xs"
              label="Valor"
              :required="true"
              type="text"
              :ruless="rules"
              :value="valueInputUnitvalue"
              v-model="unitvalueTransformationModel"
              @onWrite="getInputUnitvalue"
            />
            <span class="text-required q-pb-sm"
              >Todos los campos con <span class="text-red">*</span> son
              obligatorios</span
            >
            <div class="row justify-center">
              <ButtonSave
                v-if="typeAction"
                :disable="disableSave"
                @onClick="postDataTransformationModel"
              />
              <ButtonSave
                v-else
                :disable="disableSave"
                @onClick="updateDataTransformationModel"
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
  activeTransformationModel,
  getTransformationModels,
  inactiveTransformationModel,
  postTransformationModel,
  updateTransformationModel,
} from "@/api/transformation/modelss";
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
const idTransformationModel = ref();
const storage = useStorage();
const isLoading = ref(false);

const disableSave = computed(() => {
  if (
    nameTransformationModel.value == "" ||
    descriptionTransformationModel.value == "" ||
    unitvalueTransformationModel.value == ""
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

let nameTransformationModel = ref("");
let descriptionTransformationModel = ref("");
let unitvalueTransformationModel = ref("");

let valueInputName = ref("");
let valueInputDescription = ref("");
let valueInputUnitvalue = ref("");

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
    name: "unitvalue",
    label: "Valor unitario",
    field: "unitvalue",
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
  nameTransformationModel.value = value;
};

const getInputDescription = (value) => {
  descriptionTransformationModel.value = value;
};

const getInputUnitvalue = (value) => {
  unitvalueTransformationModel.value = value;
};

const clickButton = () => {
  titleModal.value = "REGISTRAR MODELO";
  resetValuesForm();
  typeAction.value = true;
  modal.toggleModal();
};

const resetValuesForm = () => {
  valueInputName.value = "";
  valueInputDescription.value = "";
  valueInputUnitvalue.value = "";
  nameTransformationModel.value = "";
  descriptionTransformationModel.value = "";
  unitvalueTransformationModel.value = "";
};

const editTransformationModel = (item) => {
  titleModal.value = "EDITAR MODELO";
  typeAction.value = false;
  idTransformationModel.value = item._id;
  valueInputName.value = item.name;
  valueInputDescription.value = item.description;
  valueInputUnitvalue.value = item.unitvalue;
  nameTransformationModel.value = item.name;
  descriptionTransformationModel.value = item.description;
  unitvalueTransformationModel.value = item.unitvalue;
  modal.toggleModal();
};

const showNotification = (type, message) => {
  $q.notify({
    type: type,
    message: message,
    position: "top",
  });
};

const getDataTransformationModels = async () => {
  rows.value = [];
  inactiveRows.value = [];
  loading.value = true;
  try {
    const { models } = await getTransformationModels(idFarm.value);
    let countActive = 1;
    let countInactive = 1;
    models.forEach((item) => {
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

async function postDataTransformationModel() {
  isLoading.value = true;
  try {
    await postTransformationModel(
      {
        name: nameTransformationModel.value,
        description: descriptionTransformationModel.value,
        unitvalue: unitvalueTransformationModel.value,
      },
      idFarm.value
    );
    isLoading.value = false;
    showNotification(
      "positive",
      "Modelo de transformación registrado correctamente"
    );
    modal.toggleModal();
    rows.value = [];
    getDataTransformationModels();
  } catch {
    isLoading.value = false;
    showNotification(
      "negative",
      "Ocurrió un error, por favor verifique los datos"
    );
  }
}

async function updateDataTransformationModel() {
  isLoading.value = true;
  try {
    await updateTransformationModel(
      {
        id: idTransformationModel.value,
        name: nameTransformationModel.value,
        description: descriptionTransformationModel.value,
        unitvalue: unitvalueTransformationModel.value,
      },
      idFarm.value
    );
    isLoading.value = false;
    showNotification(
      "positive",
      "Modelo de transformación actualizado correctamente"
    );
    modal.toggleModal();
    rows.value = [];
    getDataTransformationModels();
  } catch {
    isLoading.value = false;
    showNotification(
      "negative",
      "Ocurrió un error, por favor verifique los datos"
    );
  }
  nameTransformationModel.value = "";
  descriptionTransformationModel.value = "";
  unitvalueTransformationModel.value = "";
}

async function activeTransformationModels(id) {
  loading.value = true;
  try {
    await activeTransformationModel(id, idFarm.value);
    showNotification(
      "positive",
      "Modelo de transformación activado correctamente"
    );
    loading.value = false;
    rows.value = [];
    inactiveRows.value = [];
    getDataTransformationModels();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

async function inactiveTransformationModels(id) {
  loading.value = false;
  try {
    await inactiveTransformationModel(id, idFarm.value);
    loading.value = false;
    showNotification(
      "positive",
      "Modelo de transformación desactivado correctamente"
    );
    rows.value = [];
    inactiveRows.value = [];
    getDataTransformationModels();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

const idFarm = computed(() => {
  return storage.idSelected;
});

watch(idFarm, () => {
  getDataTransformationModels();
});

onMounted(() => {
  getDataTransformationModels();
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
.modal-activity {
  overflow-y: scroll;
  max-height: 450px;
}
.modal-activity::-webkit-scrollbar {
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
.icon-table {
  font-size: 18px;
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
