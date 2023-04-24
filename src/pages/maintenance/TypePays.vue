<template>
  <div class="q-py-md table-container">
    <h6 class="q-my-lg">TIPOS DE PAGO</h6>
    <q-separator class="separator" />
    <ButtonAdd @onClick="clickButton" label="Crear tipo de pago" />
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
  <template v-if="showRegisterPays">
    <ModalForm class="column modal-form">
      <h6 class="q-my-md text-center">Registrar Acceso</h6>
      <div class="row q-px-xl">
        <div class="col-12">
          <Input class="q-pb-md" label="Nombre" type="text" v-model="nameTypePays"/>
          <Input class="q-pb-md" label="Descripción" type="text" v-model="descriptionTypePays"/>
        </div>
      </div>
    </ModalForm>
  </template>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { getTypePays } from "@/api/maintenance";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ModalForm from "@/modules/global/ModalForm.vue";
import Input from "@/commons/forms/Input.vue";

const showRegisterPays = ref(false);
let nameTypePays = ref();
let descriptionTypePays = ref();

const rows = ref([]);
const columns = ref([
  { name: "id", label: "#", field: "id", align: "left", sortable: true },
  {
    name: "Nombre",
    label: "Nombre",
    field: "name",
    align: "left",
    sortable: true,
  },
  {
    name: "Descripción",
    label: "Descripción",
    field: "description",
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

const clickButton = () => {
  showRegisterPays.value = true;
};

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  sortBy: "id",
  descending: false,
});

const getDataTypePays = async () => {
  const { pays } = await getTypePays();
  let count = 1;
  pays.forEach((item) => {
    item.status = item.status ? "Activo" : "Inactivo";
    item.id = count++;
    item.description = item.description ? "No registra" : item.description;
  });
  rows.value = pays;
};

onMounted(() => {
  getDataTypePays();
});
</script>
<style scoped>
.table-container {
  position: relative;
}
.separator {
  border: 1.8px solid var(--color-gray);
}
.container-table {
  border-radius: 15px;
  height: 100%;
  max-height: 50vh;
  border: 2px solid var(--color-gray);
  box-shadow: 2px 3px 3px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
.modal-forms {
  position: absolute;
  top: calc(50% - 190px);
  left: calc(50% - 180px);
  width: 360px;
  border: 2px solid var(--color-gray);
}
</style>
