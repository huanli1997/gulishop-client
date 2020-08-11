import Vue from "vue";
import VueRouter from "vue-router";

import routes from "@/router/routes";

// 注册使用插件
Vue.use(VueRouter);

const router = new VueRouter({
  // mode:"hash" // hash 模式  history 模式
  routes,
});

// 暴露路由器
export default router;
