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
import { RouterView } from "vue-router";
import { menuState } from "@/stores/menu";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import Sidebar from "@/modules/sidebar/Sidebar.vue";
import Header from "@/modules/header/Header.vue";

const menu = menuState();
const showRouter = ref();

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

const viewContainer = computed(() => {
  if (routeName.value == "sign-in") {
    return "width: 100vw; min-width: 300px; overflow: hidden; display: grid; justify-items: center;";
  } else {
    return "width: 90%; max-width: 1500px;";
  }
});

function clickButton(event){
  menu.toggleMenu();
}

const sidebar = computed(() => {
  if (window.screen.width < 680) {
    if (menu.menuIsOpen) {
      showRouter.value = false;
      return "width: 100%";
    }
  }
});
</script>

<style scoped>
.container-view {
  width: 100vw;
  height: 100vh;
  overflow:hidden;
}
</style>
