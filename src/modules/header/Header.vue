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
        @click="logoutSession()"
      />
    </q-toolbar>
  </div>
</template>

<script setup>
import { menuState } from "@/stores/menu";
import { useStorage } from "@/stores/localStorage"

const storage = useStorage();

const menu = menuState();
function toggle() {
  menu.toggleMenu();
}

const logoutSession = () => {
  if (menu.menuIsOpen == true) {
    menu.toggleMenu();
  }
  storage.deleteStorage();
}
</script>

<style scoped>
.header {
  background-color: var(--color-blue);
  width: 100%;
}
</style>
