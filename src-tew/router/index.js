import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

// 使用插件
Vue.use(VueRouter);

/* 
  描述: 编程式路由跳转到当前路由(参数不变), 会抛出NavigationDuplicated的警告错误
	      声明式路由跳转内部已经处理
	原因：vue-router3.1.0之后, 引入了promise的语法
	     如果没有通过参数指定成功或者失败回调函数就返回一个promise来指定成功/失败的回调
	     且内部会判断如果要跳转的路径和参数都没有变化, 会抛出一个失败的promise
*/
// 解决多次触发编程式导航  报错的问题
// 重写push和replace方法
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location, onResolve, onReject) {
  if (onResolve === undefined && onReject === undefined) {
    // 如果onResolve和onReject为undefined，说明没有出来
    return originPush.call(this, location).catch(() => {});
  } else {
    return originPush.call(this, location, onResolve, onReject);
  }
};

VueRouter.prototype.replace = function(location, onResolve, onReject) {
  if (onResolve === undefined && onReject === undefined) {
    // 如果onResolve和onReject为undefined，说明没有出来
    return originReplace.call(this, location).catch(() => {});
  } else {
    return originReplace.call(this, location, onResolve, onReject);
  }
};

const router = new VueRouter({
  routes,
});

export default router;
