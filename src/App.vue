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
  --font-small: 12px;
  --font-medium: 14px;
  --font-large: 15px;
  --font-title: 20px;
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
