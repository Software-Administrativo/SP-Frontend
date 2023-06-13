<template>
  <div id="exportFile">
    <div>{{ props.data }}</div>
  </div>
</template>
<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: false,
  },
});
</script>
<style scoped>
#exportFile {
  /* display: none; */
}
</style>
