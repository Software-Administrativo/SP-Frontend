<template>
  <div class="header">
    <q-toolbar>
      <q-btn
        flat
        round
        dense
        icon="menu"
        class="text-white"
        @click="toggle()"
      />
      <q-space></q-space>
      <q-btn
        flat
        round
        dense
        icon="logout"
        class="text-white"
        to="./"
        @click="sidebarHide()"
      />
    </q-toolbar>
  </div>
</template>

<script setup>
import { menuState } from "@/stores/menu";
const menu = menuState();
function toggle() {
  menu.toggleMenu();
}
function sidebarHide() {
  if (menu.menuIsOpen == true) {
    menu.toggleMenu();
  }
}
</script>

<style scoped>
.header {
  background-color: var(--color-blue);
  width: 100%;
}
</style>
