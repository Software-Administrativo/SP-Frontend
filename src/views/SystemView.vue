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
                    placeholder="Buscar"
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
                        class="col text-bold q-pa-none icon-table"
                        @click="editSystemUser(props.row)"
                      />
                      <q-btn
                        v-if="props.row.role == 'ADMIN'"
                        icon="highlight_off"
                        text-color="blue-10"
                        class="col text-bold q-pa-none icon-table"
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
                    placeholder="Buscar"
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template> </q-input
                  >´
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
  <template v-if="modal.modalIsOpen">
    <ModalForm class="modal">
      <div class="modalSystem">
        <h6 class="q-my-md text-center">{{ titleModal }}</h6>
        <div class="row q-px-xl">
          <div class="col-12">
            <Input
              label="Nombre"
              type="text"
              :required="true"
              :ruless="rules"
              :value="valueInputName"
              v-model="nameUserSystem"
              @onWrite="getInputName"
            />
            <div class="row justify-between">
              <Select
                class="q-pb-xs q-mb-md"
                type="documents"
                label="Tipo de documento"
                :required="true"
                :ruless="rules"
                :value="valueInputTypeDocument"
                v-model="typeDocumentUserSystem"
                @onSelect="getSelectDataTypeDocument"
              />
              <Input
                label="Número documento"
                type="number"
                :required="true"
                :ruless="rules"
                :value="valueInputNumberDocument"
                v-model="numberDocumentUserSystem"
                @onWrite="getInputNumberDocument"
              />
            </div>
            <Select
              v-if="valueInputRole != 'SUPER'"
              class="q-pb-xs q-mb-md"
              type="roles"
              label="Rol"
              :required="true"
              :value="valueInputRole"
              v-model="roleUserSystem"
              @onSelect="getSelectDataRole"
            ></Select>

            <Password
              v-if="valueInputRole != 'SUPER'"
              label="Contraseña"
              :required="true"
              :ruless="rules"
              v-model="passwordUserSystem"
              @onPassword="getPasswordData"
            />

            <span class="text-required q-py-sm"
              >Todos los campos con <span class="text-red">*</span> son
              obligatorios</span
            >
            <div class="row justify-center q-mt-sm">
              <ButtonSave
                v-if="typeAction"
                :disable="disableSave"
                @onClick="postDataUserSystem"
              />
              <ButtonSave
                v-else
                :disable="disableSave"
                @onClick="updateDataUserSystem"
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
import { activeUser, getUsers, inactiveUser, postUser, updateUserSystem } from "@/api/system";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";
import Input from "@/commons/forms/Input.vue";
import Password from "@/commons/forms/Password.vue";
import Select from "@/commons/forms/Select.vue";
import { RESPONSES } from "@/helpers";
import ModalForm from "@/modules/global/ModalForm.vue";
import { modalState } from "@/stores/modal.js";
import { useQuasar } from "quasar";
import { computed, onMounted, ref, watch } from "vue";
import { useStorage } from "@/stores/localStorage.js";

const $q = useQuasar();

const modal = modalState();
const idUserSystem = ref();
const titleModal = ref("");
const loading = ref(false);
const isLoading = ref(false);
const typeAction = ref(true);
const rows = ref([]);
const inactiveRows = ref([]);
const storage = useStorage();

let valueInputName = ref("");
let valueInputTypeDocument = ref("");
let valueInputNumberDocument = ref("");
let valueInputRole = ref("");

let nameUserSystem = ref("");
let typeDocumentUserSystem = ref("");
let numberDocumentUserSystem = ref("");
let roleUserSystem = ref("");
let passwordUserSystem = ref("");

let filter = ref("");
let tab = ref("active");

const disableSave = computed(() => {
  if (
    !nameUserSystem.value ||
    !typeDocumentUserSystem.value ||
    !numberDocumentUserSystem.value ||
    !roleUserSystem.value ||
    !passwordUserSystem.value
  ) {
    return true;
  } else if (isLoading.value == true) {
    return true;
  } else {
    return false;
  }
});

