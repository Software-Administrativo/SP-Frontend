<template>
  <div class="q-py-md table-container">
    <h6 class="q-my-lg">MARCAS</h6>
    <q-separator class="separator" />
    <div class="container-content">
      <ButtonAdd @onClick="clickButton" label="Crear nueva marca" />
      <div class="container-table q-mt-lg q-pa-md" rounded>
        <q-table
          flat
          bordered
          title="Marcas"
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
      <h6 class="q-my-md text-center">REGISTRAR MARCA</h6>
      <div class="row q-px-xl">
        <div class="col-12">
          <q-select
            class="q-mb-lg"
            filled
            dense
            label="EPS"
            :required="true"
            type="text"
            :ruless="rules"
            v-model="farmBrands"
            :options="optionsBrands"
            @onSelect="getSelectBrand"
          />
          <Input
            class="q-pb-xs"
            label="Nombre"
            :required="true"
            type="text"
            :ruless="rules"
            v-model="nameBrands"
            @onWrite="getInputName"
          />
          <Input
            label="Descripción"
            type="text"
            :required="false"
            v-model="descriptionBrands"
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
import { getBrands, postBrand } from "@/api/inventory/brands";
import ButtonAdd from "@/commons/ButtonAdd.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";
import Input from "@/commons/forms/Input.vue";
import ModalForm from "@/modules/global/ModalForm.vue";
import { modalState } from "@/stores/modal.js";
import { computed, onMounted, ref } from "vue";

const modal = modalState();

const optionsBrands = ["1", "2", "3"];

let farmBrands = ref(null);
let nameBrands = ref("");
let descriptionBrands = ref("");
let disableSave = computed(() => {
  return nameBrands.value == "";
});

const rules = [(v) => !!v || "Este campo es requerido"];

const rows = ref([]);
const columns = ref([
  { name: "id", label: "#", field: "id", align: "left", sortable: true },
  {
    name: "farm",
    label: "Finca",
    field: "farm",
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
  farmBrands.value = "";
  nameBrands.value = "";
  descriptionBrands.value = "";
};

const getInputName = (value) => {
  nameBrands.value = value;
};

const getInputDescription = (value) => {
  descriptionBrands.value = value;
};

const getSelectBrand = (value) => {
  farmBrands.value = value;
};

const saveInfo = () => {
  postDataBrands();
  modal.toggleModal();
};

const postDataBrands = async () => {
  const { brands } = await postBrand({
    name: nameBrands.value,
    description: descriptionBrands.value,
  });
  getDataBrands();
};

const getDataBrands = async () => {
  const { brands } = await getBrands();
  let count = 1;
  brands.forEach((item) => {
    item.status = item.status ? "Inactivo" : "Activo";
    item.id = count++;
    item.description =
      item.description.trim() == "" ? "No registra" : item.description;
  });
  rows.value = brands;
};

onMounted(() => {
  getDataBrands();
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
