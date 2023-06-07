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
                        @click="showOrderOrder(props.row)"
                      />
                      <q-btn
                        icon="payment"
                        text-color="blue-10"
                        class="col text-bold q-pa-none icon-table"
                        @click="payOrderUser(props.row._id)"
                      />
                      <q-btn
                        icon="highlight_off"
                        text-color="blue-10"
                        class="col text-bold q-pa-none icon-table"
                        @click="inactiveOrderUser(props.row._id)"
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
                        @click="activeSystemUser(props.row._id)"
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
      <div class="modalSystem">
        <h6 class="q-my-md text-center">{{ titleModal }}</h6>
        <div class="column q-px-xl">
          <div class="col-12">
            <Select
              label="Cliente"
              type="text"
              :required="true"
              :ruless="rules"
              :value="valueNameUserClient"
              v-model="nameUserClient"
              @onWrite="getSelectClient"
            />

            <div class="q-pt-md">
              <span>Fecha de entrega<span style="color: red">*</span></span>
              <q-input
                filled
                dense
                v-model="date"
                :value="valueDate"
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

            <div class="q-pb-sm column">
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
                />
              </div>
            </div>

            <q-btn
              icon="add"
              class="button-add"
              label="Agregar"
              @click="showModalOrder()"
            />

            <div><span>Total:</span><span class="total">500</span></div>

            <span class="text-required q-py-sm"
              >Todos los campos con <span class="text-red">*</span> son
              obligatorios</span
            >
            <div class="row justify-center q-mt-sm">
              <ButtonSave
                v-if="typeAction"
                :disable="disableSave"
                @onClick="postDataUserSystem"
              />
              <ButtonSave
                v-else
                :disable="disableSave"
                @onClick="updateDataUserSystem"
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
        <h6 class="q-my-md text-center">{{ titleModal }}</h6>
        <div class="row q-px-xl">
          <div class="col-12">
            <Select
              type="models"
              :ruless="rules"
              :required="true"
              label="Producto"
              v-model="productItem"
              :value="valueProductItem"
              @onSelect="getSelectModel"
            ></Select>
            <Select
              class="q-mt-lg"
              type="state"
              :ruless="rules"
              :required="true"
              label="Estado de orden"
              v-model="stateOrder"
              :value="valueStateOrder"
              @onSelect="getSelectState"
            ></Select>
            <Input
              class="q-mt-lg"
              label="Cantidad"
              :required="true"
              type="number"
              :ruless="rules"
              v-model="quantity"
              :value="valueQuantity"
              @onWrite="getInputQuantity"
            />
            <div class="row q-mt-xs buttons-modal">
              <q-btn class="q-mx-sm" @click="showRegisterItem()"
                >Cancelar</q-btn
              >
              <q-btn class="q-mx-sm" @click="saveRegisterItem()">Agregar</q-btn>
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
  updateOrder,
  payOrder,
} from "@/api/orders";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";
import Input from "@/commons/forms/Input.vue";
import Select from "@/commons/forms/Select.vue";
import ModalForm from "@/modules/global/ModalForm.vue";
import { RESPONSES } from "@/helpers";
import { useStorage } from "@/stores/localStorage.js";
import { modalState } from "@/stores/modal.js";
import { modalShowState } from "@/stores/details.js";
import { useQuasar } from "quasar";
import { computed, onMounted, ref, watch } from "vue";
import { getTransformationModels } from "@/api/transformation/modelss";

const $q = useQuasar();

const modal = modalState();
const modalShow = modalShowState();
const idOrder = ref();
const titleModal = ref("");
const loading = ref(false);
const isLoading = ref(false);
const typeAction = ref(true);
const rows = ref([]);
const inactiveRows = ref([]);
const showRows = ref([]);
const storage = useStorage();
const showModalOrderValue = ref(false);

let valueSelectClient = ref("");
let orderValue = ref("");

let date = ref("");
let productItem = ref("");
let nameUserClient = ref("");
let stateOrder = ref("");
let quantity = ref();

