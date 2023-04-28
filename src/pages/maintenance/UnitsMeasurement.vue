<template>
  <div class="q-py-md table-container">
    <h6 class="q-my-lg">UNIDADES DE MEDIDA</h6>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd @onClick="clickButton" label="Crear unidad de medida" />
      <div class="container-table q-mt-lg q-pa-md" rounded>
        <q-table
          class="my-sticky-header-table"
          flat
          bordered
          title="Usuarios"
          :rows="rows"
          :columns="columns"
          row-key="name"
          v-model:pagination="pagination"
        />
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
            v-model="unittypeUnitsMeasurement"
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
import { ref, onMounted, computed } from "vue";
import {
  getTypeUnitsMeasurement,
  postTypeUnitsMeasurement,
} from "@/api/maintenance/units-measurement";
import { modalState } from "@/stores/modal.js";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ModalForm from "@/modules/global/ModalForm.vue";
import Input from "@/commons/forms/Input.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";

const modal = modalState();

let nameUnitsMeasurement = ref("");
let unittypeUnitsMeasurement = ref("");
let disableSave = computed(() => {
  return (nameUnitsMeasurement.value == "" || unittypeUnitsMeasurement.value == "");
});

const rules = [
  (v) => !!v || "Este campo es requerido",
];

const rows = ref([]);
const columns = ref([
  { name: "id", label: "#", field: "id", align: "left", sortable: true },
  {
    name: "name",
    label: "Nombre",
    field: "name",
    align: "left",
    sortable: true,
  },
  {
    name: "unittype",
    label: "Tipo de unidad",
    field: "unittype",
    align: "left",
    sortable: true,
  },
  {
    name: "status",
    label: "Estado",
    field: "status",
    align: "left",
    sortable: true,
  },
]);

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  sortBy: "id",
  descending: false,
});

const clickButton = () => {
  modal.toggleModal();
  nameUnitsMeasurement.value = "";
  unittypeUnitsMeasurement.value = "";
};

const getInputName = (value) => {
  nameUnitsMeasurement.value = value;
};

const getInputunittype = (value) => {
  unittypeUnitsMeasurement.value = value;
};

const saveInfo = () => {
  postDataUnitsMeasurement();
  modal.toggleModal();
};

const postDataUnitsMeasurement = async () => {
  const { unitType } = await postTypeUnitsMeasurement({
    name: nameUnitsMeasurement.value,
    unittype: unittypeUnitsMeasurement.value,
  });
  getDataUnitsMeasurement();
};

const getDataUnitsMeasurement = async () => {
  const { unitType } = await getTypeUnitsMeasurement();
  let count = 1;
  console.log(unitType);
  unitType.forEach((item) => {
    item.status = item.status ? "Inactivo" : "Activo";
    item.id = count++;
  });
  rows.value = unitType;
};

onMounted(() => {
  getDataUnitsMeasurement();
});
</script>
<style scoped>
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
  max-width: 900px;
  margin: 0 auto;
}
.container-table {
  border-radius: 15px;
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
</style>
