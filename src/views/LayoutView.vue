<template>
  <q-layout>
    <Header v-if="routeName != 'sign-in'"></Header>
    <div class="row view-router">
      <Sidebar
        class="col-2 view-sidebar"
        v-if="menu.menuIsOpen == true"
      ></Sidebar>
      <div class="router-style">
        <router-view></router-view>
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
</script>

<style scoped>
.view-router {
  position: relative;
}
.view-sidebar {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
.router-style {
  width: 100vw;
  max-width: 1000px;
  min-width: 300px;
  height: calc(100vh - 50px);
  overflow: hidden;
  margin-left: calc(25% - 80px);
  margin-right: calc(25% - 80px);
  margin-top: 50px;
}
</style>
