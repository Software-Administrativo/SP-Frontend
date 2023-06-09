<template>
  <div class="q-pa-md">
    <h6 class="title q-my-lg">REPORTES</h6>

    <q-separator class="separator" />

    <div class="row container-content">
      <div class="col-5 section-reports">
        <Select
          type="reports"
          label="Informe"
          class="q-mb-lg"
          :v-model="typeReport"
          @onSelect="getTypeReport"
        />
        <Select
          v-if="typeReport == 'Reporte Anual'"
          type="years"
          label="Años"
          class="q-mb-lg"
          :v-model="typeReport"
          @onSelect="getTypeReport"
        />

        <q-btn
          :disable="disabled"
          label="Generar Informe"
          icon="report"
          @click="generateFile"
        />
        <div></div>
      </div>
      <div class="col-6"></div>
    </div>
  </div>
  <TablePdf hidden id="exportFile"></TablePdf>
</template>
<script setup>
import { ref, computed } from "vue";
import TablePdf from "@/pages/reports/TablePdf.vue";
import Select from "@/commons/forms/Select.vue";
import { useQuasar } from "quasar";

let typeReport = ref("");

const $q = useQuasar();

const disabled = computed(() => {
  if (!typeReport.value) {
    return true;
  } else {
    return false;
  }
});

const getTypeReport = (value) => {
  typeReport.value = value;
};

// Generar pdf
async function generateFile() {
  const notif = $q.notify({
    type: "ongoing",
    message: "Generando pdf...",
    position: "top",
  });

  const tableExport = document.getElementById("exportFile");
  const options = {
    margin: 0.5,
    filename: "talonario.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 3 },
    jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
  };

  await html2pdf().from(tableExport).set(options).save();

  notif({
    type: "positive",
    message: "Tu archivo se ha generado correctamente",
    timeout: 1000,
    position: "top",
  });
}
</script>
<style scoped>
.section-reports {
  height: 90vh;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}
.container-content {
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
