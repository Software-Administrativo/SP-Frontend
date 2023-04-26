<template>
  <div class="q-py-md table-container">
    <h6 class="q-my-lg">Finca</h6>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd @onClick="clickButton" label="Crear nueva finca" />
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
      <h6 class="q-my-md text-center">REGISTRAR FINCA</h6>
      <div class="row q-px-xl">
        <div class="col-12">
          <Input
            class="q-pb-xs"
            label="Nombre"
            :required="true"
            type="text"
            :ruless="rules"
            v-model="nameFarm"
            @onWrite="getInputName"
          />
          <Input
            class="q-pb-xs"
            label="Descripción"
            type="text"
            :required="false"
            :ruless="rules"
            v-model="descriptionFarm"
            @onWrite="getInputDescription"
          />
          <Input
            class="q-pb-xs"
            label="NIT"
            :required="true"
            type="text"
            :ruless="rules"
            v-model="nitFarm"
            @onWrite="getInputNit"
          />
          <Input
            class="q-pb-xs"
            label="Ubicación"
            :required="true"
            type="text"
            :ruless="rules"
            v-model="ubicationFarm"
            @onWrite="getInputUbication"
          />
          <Input
            class="q-pb-xs"
            label="Unidad Cana"
            :required="true"
            type="text"
            :ruless="rules"
          />
          <Input
            class="q-pb-xs"
            label="Minimo Existencias"
            :required="true"
            type="text"
            :ruless="rules"
            v-model="minimumExistenceFarm"
            @onWrite="getInputMiniumExistence"
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
import { getFarm, postFarm } from "@/api/maintenance/farm";
import { modalState } from "@/stores/modal.js";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ModalForm from "@/modules/global/ModalForm.vue";
import Input from "@/commons/forms/Input.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";

const modal = modalState();

let nameFarm = ref("");
let descriptionFarm = ref("");
let nitFarm = ref("");
let ubicationFarm = ref("");
let minimumExistenceFarm = ref("");
let disableSave = computed(() => {
  return nameFarm.value == "";
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
    name: "description",
    label: "Descripción",
    field: "description",
    align: "left",
    sortable: true,
  },
  {
    name: "nit",
    label: "NIT",
    field: "nit",
    align: "left",
    sortable: true,
  },
  {
    name: "ubication",
    label: "Ubicación",
    field: "ubication",
    align: "left",
    sortable: true,
  },
  {
    name: "miniumExistence",
    label: "Minimo Existencias",
    field: "miniumExistence",
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
  nameFarm.value = "";
  descriptionFarm.value = "";
  nitFarm.value = "";
  ubicationFarm.value = "";
  minimumExistenceFarm.value = "";
};

const getInputName = (value) => {
  nameFarm.value = value;
};

const getInputDescription = (value) => {
  descriptionFarm.value = value;
};

const getInputNit = (value) => {
  nitFarm.value = value;
};

const getInputUbication = (value) => {
  ubicationFarm.value = value;
};

const getInputMiniumExistence = (value) => {
  minimumExistenceFarm.value = value;
};

const saveInfo = () => {
  postDataFarm();
  modal.toggleModal();
};

const postDataFarm = async () => {
  //falta peticion del backend
  const { farm } = await postFarm({
    name: nameFarm.value,
    description: descriptionFarm.value,
  });
  getDataFarm();
};

const getDataFarm = async () => {
  const { farm } = await getFarm();
  let count = 1;
  farm.forEach((item) => {
    item.status = item.status ? "Inactivo" : "Activo";
    item.id = count++;
    item.description =
      item.description.trim() == "" ? "No registra" : item.description;
  });
  rows.value = farm;
};

onMounted(() => {
  getDataFarm();
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
