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
  background-color: white;
  border-radius: 10px;
  padding-top: 6px;
  margin-left: 3px;
  padding-right: 15px;
  font-size: var(--font-large);
}
</style>
