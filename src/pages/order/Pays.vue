<template>
  <div class="q-py-md table-container">
    <div class="row">
      <i class="icon icon-backRoute q-pt-lg" @click="$router.back()" />
      <h6 class="title q-my-lg">PENDIENTES DE PAGO</h6>
    </div>
    <q-separator class="separator" />
    <div class="container-content">
      <div class="container-table q-mt-md q-pa-md" rounded>
        <q-card>
          <q-separator />

          <q-table
            flat
            bordered
            title="Pedidos"
            row-key="id"
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
                </q-btn-group>
              </td>
            </template>
          </q-table>
        </q-card>
      </div>
    </div>
  </div>

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
                  row-key="codigo"
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
import { getOrders, payOrder } from "@/api/orders";
import ModalForm from "@/modules/global/ModalForm.vue";
import { useStorage } from "@/stores/localStorage.js";
import { modalShowState } from "@/stores/details.js";
import { useQuasar } from "quasar";
import { computed, onMounted, ref, watch } from "vue";

const $q = useQuasar();

const modalShow = modalShowState();
const titleModal = ref("");
const loading = ref(false);
const rows = ref([]);
const inactiveRows = ref([]);
const showRows = ref([]);
const storage = useStorage();

let orderValue = ref("");

let filter = ref("");

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

const showOrderDetails = (item) => {
  showRows.value = [];
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
    loading.value = false;
    let countActive = 1;
    if (orders) {
      orders.forEach((item) => {
        item.status = item.status ? "Inactivo" : "Activo";
        if (item.statuspay == "PENDIENTE") {
          item.id = countActive++;
          rows.value.push(item);
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
