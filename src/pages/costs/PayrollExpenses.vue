<template>
  <div class="q-py-sm table-container">
    <div class="row">
      <i class="icon icon-backRoute q-pt-lg" @click="$router.back()" />
      <h6 class="title q-my-lg">Gastos de Nómina</h6>
    </div>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd @onClick="clickButton" label="Crear nuevo gasto de nómina" />
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
            <q-tab name="active" label="Pendientes" />
            <q-tab name="inactive" label="Pagos" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="active">
              <q-table
                flat
                bordered
                title="Gastos de Nómina"
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
                        @click="editPayrollCosts(props.row)"
                      >
                        <q-tooltip class="bg-indigo" :offset="[10, 10]">
                          Editar
                        </q-tooltip>
                      </q-btn>
                      <q-btn
                        icon="payment"
                        text-color="blue-10"
                        class="col text-bold q-pa-none icon-table"
                        @click="payPayrollCosts(props.row)"
                      >
                        <q-tooltip class="bg-indigo" :offset="[10, 10]">
                          Pagar
                        </q-tooltip>
                      </q-btn>
                      <q-btn
                        icon="highlight_off"
                        text-color="blue-10"
                        class="col text-bold q-pa-none icon-table"
                        @click="deletePayrollCosts(props.row._id)"
                      >
                        <q-tooltip class="bg-indigo" :offset="[10, 10]">
                          Eliminar
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
                title="Gastos de Nómina"
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
                        icon="highlight_off"
                        text-color="blue-10"
                        class="col text-bold q-pa-none icon-table"
                        @click="declinePayrollCosts(props.row._id)"
                      >
                        <q-tooltip class="bg-indigo" :offset="[10, 10]">
                          Declinar pago
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
      <div class="modal-payroll">
        <h6 class="q-my-md text-center">{{ titleModal }}</h6>
        <div class="row q-px-xl">
          <div class="col-12">
            <Select
              class="q-pb-lg"
              type="people"
              label="Persona"
              :v-model="peopleCost"
              :required="true"
              :ruless="rules"
              :value="valueSelectPeople"
              @onSelect="getSelectPeople"
            />
            <Select
              class="q-pb-md"
              type="typepay"
              label="Tipo de gasto"
              :v-model="payCost"
              :required="true"
              :ruless="rules"
              :value="valueSelectPay"
              @onSelect="getSelectPay"
            />
            <Select
              class="q-pb-md"
              type="activity"
              label="Tipo de actividad"
              :v-model="activityCost"
              :required="true"
              :ruless="rules"
              :value="valueSelectActivity"
              @onSelect="getSelectActivity"
            />
            <Input
              label="Valor"
              type="number"
              :required="true"
              :ruless="rules"
              v-model="worthCost"
              :value="valueInputWorth"
              @onWrite="getInputWorth"
            />
            <Select
              class="q-pb-md"
              type="statePay"
              label="Estado del pago"
              :v-model="statePayCost"
              :required="true"
              :ruless="rules"
              :value="valueSelectStatus"
              @onSelect="getSelectStatus"
            />
            <span class="text-required q-pb-sm"
              >Todos los campos con <span class="text-red">*</span> son
              obligatorios</span
            >
            <div class="row justify-center">
              <ButtonSave
                v-if="typeAction"
                :disable="disableSave"
                @onClick="postDataCostsPlanting"
              />
              <ButtonSave
                v-else
                :disable="disableSave"
                @onClick="updateDataCostsPayroll"
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
  getCostsPayroll,
  deleteCostsPayroll,
  postCostsPayroll,
  updateCostsPayroll,
  payCostsPayroll,
  declineCostsPayroll,
} from "@/api/costs/payrollexpenses";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";
import Input from "@/commons/forms/Input.vue";
import Select from "@/commons/forms/Select.vue";
import ModalForm from "@/modules/global/ModalForm.vue";
import { useStorage } from "@/stores/localStorage.js";
import { modalState } from "@/stores/modal.js";
import { getActivityExpenses } from "@/api/costs/activityexpenses";
import { useQuasar } from "quasar";
import { getTypePays } from "@/api/maintenance/type-pays";
import { getPeople } from "@/api/maintenance/people";
import { computed, onMounted, ref, watch } from "vue";

const $q = useQuasar();

const modal = modalState();
const titleModal = ref("");
const loading = ref(false);
const typeAction = ref(true);
const rows = ref([]);
const inactiveRows = ref([]);
const idCostsPayroll = ref();
const storage = useStorage();
const isLoading = ref(false);

