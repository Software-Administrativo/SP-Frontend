<template>
  <div class="q-py-md table-container">
    <div class="row">
      <i class="icon icon-backRoute q-pt-lg" @click="$router.back()" />
      <h6 class="title q-my-lg">MARCAS</h6>
    </div>
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
                        class="col text-bold q-pa-none icon-table"
                        @click="editBrandInventory(props.row)"
                      />
                      <q-btn
                        icon="highlight_off"
                        text-color="blue-10"
                        class="col text-bold q-pa-none icon-table"
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
    <ModalForm class="modal">
      <div class="modal-brands">
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
            <Select
              class="q-pb-lg"
              label="Categoria"
              :required="true"
              type="category"
              :ruless="rules"
              :value="valueSelectCategory"
              v-model="categoryBrands"
              @onSelect="getSelectCategory"
            />
            <Input
              class="q-mb-xs"
              label="Descripción"
              type="text"
              :required="true"
              :ruless="rules"
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
  activeBrand,
  getBrands,
  inactiveBrand,
  postBrand,
  updateBrand,
} from "@/api/inventory/brands";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import { getCategories } from "@/api/inventory/categories";
import ButtonSave from "@/commons/forms/ButtonSave.vue";
import Input from "@/commons/forms/Input.vue";
import ModalForm from "@/modules/global/ModalForm.vue";
import Select from "@/commons/forms/Select.vue";
import { useStorage } from "@/stores/localStorage.js";
import { modalState } from "@/stores/modal.js";
import { useQuasar } from "quasar";
import { computed, onMounted, ref, watch } from "vue";

const modal = modalState();
const titleModal = ref("");
const loading = ref(false);
const typeAction = ref(true);
const isLoading = ref(false);
const rows = ref([]);
const inactiveRows = ref([]);
const idBrands = ref();
const storage = useStorage();

const disableSave = computed(() => {
  if (!nameBrands.value || !descriptionBrands.value) {
    return true;
  } else if (isLoading.value == true) {
    return true;
  } else {
    return false;
  }
});
const rules = [(v) => !!v || "Este campo es requerido"];

let filter = ref("");
let nameBrands = ref("");
let categoryBrands = ref("");
let descriptionBrands = ref("");
let valueInputName = ref("");
let valueSelectCategory = ref("");
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
  nameBrands.value = value;
};

const getSelectCategory = (value) => {
  categoryBrands.value = value;
};

const getInputDescription = (value) => {
  descriptionBrands.value = value;
};

const clickButton = () => {
  titleModal.value = "REGISTRAR MARCAS";
  valueInputName.value = "";
  valueSelectCategory.value = "";
  valueInputDescription.value = "";
  typeAction.value = true;
  modal.toggleModal();
  nameBrands.value = "";
  categoryBrands.value = "";
  descriptionBrands.value = "";
};

const editBrandInventory = (item) => {
  titleModal.value = "EDITAR MARCAS";
  typeAction.value = false;
  idBrands.value = item._id;
  valueInputName.value = item.name;
  valueSelectCategory.value = item.category;
  valueInputDescription.value = item.description;
  nameBrands.value = item.name;
  categoryBrands.value = item.category;
  descriptionBrands.value = item.description;
  modal.toggleModal();
};

const showNotification = (type, message) => {
  $q.notify({
    type: type,
    message: message,
    position: "top",
  });
};

const getDataBrands = async () => {
  rows.value = [];
  inactiveRows.value = [];
  loading.value = true;
  try {
    const { mark } = await getBrands(idFarm.value);
    const { category } = await getCategories(idFarm.value);
    let countActive = 1;
    let countInactive = 1;

    mark.forEach((item) => {
      item.status = item.status ? "Inactivo" : "Activo";

      category.forEach((element) => {
        if (item.category == element._id) {
          item.category = element.name;
        }
      });

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
    showNotification("negative", "Ocurrió un error");
  }
};

async function postDataBrand() {
  isLoading.value = true;

  const { category } = await getCategories(idFarm.value);

  category.forEach((item) => {
    if (item.name == categoryBrands.value) {
      categoryBrands.value = item._id;
    }
  });

  try {
    await postBrand(
      {
        name: nameBrands.value,
        category: categoryBrands.value,
        description: descriptionBrands.value,
      },
      idFarm.value
    );
    isLoading.value = false;
    modal.toggleModal();
    showNotification("positive", "Marca registrada correctamente");
    rows.value = [];
    getDataBrands();
  } catch {
    showNotification("negative", "Ocurrió un error");
  }
}

async function updateDataBrand() {
  isLoading.value = true;

  const { category } = await getCategories(idFarm.value);

  category.forEach((item) => {
    if (item.name == categoryBrands.value) {
      categoryBrands.value = item._id;
    }
  });

  try {
    await updateBrand(
      {
        id: idBrands.value,
        name: nameBrands.value,
        category: categoryBrands.value,
        description: descriptionBrands.value,
      },
      idFarm.value
    );
    isLoading.value = false;
    showNotification("positive", "Marca actualizada correctamente");
    modal.toggleModal();
    rows.value = [];
    getDataBrands();
  } catch {
    showNotification("negative", "Ocurrió un error");
  }
  nameBrands.value = "";
  descriptionBrands.value = "";
  categoryBrands.value = "";
}

async function activeBrandInventory(id) {
  loading.value = true;
  try {
    const active = await activeBrand(id, idFarm.value);
    loading.value = false;
    showNotification("positive", "Marca activada correctamente");
    rows.value = [];
    inactiveRows.value = [];
    getDataBrands();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

async function inactiveBrandInventory(id) {
  loading.value = true;
  try {
    const inactive = await inactiveBrand(id, idFarm.value);
    loading.value = false;
    showNotification("positive", "Marca desactivada correctamente");
    rows.value = [];
    inactiveRows.value = [];
    getDataBrands();
  } catch (error) {
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

const idFarm = computed(() => {
  return storage.idSelected;
});

watch(idFarm, () => {
  getDataBrands();
});

onMounted(() => {
  getDataBrands();
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
.modal-brands {
  overflow-y: scroll;
  max-height: 450px;
}
.modal-brands::-webkit-scrollbar {
  display: none;
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
.icon-backRoute {
  font-size: 30px !important;
  padding-right: 20px;
  /* padding-top: 30px; */
}
.icon-backRoute:hover {
  cursor: pointer;
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
.icon-table {
  font-size: 18px;
}
.container-table {
  border-radius: 15px;
  height: 80%;
  max-height: 60vh;
  background-color: white;
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
