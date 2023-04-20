<template>
  <div class="q-py-md">
    <h6 class="q-my-lg">ACCESO AL SISTEMA</h6>
    <q-separator class="separator" />
    <Button @onClick="clickButton" label="Crear nuevo usuario" />
    <div class="container-table q-mt-lg q-pa-md" rounded>
      <q-table
        class="my-sticky-header-table"
        flat bordered
        title="Usuarios"
        :rows="rows"
        :columns="columns"
        row-key="name"
        v-model:pagination="pagination"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Button from "@/commons/Button-add.vue";
import { getUsers } from "@/api/system";

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
    name: "Tipo",
    label: "Tipo",
    field: "tpdocument",
    align: "left",
    sortable: true,
  },
  {
    name: "Documento",
    label: "Documento",
    field: "numdocument",
    align: "left",
    sortable: true,
  },
  { name: "role", label: "Rol", field: "role", align: "left", sortable: true },
  {
    name: "status",
    label: "Estado",
    field: "status",
    align: "left",
    sortable: true,
  },
]);

const clickButton = (event) => {
  console.log(event);
};

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  sortBy: "id",
  descending: true,
});

const getDataUsers = async () => {
  const data = await getUsers();
  let count = 1;
  data.forEach((item) => {
    item.status = item.status ? "Activo" : "Inactivo";
    item.id = count++;
  });
  rows.value = data;
};

onMounted(() => {
  getDataUsers();
});
</script>
<style scoped>
.separator {
  border: 1.8px solid var(--color-gray);
}
.container-table {
  border-radius: 15px;
  height: 50vh;
  border: 2px solid var(--color-gray);
  box-shadow: 2px 3px 3px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
</style>