const disableSave = computed(() => {
  if (
    worthCost.value == "" ||
    payCost.value == "" ||
    peopleCost.value == "" ||
    activityCost.value == ""
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

let worthCost = ref("");
let payCost = ref("");
let peopleCost = ref("");
let activityCost = ref("");
let statePayCost = ref("");

let valueSelectStatus = ref("");
let valueSelectPay = ref("");
let valueSelectActivity = ref("");
let valueSelectPeople = ref("");
let valueInputWorth = ref("");

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
    name: "people",
    label: "Persona",
    field: (row) => row.people.name,
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
  {
    name: "typepay",
    label: "Pago",
    field: (row) => row.typepay.name,
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
  {
    name: "activity",
    label: "Actividad",
    field: (row) => row.activity.name,
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

const getInputWorth = (value) => {
  worthCost.value = value;
};

const getSelectPeople = (value) => {
  peopleCost.value = value;
};

const getSelectActivity = (value) => {
  activityCost.value = value;
};

const getSelectPay = (value) => {
  payCost.value = value;
};

const getSelectStatus = (value) => {
  statePayCost.value = value;
};

const clickButton = () => {
  titleModal.value = "REGISTRAR GASTO DE NÓMINA";
  resetValuesForm();
  typeAction.value = true;
  modal.toggleModal();
};

const resetValuesForm = () => {
  valueInputWorth.value = "";
  valueSelectPeople.value = "";
  valueSelectPay.value = "";
  valueSelectActivity.value = "";
  activityCost.value = "";
  worthCost.value = "";
  peopleCost.value = "";
  payCost.value = "";
  idCostsPayroll.value = "";
  valueSelectStatus.value = "";
  statePayCost.value = "";
};

const editPayrollCosts = (item) => {
  titleModal.value = "EDITAR GASTO DE NÓMINA";
  typeAction.value = false;
  idCostsPayroll.value = item._id;
  valueInputWorth.value = item.worth;
  valueSelectPeople.value = item.people.name;
  valueSelectPay.value = item.typepay.name;
  valueSelectActivity.value = item.activity.name;
  valueSelectStatus.value = item.statuspay;
  activityCost.value = item.activity.name;
  worthCost.value = item.worth;
  peopleCost.value = item.people.name;
  payCost.value = item.typepay.name;
  statePayCost.value = item.statuspay;
  modal.toggleModal();
};

const showNotification = (type, message) => {
  $q.notify({
    type: type,
    message: message,
    position: "top",
  });
};

const getDataCostsPayroll = async () => {
  rows.value = [];
  inactiveRows.value = [];
  loading.value = true;
  try {
    const { payrolls } = await getCostsPayroll(idFarm.value);
    let countActive = 1;
    let countInactive = 1;
    payrolls.forEach((item) => {
      item.statuspay = item.statuspay ? "Pendiente" : "Pagado";

      if (item.statuspay == "Pendiente") {
        item.id = countActive++;
        rows.value.push(item);
      } else {
        item.id = countInactive++;
        inactiveRows.value.push(item);
      }
    });
    loading.value = false;
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
};

async function postDataCostsPlanting() {
  isLoading.value = true;
  const { people } = await getPeople(idFarm.value);
  const { pays } = await getTypePays(idFarm.value);
  const { activityexpenses } = await getActivityExpenses(idFarm.value);

  people.forEach((item) => {
    if (item.name == peopleCost.value) {
      peopleCost.value = item._id;
    }
  });

  pays.forEach((item) => {
    if (item.name == payCost.value) {
      payCost.value = item._id;
    }
  });

  activityexpenses.forEach((item) => {
    if (item.name == activityCost.value) {
      activityCost.value = item._id;
    }
  });

  try {
    await postCostsPayroll(
      {
        people: peopleCost.value,
        typepay: payCost.value,
        activity: activityCost.value,
        worth: worthCost.value,
        statuspay: statePayCost.value
          ? statePayCost.value == "Pendiente"
            ? 1
            : 0
          : 1,
      },
      idFarm.value
    );
    isLoading.value = false;
    showNotification("positive", "Gasto de nómina registrado correctamente");
    modal.toggleModal();
    rows.value = [];
    getDataCostsPayroll();
  } catch {
    isLoading.value = false;
    showNotification(
      "negative",
      "Ocurrió un error, por favor verifique los datos"
    );
  }
}

async function updateDataCostsPayroll() {
  isLoading.value = true;
  const { people } = await getPeople(idFarm.value);
  const { pays } = await getTypePays(idFarm.value);
  const { activityexpenses } = await getActivityExpenses(idFarm.value);

  people.forEach((item) => {
    if (item.name == peopleCost.value) {
      peopleCost.value = item._id;
    }
  });

  pays.forEach((item) => {
    if (item.name == payCost.value) {
      payCost.value = item._id;
    }
  });

  activityexpenses.forEach((item) => {
    if (item.name == activityCost.value) {
      activityCost.value = item._id;
    }
  });

  try {
    await updateCostsPayroll(
      {
        id: idCostsPayroll.value,
        people: peopleCost.value,
        typepay: payCost.value,
        activity: activityCost.value,
        worth: worthCost.value,
        statuspay: statePayCost.value
          ? statePayCost.value == "Pendiente"
            ? 1
            : 0
          : 1,
      },
      idFarm.value
    );
    isLoading.value = false;
    showNotification("positive", "Gasto de nómina actualizado correctamente");
    modal.toggleModal();
    rows.value = [];
    getDataCostsPayroll();
  } catch {
    isLoading.value = false;
    showNotification(
      "negative",
      "Ocurrió un error, por favor verifique los datos"
    );
  }
  worthCost.value = "";
}

async function payPayrollCosts(id) {
  loading.value = true;
  try {
    await payCostsPayroll(id._id, idFarm.value);
    showNotification("positive", "Gasto de nómina pagado correctamente");
    loading.value = false;
    rows.value = [];
    inactiveRows.value = [];
    getDataCostsPayroll();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

async function deletePayrollCosts(id) {
  loading.value = false;
  try {
    await deleteCostsPayroll(id, idFarm.value);
    loading.value = false;
    showNotification("positive", "Gasto de nómina eliminado correctamente");
    rows.value = [];
    inactiveRows.value = [];
    getDataCostsPayroll();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

async function declinePayrollCosts(id) {
  loading.value = false;
  try {
    await declineCostsPayroll(id, idFarm.value);
    loading.value = false;
    showNotification("positive", "Gasto de nómina declinado correctamente");
    rows.value = [];
    inactiveRows.value = [];
    getDataCostsPayroll();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

const idFarm = computed(() => {
  return storage.idSelected;
});

watch(idFarm, () => {
  getDataCostsPayroll();
});

onMounted(() => {
  getDataCostsPayroll();
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
.modal-payroll {
  overflow-y: scroll;
  max-height: 450px;
}
.modal-payroll::-webkit-scrollbar {
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
