<template>
  <div class="container-modal">
    <div class="column modal-forms bg-white">
      <i class="icon icon-close self-end" @click="toggle()"/>
      <q-separator class="separator"/>
      <slot />
    </div>
  </div>
</template>
<script setup>
import { modalState } from "@/stores/modal.js";

const modal = modalState();

function toggle() {
  modal.toggleModal();
}

</script>
<style scoped>
.container-modal{
  position: fixed;
  background-color: #2766a96e;
  inset: 0;
  display: grid;
  place-items: center;
}
.modal-forms {
  width: 80%;
  padding-bottom: 20px;
  max-width: 400px;
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
