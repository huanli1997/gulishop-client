import Vue from "vue"; // 没有编译模板的能力
// import Vue from "vue/dist/vue.esm.js"; // 如果使用components和template渲染App 就需要使用这个

import App from "./App.vue";
import router from "@/router";
import store from "@/store";

import TypeNav from "@/components/TypeNav";

import "@/mock/mockServer"; // 引入mock，里面的代码会执行一遍

import "@/api";
// import {reqCategoryList} from '@/api'
// reqCategoryList()
import SliderLoop from "@/components/SliderLoop";

Vue.config.performance = false;

// 全局注册组件
Vue.component("TypeNav", TypeNav);
// 轮播图
Vue.component("SliderLoop", SliderLoop);

// 组件：1.定义组件 2.注册 3使用
new Vue({
  el: "#app",
  router, // 注册路由
  render: (h) => h(App), // 1.注册组件 2.使用组件 3.渲染组件
  store,
  // components: {
  //   App,
  // },
  // template: "<App/>",
});
