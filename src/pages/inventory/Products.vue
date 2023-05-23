<template>
  <div class="q-py-sm table-container">
    <h6 class="title q-my-lg">Productos</h6>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd @onClick="clickButton" label="Crear nuevo producto" />
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
                title="Bodegas"
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
                        class="col text-bold q-pa-none"
                        @click="editProductsInventory(props.row)"
                      />
                      <q-btn
                        icon="highlight_off"
                        text-color="blue-10"
                        class="col text-bold q-pa-none"
                        @click="inactiveProductInventory(props.row._id)"
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
                title="Bodegas"
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
                        @click="activeProductInventory(props.row._id)"
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
    <ModalForm>
      <h6 class="q-my-md text-center">{{ titleModal }}</h6>
      <div class="row q-px-xl">
        <div class="col-12">
          <Input
            label="Nombre"
            :required="true"
            type="text"
            :ruless="rules"
            :value="valueInputName"
            v-model="nameProducts"
            @onWrite="getInputName"
          />
          <Input
            class="q-pb-xs"
            label="Categoria"
            :required="true"
            type="text"
            :ruless="rules"
            :value="valueInputCategorie"
            v-model="categorieProducts"
            @onWrite="getInputCategorie"
          />
          <Input
            class="q-pb-xs"
            label="Marca"
            :required="true"
            type="text"
            :ruless="rules"
            :value="valueInputBrand"
            v-model="brandProducts"
            @onWrite="getInputBrand"
          />
          <Input
            class="q-pb-xs"
            label="Cantidad"
            :required="true"
            type="text"
            :ruless="rules"
            :value="valueInputAmount"
            v-model="amountProducts"
            @onWrite="getInputAmount"
          />
          <Input
            label="Descripción"
            :required="true"
            :ruless="rules"
            type="text"
            :value="valueInputDescription"
            v-model="descriptionProduct"
            @onWrite="getInputName"
          />
          <span class="text-required q-pb-sm"
            >Todos los campos con <span class="text-red">*</span> son
            obligatorios</span
          >
          <div class="row justify-center">
            <ButtonSave
              v-if="typeAction"
              :disable="disableSave"
              @onClick="postDataProduct"
            />
            <ButtonSave
              v-else
              :disable="disableSave"
              @onClick="updateDataProduct"
            />
          </div>
          <div class="spinner" v-if="isLoading">
            <q-spinner-ios color="primary" size="2.5em" />
          </div>
        </div>
      </div>
    </ModalForm>
  </template>
</template>
<script setup>
import {
  activeProduct,
  getProducts,
  inactiveProduct,
  postProduct,
  updateProduct,
} from "@/api/inventory/products";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";
import Input from "@/commons/forms/Input.vue";
import ModalForm from "@/modules/global/ModalForm.vue";
import { modalState } from "@/stores/modal.js";
import { useQuasar } from "quasar";
import { computed, onMounted, ref, watch } from "vue";
import { useStorage } from "@/stores/localStorage.js";
import { RESPONSES } from "@/helpers";

const modal = modalState();
const titleModal = ref("");
const loading = ref(false);
const typeAction = ref(true);
const rows = ref([]);
const inactiveRows = ref([]);
const idProducts = ref();
const storage = useStorage();
const isLoading = ref(false);

const disableSave = computed(() => {
  if (
    nameProducts.value != "" ||
    categorieProducts.value != "" ||
    brandProducts.value != "" ||
    amountProducts.value != "" ||
    descriptionProduct.value != ""
  ) {
    return false;
  } else if(isLoading.value == true){
    return true;
  } else{
    return false;
  }
});
const rules = [(v) => !!v || "Este campo es requerido"];

