<template>
  <div class="q-py-md table-container">
    <div class="row">
      <i class="icon icon-backRoute q-pt-lg" @click="$router.back()" />
      <h6 class="title q-my-lg">HISTORIAL DE PEDIDOS</h6>
    </div>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd @onClick="clickButton" label="Crear nuevo pedido" />
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
                title="Pedidos"
                row-key="client"
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
                        icon="visibility"
                        text-color="blue-10"
                        class="col text-bold q-pa-none icon-table"
                        @click="showOrderDetails(props.row)"
                      >
                        <q-tooltip class="bg-indigo" :offset="[10, 10]">
                          Ver detalles
                        </q-tooltip>
                      </q-btn>
                      <q-btn
                        v-if="props.row.statuspay == 'PENDIENTE'"
                        icon="payment"
                        text-color="blue-10"
                        class="col text-bold q-pa-none icon-table"
                        @click="payOrderUser(props.row._id)"
                      >
                        <q-tooltip class="bg-indigo" :offset="[10, 10]">
                          Marcar como pago
                        </q-tooltip>
                      </q-btn>
                      <q-btn
                        icon="highlight_off"
                        text-color="blue-10"
                        class="col text-bold q-pa-none icon-table"
                        @click="inactiveOrderUser(props.row._id)"
                      >
                        <q-tooltip class="bg-indigo" :offset="[10, 10]">
                          Cancelar
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
                title="Usuarios"
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
                        @click="activeOrderUser(props.row._id)"
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
      <div class="modalSystem">
        <h6 class="q-my-md text-center">{{ titleModal }}</h6>
        <div class="column q-px-xl">
          <div class="col-12">
            <Select
              label="Cliente"
              type="client"
              :required="true"
              :ruless="rules"
              v-model="userClient"
              @onSelect="getSelectClient"
            />

            <div class="q-pt-md">
              <span>Fecha de entrega<span style="color: red">*</span></span>
              <q-input
                filled
                dense
                v-model="date"
                mask="date"
                :rules="['date']"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="date">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>

            <Select
              type="state"
              :ruless="rules"
              :required="true"
              label="Estado de orden"
              v-model="stateOrder"
              @onSelect="getSelectState"
            ></Select>

            <div class="q-pt-lg q-pb-sm column">
              <span>Detalle del pedido:</span>
              <div class="column">
                <q-table
                  flat
                  bordered
                  style="max-width: 300px"
                  row-key="name"
                  :rows="showRows"
                  :columns="columnsShow"
                  :rows-per-page-options="[5, 10, 20]"
                  hide-bottom
                >
                  <template v-slot:body-cell-Acciones="props">
                    <td class="accions-td">
                      <q-btn-group
                        class="full-width full-height"
                        outline
                        square
                      >
                        <q-btn
                          text-color="blue-10"
                          class="col q-pa-none"
                          icon="delete"
                          @click="deleteItemOrder(props.row)"
                        >
                          <q-tooltip class="bg-indigo" :offset="[10, 10]">
                            Eliminar
                          </q-tooltip>
                        </q-btn>
                      </q-btn-group>
                    </td>
                  </template>
                </q-table>
              </div>
            </div>

            <q-btn
              icon="add"
              class="button-add"
              label="Agregar"
              @click="showModalOrder()"
            />

            <div>
              <span>Total:</span><span class="total">{{ valueTotal }}</span>
            </div>

            <span class="text-required q-py-sm"
              >Todos los campos con <span class="text-red">*</span> son
              obligatorios</span
            >
            <div class="row justify-center q-mt-sm">
              <ButtonSave
                :disable="disableSave"
                @onClick="postDataOrderSystem"
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

  <template v-if="showModalOrderValue">
    <ModalForm class="modal" show="false">
      <div class="modalSystem">
        <h6 class="q-my-md q-pt-lg text-center">{{ titleModal }}</h6>
        <div class="row q-px-xl">
          <div class="col-12">
            <Select
              type="models"
              :ruless="rules"
              :required="true"
              label="Producto"
              v-model="productItem"
              @onSelect="getSelectModel"
            ></Select>
            <Input
              class="q-mt-lg"
              label="Cantidad"
              :required="true"
              type="number"
              :ruless="rules"
              v-model="quantity"
              @onWrite="getInputQuantity"
            />
            <div class="row q-mt-xs buttons-modal">
              <q-btn class="q-mx-sm button-one" @click="showRegisterItem()"
                >Cancelar</q-btn
              >
              <q-btn
                class="q-mx-sm button-one"
                @click="saveRegisterItem()"
                :disable="disableSaveItem"
                >Agregar</q-btn
              >
            </div>
            <div class="spinner" v-if="isLoading">
              <q-spinner-ios color="primary" size="2.5em" />
            </div>
          </div>
        </div>
      </div>
    </ModalForm>
  </template>

  <template v-if="modalShow.modalShowIsOpen">
    <ModalForm class="modal" :showDetail="true">
      <div class="modalSystem">
        <h6 class="q-my-md text-center">{{ titleModal }}</h6>
        <div class="row q-px-xl">
          <div class="column col-12" style="font-size: 16px">
            <div class="q-pb-sm">
              <span class="text-bold">Cliente:</span>
              {{ orderValue.client }}
            </div>

            <div class="q-pb-sm">
              <span class="text-bold">Estado de la orden:</span>
              {{ orderValue.statusorder }}
            </div>

            <div class="q-pb-sm">
              <span class="text-bold">Estado del pago:</span>
              {{ orderValue.statuspay }}
            </div>

            <div class="q-pb-sm">
              <span class="text-bold">Fecha de entrega:</span>
              {{ orderValue.dateorder }}
            </div>

            <div class="q-pb-sm">
              <span class="text-bold">Valor total:</span>
              {{ orderValue.total }}
            </div>

            <div class="q-pb-sm column">
              <span class="text-bold">Detalle del pedido:</span>
              <div class="column">
                <q-table
                  flat
                  bordered
                  style="max-width: 300px"
                  row-key="name"
                  :rows="showRows"
                  :columns="columnsShow"
                  :rows-per-page-options="[5, 10, 20]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalForm>
  </template>
