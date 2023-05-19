<template>
  <div class="q-py-md table-container">
    <div class="row">
      <i class="icon icon-backRoute q-pt-lg" @click="$router.back()" />
      <h6 class="title q-my-lg">TIPOS DE GASTO</h6>
    </div>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd @onClick="clickButton" label="Crear tipo de gasto" />
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
                title="Gastos"
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
                        @click="editPayMaintenance(props.row)"
                      />
                      <q-btn
                        icon="highlight_off"
                        text-color="blue-10"
                        class="col text-bold q-pa-none"
                        @click="inactiveSpentMaintenance(props.row._id)"
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
                title="Gastos"
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
                        @click="activeSpentMaintenance(props.row._id)"
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
            class="q-pb-xs"
            label="Nombre"
            :required="true"
            type="text"
            :ruless="rules"
            :value="valueInputName"
            v-model="nameTypeSpents"
            @onWrite="getInputName"
          />
          <Input
            label="Descripción"
            type="text"
            :required="false"
            :value="valueInputDescription"
            v-model="descriptionTypeSpents"
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
              @onClick="postDataTypeSpents"
            />
            <ButtonSave
              v-else
              :disable="disableSave"
              @onClick="updateDataTypeSpents"
            />
          </div>
        </div>
      </div>
    </ModalForm>
  </template>
</template>
<script setup>
import {
  activeTypeSpent,
  getTypeSpents,
  inactiveTypeSpent,
  postTypeSpent,
  updateTypeSpent,
} from "@/api/maintenance/type-spents";
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
const idTypeSpents = ref();
const storage = useStorage();

const disableSave = computed(() => {
  return nameTypeSpents.value == "";
});
const rules = [(v) => !!v || "Este campo es requerido"];

let filter = ref("");
let tab = ref("active");

let nameTypeSpents = ref("");
let descriptionTypeSpents = ref("");

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
    headerStyle: "font-size: var(--font-medium); font-weight: bold;",
    style: "font-size: var(--font-medium);",
  },
]);

const getInputName = (value) => {
  nameTypeSpents.value = value;
};

const getInputDescription = (value) => {
  descriptionTypeSpents.value = value;
};

const clickButton = () => {
  titleModal.value = "REGISTRAR TIPO DE GASTO";
  resetValuesForm();
  typeAction.value = true;
  modal.toggleModal();
};

const resetValuesForm = () => {
  valueInputDescription.value = "";
  valueInputName.value = "";
  nameTypeSpents.value = "";
  descriptionTypeSpents.value = "";
};

const editPayMaintenance = (item) => {
  titleModal.value = "EDITAR TIPO DE GASTO";
  typeAction.value = false;
  idTypeSpents.value = item._id;
  valueInputDescription.value = item.description;
  valueInputName.value = item.name;
  nameTypeSpents.value = item.name;
  descriptionTypeSpents.value = item.description;
  modal.toggleModal();
};

async function inactiveSpentMaintenance(id) {
  try {
    const inactive = await inactiveTypeSpent(id, idFarm.value);
    $q.notify({
      type: "positive",
      message: "Tipo de gasto desactivado correctamente",
      position: "top",
    });
    rows.value = [];
    inactiveRows.value = [];
    getDataTypeSpents();
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Ocurrió un error",
      position: "top",
    });
  }
}

async function postDataTypeSpents() {
  modal.toggleModal();
  try {
    const spents = await postTypeSpent({
      name: nameTypeSpents.value,
      description: descriptionTypeSpents.value,
    }, idFarm.value);
    $q.notify({
      type: "positive",
      message: "Tipo de gasto registrado correctamente",
      position: "top",
    });
    rows.value = [];
    getDataTypeSpents();
  } catch {
    $q.notify({
      type: "negative",
      message: "Ocurrió un error",
      position: "top",
    });
  }
}

const getDataTypeSpents = async () => {
  rows.value = [];
  inactiveRows.value = [];
  loading.value = true;
  try {
    const { spents } = await getTypeSpents(idFarm.value);
    let countActive = 1;
    let countInactive = 1;
    spents.forEach((item) => {
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

async function updateDataTypeSpents() {
  try {
    const response = await updateTypeSpent({
      id: idTypeSpents.value,
      name: nameTypeSpents.value,
      description: descriptionTypeSpents.value,
    }, idFarm.value);
    $q.notify({
      type: "positive",
      position: "top",
      message: "Tipo de gasto actualizado correctamente",
    });
    modal.toggleModal();
    rows.value = [];
    getDataTypeSpents();
  } catch {
    $q.notify({
      type: "negative",
      position: "top",
      message: "Ocurrió un error",
    });
  }
  nameTypeSpents.value = "";
  descriptionTypeSpents.value = "";
}

async function activeSpentMaintenance(id) {
  try {
    const active = await activeTypeSpent(id, idFarm.value);
    $q.notify({
      type: "positive",
      message: "Tipo de gasto activado correctamente",
      position: "top",
    });
    rows.value = [];
    inactiveRows.value = [];
    getDataTypeSpents();
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Ocurrió un error",
    });
  }
}

const idFarm = computed(() => {
  return storage.idSelected;
});

watch(idFarm, () => {
  getDataTypeSpents();
});

onMounted(() => {
  getDataTypeSpents();
});
</script>
<style scoped>
.icon-backRoute {
  font-size: 30px;
  padding-right: 20px;
}
.icon-backRoute:hover{
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
