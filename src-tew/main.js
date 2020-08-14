import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import TypeNav from "@/components/TypeNav";
import "@/api";
import store from "@/store";

Vue.config.performance = false;

Vue.component("TypeNav", TypeNav); // 全局注册TypeNav组件

new Vue({
  router,
  render: (h) => h(App),
  store,
}).$mount("#app");