</template>
<script setup>
import {
  activeOrder,
  getOrders,
  inactiveOrder,
  postOrder,
  payOrder,
} from "@/api/orders";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";
import Input from "@/commons/forms/Input.vue";
import Select from "@/commons/forms/Select.vue";
import ModalForm from "@/modules/global/ModalForm.vue";
import { useStorage } from "@/stores/localStorage.js";
import { modalState } from "@/stores/modal.js";
import { modalShowState } from "@/stores/details.js";
import { getClients } from "@/api/maintenance/clientss";
import { useQuasar } from "quasar";
import { computed, onMounted, ref, watch } from "vue";
import { getTransformationModels } from "@/api/transformation/modelss";

const $q = useQuasar();

const modal = modalState();
const modalShow = modalShowState();
const titleModal = ref("");
const loading = ref(false);
const isLoading = ref(false);
const rows = ref([]);
const inactiveRows = ref([]);
const showRows = ref([]);
const storage = useStorage();
const showModalOrderValue = ref(false);

let orderValue = ref("");
let itemsOrder = ref([]);

let date = ref("");
let productItem = ref("");
let userClient = ref("");
let stateOrder = ref("");
let quantity = ref(0);

let filter = ref("");
let tab = ref("active");

const valueTotal = computed(() => {
  let total = 0;
  showRows.value.forEach((item) => {
    total += item.cost;
  });
  return total;
});

const disableSaveItem = computed(() => {
  if (!productItem.value || !quantity.value) {
    return true;
  } else if (isLoading.value == true) {
    return true;
  } else {
    return false;
  }
});

const disableSave = computed(() => {
  if (
    !userClient.value ||
    showRows.value.length == 0 ||
    !date.value ||
    !stateOrder.value
  ) {
    return true;
  } else if (isLoading.value == true) {
    return true;
  } else {
    return false;
  }
});

const rules = [(v) => !!v || "Este campo es requerido"];

