<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <hr />
    <RouterLink to="/about">About</RouterLink>
  </nav>
  <RouterView />
  <q-btn color="white" text-color="black" label="Standard" />
</template>

<style scoped>
/* Set border box for all elements, delete padding and margin */
html,
body {
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
}
</style>
