<template>
  <div class="bg-login col-12 row">
    <div class="col-6 bg-white container">
      <div class="si-logo col-12 row q-mt-md q-ml-md"></div>
      <div class="form">
        <h2 class="q-mb-md">Bienvenido</h2>
        <h5 class="text-grey q-mt-xs q-mb-md">Ingresa a tu cuenta</h5>
        <Form />
      </div>
    </div>
  </div>
</template>

<script setup>
import Form from "@/modules/sign-in/Form.vue";
</script>

<style scoped>
.bg-login {
  background: url(../assets/sign-in/image-background.png);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
}

.si-logo {
  background-image: url(../assets/sign-in/sign-in-logo.png);
  background-repeat: no-repeat;
  background-size: 28%;
  max-width: 600px;
  min-width: 300px;
  height: 20%;
}
.form {
  display: flex;
  flex-direction: column;
  width: 60%;
  max-width: 380px;
  min-width: 300px;
  margin: 0 auto;
}

@media (max-width: 700px){
  .container{
    width: 100vw;
  }
}
</style>