const columnsShow = ref([
  {
    name: "Acciones",
    field: "acciones",
    align: "left",
    sortable: true,
    headerStyle: "font-weight: bold;",
    style: "width: 10px",
  },
  {
    name: "name",
    label: "Nombre",
    field: "name",
    align: "left",
    sortable: true,
    headerStyle: "font-weight: bold;",
  },
  {
    name: "unitvalue",
    label: "Valor unitario",
    field: "unitvalue",
    align: "left",
    sortable: true,
    headerStyle: "font-weight: bold;",
  },
  {
    name: "quantity",
    label: "Cantidad",
    field: "quantity",
    align: "left",
    sortable: true,
    headerStyle: "font-weight: bold;",
  },
  {
    name: "cost",
    label: "Total",
    field: "cost",
    align: "left",
    sortable: true,
    headerStyle: "font-weight: bold;",
  },
]);

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
    name: "client",
    label: "Cliente",
    field: "client",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
  {
    name: "statusorder",
    label: "Estado de orden",
    field: "statusorder",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
  {
    name: "dateorder",
    label: "Fecha entrega",
    field: "dateorder",
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

const deleteItemOrder = (value) => {
  console.log(value);
  // const index = showRows.value.findIndex((item) => item.id == value);
  // showRows.value.splice(index, 1);
};

const getSelectClient = (value) => {
  userClient.value = value;
};

const getSelectModel = (value) => {
  productItem.value = value;
};

const getSelectState = (value) => {
  stateOrder.value = value;
};

const getInputQuantity = (value) => {
  quantity.value = value;
};

const saveRegisterItem = async () => {
  isLoading.value = true;
  const { models } = await getTransformationModels(idFarm.value);
  isLoading.value = false;
  showModalOrderValue.value = false;
  let newRow = {};

  models.forEach((element, i) => {
    if (element.name == productItem.value) {
      newRow = {
        codigo: i,
        id: element._id,
        name: productItem.value,
        unitvalue: element.unitvalue,
        quantity: parseInt(quantity.value),
        cost: element.unitvalue * quantity.value,
      };
      console.log(newRow);
      showRows.value.push(newRow);
    }
  });
};

const showModalOrder = () => {
  titleModal.value = "Registro de item";
  showModalOrderValue.value = true;
};

const clickButton = () => {
  titleModal.value = "REGISTRAR PEDIDO";
  resetValuesForm();
  modal.toggleModal();
};

const showRegisterItem = () => {
  showModalOrderValue.value = false;
  productItem.value = "";
};

const resetValuesForm = () => {
  userClient.value = "";
  date.value = "";
  stateOrder.value = "";
  showRows.value = [];
  itemsOrder.value = [];
};

const showOrderDetails = (item) => {
  let count = 1;
  titleModal.value = "DETALLE DE LA ORDEN";
  orderValue.value = item;
  console.log(orderValue.value);
  let products = item.models;
  products.forEach((item) => {
    item.id = count++;
    showRows.value.push(item);
  });
  modalShow.toggleSHowDetailsModal();
};

const showNotification = (type, message) => {
  $q.notify({
    type: type,
    message: message,
    position: "top",
  });
};

async function getAllOrders() {
  rows.value = [];
  inactiveRows.value = [];
  loading.value = true;

  try {
    const { orders } = await getOrders(idFarm.value);
    loading.value = false;
    let countActive = 1;
    let countInactive = 1;
    if (orders) {
      orders.forEach((item) => {
        item.status = item.status ? "Inactivo" : "Activo";
        if (item.status == "Activo") {
          item.id = countActive++;
          rows.value.push(item);
        } else {
          item.id = countInactive++;
          inactiveRows.value.push(item);
        }
        item.client = item.client.name;
        item.dateorder = item.dateorder.slice(0, item.dateorder.indexOf("T"));
      });
    }
  } catch {
    loading.value = false;
    showNotification("negative", "Ocurrió un error al obtener las ordenes");
  }
}

async function postDataOrderSystem() {
  let order = {};

  showRows.value.forEach((item) => {
    order = {
      id: item.id,
      quantity: item.quantity,
    };
    itemsOrder.value.push(order);
  });

  isLoading.value = true;

  const { client } = await getClients(idFarm.value);

  client.forEach((item) => {
    if (item.name == userClient.value) {
      userClient.value = item._id;
    }
  });

  try {
    await postOrder(
      {
        models: itemsOrder.value,
        client: userClient.value,
        dateorder: date.value,
        statusorder: stateOrder.value,
      },
      idFarm.value
    );

    isLoading.value = false;
    modal.toggleModal();
    rows.value = [];
    showNotification("positive", "Usuario registrado correctamente");
    getAllOrders();
  } catch (error) {
    isLoading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

async function activeOrderUser(id) {
  loading.value = true;
  try {
    await activeOrder(id, idFarm.value);
    loading.value = false;
    showNotification("positive", "Usuario activado correctamente");
    rows.value = [];
    inactiveRows.value = [];
    getAllOrders();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error al activar el usuario");
  }
}

async function payOrderUser(id) {
  loading.value = true;
  try {
    await payOrder(id, idFarm.value);
    showNotification("positive", "Pedido pagado correctamente");
    loading.value = false;
    rows.value = [];
    inactiveRows.value = [];
    getAllOrders();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error al verificar el pago");
  }
}

async function inactiveOrderUser(id) {
  loading.value = true;
  try {
    await inactiveOrder(id, idFarm.value);
    showNotification("positive", "Usuario desactivado correctamente");
    loading.value = false;
    rows.value = [];
    inactiveRows.value = [];
    getAllOrders();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error al desactivar el usuario");
  }
}

const idFarm = computed(() => {
  return storage.idSelected;
});

watch(idFarm, () => {
  getAllOrders();
});

onMounted(() => {
  getAllOrders();
});
</script>
<style scoped>
.buttons-modal {
  margin-left: 18%;
}
.button-one:hover {
  background-color: var(--color-blue);
  color: white;
}
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
.modalSystem {
  overflow-y: scroll;
  max-height: 450px;
}
.button-add {
  margin-left: calc(50% - 57px);
  margin-top: 5px;
  margin-bottom: 5px;
}
.modalSystem::-webkit-scrollbar {
  display: none;
}
.accions-td {
  padding: 0px;
  margin: 0px;
  min-width: 100px;
  max-width: 100px;
}
.icon-backRoute {
  font-size: 30px;
  padding-right: 20px;
}

.icon-backRoute:hover {
  cursor: pointer;
}
.title {
  font-size: var(--font-title);
}
.table-container {
  position: relative;
}
.total {
  font-weight: bold;
  padding-left: 10px;
}
.separator {
  border: 1.8px solid var(--color-gray);
}
.icon-table {
  font-size: 18px;
}
.container-content {
  max-width: 1200px;
  margin: 0 auto;
}
.icon-check {
  font-size: 25px;
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
