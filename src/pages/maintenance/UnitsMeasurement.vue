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
            v-model="nameUnitsMeasurement"
            @onWrite="getInputName"
          />
          <Input
            label="Tipo de Unidad"
            :required="true"
            type="text"
            :ruless="rules"
            v-model="unitTypeUnitsMeasurement"
            @onWrite="getInputunittype"
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

let nameUnitsMeasurement = ref("");
let unitTypeUnitsMeasurement = ref("");
let filter = ref("");
let disableSave = computed(() => {
  return (
    nameUnitsMeasurement.value == "" || unitTypeUnitsMeasurement.value == ""
  );
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
    name: "unittype",
    label: "Tipo de unidad",
    field: "unittype",
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
]);

const clickButton = () => {
  modal.toggleModal();
  nameUnitsMeasurement.value = "";
  unitTypeUnitsMeasurement.value = "";
};

const getInputName = (value) => {
  nameUnitsMeasurement.value = value;
};

const getInputunittype = (value) => {
  unitTypeUnitsMeasurement.value = value;
};

const saveInfo = () => {
  postDataUnitsMeasurement();
  modal.toggleModal();
};

const postDataUnitsMeasurement = async () => {
  const { unitType } = await postTypeUnitsMeasurement({
    name: nameUnitsMeasurement.value,
    unittype: unitTypeUnitsMeasurement.value,
  });
  getDataUnitsMeasurement();
};

const getDataUnitsMeasurement = async () => {
  loading.value = true;
  const { unitType } = await getTypeUnitsMeasurement();
  let count = 1;
  unitType.forEach((item) => {
    item.status = item.status ? "Inactivo" : "Activo";
    item.id = count++;
  });
  rows.value = unitType;
  loading.value = false;
};

onMounted(() => {
  getDataUnitsMeasurement();
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
