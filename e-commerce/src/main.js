import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import 'bootstrap-icons/font/bootstrap-icons.css'
import "./index.css";

createApp(App).use(router).mount("#app");
