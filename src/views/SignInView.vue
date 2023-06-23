<template>
  <section class="row background-sugar">
    <div class="col-md-6 col-12 window-height bg-white q-pa-md">
      <div class="row">
        <img
          class="image-size"
          src="../assets/sign-in/sign-in-logo.svg"
          alt="Logo trapiche"
        />
      </div>
      <div class="form-container column justify-center items-center">
        <div class="form column">
          <h2 class="q-mb-md">Bienvenido</h2>
          <h5 class="text-grey q-mt-xs q-mb-md">Ingresa a tu cuenta</h5>
          <Form @onForm="validateIfUserExist" :error="isValidate" />
          <div class="spinner" v-if="isLoading">
            <q-spinner-ios color="primary" size="2.5em" />
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-0 window-height"></div>
  </section>
</template>

<script setup>
// Imports
import { validateUser } from "@/api/sign-in";
import { RESPONSES } from "@/helpers";
import Form from "@/modules/sign-in/Form.vue";
import { useStorage } from "@/stores/localStorage.js";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

// Data
const router = useRouter();
const storage = useStorage();
const isLoading = ref(false);
let isValidate = ref(false);

// Function to receive the data from the form
const validateIfUserExist = async (data) => {
  isValidate.value = false;
  isLoading.value = true;
  const validateDataUser = await validateUser(data);
  if (validateDataUser == RESPONSES.WRONG) {
    isLoading.value = false;
    isValidate.value = true;
  } else {
    isLoading.value = false;
    storage.addStorage(validateDataUser.token);
    const exitFarm = storage.decodeJwt();
    if (exitFarm.farms.length == 0) {
      router.push({ name: "configuration" });
    } else {
      router.push({ name: "home" });
    }
  }
};

onMounted(() => {
  storage.deleteStorage;
});
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
.spinner {
  margin: 0 auto;
  margin-top: 25px;
}

@media (max-width: 500px) {
  .form {
    width: 90%;
  }
}
</style>
