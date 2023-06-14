<template>
  <div class="q-pa-md">
    <h6 class="title q-my-lg">REPORTES</h6>

    <q-separator class="separator" />

    <div class="row container-content q-pt-lg">
      <div class="column col-5 container-report">
        <div class="section-reports">
          <span class="title-section">Informes</span>
          <Select
            type="reports"
            label="Tipo de Informe"
            class="q-mb-lg"
            :v-model="typeReport"
            @onSelect="getTypeReport"
          />
          <Select
            v-if="typeReport == 'Reporte Anual'"
            type="years"
            label="Año"
            :required="true"
            :ruless="rules"
            class="q-mb-lg"
            :v-model="yearReport"
            @onSelect="getYearReport"
          />

          <div v-if="typeReport == 'Consolidado Mensual'">
            <span>Desde</span>
            <q-input
              filled
              dense
              v-model="dateOne"
              mask="date"
              :rules="['date']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="dateOne">
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
            <span>Hasta</span>
            <q-input
              filled
              dense
              v-model="dateTwo"
              mask="date"
              :disable="disabledDate"
              :rules="['date']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="dateTwo">
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

          <q-btn
            class="q-py-sm"
            :disable="disabled"
            label="Generar Informe"
            icon="report"
            @click="generateFile"
          />
        </div>
        <div class="q-py-md section-farm">
          <span class="title-section">Información de la Finca</span>
          <div class="q-pt-sm">
            <span class="subtitle">Nombre:</span>
            <span>{{ nameFarm }}</span>
          </div>
          <div>
            <span class="subtitle">Dirección:</span>
            <span>{{ addressFarm }}</span>
          </div>
          <div>
            <span class="subtitle">Propietario:</span>
            <span>{{ ownerFarm }}</span>
          </div>
        </div>
      </div>
      <div class="col-7">
        <div class="back">
          <Doughnut />
          <Bar />
        </div>
      </div>
    </div>
  </div>
  <TablePdf :data="dataTable" :type="typeReport" />
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import TablePdf from "@/pages/reports/TablePdf.vue";
import Select from "@/commons/forms/Select.vue";
import Doughnut from "@/pages/reports/Doughnut.vue";
import Bar from "@/pages/reports/Bar.vue";
import { useQuasar } from "quasar";
import { getFarmId } from "@/api/maintenance/farm";
import { getAllInventory, getAnualReport, getMonthReport } from "@/api/reports";
import { useStorage } from "@/stores/localStorage.js";
import html2pdf from "html2pdf.js";
import { RESPONSES } from "@/helpers";

let typeReport = ref("");
let yearReport = ref("");
let dateOne = ref("");
let dateTwo = ref("");

let nameFarm = ref("");
let addressFarm = ref("");
let ownerFarm = ref("");
let dataTable = ref([]);

const test = ref(false);

const $q = useQuasar();
const storage = useStorage();

const rules = [(v) => !!v || "Este campo es requerido"];

const disabled = computed(() => {
  if (!typeReport.value) {
    return true;
  } else if (typeReport.value == "Reporte Anual") {
    if (!yearReport.value) {
      return true;
    } else {
      return false;
    }
  } else if (typeReport.value == "Consolidado Mensual") {
    if (!dateOne.value || !dateTwo.value) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
});

const getTypeReport = (value) => {
  typeReport.value = value;
};

const getYearReport = (value) => {
  yearReport.value = value;
};

const disabledDate = computed(() => {
  if (!dateOne.value) {
    return true;
  } else {
    return false;
  }
});

async function getInfoReport() {
  if (typeReport.value == "Reporte Anual") {
    const { data } = await getAnualReport(yearReport.value, idFarm.value);
    dataTable.value = data;
  } else if (typeReport.value == "Reporte de Inventario") {
    const data = await getAllInventory(idFarm.value);
    dataTable.value = data;
  } else if (typeReport.value == "Consolidado Mensual") {
    let dataStart = dateOne.value.replace(/\//g, "-");
    let dataEnd = dateTwo.value.replace(/\//g, "-");
    const { data, response } = await getMonthReport(
      {
        fstart: dataStart,
        fend: dataEnd,
      },
      idFarm.value
    );
    let responses = response?.data?.errors[0]?.msg;
    if (responses == RESPONSES.DATEERROR) {
      showNotification(
        "negative",
        "La fecha inicial debe ser menor a la fecha final"
      );
      test.value = true;
    } else {
      dataTable.value = [data];
      test.value = false;
    }
  }
}

async function generateFile() {
  await getInfoReport();
  if (test.value == true) {
    return;
  } else {
    const notif = $q.notify({
      type: "ongoing",
      message: "Generando pdf, por favor espere un momento...",
      timeout: 1000,
      position: "top",
    });

    const tableExport = document.getElementById("exportFile");
    const elementoClonado = tableExport.cloneNode(true);
    elementoClonado.style.display = "block";
    const options = {
      margin: 0.5,
      filename: `${typeReport.value}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
    };

    html2pdf().from(elementoClonado).set(options).save();

    notif({
      type: "positive",
      message: "Tu archivo se ha generado correctamente",
      timeout: 1000,
      position: "top",
    });

    elementoClonado.remove();
  }
}

async function getFarmIdData() {
  const { farm } = await getFarmId(idFarm.value);
  nameFarm.value = farm.name;
  addressFarm.value = farm.address;
  ownerFarm.value = farm.owner;
}

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

onMounted(() => {
  getFarmIdData();
});
</script>
<style scoped>
.container-report {
  height: 75vh;
  padding: 0;
  margin: 0;
}
.subtitle {
  font-weight: bold;
  margin-right: 20px;
  font-size: 15px;
}
.back {
  background-color: #ffffff;
  box-shadow: 2px 3px 3px 0px rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 20px;
  margin-left: 20px;
}
.section-farm {
  background-color: #ffffff;
  margin-top: 10px;
  box-shadow: 2px 3px 3px 0px rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 20px;
}
.title-section {
  font-weight: bold;
  font-size: 18px;
}
.section-reports {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 2px 3px 3px 0px rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 20px;
  overflow-y: scroll;
}
.section-reports::-webkit-scrollbar {
  display: none;
}
.container-content {
  margin: 0 auto;
  max-width: 1200px;
}
.icon-backRoute {
  font-size: 30px;
  padding-right: 20px;
}
.title {
  font-size: var(--font-title);
}
.icon-backRoute:hover {
  cursor: pointer;
}
.separator {
  border: 1.8px solid var(--color-gray);
}
</style>
