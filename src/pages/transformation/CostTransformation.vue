<template>
  <div class="q-py-sm table-container">
    <div class="row">
      <i class="icon icon-backRoute q-pt-lg" @click="$router.back()" />
      <h6 class="title q-my-lg">Costos de transformación</h6>
    </div>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd
        @onClick="clickButton"
        label="Registar costo de transformación"
      />
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
                title="Costos de transformación"
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
                        @click="editTransformationCost(props.row)"
                      >
                        <q-tooltip class="bg-indigo" :offset="[10, 10]">
                          Editar
                        </q-tooltip>
                      </q-btn>
                      <q-btn
                        icon="highlight_off"
                        text-color="blue-10"
                        class="col text-bold q-pa-none icon-table"
                        @click="inactiveActivityExpenseCosts(props.row._id)"
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
                title="Costos de transformación"
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
                        @click="activeActivityExpenseCosts(props.row._id)"
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
      <div class="modal-transformation">
        <h6 class="q-my-md text-center">{{ titleModal }}</h6>
        <div class="row q-px-xl">
          <div class="col-12">
            <Input
              label="Nombre"
              :required="true"
              type="text"
              :ruless="rules"
              :value="valueInputName"
              v-model="nameTransformationCost"
              @onWrite="getInputName"
            />
            <Select
              class="q-pb-lg"
              type="lots"
              label="Lote"
              :v-model="lotTransformationCost"
              :required="true"
              :ruless="rules"
              :value="valueSelectLot"
              @onSelect="getSelectLot"
            />
            <Input
              class="q-mb-md"
              label="Descripción"
              :required="true"
              type="text"
              :ruless="rules"
              :value="valueInputDescription"
              v-model="descriptionTransformationCost"
              @onWrite="getInputDescription"
            />
            <Input
              class="q-pb-xs"
              label="Costo"
              :required="true"
              type="text"
              :ruless="rules"
              :value="valueInputCost"
              v-model="costTransformation"
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
                @onClick="postDataTransformationCost"
              />
              <ButtonSave
                v-else
                :disable="disableSave"
                @onClick="updateDataActivityExpense"
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
  activeTransformationCost,
  getTransformationCosts,
  inactiveTransformationCost,
  postTransformationCost,
  updateTransformationCost,
} from "@/api/transformation/costs";
import { getLots } from "@/api/maintenance/lots";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";
import Input from "@/commons/forms/Input.vue";
import Select from "@/commons/forms/Select.vue";
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
const idTransformationCost = ref();
const storage = useStorage();
const isLoading = ref(false);

