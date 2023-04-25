<template>
  <q-layout class="container-view">
    <Header v-if="routeName != 'sign-in'"></Header>
    <div class="row">
      <Sidebar
        class="col-2" :style="sidebar"
        v-if="menu.menuIsOpen == true && routeName != 'sign-in'"
      ></Sidebar>
      <div :style="viewRouter">
        <div class="view-container">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script setup>
import { RouterView } from "vue-router";
import { menuState } from "@/stores/menu";
import { computed } from "vue";
import { useRoute } from "vue-router";
import Sidebar from "@/modules/sidebar/Sidebar.vue";
import Header from "@/modules/header/Header.vue";

const menu = menuState();

const routeName = computed(() => {
  return useRoute().name;
});

const viewRouter = computed(() => {
  if (menu.menuIsOpen) {
    return "width: calc(100% - 200px); min-width: 300px; overflow: hidden; display: grid; justify-items: center;";
  } else {
    return "width: 100%; min-width: 300px; overflow: hidden; display: grid; justify-items: center;";
  }
});

const sidebar = computed(() => {
  if (menu.menuIsOpen) {
    if(window.screen.width > 680){
      // CAMBIAR
      console.log(window.screen.width);
    }
    return
  } else {

  }
});
</script>

<style scoped>
.container-view {
  width: 100vw;
  height: 100vh;
}
.view-container{
  width: 80%;
  max-width: 1200px;
}
</style>
