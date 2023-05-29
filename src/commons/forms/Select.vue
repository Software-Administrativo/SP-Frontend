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
import { onMounted, ref, watch, computed } from "vue";
import { useStorage } from "@/stores/localStorage.js";

let stringOptions = [];
let types = ref([]);
let model = ref(props.value);
let namesFarms = ref([]);

const storage = useStorage();
const valueSelect = ref(props.value);
const filterOptions = ref(stringOptions);

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
  }
});

const emits = defineEmits({
  onSelect: null,
});

const idFarm = computed(() => {
  return storage.idSelected;
});

onMounted(async () => {
  if (props.type == "documents") {
    types.value = ["CC", "CE", "NIT", "NIP", "NUIP", "PA"];
  } 
  else if (props.type === "roles") {
    types.value = ["ADMIN"].map((item) => {
      return `${item[0].toUpperCase()}${item.slice(1)}`;
    });
  } else if (props.type === "farms") {
    const isValidateJWT = storage.decodeJwt();
    const farms = isValidateJWT.farms;
    const names = farms.forEach((element) => {
      namesFarms.value.push(element.name);
    });
    types.value = namesFarms.value;
  } else if (props.type === "eps") {
    // const { eps } = await getEps(idFarm.value);
    // FALTA PETICION
    types.value = ["SURA", "SALUD TOTAL"];
  } else if (props.type === "multiFarms") {
    const isValidateJWT = storage.decodeJwt();
    const farms = isValidateJWT.farms;
    const names = farms.forEach((element) => {
      namesFarms.value.push(element.name);
    });
    stringOptions = namesFarms.value;
  }
});

watch(model, () => {
  const idFarm = farms.forEach((element) => {
    if (element.name == model.value) {
      valueSelect.value = element._id;
    }
  });
});

watch(valueSelect, () => {
  emits("onSelect", valueSelect.value);
});

watch(idFarm, () => {
  getDataTypePays();
});
</script>