const rules = [(v) => !!v || "Este campo es requerido"];

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
    name: "Nombre",
    label: "Nombre",
    field: "name",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
  {
    name: "Tipo",
    label: "Tipo",
    field: "tpdocument",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
  {
    name: "Documento",
    label: "Documento",
    field: "numdocument",
    align: "left",
    sortable: true,
    headerStyle: "font-size: var(--font-large); font-weight: bold;",
    style: "font-size: var(--font-large);",
  },
  {
    name: "role",
    label: "Rol",
    field: "role",
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
  nameUserSystem.value = value;
};

const getSelectDataTypeDocument = (value) => {
  typeDocumentUserSystem.value = value;
};

const getInputNumberDocument = (value) => {
  numberDocumentUserSystem.value = value;
};

const getSelectDataRole = (value) => {
  roleUserSystem.value = value;
};

const getPasswordData = (value) => {
  passwordUserSystem.value = value;
};

const clickButton = (event) => {
  titleModal.value = "REGISTRAR ACCESO";
  resetValuesForm();
  typeAction.value = true;
  modal.toggleModal();
};

const resetValuesForm = () => {
  valueInputName.value = "";
  valueInputTypeDocument.value = "";
  valueInputNumberDocument.value = "";
  valueInputRole.value = "";
  nameUserSystem.value = "";
  typeDocumentUserSystem.value = "";
  numberDocumentUserSystem.value = "";
  roleUserSystem.value = "";
  passwordUserSystem.value = "";
};

const editSystemUser = (item) => {
  titleModal.value = "EDITAR TIPO DE PAGO";
  typeAction.value = false;
  idUserSystem.value = item._id;
  valueInputName.value = item.name;
  valueInputTypeDocument.value = item.tpdocument;
  valueInputNumberDocument.value = item.numdocument;
  valueInputRole.value = item.role;
  nameUserSystem.value = item.name;
  typeDocumentUserSystem.value = item.tpdocument;
  numberDocumentUserSystem.value = item.numdocument;
  roleUserSystem.value = item.role;
  modal.toggleModal();
};

const showNotification = (type, message) => {
  $q.notify({
    type: type,
    message: message,
    position: "top",
  });
};

async function getDataUsers() {
  rows.value = [];
  inactiveRows.value = [];
  loading.value = true;

  try {
    const data = await getUsers(idFarm.value);
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
  } catch {
    showNotification("negative", "Ocurrió un error al obtener los usuarios");
  }
}

async function updateDataUserSystem() {
  loading.value = true;
  isLoading.value = true;
  try {
    const response = await updateUserSystem({
      id: idUserSystem.value,
      name: nameUserSystem.value,
      tpdocument: typeDocumentUserSystem.value,
      numdocument: numberDocumentUserSystem.value,
      role: roleUserSystem.value,
      password: passwordUserSystem.value,
    }, idFarm.value);
    isLoading.value = false;
    loading.value = false;
    showNotification("positive", "Tipo de pago actualizado correctamente");
    modal.toggleModal();
    rows.value = [];
    getDataUsers();
  } catch {
    isLoading.value = false;
    loading.value = false;
    showNotification("negative", "Ocurrió un error");
  }
}

async function postDataUserSystem() {
  isLoading.value = true;
  try {
    const data = await postUser(
      {
        name: nameUserSystem.value,
        tpdocument: typeDocumentUserSystem.value,
        numdocument: numberDocumentUserSystem.value,
        role: roleUserSystem.value,
        password: passwordUserSystem.value,
      },
      idFarm.value
    );

    isLoading.value = false;

    let response = data.response.data.errors[0].msg;

    if (response == RESPONSES.USEREXIST) {
      showNotification("negative", "El usuario ya existe");
    } else if (response == RESPONSES.LENGTHPASSWORD) {
      showNotification(
        "negative",
        "La contraseña debe tener de 6 a 20 carácteres"
      );
    } else if (response == RESPONSES.RULESPASSWORD) {
      showNotification(
        "negative",
        "La contraseña debe tener una letra mayúscula, una letra minúscula y un número"
      );
    } else {
      modal.toggleModal();
      rows.value = [];
      showNotification("positive", "Usuario registrado correctamente");
      getDataUsers();
    }
  } catch (error) {
    showNotification("negative", "Ocurrió un error");
  }
}

async function activeSystemUser(id) {
  try {
    const active = await activeUser(id, idFarm.value);
    showNotification("positive", "Usuario activado correctamente");
    rows.value = [];
    inactiveRows.value = [];
    getDataUsers();
  } catch (error) {
    showNotification("negative", "Ocurrió un error al activar el usuario");
  }
}

async function inactiveSystemUser(id) {
  try {
    const inactive = await inactiveUser(id, idFarm.value);
    showNotification("positive", "Usuario desactivado correctamente");
    rows.value = [];
    inactiveRows.value = [];
    getDataUsers();
  } catch (error) {
    showNotification("negative", "Ocurrió un error al desactivar el usuario");
  }
}

const idFarm = computed(() => {
  return storage.idSelected;
});

watch(idFarm, () => {
  getDataUsers();
});

onMounted(() => {
  getDataUsers();
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
.modalSystem {
  overflow-y: scroll;
  max-height: 450px;
}
.modalSystem::-webkit-scrollbar {
  display: none;
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
.icon-table {
  font-size: 18px;
}
.container-content {
  max-width: 1200px;
  margin: 0 auto;
}
.icon-check {
  font-size: 25px;
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
