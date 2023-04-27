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
import { closeSesionUser } from "@/api/logout";
const menu = menuState();
function toggle() {
  menu.toggleMenu();
}
const logoutSession = async() => {
  if (menu.menuIsOpen == true) {
    menu.toggleMenu();
  }
  // PENDIENTE
  // const closeSesion = await closeSesionUser(token);
  // if(closeSesion.msg){
  //   // Modal
  // }
}
</script>

<style scoped>
.header {
  background-color: var(--color-blue);
  width: 100%;
}
</style>
