<template>
    <div class="q-py-md table-container">
      <h6 class="q-my-lg">UNIDADES DE MEDIDA</h6>
      <q-separator class="separator" />
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
    <template v-if="modal.modalIsOpen">
      <ModalForm>
        <h6 class="q-my-md text-center">REGISTRAR TIPO DE UNIDAD</h6>
        <div class="row q-px-xl">
          <div class="col-12">
            <Input
              class="q-pb-xs"
              label="Nombre"
              :required=true
              type="text"
              :ruless=rules
              v-model="nameUnitMeasurement"
              @onWrite="getInputName"
            />
            <Input
              label="Descripción"
              type="text"
              :required=false
              v-model="descriptionUnitMeasurement"
              @onWrite="getInputDescription"
            />
            <span class="text-required q-pb-sm">Todos los campos con 
            <span class="text-red">*</span> son obligatorios</span>
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
  import { getTypeUnitsMeasurement, postTypeUnitsMeasurement } from "@/api/maintenance/units-measurement";
  import { modalState } from "@/stores/modal.js";
  import ButtonAdd from "@/commons/ButtonAdd.vue";
  import ModalForm from "@/modules/global/ModalForm.vue";
  import Input from "@/commons/forms/Input.vue";
  import ButtonSave from "@/commons/forms/ButtonSave.vue";
  
  const modal = modalState();
  
  let nameUnitMeasurement = ref("");
  let descriptionUnitMeasurement = ref("");
  let disableSave = computed(() => {
    return nameUnitMeasurement.value == "";
  });
  
  const rules = [
    (v) => !!v || "Este campo es requerido",
    (v) => (v && v.length <= 10) || "El nombre debe tener menos de 10 caracteres",
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
    nameUnitMeasurement.value = ""
    descriptionUnitMeasurement.value = ""
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
  }
  
  const getDataUnitMeasurement = async () => {
    const { unittypes } = await getTypeUnitsMeasurement();
    let count = 1;
    unittypes.forEach((item) => {
      item.status = item.status ? "Inactivo" : "Activo";
      item.id = count++;
      item.description = item.description=='' ? "No registra" : item.description || item.description == null ? "No registra" : item.description;
    });
    rows.value = unittypes;
  };
  
  onMounted(() => {
    getDataUnitMeasurement();
  });
  </script>
  <style scoped>
  .text-required{
    display: inline-block;
    font-size: 12px;
  }
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
  </style>
  