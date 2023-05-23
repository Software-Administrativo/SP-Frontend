<template>
  <div class="q-py-sm table-container">
    <h6 class="title q-my-lg">Categorias</h6>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd @onClick="clickButton" label="Crear nueva categoria" />
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
                title="Categorias"
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
                        @click="editCategorieInventory(props.row)"
                      />
                      <q-btn
                        icon="highlight_off"
                        text-color="blue-10"
                        class="col text-bold q-pa-none"
                        @click="inactiveCategoryInventory(props.row._id)"
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
                title="Categorias"
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
                        @click="activeCategoryInventory(props.row._id)"
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
            v-model="nameCategory"
            @onWrite="getInputName"
          />
          <Input
            class="q-mb-md"
            label="Descripción"
            type="text"
            :required="false"
            :value="valueInputDescription"
            v-model="descriptionCategory"
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
              @onClick="postDataCategory"
            />
            <ButtonSave
              v-else
              :disable="disableSave"
              @onClick="updateDataCategory"
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
  activeCategory,
  getCategories,
  inactiveCategory,
  postCategory,
  updateCategory,
} from "@/api/inventory/categories";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";
import Input from "@/commons/forms/Input.vue";
import ModalForm from "@/modules/global/ModalForm.vue";
import { modalState } from "@/stores/modal.js";
import { useQuasar } from "quasar";
import { computed, onMounted, ref, watch } from "vue";
import { useStorage } from "@/stores/localStorage.js";

const modal = modalState();
const titleModal = ref("");
const loading = ref(false);
const typeAction = ref(true);
const rows = ref([]);
const inactiveRows = ref([]);
const idCategories = ref();
const isLoading = ref(false);
const storage = useStorage();

const disableSave = computed(() => {
  if (!nameCategory.value || !descriptionCategory.value) {
    return true;
  } else if (isLoading.value == true) {
    return true;
  } else {
    return false;
  }
});
const rules = [(v) => !!v || "Este campo es requerido"];

let filter = ref("");
let nameCategory = ref("");
let descriptionCategory = ref("");
let valueInputName = ref("");
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
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
]);

const getInputName = (value) => {
  nameCategory.value = value;
};

const getInputDescription = (value) => {
  descriptionCategory.value = value;
};

const clickButton = () => {
  titleModal.value = "REGISTRAR CATEGORIAS";
  valueInputName.value = "";
  valueInputDescription.value = "";
  typeAction.value = true;
  modal.toggleModal();
  nameCategory.value = "";
  descriptionCategory.value = "";
};

const editCategorieInventory = (item) => {
  titleModal.value = "EDITAR CATEGORIAS";
  typeAction.value = false;
  idCategories.value = item._id;
  valueInputName.value = item.name;
  valueInputDescription.value = item.description;
  nameCategory.value = item.name;
  descriptionCategory.value = item.description;
  modal.toggleModal();
};

const showNotification = (type, message) => {
  $q.notify({
    type: type,
    message: message,
    position: "top",
  });
};

const getDataCategories = async () => {
  rows.value = [];
  inactiveRows.value = [];
  loading.value = true;
  try {
    const { category } = await getCategories(idFarm.value);
    let countActive = 1;
    let countInactive = 1;
    category.forEach((item) => {
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
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
};

async function postDataCategory() {
  isLoading.value = true;
  try {
    const categories = await postCategory(
      {
        name: nameCategory.value,
        description: descriptionCategory.value,
      },
      idFarm.value
    );
    isLoading.value = false;
    showNotification("positive", "Categorias registrada correctamente");
    modal.toggleModal();
    rows.value = [];
    getDataCategories();
  } catch {
    isLoading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

async function updateDataCategory() {
  isLoading.value = true;
  try {
    const response = await updateCategory(
      {
        id: idCategories.value,
        name: nameCategory.value,
        description: descriptionCategory.value,
      },
      idFarm.value
    );
    isLoading.value = false;
    showNotification("positive", "Categoria actualizada correctamente");
    modal.toggleModal();
    rows.value = [];
    getDataCategories();
  } catch {
    isLoading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
  nameCategory.value = "";
  descriptionCategory.value = "";
}

async function activeCategoryInventory(id) {
  loading.value = true;
  try {
    const active = await activeCategory(id, idFarm.value);
    showNotification("positive", "Categoria activada correctamente");
    loading.value = false;
    rows.value = [];
    inactiveRows.value = [];
    getDataCategories();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

async function inactiveCategoryInventory(id) {
  loading.value = true;
  try {
    const inactive = await inactiveCategory(id, idFarm.value);
    showNotification("positive", "Categoria desactivada correctamente");
    loading.value = false;
    rows.value = [];
    inactiveRows.value = [];
    getDataCategories();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

const idFarm = computed(() => {
  return storage.idSelected;
});

watch(idFarm, () => {
  getDataCategories();
});

onMounted(() => {
  getDataCategories();
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
