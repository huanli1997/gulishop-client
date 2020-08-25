import Vue from "vue";
import VueRouter from "vue-router";

import routes from "@/router/routes";
import store from "@/store";

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
  // 控制跳转过去之后滚动的位置在什么地方
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  /* 
    to  代表目标（准备去到的组件） 路由对象
    from  代表起始（从哪个组件） 路由对象
    next : 放行还是不放行  是个函数  
    next()  放行
    next(false) 不放行 停在当前位置
    next('/') 代表跳到指定的路径对应的组件
   */
  // 必须登录后才能访问的多个界面使用全局守卫（交易相关、支付相关、用户中心相关） 自动跳转前面想而没到的页面
  // 订单交易页面trade   //支付相关  pay paysuccess   //用户中心center  center/myorder center/grouporder
  let targetPath = to.path;
  let result =
    targetPath.startsWith("/trade") ||
    targetPath.startsWith("/pay") ||
    targetPath.startsWith("/paysuccess") ||
    targetPath.startsWith("/center") ||
    targetPath.startsWith("/center/myorder") ||
    targetPath.startsWith("/center/grouporder");
  if (result) {
    // 说明是使用（交易相关、支付相关、用户中心相关）页面访问
    // 判断是否登录
    if (store.state.user.userInfo.name) {
      // 登录了
      next();
    } else {
      // 未登录,跳至登录页面，同时给地址做一个标记，标记它是被路由守卫拦截过的
      // 登录之后，跳转到它之前想去的地方
      next("/login?redirect=" + targetPath);
    }
  } else {
    next();
  }
});

// 暴露路由器
export default router;
