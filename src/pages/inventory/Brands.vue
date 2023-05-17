<template>
  <div class="q-py-sm table-container">
    <h6 class="title q-my-lg">Marcas</h6>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd @onClick="clickButton" label="Crear nueva marca" />
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
                title="Marcas"
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
                        @click="editBrandInventory(props.row)"
                      />
                      <q-btn
                        icon="highlight_off"
                        text-color="blue-10"
                        class="col text-bold q-pa-none"
                        @click="inactiveBrandInventory(props.row._id)"
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
                title="Marcas"
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
                        @click="activeBrandInventory(props.row._id)"
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
            v-model="nameBrands"
            @onWrite="getInputName"
          />
          <Input
            class="q-pb-xs"
            label="Finca"
            :required="true"
            type="text"
            :ruless="rules"
            :value="valueInputFarm"
            v-model="farmBrands"
            @onWrite="getInputFarm"
          />
          <Input
            class="q-mb-md"
            label="Descripción"
            type="text"
            :required="false"
            :value="valueInputDescription"
            v-model="descriptionBrands"
            @onWrite="getInputDescription"
          />
          <span class="text-required q-pb-sm"
            >Todos los campos con <span class="text-red">*</span> son
            obligatorios</span
          >
          <div class="row justify-center">
            <ButtonSave
              v-if="typeAction"
              :disable="disableSave"
              @onClick="postDataBrand"
            />
            <ButtonSave
              v-else
              :disable="disableSave"
              @onClick="updateDataBrand"
            />
          </div>
        </div>
      </div>
    </ModalForm>
  </template>
</template>
<script setup>
import {
  activeBrand,
  getBrands,
  inactiveBrand,
  postBrand,
  updateBrand,
} from "@/api/inventory/brands";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";
import Input from "@/commons/forms/Input.vue";
import ModalForm from "@/modules/global/ModalForm.vue";
import { modalState } from "@/stores/modal.js";
import { useQuasar } from "quasar";
import { computed, onMounted, ref } from "vue";

const modal = modalState();
const titleModal = ref("");
const loading = ref(false);
const typeAction = ref(true);
const rows = ref([]);
const inactiveRows = ref([]);
const idBrands = ref();

const disableSave = computed(() => {
  return nameBrands.value == "";
});
const rules = [(v) => !!v || "Este campo es requerido"];

let filter = ref("");
let nameBrands = ref("");
let farmBrands = ref("");
let descriptionBrands = ref("");
let valueInputName = ref("");
let valueInputFarm = ref("");
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
    name: "farm",
    label: "Finca",
    field: "farm",
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
    headerStyle: "font-size: var(--font-medium); font-weight: bold;",
    style: "font-size: var(--font-medium);",
  },
]);

const getInputName = (value) => {
  nameBrands.value = value;
};

const getInputFarm = (value) => {
  farmBrands.value = value;
};

const getInputDescription = (value) => {
  descriptionBrands.value = value;
};

const clickButton = () => {
  titleModal.value = "REGISTRAR MARCAS";
  valueInputName.value = "";
  valueInputFarm.value = "";
  valueInputDescription.value = "";
  typeAction.value = true;
  modal.toggleModal();
  nameBrands.value = "";
  farmBrands.value = "";
  descriptionBrands.value = "";
};

const editBrandInventory = (item) => {
  titleModal.value = "EDITAR MARCAS";
  typeAction.value = false;
  idBrands.value = item._id;
  valueInputName.value = item.name;
  valueInputFarm.value = item.farm;
  valueInputDescription.value = item.description;
  nameBrands.value = item.name;
  farmBrands.value = item.farm;
  descriptionBrands.value = item.description;
  modal.toggleModal();
};

async function inactiveBrandInventory(id) {
  try {
    const inactive = await inactiveBrand(id);
    $q.notify({
      type: "positive",
      message: "Marca desactivada correctamente",
      position: "top",
    });
    rows.value = [];
    inactiveRows.value = [];
    getDataBrands();
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Ocurrió un error",
      position: "top",
    });
  }
}

async function postDataBrand() {
  modal.toggleModal();
  try {
    const brands = await postBrand({
      name: nameBrands.value,
      farm: farmBrands.value,
      description: descriptionBrands.value,
    });
    $q.notify({
      type: "positive",
      message: "Marca registrada correctamente",
      position: "top",
    });
    rows.value = [];
    getDataBrands();
  } catch {
    $q.notify({
      type: "negative",
      message: "Ocurrió un error",
      position: "top",
    });
  }
}

const getDataBrands = async () => {
  rows.value = [];
  inactiveRows.value = [];
  loading.value = true;
  try {
    const { Brands } = await getBrands();
    let countActive = 1;
    let countInactive = 1;
    Brands.forEach((item) => {
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
    $q.notify({
      type: "negative",
      message: "Ocurrió un error",
      position: "top",
    });
  }
};

async function updateDataBrand() {
  try {
    const response = await updateBrand({
      id: idBrands.value,
      name: nameBrands.value,
      farm: farmBrands.value,
      description: descriptionBrands.value,
    });
    $q.notify({
      type: "positive",
      position: "top",
      message: "Marca actualizada correctamente",
    });
    modal.toggleModal();
    rows.value = [];
    getDataBrands();
  } catch {
    $q.notify({
      type: "negative",
      position: "top",
      message: "Ocurrió un error",
    });
  }
  nameBrands.value = "";
  descriptionBrands.value = "";
  farmBrands.value = "";
}

async function activeBrandInventory(id) {
  try {
    const active = await activeBrand(id);
    $q.notify({
      type: "positive",
      message: "Marca activada correctamente",
      position: "top",
    });
    rows.value = [];
    inactiveRows.value = [];
    getDataBrands();
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Ocurrió un error",
      position: "top",
    });
  }
}

onMounted(() => {
  getDataBrands();
});
</script>
<style scoped>
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
