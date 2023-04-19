<template>
  <q-layout>
    <Header v-if="routeName != 'sign-in'"></Header>
    <div class="row">
      <Sidebar class="col-2" v-if="menu.menuIsOpen == true"></Sidebar>
      <q-page-container>
        <router-view
          v-bind:style="routerStyle"
          class="router-view"
        ></router-view>
      </q-page-container>
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

const routerStyle = computed(() => {
  if (menu.menuIsOpen == true) {
    return "width: 83vw; height: calc(100vh); overflow: hidden;";
  } else {
    return "width: 100vw; height: calc(100vh); overflow: hidden;";
  }
});
</script>
