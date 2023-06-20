<template>
  <section class="row background-sugar">
    <div class="col-md-6 col-12 window-height bg-white q-pa-md">
      <div class="row">
        <img
          class="image-size"
          src="../../assets/sign-in/sign-in-logo.svg"
          alt="Logo trapiche"
        />
      </div>
      <div class="form-container column justify-center items-center">
        <div class="form column">
          <h3 class="q-mb-md">Recupera tu contraseña</h3>
          <h5 class="text-grey q-mt-xs q-mb-md">Ingresa tu nueva contraseña</h5>
          <span>Contraseña <label class="text-red">*</label></span>
          <q-input
            dense
            filled
            :type="isPassword ? 'password' : 'text'"
            error-message="Las contraseñas no coinciden"
            :error="!isValid"
            v-model="password"
            @keyup="validatePasswords"
          >
            <template v-slot:append>
              <q-icon
                :name="isPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPassword = !isPassword"
              />
            </template>
          </q-input>
          <span>Confirmar contraseña <label class="text-red">*</label></span>
          <q-input
            dense
            filled
            :type="isPassword ? 'password' : 'text'"
            error-message="Las contraseñas no coinciden"
            :error="!isValid"
            v-model="confirmPassword"
            @keyup="validatePasswords"
          >
            <template v-slot:append>
              <q-icon
                :name="isPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPassword = !isPassword"
              />
            </template>
          </q-input>
          <template v-if="isInactive">
            <q-btn disable class="btn-login text-white full-width q-mt-none"
              >Enviar</q-btn
            >
          </template>
          <template v-else>
            <q-btn
              @click="postDataPassword"
              class="btn-login text-white full-width q-mt-none"
              >Enviar</q-btn
            >
          </template>
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
import { postChangePassword } from "@/api/system";
import { ref, computed, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { RESPONSES } from "@/helpers";

const props = defineProps({
  error: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const isPassword = ref(true);

const $q = useQuasar();
const $router = useRouter();
const password = ref("");
const confirmPassword = ref("");
let token = null;

const isValid = ref(true);

const validatePasswords = () => {
  if (password.value != confirmPassword.value) isValid.value = false;
  else isValid.value = true;
};

const isInactive = computed(() => {
  return (
    password.value === "" ||
    confirmPassword.value === "" ||
    password.value != confirmPassword.value
  );
});

onBeforeMount(() => {
  //validar si en la ruta viene un id
  token = $router.currentRoute.value.params.token;
  if (token == null || token == "") {
    $router.replace("/");
  }
});

const isLoading = ref(false);

const showNotification = (type, message) => {
  $q.notify({
    type: type,
    message: message,
    position: "top",
  });
};

async function postDataPassword() {
  isLoading.value = true;
  try {
    const data = await postChangePassword({
      token,
      password: password.value,
    });
    isLoading.value = false;

    let response = data?.response?.data?.errors[0]?.msg;

    if (response == RESPONSES.TOKENINVALID) {
      showNotification(
        "negative",
        "Este enlace ya vencio, el tiempo de duración es de 10 minutos"
      );
      setTimeout(() => {
        $router.push({ name: "sign-in" });
      }, 2000);
    } else if (response == RESPONSES.LENGTHPASSWORD) {
      showNotification(
        "negative",
        "La contraseña debe tener de 6 a 20 carácteres"
      );
    } else if (response == RESPONSES.RULESPASSWORD) {
      showNotification(
        "negative",
        "La contraseña debe tener una letra mayúscula, una letra minúscula y un número"
      );
    } else {
      showNotification("positive", "Contraseña cambiada con exito");
      setTimeout(() => {
        $router.push({ name: "sign-in" });
      }, 2000);
    }
  } catch {
    isLoading.value = false;
    showNotification(
      "negative",
      "Ocurrió un error, por favor verifique los datos"
    );
  }
}
</script>
<style scoped>
.background-sugar {
  background: url(../../assets/sign-in/image-background.png);
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
.btn-login {
  background-color: #0068a5;
}
.spinner {
  margin: 0 auto;
  margin-top: 25px;
}
.invalidateData {
  background-color: rgba(255, 0, 0, 0.288);
  border-radius: 5px;
  padding: 5px 15px;
}

@media (max-width: 500px) {
  .form {
    width: 90%;
  }
}
</style>
