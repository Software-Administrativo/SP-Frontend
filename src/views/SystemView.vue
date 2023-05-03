<template>
  <div class="q-py-md table-container">
    <h6 class="title q-my-lg">ACCESO AL SISTEMA</h6>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd @onClick="clickButton" label="Crear nuevo usuario" />
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
                <template v-slot:body-cell-Acciones="props">
                  <td
                    style="
                      padding: 0px;
                      margin: 0px;
                      min-width: 100px;
                      max-width: 20px;
                    "
                  >
                    <q-btn-group class="full-width full-height" outline square>
                      <q-btn
                        icon="edit_note"
                        text-color="blue-10"
                        class="col text-bold q-pa-none"
                        @click="editSystemUser(props.row._id)"
                      />
                      <q-btn
                        icon="highlight_off"
                        text-color="blue-10"
                        class="col text-bold q-pa-none"
                        @click="inactiveSystemUser(props.row._id)"
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
                title="Usuarios"
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
                  </q-input>´
                </template>
                <template v-slot:body-cell-Acciones="props">
                  <td
                    style="
                      padding: 0px;
                      margin: 0px;
                      min-width: 100px;
                      max-width: 100px;
                    "
                  >
                    <q-btn-group class="full-width full-height" outline square>
                      <q-btn
                        text-color="blue-10"
                        class="col q-pa-none"
                        @click="activeSystemUser(props.row._id)"
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
</template>
<script setup>
import { activeUser, getUsers, inactiveUser } from "@/api/system";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import { useQuasar } from "quasar";
import { onMounted, ref } from "vue";

const $q = useQuasar();

let filter = ref("");

const rows = ref([]);
const inactiveRows = ref([]);
const loading = ref(false);
let tab = ref("active");

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
    name: "Nombre",
    label: "Nombre",
    field: "name",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-medium); font-weight: bold;",
    style: "font-size: var(--font-medium);",
  },
  {
    name: "Tipo",
    label: "Tipo",
    field: "tpdocument",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-medium); font-weight: bold;",
    style: "font-size: var(--font-medium);",
  },
  {
    name: "Documento",
    label: "Documento",
    field: "numdocument",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-medium); font-weight: bold;",
    style: "font-size: var(--font-medium);",
  },
  {
    name: "role",
    label: "Rol",
    field: "role",
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

// watch(tab, (newTab, oldTab) => {
//   if (newTab === "active") {
//     rows.value = [];
//     getDataUsers();
//   } else if (newTab === "inactive") {
//     inactiveRows.value = [];
//     getDataUsers();
//   }
// });

const clickButton = (event) => {
  console.log(event);
};

const getDataUsers = async () => {
  loading.value = true;
  const data = await getUsers();
  let countActive = 1;
  let countInactive = 1;
  data.forEach((item) => {
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
};

function editSystemUser(id) {
  console.log(id);
}

function inactiveSystemUser(id) {
  try {
    inactiveUser(id);
    $q.notify({
      type: "positive",
      message: "Usuario inactivado correctamente",
      position: "top",
    });
    rows.value = [];
    inactiveRows.value = [];
    getDataUsers();
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Ocurrió un error",
      position: "top",
    });
  }
}

function activeSystemUser(id) {
  try {
    activeUser(id);
    $q.notify({
      type: "positive",
      message: "Usuario activado correctamente",
      position: "top",
    });
    rows.value = [];
    inactiveRows.value = [];
    getDataUsers();
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Ocurrió un error",
    });
  }
}

onMounted(() => {
  getDataUsers();
});
</script>
<style scoped>
.title {
  font-size: var(--font-title);
}
.table-container {
  position: relative;
}
.separator {
  border: 1.8px solid var(--color-gray);
}
.icon {
  font-size: 1.5rem;
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
