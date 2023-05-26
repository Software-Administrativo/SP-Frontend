<template>
  <div class="q-py-md table-container">
    <div class="row">
      <i class="icon icon-backRoute q-pt-lg" @click="$router.back()" />
      <h6 class="title q-my-lg">PERSONAS</h6>
    </div>
    <q-separator class="separator" />

    <div class="container-content">
      <ButtonAdd @onClick="clickButton" label="Crear nueva persona" />
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
                title="Personas"
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
                        icon="edit_note"
                        text-color="blue-10"
                        class="col text-bold q-pa-none icon-table"
                        @click="editPeopleMaintenance(props.row)"
                      />
                      <q-btn
                        icon="highlight_off"
                        text-color="blue-10"
                        class="col text-bold q-pa-none icon-table"
                        @click="inactivePeopleMaintenance(props.row._id)"
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
                title="Personas"
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
                        @click="activePeopleMaintenance(props.row._id)"
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
      <h6 class="q-my-md text-center">REGISTRAR PERSONA</h6>
      <div class="row q-px-xl">
        <div class="col-12">
          <div class="row">
            <Select
              class="col-5 q-mb-lg q-pr-sm"
              type="documents"
              label="Tipo de Documento"
              :ruless="rules"
              v-model="typeDocumentPeople"
              :value="valueSelectTypeDocument"
              @onSelect="getSelectTypeDocument"
            ></Select>
            <Input
              class="col-7 q-pb-xs"
              label="Número de Documento"
              :required="true"
              type="text"
              :ruless="rules"
              :value="valueInputDocument"
              v-model="documentPeople"
              @onWrite="getInputDocument"
            />
          </div>
          <Input
            class="q-pb-xs"
            label="Nombre"
            :required="true"
            type="text"
            :ruless="rules"
            :value="valueInputName"
            v-model="namePeople"
            @onWrite="getInputName"
          />
          <Input
            class="q-pb-xs"
            label="Teléfono"
            :required="true"
            type="text"
            :ruless="rules"
            v-model="phonePeople"
            :value="valueInputPhone"
            @onWrite="getInputPhone"
          />
          <Select
            class="q-pb-xs q-mb-md"
            label="EPS"
            :required="true"
            :ruless="rules"
            :value="valueSelectEps"
            v-model="epsPeople"
            type="eps"
            @onSelect="getSelectEps"
          />
          <Input
            class="q-pb-xs"
            label="Tipo de Persona"
            :required="true"
            type="text"
            :ruless="rules"
            :value="valueInputType"
            v-model="typePeople"
            @onWrite="getInputPeople"
          />
          <span class="text-required q-pb-sm"
            >Todos los campos con <span class="text-red">*</span> son
            obligatorios</span
          >
          <div class="row justify-center">
            <ButtonSave
              v-if="typeAction"
              :disable="disableSave"
              @onClick="postDataPeople"
            />
            <ButtonSave
              v-else
              :disable="disableSave"
              @onClick="updateDataPeople"
            />
          </div>
        </div>
      </div>
    </ModalForm>
  </template>
</template>
<script setup>
import {
  getPeople,
  postPeople,
  inactivePeople,
  activePeople,
  updatePeople,
} from "@/api/maintenance/people";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";
import Input from "@/commons/forms/Input.vue";
import Select from "@/commons/forms/Select.vue";
import ModalForm from "@/modules/global/ModalForm.vue";
import { modalState } from "@/stores/modal.js";
import { useStorage } from "@/stores/localStorage.js";
import { useQuasar } from "quasar";
import { computed, onMounted, ref, watch } from "vue";

const $q = useQuasar();
const modal = modalState();

const titleModal = ref("");
const typeAction = ref(true);
const idPeople = ref();
const storage = useStorage();
const isLoading = ref(false);
const rows = ref([]);
const loading = ref(false);
const inactiveRows = ref([]);

