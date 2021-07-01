import Vue from "vue";
import App from "./App.vue";
import { UserStorePlugin } from "@/store/UserStorePlugin";

Vue.config.productionTip = false;

const APIURL = process.env.VUE_APP_APIURL || "http://localhost:3000";

Vue.use(new UserStorePlugin());

new Vue({
  render: (h) => h(App),
}).$mount("#app");

export { APIURL };
