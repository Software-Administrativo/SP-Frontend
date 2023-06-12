<template>
  <div class="container">
    <span class="title">Pedidos Mensuales</span>
    <Bar class="bar" id="bar" :data="dataBar" :options="optionsBar" />
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
import { Bar } from "vue-chartjs";
import { onMounted, computed, ref } from "vue";
import { postAllordersyear } from "@/api/reports";
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

const dataBar = ref({
  labels: [],
  datasets: [
    {
      backgroundColor: [],
      data: [],
    },
  ],
});

const optionsBar = {
  maintainAspectRatio: false,
};

const getDataBar = async () => {
  const { data } = await postAllordersyear(idFarm.value);
  dataBar.value = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        label: "Pedidos",
        backgroundColor: [
          "#B9E7FF",
          "#315d96",
          "#48A5F3",
          "#C6C6D1",
          "#2766a9",
          "#B9E7FF",
          "#315d96",
          "#48A5F3",
          "#C6C6D1",
          "#2766a9",
          "#B9E7FF",
        ],
        data: [
          data.allorders[0].totalOrdersPay,
          data.allorders[1].totalOrdersPay,
          data.allorders[2].totalOrdersPay,
          data.allorders[3].totalOrdersPay,
          data.allorders[4].totalOrdersPay,
          data.allorders[5].totalOrdersPay,
          data.allorders[6].totalOrdersPay,
          data.allorders[7].totalOrdersPay,
          data.allorders[8].totalOrdersPay,
          data.allorders[9].totalOrdersPay,
          data.allorders[10].totalOrdersPay,
          data.allorders[11].totalOrdersPay,
        ],
      },
    ],
  };
};

const idFarm = computed(() => {
  return storage.idSelected;
});

onMounted(async () => {
  getDataBar();
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
.bar {
  max-height: 250px;
  border-radius: 20px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 2px 3px 3px 0px rgba(0, 0, 0, 0.2);
  overflow-y: scroll;
}
</style>
