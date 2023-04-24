<template>
  <q-btn
    class="q-px-sm button-save"
    label="Guardar"
    @click="handleClick"
  />
</template>
<script setup>
const emits = defineEmits({
  onClick: null,
});

const handleClick = (event) => {
  emits("onClick", event)
};

</script>
<style scoped>
.button-save {
  background-color: var(--color-blue);
  border-radius: 5px;
  color: white;
  font-size: var(--font-medium);
}

</style>