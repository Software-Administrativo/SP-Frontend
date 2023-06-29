<template>
  <div :style="props.styles">
    <span for="type"
      >{{ props.label
      }}<span class="text-red">{{ props.required ? "*" : "" }}</span></span
    >
    <q-select
      v-if="props.type != 'multiFarms'"
      class="q-pa-none"
      dense
      filled
      name="type"
      v-model="valueSelect"
      :options="types"
      :rules="defaultRules"
    />
    <q-select
      v-else
      filled
      dense
      label="Seleccione multiples fincas"
      v-model="model"
      use-input
      use-chips
      multiple
      input-debounce="0"
      @new-value="createValue"
      :options="filterOptions"
      @filter="filterFn"
    />
  </div>
</template>
<script setup>
import { getBrands } from "@/api/inventory/brands";
import { getCategories } from "@/api/inventory/categories";
import { getClients } from "@/api/maintenance/clientss";
import { getEps } from "@/api/maintenance/eps";
import { getLots } from "@/api/maintenance/lots";
import { getTypeLabors } from "@/api/maintenance/type-labors";
import { getTypeSpents } from "@/api/maintenance/type-spents";
import { getTransformationModels } from "@/api/transformation/modelss";
import { useStorage } from "@/stores/localStorage.js";
import { computed, onMounted, ref, watch } from "vue";

let stringOptions = [];
let types = ref([]);
let model = ref();
let namesFarms = ref([]);

const valueSelect = ref(props.value);
const storage = useStorage();
const filterOptions = ref(stringOptions);

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  styles: {
    type: Object,
    required: false,
  },
  required: {
    type: Boolean,
    required: false,
    default: false,
  },
  ruless: {
    type: Array,
    required: false,
    default: () => [],
  },
  value: {
    required: false,
    default: "",
  },
  message: {
    type: String,
    required: false,
    default: "Tipo requerido",
  },
});

const emits = defineEmits({
  onSelect: null,
});

const idFarm = computed(() => {
  return storage.idSelected;
});

const createValue = (val, done) => {
  if (val.length > 0) {
    valueSelect;
    const modelValue = (model.value || []).slice();

    val
      .split(/[,;|]+/)
      .map((v) => v.trim())
      .filter((v) => v.length > 0)
      .forEach((v) => {
        if (stringOptions.includes(v) === false) {
          stringOptions.push(v);
        }
        if (modelValue.includes(v) === false) {
          modelValue.push(v);
        }
      });

    done(null);
    model.value = modelValue;
  }
};

const filterFn = (val, update) => {
  update(() => {
    if (val === "") {
      filterOptions.value = stringOptions;
    } else {
      const needle = val.toLowerCase();
      filterOptions.value = stringOptions.filter(
        (v) => v.toLowerCase().indexOf(needle) > -1
      );
    }
  });
};

const defaultRules = computed(() => {
  if (props.ruless) {
    return props.ruless;
  } else {
    return [(val) => !!val || props.message];
  }
});

onMounted(async () => {
  if (props.type == "documents") {
    types.value = ["CC", "CE", "NIT", "NIP", "NUIP", "PA"];
  } else if (props.type === "roles") {
    types.value = ["ADMIN"].map((item) => {
      return `${item[0].toUpperCase()}${item.slice(1)}`;
    });
  } else if (props.type === "farms") {
    const isValidateJWT = storage.decodeJwt();
    const farms = isValidateJWT.farms;
    farms.forEach((element) => {
      namesFarms.value.push(element.name);
    });
    types.value = namesFarms.value;
  } else if (props.type === "eps") {
    const { eps } = await getEps(idFarm.value);
    types.value = eps.map((item) => {
      return item.name;
    });
  } else if (props.type === "multiFarms") {
    const isValidateJWT = storage.decodeJwt();
    const farms = isValidateJWT.farms;
    if (!props.value || props.value.length != undefined) {
      let idFarms = props.value;
      let farmsSelected = [];
      farms.forEach((element) => {
        if (idFarms.includes(element._id)) {
          farmsSelected.push(element.name);
        }
      });

      model.value = farmsSelected;
    }
    farms.forEach((element) => {
      namesFarms.value.push(element.name);
    });
    stringOptions = namesFarms.value;
  } else if (props.type === "lots") {
    const { lots } = await getLots(idFarm.value);
    types.value = lots.map((item) => {
      return item.name;
    });
  } else if (props.type === "person") {
    types.value = ["TRABAJADOR", "ADMINISTRADOR"];
  } else if (props.type === "typeLot") {
    types.value = ["PADRE", "HIJO", "PADRE-HIJO"];
  } else if (props.type === "fatherLot") {
    const { lots } = await getLots(idFarm.value);
    const fatherLots = [];
    lots.forEach((item) => {
      if (item.classlote === "PADRE") {
        fatherLots.push(item.name);
      }
    });
    types.value = fatherLots;
  } else if (props.type === "lotState") {
    const statesLot = [
      "DISPONIBLE",
      "POR SEMBRAR",
      "EN SIEMBRA",
      "POR RECOLECTAR",
      "POR FERTILIZAR",
    ];
    types.value = statesLot;
  } else if (props.type === "soildState") {
    const soilLot = ["FERTIL", "INFERTIL"];
    types.value = soilLot;
  } else if (props.type === "category") {
    const { category } = await getCategories(idFarm.value);
    types.value = category.map((item) => {
      return item.name;
    });
  } else if (props.type === "mark") {
    const { mark } = await getBrands(idFarm.value);
    types.value = mark.map((item) => {
      return item.name;
    });
  } else if (props.type === "models") {
    const { models } = await getTransformationModels(idFarm.value);
    types.value = models.map((item) => {
      if (item.status != 1) {
        return item.name;
      }
    });
  } else if (props.type === "state") {
    types.value = ["PENDIENTE", "ENTREGADO"];
  } else if (props.type === "client") {
    const { client } = await getClients(idFarm.value);
    types.value = client.map((item) => {
      return item.name;
    });
  } else if (props.type === "reports") {
    types.value = [
      "Reporte Anual",
      "Reporte de Inventario",
      "Consolidado Mensual",
    ];
  } else if (props.type === "years") {
    let year = 2023;
    let years = [];

    let i = 2023;
    while (i <= year) {
      years.push(i);
      i++;
    }
    types.value = years;
  } else if (props.type === "work") {
    const { works } = await getTypeLabors(idFarm.value);
    types.value = works.map((item) => {
      return item.name;
    });
  } else if (props.type === "spent") {
    const { spents } = await getTypeSpents(idFarm.value);
    types.value = spents.map((item) => {
      return item.name;
    });
  }
});

watch(model, () => {
  const isValidateJWT = storage.decodeJwt();
  const farms = isValidateJWT.farms;
  const farmsSelected = [];
  model.value.forEach((element) => {
    farms.forEach((farm) => {
      if (element === farm.name) {
        farmsSelected.push(farm);
      }
    });
  });
  valueSelect.value = farmsSelected;
});

watch(valueSelect, async () => {
  emits("onSelect", valueSelect.value);
});

watch(idFarm, () => {
  getDataTypePays();
});
</script>
