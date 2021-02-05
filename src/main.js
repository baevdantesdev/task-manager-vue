import Vue from "vue";
import App from "./app.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import { AxiosConfig } from "@/axios.config";
import "bootstrap-4-grid";

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Object.assign(Vue.axios.defaults, AxiosConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
