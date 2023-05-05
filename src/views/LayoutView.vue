<template>
  <q-layout class="container-view">
    <Header v-if="routeName != 'sign-in'"></Header>
    <div class="row">
      <Sidebar
        class="col-2"
        @onRoute="clickButton($event)"
        :style="sidebar"
        v-if="menu.menuIsOpen == true && routeName != 'sign-in'"
      ></Sidebar>
      <div :style="viewRouter">
        <div :style="viewContainer">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script setup>
import Header from "@/modules/header/Header.vue";
import Sidebar from "@/modules/sidebar/Sidebar.vue";
import { menuState } from "@/stores/menu";
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";

const menu = menuState();

const routeName = computed(() => {
  return useRoute().name;
});

const viewRouter = computed(() => {
  if (menu.menuIsOpen) {
    return "width: calc(100% - 220px); min-width: 300px; overflow: hidden; display: grid; justify-items: center;";
  } else {
    return "width: 100%; min-width: 300px; overflow: hidden; display: grid; justify-items: center;";
  }
});

const viewContainer = computed(() => {
  if (routeName.value == "sign-in") {
    return "width: 100vw; min-width: 300px; overflow: hidden; display: grid; justify-items: center;";
  } else {
    return "width: 90%; max-width: 1500px;";
  }
});

function clickButton() {
  if (window.screen.width < 680) {
    if (menu.menuIsOpen) {
      menu.toggleMenu();
    }
  }
}

const sidebar = computed(() => {
  if (window.screen.width < 680) {
    if (menu.menuIsOpen) {
      return "width: 100%";
    }
  }
});
</script>

<style scoped>
.container-view {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
