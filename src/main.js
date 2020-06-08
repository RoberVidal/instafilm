import Vue from "vue";
import App from "./App";
Vue.config.productionTip = false;
import router from "./router";
import VueFire from "vuefire";

// Firebase
import { firestorePlugin } from "vuefire";

Vue.use(firestorePlugin);
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
