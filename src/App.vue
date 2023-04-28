<template>
  <Layout></Layout>
</template>

<script setup>
import Layout from "./views/LayoutView.vue";
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Akshar&display=swap");
@import "./assets/global/icomoon/style.css";

* {
  font-family: "Akshar", sans-serif;
}

:root {
  --color-blue: #2766a9;
  --color-gray: #e9eaec;
  --font-medium: 16px;
  --font-large: 23px;
  --font-subtitle: 20px;
  --font-title: 28px;
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
