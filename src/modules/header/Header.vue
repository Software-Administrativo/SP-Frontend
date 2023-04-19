<template>
  <q-header elevated class="header">
    <q-toolbar>
      <q-btn flat round dense icon="menu" class="q-mr-sm" @click="toggle()" />
      <q-space></q-space>
      <q-btn flat round dense icon="logout" class="q-mr-xs" />
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { menuState } from "@/stores/menu";
const menu = menuState();
function toggle() {
  menu.toggleMenu();
}
</script>

<style scoped>
.header{
  background-color: #2766A9;
}
</style>