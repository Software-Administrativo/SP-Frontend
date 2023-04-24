<template>
  <div class="modal-forms bg-white">
    <i class="icon icon-close self-end"/>
      <q-separator class="separator"/>
      <slot />
  </div>
</template>
<script setup>


</script>
<style scoped>
.modal-forms{
  position: absolute;
  top: 50%;
  width: 450px;
  border: 3px solid var(--color-gray) !important;
  border-radius: 12px;
}
.icon {
  font-size: var(--font-title);
  color: var(--color-blue);
  padding: 5px;
  cursor: pointer;
}
.separator {
  border: 1px solid var(--color-gray) !important;
}
</style>