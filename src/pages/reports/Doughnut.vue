<template>
  <div class="container">
    <span class="title">Balances del Mes</span>
    <Doughnut
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
  const data = await getDoughnut(idFarm.value);
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
};

const optionsDougnut = {
  responsive: true,
  maintainAspectRatio: false,
};

const idFarm = computed(() => {
  return storage.idSelected;
});

onMounted(async () => {
  getDataDoughnut();
});
</script>
<style scoped>
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
