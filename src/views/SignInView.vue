<template>
  <section class="row background-sugar">
    <div class="col-md-6 col-12 window-height bg-white q-pa-md">
      <div class="row">
        <img class="image-size" src="../assets/sign-in/sign-in-logo.svg" alt="Logo trapiche">
      </div>
      <div class="form-container column justify-center items-center">
        <div class="form column">
          <h2 class="q-mb-md">Bienvenido</h2>
          <h5 class="text-grey q-mt-xs q-mb-md">Ingresa a tu cuenta</h5>
          <Form @onForm="validateIfUserExist" />
        </div>
      </div>
    </div>
    <div class="col-md-6 col-0 window-height"></div>
  </section>
</template>

<script setup>
// Imports
import { useRouter } from "vue-router";
import Form from "@/modules/sign-in/Form.vue";

// Data
const router = useRouter();

// Function to receive the data from the form
const validateIfUserExist = ({ typeDocument, documentUser, password }) => {
    console.log(typeDocument.value);
    console.log(documentUser.value);
    console.log(password.value);
    // Here we can call the API to validate if the user exist, but in this case we just redirect to the home view if the user is 1234 and the password is 1234
    // if (documentUser.value === "1234" && password.value === "1234") {
    //   router.push({ name: "home" });
    // }
}
</script>
<style scoped>
.background-sugar {
  background: url(../assets/sign-in/image-background.png);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
}

.image-size {
  width: 40%;
  max-width: 193px;
  height: 100%;
}

.form-container {
  height: calc(100% - 150px);
}

.form {
  width: 60%;
}

@media (max-width: 500px) {
  .form {
    width: 90%;
  }
}
</style>