const disableSave = computed(() => {
  if (
    typeDocumentPeople.value == "" ||
    documentPeople.value == "" ||
    namePeople.value == "" ||
    phonePeople.value == "" ||
    epsPeople.value == "" ||
    typePeople.value == ""
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

let typeDocumentPeople = ref("");
let documentPeople = ref("");
let namePeople = ref("");
let phonePeople = ref("");
let epsPeople = ref("");
let typePeople = ref("");

let valueSelectTypeDocument = ref("");
let valueInputDocument = ref("");
let valueInputName = ref("");
let valueInputPhone = ref("");
let valueSelectEps = ref("");
let valueInputType = ref("");

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
    name: "document",
    label: "Número Documento",
    field: "document",
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
    name: "phone",
    label: "Teléfono",
    field: "phone",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
  {
    name: "eps",
    label: "Eps",
    field: "eps",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
  {
    name: "typePeople",
    label: "Tipo de Persona",
    field: "typePeople",
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

const getSelectTypeDocument = (value) => {
  typeDocumentPeople.value = value;
};

const getInputDocument = (value) => {
  documentPeople.value = value;
};

const getInputName = (value) => {
  namePeople.value = value;
};

const getInputPhone = (value) => {
  phonePeople.value = value;
};

const getSelectEps = (value) => {
  epsPeople.value = value;
};

const getInputPeople = (value) => {
  typePeople.value = value;
};

const clickButton = () => {
  titleModal.value = "REGISTRAR PERSONA";
  resetValuesForm();
  typeAction.value = true;
  modal.toggleModal();
};

const resetValuesForm = () => {
  typeDocumentPeople.value = "";
  documentPeople.value = "";
  namePeople.value = "";
  phonePeople.value = "";
  epsPeople.value = "";
  typePeople.value = "";
};

const editPeopleMaintenance = (item) => {
  titleModal.value = "EDITAR PERSONA";
  typeAction.value = false;
  idPeople.value = item._id;
  typeDocumentPeople.value = item.tpdct;
  valueSelectTypeDocument.value = item.tpdct;
  documentPeople.value = item.document;
  valueInputDocument.value = item.document;
  namePeople.value = item.name;
  valueInputName.value = item.name;
  phonePeople.value = item.phone;
  valueInputPhone.value = item.phone;
  epsPeople.value = item.eps;
  valueSelectEps.value = item.eps;
  typePeople.value = item.typePeople;
  valueInputType.value = item.typePeople;
  modal.toggleModal();
};

const showNotification = (type, message) => {
  $q.notify({
    type: type,
    message: message,
    position: "top",
  });
};

async function getDataPeople() {
  rows.value = [];
  inactiveRows.value = [];
  loading.value = true;
  try {
    const { people } = await getPeople(idFarm.value);
    let countActive = 1;
    let countInactive = 1;
    people.forEach((item) => {
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
}

async function postDataPeople() {
  isLoading.value = true;
  try {
    const people = await postPeople(
      {
        name: namePeople.value,
        tpdct: typeDocumentPeople.value,
        document: documentPeople.value,
        phone: phonePeople.value,
        eps: epsPeople.value,
        typePeople: typePeople.value,
      },
      idFarm.value
    );
    isLoading.value = false;
    showNotification("positive", "Se registró correctamente");
    modal.toggleModal();
    rows.value = [];
    getDataPeople();
  } catch {
    isLoading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

async function updateDataPeople() {
  isLoading.value = true;
  try {
    const people = await updatePeople(
      {
        id: idPeople.value,
        name: namePeople.value,
        tpdct: typeDocumentPeople.value,
        document: documentPeople.value,
        phone: phonePeople.value,
        eps: epsPeople.value,
        typePeople: typePeople.value,
      },
      idFarm.value
    );
    isLoading.value = false;
    showNotification("positive", "Se actualizó correctamente");
    modal.toggleModal();
    rows.value = [];
    getDataPeople();
  } catch {
    isLoading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

async function activePeopleMaintenance(id) {
  loading.value = true;
  try {
    const people = await activePeople(id, idFarm.value);
    showNotification("positive", "Se activó correctamente");
    loading.value = false;
    rows.value = [];
    inactiveRows.value = [];
    getDataPeople();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

async function inactivePeopleMaintenance(id) {
  loading.value = true;
  try {
    const people = await inactivePeople(id, idFarm.value);
    showNotification("positive", "Se inactivó correctamente");
    loading.value = false;
    rows.value = [];
    inactiveRows.value = [];
    getDataPeople();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

const idFarm = computed(() => {
  return storage.idSelected;
});

watch(idFarm, () => {
  getDataPeople();
});

onMounted(() => {
  getDataPeople();
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
