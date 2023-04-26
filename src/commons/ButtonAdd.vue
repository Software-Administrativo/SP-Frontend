<template>
  <q-btn
    class="fix-margin q-mt-md q-px-sm"
    :label="props.label"
    icon="add"
    @click="handleClick"
  />
</template>
<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
});

const emits = defineEmits({
  onClick: null,
});

const handleClick = (event) => {
  emits("onClick", event);
};
</script>
<style scoped>
.fix-margin {
  margin-left: 3px;
}
</style>
