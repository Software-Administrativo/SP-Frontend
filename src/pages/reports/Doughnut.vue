<template>
  <div class="container">
    <span class="title">Balances del Mes</span>
    <div class="spinner" v-if="isLoading">
      <q-spinner-ios color="primary" size="2.5em" />
    </div>
    <Doughnut
      v-if="!isLoading"
      class="doughnut"
      id="doughnut-chart"
      :options="optionsDougnut"
      :data="dataDoughnut"
    ></Doughnut>
  </div>
</template>

<script setup>
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { onMounted, computed, ref } from "vue";
import { Doughnut } from "vue-chartjs";
import { getDoughnut } from "@/api/reports";
import { useStorage } from "@/stores/localStorage.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

let isLoading = ref(false);

const storage = useStorage();

const dataDoughnut = ref({
  labels: [],
  datasets: [
    {
      backgroundColor: [],
      data: [],
    },
  ],
});

const getDataDoughnut = async () => {
  isLoading.value = true;
  try {
    const data = await getDoughnut(idFarm.value);
    isLoading.value = false;
    dataDoughnut.value = {
      labels: [
        "Actividades",
        "Transformación",
        "Plantación",
        "Administración",
        "Pedidos",
      ],
      datasets: [
        {
          backgroundColor: [
            "#B9E7FF",
            "#315d96",
            "#48A5F3",
            "#C6C6D1",
            "#2766a9",
          ],
          data: [
            data.totalActivityExpenses,
            data.totalTransformationCosts,
            data.totalPlantationCosts,
            data.totalAdministrativeCosts,
            data.totalOrders,
          ],
        },
      ],
    };
  } catch {
    isLoading.value = false;
    showNotification("negative", "Ocurrió un error al desactivar el usuario");
  }
};

const optionsDougnut = {
  responsive: true,
  maintainAspectRatio: false,
};

const idFarm = computed(() => {
  return storage.idSelected;
});

const showNotification = (type, message) => {
  $q.notify({
    type: type,
    message: message,
    position: "top",
  });
};

onMounted(async () => {
  getDataDoughnut();
});
</script>
<style scoped>
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 50px;
}
.container {
  padding: 20px;
}
.title {
  font-weight: bold;
  font-size: 18px;
}
.doughnut {
  max-height: 250px;
  border-radius: 20px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 2px 3px 3px 0px rgba(0, 0, 0, 0.2);
  overflow-y: scroll;
}
</style>
