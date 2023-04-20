<template>
  <SignIn></SignIn>
</template>

<script setup>
import Layout from './views/LayoutView.vue'
import SignIn from './views/SignInView.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Akshar&display=swap');
@import "./assets/global/icomoon/style.css";

* {
  font-family: 'Akshar', sans-serif;
}

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