const disableSave = computed(() => {
  if (
    nameTransformationCost.value == "" ||
    costTransformation.value == "" ||
    descriptionTransformationCost.value == ""
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

let nameTransformationCost = ref("");
let descriptionTransformationCost = ref("");
let costTransformation = ref("");
let lotTransformationCost = ref("");

let valueInputName = ref("");
let valueInputDescription = ref("");
let valueInputCost = ref("");
let valueSelectLot = ref("");

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
    name: "cost",
    label: "Costo",
    field: "cost",
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
  nameTransformationCost.value = value;
};

const getInputDescription = (value) => {
  descriptionTransformationCost.value = value;
};

const getInputObservation = (value) => {
  costTransformation.value = value;
};

const getSelectLot = (value) => {
  lotTransformationCost.value = value;
};

const clickButton = () => {
  titleModal.value = "REGISTRAR COSTO";
  resetValuesForm();
  typeAction.value = true;
  modal.toggleModal();
};

const resetValuesForm = () => {
  valueInputName.value = "";
  valueInputDescription.value = "";
  valueInputCost.value = "";
  valueSelectLot.value = "";
  nameTransformationCost.value = "";
  descriptionTransformationCost.value = "";
  costTransformation.value = "";
  lotTransformationCost.value = "";
};

const editTransformationCost = (item) => {
  titleModal.value = "EDITAR COSTO";
  typeAction.value = false;
  idTransformationCost.value = item._id;
  valueInputName.value = item.name;
  valueInputDescription.value = item.description;
  valueInputCost.value = item.cost;
  nameTransformationCost.value = item.name;
  descriptionTransformationCost.value = item.description;
  costTransformation.value = item.cost;
  valueSelectLot.value = item.lot;
  lotTransformationCost.value = item.lot;
  modal.toggleModal();
};

const showNotification = (type, message) => {
  $q.notify({
    type: type,
    message: message,
    position: "top",
  });
};

const getDataTransformationCosts = async () => {
  rows.value = [];
  inactiveRows.value = [];
  loading.value = true;
  try {
    const { costs } = await getTransformationCosts(idFarm.value);
    const { lots } = await getLots(idFarm.value);
    let countActive = 1;
    let countInactive = 1;
    costs.forEach((item) => {
      item.status = item.status ? "Inactivo" : "Activo";
      let lotTransformation = item.lot;
      lots.forEach((item) => {
        if (item._id == lotTransformation) {
          lotTransformation = item.name;
        }
      });
      item.lot = lotTransformation;
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

async function postDataTransformationCost() {
  const { lots } = await getLots(idFarm.value);

  lots.forEach((item) => {
    if (item.name == lotTransformationCost.value) {
      lotTransformationCost.value = item._id;
    }
  });

  isLoading.value = true;
  try {
    await postTransformationCost(
      {
        name: nameTransformationCost.value,
        description: descriptionTransformationCost.value,
        lot: lotTransformationCost.value,
        cost: costTransformation.value,
      },
      idFarm.value
    );
    isLoading.value = false;
    showNotification(
      "positive",
      "Costo de transformación registrado correctamente"
    );
    modal.toggleModal();
    rows.value = [];
    getDataTransformationCosts();
  } catch {
    isLoading.value = false;
    showNotification(
      "negative",
      "Ocurrió un error, por favor verifique los datos"
    );
  }
}

async function updateDataActivityExpense() {
  const { lots } = await getLots(idFarm.value);

  lots.forEach((item) => {
    if (item.name == lotTransformationCost.value) {
      lotTransformationCost.value = item._id;
    }
  });

  isLoading.value = true;
  try {
    await updateTransformationCost(
      {
        id: idTransformationCost.value,
        name: nameTransformationCost.value,
        description: descriptionTransformationCost.value,
        lot: lotTransformationCost.value,
        cost: costTransformation.value,
      },
      idFarm.value
    );
    isLoading.value = false;
    showNotification(
      "positive",
      "Costo de transformación actualizado correctamente"
    );
    modal.toggleModal();
    rows.value = [];
    getDataTransformationCosts();
  } catch {
    isLoading.value = false;
    showNotification(
      "negative",
      "Ocurrió un error, por favor verifique los datos"
    );
  }
  nameTransformationCost.value = "";
  descriptionTransformationCost.value = "";
  lotTransformationCost.value = "";
  costTransformation.value = "";
}

async function activeActivityExpenseCosts(id) {
  loading.value = true;
  try {
    await activeTransformationCost(id, idFarm.value);
    showNotification(
      "positive",
      "Costo de transformación activado correctamente"
    );
    loading.value = false;
    rows.value = [];
    inactiveRows.value = [];
    getDataTransformationCosts();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

async function inactiveActivityExpenseCosts(id) {
  loading.value = false;
  try {
    await inactiveTransformationCost(id, idFarm.value);
    loading.value = false;
    showNotification(
      "positive",
      "Costo de transformación desactivado correctamente"
    );
    rows.value = [];
    inactiveRows.value = [];
    getDataTransformationCosts();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

const idFarm = computed(() => {
  return storage.idSelected;
});

watch(idFarm, () => {
  getDataTransformationCosts();
});

onMounted(() => {
  getDataTransformationCosts();
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
.modal-transformation {
  overflow-y: scroll;
  max-height: 450px;
}
.modal-transformation::-webkit-scrollbar {
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