let filter = ref("");
let nameProducts = ref("");
let categorieProducts = ref("");
let brandProducts = ref("");
let amountProducts = ref("");
let descriptionProduct = ref("");
let valueInputName = ref("");
let valueInputCategorie = ref("");
let valueInputBrand = ref("");
let valueInputAmount = ref("");
let valueInputDescription = ref("");
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
    name: "category",
    label: "Categoria",
    field: "category",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
  {
    name: "mark",
    label: "Marca",
    field: "mark",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
  {
    name: "amount",
    label: "Cantidad",
    field: "amount",
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
  nameProducts.value = value;
};

const getInputCategorie = (value) => {
  categorieProducts.value = value;
};

const getInputBrand = (value) => {
  brandProducts.value = value;
};

const getInputAmount = (value) => {
  amountProducts.value = value;
};

const clickButton = () => {
  titleModal.value = "REGISTRAR PRODUCTOS";
  valueInputName.value = "";
  valueInputCategorie.value = "";
  valueInputBrand.value = "";
  valueInputAmount.value = "";
  valueInputDescription.value = "";
  typeAction.value = true;
  modal.toggleModal();
  nameProducts.value = "";
  descriptionProduct.value = "";
  categorieProducts.value = "";
  brandProducts.value = "";
  amountProducts.value = "";
};

const editProductsInventory = (item) => {
  titleModal.value = "EDITAR PRODUCTOS";
  typeAction.value = false;
  idProducts.value = item._id;
  valueInputName.value = item.name;
  valueInputCategorie.value = item.category;
  valueInputBrand.value = item.mark;
  valueInputAmount.value = item.amount;
  valueInputDescription.value = item.description;
  nameProducts.value = item.name;
  categorieProducts.value = item.categories;
  descriptionProduct.value = item.description;
  brandProducts.value = item.brand;
  amountProducts.value = item.amount;
  modal.toggleModal();
};

const showNotification = (type, message) => {
  $q.notify({
    type: type,
    message: message,
    position: "top",
  });
};

const getDataProducts = async () => {
  rows.value = [];
  inactiveRows.value = [];
  loading.value = true;
  try {
    const { product } = await getProducts(idFarm.value);
    let countActive = 1;
    let countInactive = 1;
    product.forEach((item) => {
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

async function postDataProduct() {
  isLoading.value = true;
  const products = await postProduct(
    {
      name: nameProducts.value,
      category: categorieProducts.value,
      mark: brandProducts.value,
      amount: amountProducts.value,
      description:
        descriptionProduct.value == ""
          ? "No registra"
          : descriptionProduct.value,
    },
    idFarm.value
  );
  if (products.msg != RESPONSES.ERROROPERATION) {
    isLoading.value = false;
    showNotification("positive", "Producto registrado correctamente");
    modal.toggleModal();
    rows.value = [];
    getDataProducts();
  } else {
    isLoading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

async function updateDataProduct() {
  isLoading.value = true;
  const response = await updateProduct(
    {
      id: idProducts.value,
      name: nameProducts.value,
      categories: categorieProducts.value,
      brand: brandProducts.value,
      amount: amountProducts.value,
    },
    idFarm.value
  );
  isLoading.value = false;
  if (response.msg != RESPONSES.ERROROPERATION) {
    showNotification("positive", "Producto actualizado correctamente");
    modal.toggleModal();
    rows.value = [];
    getDataProducts();
  } else {
    showNotification("negative", "Ocurrió un error");
  }
  nameProducts.value = "";
  brandProducts.value = "";
  categorieProducts.value = "";
  amountProducts.value = "";
}

async function activeProductInventory(id) {
  loading.value = true;
  try {
    const active = await activeProduct(id, idFarm.value);
    loading.value = false;
    showNotification("positive", "Producto activado correctamente");
    rows.value = [];
    inactiveRows.value = [];
    getDataProducts();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

async function inactiveProductInventory(id) {
  loading.value = true;
  try {
    const inactive = await inactiveProduct(id, idFarm.value);
    loading.value = false;
    showNotification("positive", "Producto desactivado correctamente");
    rows.value = [];
    inactiveRows.value = [];
    getDataProducts();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

const idFarm = computed(() => {
  return storage.idSelected;
});

watch(idFarm, () => {
  getDataUsers();
});

onMounted(() => {
  getDataProducts();
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
.accions-td {
  padding: 0px;
  margin: 0px;
  min-width: 100px;
  max-width: 100px;
}
.text-required {
  display: inline-block;
  font-size: 12px;
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
.icon {
  font-size: 1.5rem;
}
.title {
  font-size: var(--font-title);
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
</style>
