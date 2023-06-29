<template>
  <div class="q-py-sm table-container">
    <div class="row">
      <i class="icon icon-backRoute q-pt-lg" @click="$router.back()" />
      <h6 class="title q-my-lg">Gastos de Actividades</h6>
    </div>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd
        @onClick="clickButton"
        label="Crear nuevo gasto de actividad"
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
                title="Gastos de Actividades"
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
                        @click="editActivityExpenseCosts(props.row)"
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
                title="Gastos de Actividades"
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
              v-model="nameActivityExpense"
              @onWrite="getInputName"
            />
            <Input
              label="Descripción"
              :required="true"
              type="text"
              :ruless="rules"
              :value="valueInputDescription"
              v-model="descriptionActivityExpense"
              @onWrite="getInputDescription"
            />
            <Select
              class="q-pb-md"
              @onSelect="getSelectWork"
              type="work"
              :required="true"
              label="Tipo de labor"
              :ruless="rules"
              :value="valueSelectWork"
            />
            <Select
              class="q-pb-md"
              @onSelect="getSelectSpent"
              type="spent"
              :required="true"
              label="Tipo de gasto"
              :ruless="rules"
              :value="valueSelectSpent"
            />
            <Input
              class="q-pb-xs"
              label="Valor"
              :required="true"
              type="text"
              :ruless="rules"
              :value="valueInputWorth"
              v-model="worthActivityExpense"
              @onWrite="getInputWorth"
            />
            <span class="text-required q-pb-sm"
              >Todos los campos con <span class="text-red">*</span> son
              obligatorios</span
            >
            <div class="row justify-center">
              <ButtonSave
                v-if="typeAction"
                :disable="disableSave"
                @onClick="postDataActivityExpense"
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
  activeActivityExpenses,
  getActivityExpenses,
  inactiveActivityExpenses,
  postActivityExpenses,
  updateActivityExpenses,
} from "@/api/costs/activityexpenses";
import { getTypeLabors } from "@/api/maintenance/type-labors";
import { getTypeSpents } from "@/api/maintenance/type-spents";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";
import Input from "@/commons/forms/Input.vue";
import Select from "@/commons/forms/Select.vue";
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
const idActivityExpense = ref();
const storage = useStorage();
const isLoading = ref(false);

