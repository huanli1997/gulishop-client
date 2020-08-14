import Vue from "vue";
import VueRouter from "vue-router";

import routes from "@/router/routes";

// 注册使用插件
Vue.use(VueRouter);

//解决多次触发编程式导航  报错的问题
// 存取原来的push和replace的函数
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;

// 重写push方法
VueRouter.prototype.push = function(location, onResolved, onReject) {
  // 如果没有没有传入resolve和reject，就说明没有处理
  if (onResolved === undefined && onReject === undefined) {
    return originPush.call(this, location).catch(() => {});
  } else {
    //代表调用push的时候，传了处理promise的回调
    return originPush.call(this, location, onResolved, onReject);
  }
};

// 重写replace方法
VueRouter.prototype.replace = function(location, onResolved, onReject) {
  // 如果没有没有传入resolve和reject，就说明没有处理
  if (onResolved === undefined && onReject === undefined) {
    return originReplace.call(this, location).catch(() => {});
  } else {
    //代表调用push的时候，传了处理promise的回调
    return originReplace.call(this, location, onResolved, onReject);
  }
};

const router = new VueRouter({
  // mode:"hash" // hash 模式  history 模式
  routes,
});

// 暴露路由器
export default router;
