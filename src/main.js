import Vue from "vue"; // 没有编译模板的能力
// import Vue from "vue/dist/vue.esm.js"; // 如果使用components和template渲染App 就需要使用这个

import App from "./App.vue";
import router from "@/router";
import store from "@/store";

import TypeNav from "@/components/TypeNav";

import "@/mock/mockServer"; // 引入mock，里面的代码会执行一遍

// import "@/api";
// import {reqCategoryList} from '@/api'
// reqCategoryList()
import SliderLoop from "@/components/SliderLoop";

// import Pagination from "@/components/Pagination";

import "swiper/css/swiper.css"; // 轮播图 css css文件不需要使用变量接收，直接引入

import * as API from "@/api"; // 引入api所有，作为一个对象

import { MessageBox, Message, Pagination } from "element-ui";

import VeeValidate from "vee-validate"; // 验证

// 引入并配置loading图片
import VueLazyload from "vue-lazyload";
import loading from "@/assets/images/loading.gif";

Vue.config.performance = false;

// 注册使用，挂载到Vue原型对象上

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert; // // 弹出的框，需要靠这个alert功能
Vue.prototype.$message = Message;
// 注册使用插件
Vue.use(Pagination);

Vue.use(VueLazyload, {
  // 内部自定义了一个指令lazy
  loading, // 指定未加载得到图片之前的loading图片
});

Vue.use(VeeValidate);

// 全局注册组件
Vue.component("TypeNav", TypeNav);
// 轮播图
Vue.component("SliderLoop", SliderLoop);
// 分页导航
// Vue.component("Pagination", Pagination); 自己写的先注释掉 使用element-ui的

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
  beforeCreate() {
    Vue.prototype.$bus = this; // 设置全局事件总线
    // 目的并不是以它作为事件总线，因为它没有办法使用$on和$emit，我们是为了让所有的组件都可以看见它
    Vue.prototype.$API = API;
  },
});
