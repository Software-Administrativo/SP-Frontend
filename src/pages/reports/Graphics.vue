<template>
  <!-- <BarComponent chartId="hola" :chartOptions="userOptions" :chartData="userData" /> -->
  <div class="test">
    <Bar id="test" :data="dataBar" :options="optionsBar" />
    <Doughnut
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
import { Bar, Doughnut } from "vue-chartjs";
// import BarComponent from '../commons/BarComponent.vue';

// Configuración de la gráfica
// const userOptions = {
//   labels: ['January', 'February', 'March'],
//   datasets: [{ data: [40, 20, 12] }]
// }
// const userData = {
//   responsive: true
// }

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

const dataDoughnut = {
  labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
  datasets: [
    {
      backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
      data: [40, 20, 80, 1000],
    },
  ],
};

const optionsDougnut = {
  responsive: true,
  maintainAspectRatio: false,
};

const dataBar = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "Data One",
      backgroundColor: "#f87979",
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
    },
  ],
};

const optionsBar = {
  maintainAspectRatio: false,
};
</script>
<style scoped>
.test {
  width: 200px;
  height: 200px;
}
</style>
