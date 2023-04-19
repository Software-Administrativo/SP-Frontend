// Importar las librerías de Vue, Vue Router y Quasar
import { createApp } from "vue";
import { Quasar } from "quasar";
import { createPinia } from "pinia";

// Import Quasar css
import 'quasar/dist/quasar.css'

// Importar el componente principal de la aplicación
import App from "./App.vue";
import router from "./routes";

// Pinia para manejar el estado de la aplicación
const pinia = createPinia();

// Crear la instancia de Vue y pasarle el router y quasar
const myApp = createApp(App)
  .use(Quasar, { plugins: {} })
  .use(router)
  .use(pinia);

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount("#app");