let valueDate = ref("");
let valueQuantity = ref("");
let valueStateOrder = ref("");
let valueProductItem = ref("");
let valueNameUserClient = ref("");

let filter = ref("");
let tab = ref("active");

const disableSave = computed(() => {
  if (!nameUserClient.value) {
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
    name: "id",
    label: "Código",
    field: "id",
    align: "left",
    sortable: true,
    headerStyle: "font-weight: bold;",
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

const getSelectClient = (value) => {
  nameUserClient.value = value;
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
  const { models } = await getTransformationModels(idFarm.value);
  showModalOrderValue.value = false;
  let count = 1;
  let newRow = {};

  models.forEach((element) => {
    console.log(element.name);
    if (element.name == productItem.value) {
      newRow = {
        id: count++,
        name: productItem.value,
        unitvalue: element.unitvalue,
        quantity: quantity.value,
        cost: element.unitvalue * quantity.value,
      };
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
  typeAction.value = true;
  modal.toggleModal();
};

const showRegisterItem = () => {
  showModalOrderValue.value = false;
  productItem.value = "";
};

const resetValuesForm = () => {
  valueSelectClient.value = "";
  nameUserClient.value = "";
  showRows.value = [];
};

const showOrderOrder = (item) => {
  let count = 1;
  titleModal.value = "DETALLE DE LA ORDEN";
  orderValue.value = item;
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

    let countActive = 1;
    let countInactive = 1;
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

    loading.value = false;
  } catch {
    showNotification("negative", "Ocurrió un error al obtener las ordenes");
  }
}

async function updateDataUserSystem() {
  isLoading.value = true;

  let farms = farmsUserSystem.value;
  let farmsSelected = [];

  farms.forEach((item) => {
    farmsSelected.push(item._id);
  });

  try {
    const data = await updateOrder(
      {
        id: idOrder.value,
        name: nameUserClient.value,
      },
      idFarm.value
    );
    isLoading.value = false;

    let response = data?.response?.data?.errors[0]?.msg;

    if (response == RESPONSES.USEREXIST) {
      showNotification("negative", "El usuario ya existe");
    } else if (response == RESPONSES.LENGTHPASSWORD) {
      showNotification(
        "negative",
        "La contraseña debe tener de 6 a 20 carácteres"
      );
    } else if (response == RESPONSES.RULESPASSWORD) {
      showNotification(
        "negative",
        "La contraseña debe tener una letra mayúscula, una letra minúscula y un número"
      );
    } else if (response == RESPONSES.EMAILEXIST) {
      showNotification("negative", "El email ya esta registrado");
    } else {
      showNotification("positive", "Tipo de pago actualizado correctamente");
      modal.toggleModal();
      rows.value = [];
      getAllOrders();
    }
  } catch {
    isLoading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

async function postDataUserSystem() {
  isLoading.value = true;

  let farms = farmsUserSystem.value;
  let farmsSelected = [];

  farms.forEach((item) => {
    farmsSelected.push(item._id);
  });

  try {
    const data = await postOrder(
      {
        name: nameUserClient.value,
      },
      idFarm.value
    );

    isLoading.value = false;

    let response = data?.response?.data?.errors[0]?.msg;

    if (response == RESPONSES.USEREXIST) {
      showNotification("negative", "El usuario ya existe");
    } else if (response == RESPONSES.LENGTHPASSWORD) {
      showNotification(
        "negative",
        "La contraseña debe tener de 6 a 20 carácteres"
      );
    } else if (response == RESPONSES.RULESPASSWORD) {
      showNotification(
        "negative",
        "La contraseña debe tener una letra mayúscula, una letra minúscula y un número"
      );
    } else if (response == RESPONSES.EMAILEXIST) {
      showNotification("negative", "El email ya esta registrado");
    } else {
      modal.toggleModal();
      rows.value = [];
      showNotification("positive", "Usuario registrado correctamente");
      getAllOrders();
    }
  } catch (error) {
    isLoading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

async function activeSystemUser(id) {
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
