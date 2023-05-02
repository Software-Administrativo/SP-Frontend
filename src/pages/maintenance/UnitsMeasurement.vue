<template>
  <div class="q-py-md table-container">
    <h6 class="title q-my-lg">UNIDADES DE MEDIDA</h6>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd @onClick="clickButton" label="Crear unidad de medida" />
      <div class="container-table q-mt-md q-pa-md" rounded>
        <q-table
          flat
          bordered
          title="Usuarios"
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
        </q-table>
      </div>
    </div>
  </div>
  <template v-if="modal.modalIsOpen">
    <ModalForm>
      <h6 class="q-my-md text-center">REGISTRAR TIPO DE UNIDAD</h6>
      <div class="row q-px-xl">
        <div class="col-12">
          <Input
            class="q-pb-xs"
            label="Nombre"
            :required="true"
            type="text"
            :ruless="rules"
            v-model="nameUnitMeasurement"
            @onWrite="getInputName"
          />
          <Input
            label="Descripción"
            type="text"
            :required="false"
            v-model="descriptionUnitMeasurement"
            @onWrite="getInputDescription"
          />
          <span class="text-required q-pb-sm"
            >Todos los campos con <span class="text-red">*</span> son
            obligatorios</span
          >
          <div class="row justify-center">
            <ButtonSave :disable="disableSave" @onClick="saveInfo" />
          </div>
        </div>
      </div>
    </ModalForm>
  </template>
</template>
<script setup>
import {
  getTypeUnitsMeasurement,
  postTypeUnitsMeasurement,
} from "@/api/maintenance/units-measurement";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";
import Input from "@/commons/forms/Input.vue";
import ModalForm from "@/modules/global/ModalForm.vue";
import { modalState } from "@/stores/modal.js";
import { computed, onMounted, ref } from "vue";

const modal = modalState();
const loading = ref(false);

let nameUnitMeasurement = ref("");
let descriptionUnitMeasurement = ref("");
let filter = ref("");
let disableSave = computed(() => {
  return nameUnitMeasurement.value == "";
});

const rules = [(v) => !!v || "Este campo es requerido"];

const rows = ref([]);
const columns = ref([
  {
    name: "id",
    label: "#",
    field: "id",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-medium); font-weight: bold;",
    style: "font-size: var(--font-medium);",
  },
  {
    name: "name",
    label: "Nombre",
    field: "name",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-medium); font-weight: bold;",
    style: "font-size: var(--font-medium);",
  },
  {
    name: "description",
    label: "Descripción",
    field: "description",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-medium); font-weight: bold;",
    style: "font-size: var(--font-medium);",
  },
  {
    name: "status",
    label: "Estado",
    field: "status",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-medium); font-weight: bold;",
    style: "font-size: var(--font-medium);",
  },
]);

const clickButton = () => {
  modal.toggleModal();
  nameUnitMeasurement.value = "";
  descriptionUnitMeasurement.value = "";
};

const getInputName = (value) => {
  nameUnitMeasurement.value = value;
};

const getInputDescription = (value) => {
  descriptionUnitMeasurement.value = value;
};

const saveInfo = () => {
  postDataUnitMeasurement();
  modal.toggleModal();
};

const postDataUnitMeasurement = async () => {
  const { unittypes } = await postTypeUnitsMeasurement({
    name: nameUnitMeasurement.value,
    description: descriptionUnitMeasurement.value,
  });
  getDataUnitMeasurement();
};

const getDataUnitMeasurement = async () => {
  loading.value = true;
  const { unittypes } = await getTypeUnitsMeasurement();
  let count = 1;
  unittypes.forEach((item) => {
    item.status = item.status ? "Inactivo" : "Activo";
    item.id = count++;
    item.description =
      item.description.trim() == "" ? "No registra" : item.description;
  });
  rows.value = unittypes;
  loading.value = false;
};

onMounted(() => {
  getDataUnitMeasurement();
});
</script>
<style scoped>
.title {
  font-size: var(--font-title);
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
.container-table {
  border-radius: 15px;
  height: 80%;
  max-height: 70vh;
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
