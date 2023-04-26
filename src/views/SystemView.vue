<template>
  <div class="q-py-md table-container">
    <h6 class="q-my-lg">ACCESO AL SISTEMA</h6>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd @onClick="clickButton" label="Crear nuevo usuario" />
      <div class="container-table q-mt-lg q-pa-md" rounded>
        <q-table
          flat
          bordered
          title="Usuarios"
          :rows="rows"
          :columns="columns"
          row-key="name"
          v-model:pagination="pagination"
        >
          <template v-slot:body-cell-Acciones="props">
            <td
              style="
                padding: 0px;
                margin: 0px;
                min-width: 150px;
                max-width: 200px;
              "
            >
              <q-btn-group class="full-width full-height" outline square>
                <q-btn
                  icon="edit_note"
                  text-color="blue-10"
                  class="col text-bold text-subtitle1 btnAccion1"
                  @click="editSystemUser(props.row._id)"
                />
                <q-btn
                  icon="highlight_off"
                  text-color="blue-10"
                  class="col text-bold text-subtitle1 btnAccion1"
                  @click="deleteSystemUser()"
                />
              </q-btn-group>
            </td>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { getUsers } from "@/api/system";
import ButtonAdd from "@/commons/ButtonAdd.vue";

const rows = ref([]);

function editSystemUser(id) {
  console.log(id);
}

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
  {
    name: "Acciones",
    label: "Acciones",
    field: "acciones",
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
  descending: false,
});

const getDataUsers = async () => {
  const data = await getUsers();
  let count = 1;
  data.forEach((item) => {
    item.status = item.status ? "Inactivo" : "Activo";
    item.id = count++;
  });
  rows.value = data;
};

onMounted(() => {
  getDataUsers();
});
</script>
<style scoped>
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
  max-height: 50vh;
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