const disableSave = computed(() => {
  if (
    nameActivityExpense.value == "" ||
    worthActivityExpense.value == "" ||
    descriptionActivityExpense.value == ""
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

let nameActivityExpense = ref("");
let descriptionActivityExpense = ref("");
let worthActivityExpense = ref("");
let workActivityExpense = ref("");
let spentActivityExpense = ref("");
let valueSelectSpent = ref("");

let valueInputName = ref("");
let valueInputDescription = ref("");
let valueInputWorth = ref("");
let valueSelectWork = ref("");

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
    name: "work",
    label: "Tipo Labor",
    field: "work",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
  {
    name: "spent",
    label: "Tipo de gasto",
    field: "spent",
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
    name: "worth",
    label: "Valor",
    field: "worth",
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
  nameActivityExpense.value = value;
};

const getSelectWork = (value) => {
  workActivityExpense.value = value;
};

const getSelectSpent = (value) => {
  spentActivityExpense.value = value;
};

const getInputDescription = (value) => {
  descriptionActivityExpense.value = value;
};

const getInputWorth = (value) => {
  worthActivityExpense.value = value;
};

const clickButton = () => {
  titleModal.value = "REGISTRAR GASTO DE ACITIVIDAD";
  resetValuesForm();
  typeAction.value = true;
  modal.toggleModal();
};

const resetValuesForm = () => {
  valueInputName.value = "";
  valueInputDescription.value = "";
  valueInputWorth.value = "";
  nameActivityExpense.value = "";
  descriptionActivityExpense.value = "";
  worthActivityExpense.value = "";
};

const editActivityExpenseCosts = (item) => {
  titleModal.value = "EDITAR GASTO DE ACTIVIDAD";
  typeAction.value = false;
  idActivityExpense.value = item._id;
  valueInputName.value = item.name;
  valueInputDescription.value = item.description;
  valueInputWorth.value = item.worth;
  valueSelectWork.value = item.work;
  nameActivityExpense.value = item.name;
  descriptionActivityExpense.value = item.description;
  worthActivityExpense.value = item.worth;
  workActivityExpense.value = item.work;
  valueSelectSpent.value = item.spent;
  spentActivityExpense.value = item.spent;
  modal.toggleModal();
};

const showNotification = (type, message) => {
  $q.notify({
    type: type,
    message: message,
    position: "top",
  });
};

const getDataActivityExpenses = async () => {
  rows.value = [];
  inactiveRows.value = [];
  loading.value = true;
  try {
    const { activityexpenses } = await getActivityExpenses(idFarm.value);
    const { works } = await getTypeLabors(idFarm.value);
    const { spents } = await getTypeSpents(idFarm.value);

    let countActive = 1;
    let countInactive = 1;
    activityexpenses.forEach((item) => {
      item.status = item.status ? "Inactivo" : "Activo";

      let spentsType = item.spent._id;
      let worksType = item.work._id;

      spents.forEach((item) => {
        if (item._id == spentsType) {
          spentsType = item.name;
        }
      });
      item.spent = spentsType;
      works.forEach((item) => {
        if (item._id == worksType) {
          worksType = item.name;
        }
      });
      item.work = worksType;

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

async function postDataActivityExpense() {
  isLoading.value = true;

  const { works } = await getTypeLabors(idFarm.value);
  const { spents } = await getTypeSpents(idFarm.value);

  spents.forEach((item) => {
    if (item.name == spentActivityExpense.value) {
      spentActivityExpense.value = item._id;
    }
  });

  works.forEach((item) => {
    if (item.name == workActivityExpense.value) {
      workActivityExpense.value = item._id;
    }
  });

  try {
    await postActivityExpenses(
      {
        name: nameActivityExpense.value,
        description: descriptionActivityExpense.value,
        worth: worthActivityExpense.value,
        work: workActivityExpense.value,
        spent: spentActivityExpense.value,
      },
      idFarm.value
    );
    isLoading.value = false;
    showNotification("positive", "Gasto de actividad registrado correctamente");
    modal.toggleModal();
    rows.value = [];
    getDataActivityExpenses();
  } catch {
    isLoading.value = false;
    showNotification(
      "negative",
      "Ocurrió un error, por favor verifique los datos"
    );
  }
}

async function updateDataActivityExpense() {
  isLoading.value = true;

  const { works } = await getTypeLabors(idFarm.value);
  const { spents } = await getTypeSpents(idFarm.value);

  works.forEach((item) => {
    if (item.name == workActivityExpense.value) {
      workActivityExpense.value = item._id;
    }
  });

  spents.forEach((item) => {
    if (item.name == spentActivityExpense.value) {
      spentActivityExpense.value = item._id;
    }
  });

  try {
    await updateActivityExpenses(
      {
        id: idActivityExpense.value,
        name: nameActivityExpense.value,
        description: descriptionActivityExpense.value,
        worth: worthActivityExpense.value,
        work: workActivityExpense.value,
        spent: spentActivityExpense.value,
      },
      idFarm.value
    );
    isLoading.value = false;
    showNotification(
      "positive",
      "Gasto de actividad actualizado correctamente"
    );
    modal.toggleModal();
    rows.value = [];
    getDataActivityExpenses();
  } catch {
    isLoading.value = false;
    showNotification(
      "negative",
      "Ocurrió un error, por favor verifique los datos"
    );
  }
  nameActivityExpense.value = "";
  descriptionActivityExpense.value = "";
  worthActivityExpense.value = "";
}

async function activeActivityExpenseCosts(id) {
  loading.value = true;
  try {
    await activeActivityExpenses(id, idFarm.value);
    showNotification("positive", "Gasto de actividad activado correctamente");
    loading.value = false;
    rows.value = [];
    inactiveRows.value = [];
    getDataActivityExpenses();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

async function inactiveActivityExpenseCosts(id) {
  loading.value = false;
  try {
    await inactiveActivityExpenses(id, idFarm.value);
    loading.value = false;
    showNotification(
      "positive",
      "Gasto de actividad desactivado correctamente"
    );
    rows.value = [];
    inactiveRows.value = [];
    getDataActivityExpenses();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

const idFarm = computed(() => {
  return storage.idSelected;
});

watch(idFarm, () => {
  getDataActivityExpenses();
});

onMounted(() => {
  getDataActivityExpenses();
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
