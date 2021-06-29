import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

const APIURL = process.env.VUE_APP_APIURL || "http://localhost:3000";


new Vue({
  render: (h) => h(App),
}).$mount("#app");

export { APIURL };
