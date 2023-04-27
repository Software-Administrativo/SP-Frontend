<template>
  <div class="q-py-md table-container">
    <h6 class="q-my-lg">PERSONAS</h6>
    <q-separator class="separator" />
    <ButtonAdd @onClick="clickButton" label="Crear nueva persona" />
    <div class="container-table q-mt-lg q-pa-md" rounded>
      <q-table
        class="my-sticky-header-table"
        flat
        bordered
        title="Personas"
        :rows="rows"
        :columns="columns"
        row-key="name"
        v-model:pagination="pagination"
      />
    </div>
  </div>
  <template v-if="modal.modalIsOpen">
    <ModalForm>
      <h6 class="q-my-md text-center">REGISTRAR PERSONA</h6>
      <div class="row q-px-xl">
        <div class="col-12">
          <Select
            class="q-mb-lg"
            @onSelect="getSelectTypeDocument"
            :style="selectStyles"
            type="documents"
            label="Tipo de Documento"
          ></Select>
          <Input
            class="q-pb-xs"
            label="Número de Documento"
            :required="true"
            type="text"
            :ruless="rules"
            v-model="documentPeople"
            @onWrite="getInputDocument"
          />
          <Input
            class="q-pb-xs"
            label="Nombre"
            :required="true"
            type="text"
            :ruless="rules"
            v-model="namePeople"
            @onWrite="getInputName"
          />
          <Input
            class="q-pb-xs"
            label="Apellido"
            :required="true"
            type="text"
            :ruless="rules"
            v-model="lastNamePeople"
            @onWrite="getInputLastName"
          />
          <div class="q-pa-md" style="max-width: 300px">
            <q-input filled v-model="date" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="date">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <Input
            class="q-pb-xs"
            label="Teléfono"
            :required="true"
            type="text"
            :ruless="rules"
            v-model="phonePeople"
            @onWrite="getInputPhone"
          />
          <q-select
            class="q-mb-lg"
            filled
            dense
            label="Genero"
            :required="true"
            type="text"
            :ruless="rules"
            v-model="genderPeople"
            :options="optionsGender"
            @onSelect="getSelectGender"
          />
          <q-select
            class="q-mb-lg"
            filled
            dense
            label="EPS"
            :required="true"
            type="text"
            :ruless="rules"
            v-model="epsPeople"
            :options="optionsEps"
            @onSelect="getSelectEps"
          />
          <q-select
            class="q-mb-lg"
            filled
            dense
            label="Tipo de Sangre"
            :required="true"
            type="text"
            :ruless="rules"
            v-model="bloodTypePeople"
            :options="optionsBloodType"
            @onSelect="getSelectTypeBlood"
          />
          <q-select
            class="q-mb-lg"
            filled
            dense
            label="Tipo de Persona"
            :required="true"
            type="text"
            :ruless="rules"
            v-model="peopleType"
            :options="optionsPeopleType"
            @onSelect="getSelectTypePeople"
          />
          <Input
            class="q-mb-lgs"
            label="Descripción"
            :required="false"
            type="text"
            :ruless="rules"
            v-model="descriptionPeople"
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
import { ref, onMounted, computed } from "vue";
import { getPeople, postPeople } from "@/api/maintenance/people";
import { modalState } from "@/stores/modal.js";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ModalForm from "@/modules/global/ModalForm.vue";
import Input from "@/commons/forms/Input.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";
import Select from "@/commons/forms/Select.vue";

const modal = modalState();

const optionsGender = ["M", "F", "I"];
const optionsEps = ["1", "2", "3"];
const optionsBloodType = ["a+", "a+", "ab+", "ab-", "b+", "b-", "o+", "o-"];
const optionsPeopleType = ["1", "2", "3", "4", "5", "6"];

const typeDocument = ref("");
let documentPeople = ref("");
let namePeople = ref("");
let lastNamePeople = ref("");
let birthDayPeople = ref("");
let phonePeople = ref("");
let genderPeople = ref(null);
let epsPeople = ref(null);
let bloodTypePeople = ref(null);
let peopleType = ref("");
let descriptionPeople = ref("");
let disableSave = computed(() => {
  return namePeople.value == "";
});

const rules = [
  (v) => !!v || "Este campo es requerido",
  (v) => (v && v.length <= 10) || "El nombre debe tener menos de 10 caracteres",
];

const rows = ref([]);
const columns = ref([
  { name: "id", label: "#", field: "id", align: "left", sortable: true },
  {
    name: "typeDocument",
    label: "Tipo de Documento",
    field: "typeDocument",
    align: "left",
    sortable: true,
  },
  {
    name: "document",
    label: "Número de Documento",
    field: "document",
    align: "left",
    sortable: true,
  },
  {
    name: "name",
    label: "Nombre",
    field: "name",
    align: "left",
    sortable: true,
  },
  {
    name: "lastName",
    label: "Apellido",
    field: "lastName",
    align: "left",
    sortable: true,
  },
  {
    name: "birthDay",
    label: "Fecha de Nacimiento",
    field: "birthDay",
    align: "left",
    sortable: true,
  },
  {
    name: "phone",
    label: "Teléfono",
    field: "phone",
    align: "left",
    sortable: true,
  },
  {
    name: "gender",
    label: "Genero",
    field: "gender",
    align: "left",
    sortable: true,
  },
  {
    name: "eps",
    label: "Eps",
    field: "eps",
    align: "left",
    sortable: true,
  },
  {
    name: "bloodType",
    label: "Tipo de Sangre",
    field: "bloodType",
    align: "left",
    sortable: true,
  },
  {
    name: "peopleType",
    label: "Tipo de Persona",
    field: "peopleType",
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
  typeDocument.value = "";
  documentPeople.value = "";
  namePeople.value = "";
  lastNamePeople.value = "";
  birthDayPeople.value = "";
  phonePeople.value = "";
  genderPeople.value = "";
  epsPeople.value = "";
  bloodTypePeople.value = "";
  peopleType.value = "";
  descriptionPeople.value = "";
};

const getSelectTypeDocument = (value) => {
  typeDocument.value = value;
};

const getInputDocument = (value) => {
  documentPeople.value = value;
};

const getInputName = (value) => {
  namePeople.value = value;
};

const getInputLastName = (value) => {
  lastNamePeople.value = value;
};

const getDateBirthDay = (value) => {
  birthDayPeople.value = value;
};

const getInputPhone = (value) => {
  phonePeople.value = value;
};

const getSelectGender = (value) => {
  genderPeople.value = value;
};

const getSelectEps = (value) => {
  epsPeople.value = value;
};

const getSelectTypeBlood = (value) => {
  bloodTypePeople.value = value;
};

const getSelectTypePeople = (value) => {
  peopleType.value = value;
};

const getInputDescription = (value) => {
  descriptionPeople.value = value;
};

const saveInfo = () => {
  postDataPeople();
  modal.toggleModal();
};

const postDataPeople = async () => {
  //falta peticion del backend
  const { people } = await postPeople({
    name: namePeople.value,
    description: descriptionPeople.value,
  });
  getDataPeople();
};

const getDataPeople = async () => {
  const { people } = await getPeople();
  let count = 1;
  people.forEach((item) => {
    item.status = item.status ? "Inactivo" : "Activo";
    item.id = count++;
    item.description =
      item.description.trim() == "" ? "No registra" : item.description;
  });
  rows.value = people;
};

onMounted(() => {
  getDataPeople();
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
  max-height: 50vh;
  border: 2px solid var(--color-gray);
  box-shadow: 2px 3px 3px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
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
