<template>
  <div id="exportFile">
    <q-table
      flat
      bordered
      :title="title"
      row-key="name"
      :rows="row"
      :columns="columns"
      :pagination="pagination"
      :rows-per-page-options="[0]"
      hide-bottom
    >
    </q-table>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";

let row = computed(() => {
  return props.data;
});
let title = ref("");

const pagination = {
  rowsPerPage: 0,
};

const columns = computed(() => {
  if (props.type == "Reporte Anual") {
    title.value = "Reporte Anual - Consolidados";
    return [
      {
        name: "month",
        label: "Mes",
        field: "month",
        align: "left",
        sortable: true,
        headerStyle: "font-size: var(--font-medium); font-weight: bold;",
        style: "font-size: var(--font-medium);",
      },
      {
        name: "activity",
        label: "Actividad",
        field: "activity",
        align: "left",
        sortable: true,
        headerStyle: "font-size: var(--font-medium); font-weight: bold;",
        style: "font-size: var(--font-medium);",
      },
      {
        name: "transformation",
        label: "Transformación",
        field: "transformation",
        align: "left",
        sortable: true,
        headerStyle: "font-size: var(--font-medium); font-weight: bold;",
        style: "font-size: var(--font-medium);",
      },
      {
        name: "plantation",
        label: "Plantación",
        field: "plantation",
        align: "left",
        sortable: true,
        headerStyle: "font-size: var(--font-medium); font-weight: bold;",
        style: "font-size: var(--font-medium);",
      },
      {
        name: "administrative",
        label: "Administración",
        field: "administrative",
        align: "left",
        sortable: true,
        headerStyle: "font-size: var(--font-medium); font-weight: bold;",
        style: "font-size: var(--font-medium);",
      },
      {
        name: "totalincome",
        label: "Ingreso",
        field: "totalincome",
        align: "left",
        sortable: true,
        headerStyle: "font-size: var(--font-medium); font-weight: bold;",
        style: "font-size: var(--font-medium);",
      },
      {
        name: "totalexpenses",
        label: "Gastos",
        field: "totalexpenses",
        align: "left",
        sortable: true,
        headerStyle: "font-size: var(--font-medium); font-weight: bold;",
        style: "font-size: var(--font-medium);",
      },
      {
        name: "utility",
        label: "Utilidad",
        field: "utility",
        align: "left",
        sortable: true,
        headerStyle: "font-size: var(--font-medium); font-weight: bold;",
        style: "font-size: var(--font-medium);",
      },
    ];
  } else if (props.type == "Reporte de Inventario") {
    title.value = "Reporte de Inventario";
    return [
      {
        name: "name",
        label: "Nombre",
        field: "name",
        align: "left",
        sortable: true,
        headerStyle: "font-size: var(--font-medium); font-weight: bold;",
        style: "font-size: var(--font-medium);",
      },
      {
        name: "name",
        label: "Categoria",
        field: (row) => row.category.name,
        align: "left",
        sortable: true,
        headerStyle: "font-size: var(--font-medium); font-weight: bold;",
        style: "font-size: var(--font-medium);",
      },
      {
        name: "mark",
        label: "Marca",
        field: (row) => row.mark.name,
        align: "left",
        sortable: true,
        headerStyle: "font-size: var(--font-medium); font-weight: bold;",
        style: "font-size: var(--font-medium);",
      },
      {
        name: "amount",
        label: "Cantidad",
        field: "amount",
        align: "left",
        sortable: true,
        headerStyle: "font-size: var(--font-medium); font-weight: bold;",
        style: "font-size: var(--font-medium);",
      },
      {
        name: "description",
        label: "Descripción",
        field: "description",
        align: "left",
        sortable: true,
        headerStyle: "font-size: var(--font-medium); font-weight: bold;",
        style: "font-size: var(--font-medium);",
      },
    ];
  } else if (props.type == "Consolidado Mensual") {
    title.value = "Consolidado Mensual";
    return [
      {
        name: "totalActivityExpenses",
        label: "Actividad",
        field: "totalActivityExpenses",
        align: "left",
        sortable: true,
        headerStyle: "font-size: var(--font-medium); font-weight: bold;",
        style: "font-size: var(--font-medium);",
      },
      {
        name: "totalTransformationCosts",
        label: "Transformación",
        field: "totalTransformationCosts",
        align: "left",
        sortable: true,
        headerStyle: "font-size: var(--font-medium); font-weight: bold;",
        style: "font-size: var(--font-medium);",
      },
      {
        name: "totalPlantationCosts",
        label: "Plantación",
        field: "totalPlantationCosts",
        align: "left",
        sortable: true,
        headerStyle: "font-size: var(--font-medium); font-weight: bold;",
        style: "font-size: var(--font-medium);",
      },
      {
        name: "totalAdministrativeExpenses",
        label: "Administrativos",
        field: "totalAdministrativeExpenses",
        align: "left",
        sortable: true,
        headerStyle: "font-size: var(--font-medium); font-weight: bold;",
        style: "font-size: var(--font-medium);",
      },
      {
        name: "totalOrders",
        label: "Ingresos",
        field: "totalOrders",
        align: "left",
        sortable: true,
        headerStyle: "font-size: var(--font-medium); font-weight: bold;",
        style: "font-size: var(--font-medium);",
      },
      {
        name: "totalCosts",
        label: "Total Costos",
        field: "totalCosts",
        align: "left",
        sortable: true,
        headerStyle: "font-size: var(--font-medium); font-weight: bold;",
        style: "font-size: var(--font-medium);",
      },
      {
        name: "totalEarnings",
        label: "Ganancias",
        field: "totalEarnings",
        align: "left",
        sortable: true,
        headerStyle: "font-size: var(--font-medium); font-weight: bold;",
        style: "font-size: var(--font-medium);",
      },
    ];
  }
});

const props = defineProps({
  data: {
    type: Object,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
});
</script>
<style scoped>
#exportFile {
  display: none;
}
</style>
