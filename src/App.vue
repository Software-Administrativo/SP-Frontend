<template>
  <Layout></Layout>
</template>
<script setup>
<<<<<<< HEAD
import { RouterLink, RouterView } from "vue-router";
import Login from "@/views/SignInView.vue"
</script>

<template>
  <!-- <nav>
    <RouterLink to="/">Home</RouterLink>
    <hr />
    <RouterLink to="/about">About</RouterLink>
  </nav>
  <RouterView />
  <q-btn color="white" text-color="black" label="Standard" /> -->


 
  <Login />


</template>
=======
import Layout from './views/LayoutView.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Akshar&display=swap');
@import "./assets/global/icomoon/style.css";

*{
  font-family: 'Akshar', sans-serif;
}
>>>>>>> c3054ff5d2543c5aebea915a9b3145a564fe83b6

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
