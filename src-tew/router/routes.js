// 引入路由
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";

export default [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
    meta: {
      isHide: true,
    },
  },
  {
    path: "/register",
    component: Register,
    meta: {
      isHide: true,
    },
  },
  {
    path: "/search/:keyword?", // ?代表这个参数可以传可不传
    component: Search,
    name: "search",
    // props: true, // 布尔值，只能传送params参数
    // props: { name: "zly" }, // // 对象写法，只能传递静态的数据  几乎不用  因为需要额外传递静态数
    props(route) {
      //route 收集好参数的路由对象
      return {
        keyword: route.params.keyword,
        keyword2: route.query.keyword,
      };
    },
  },
  {
    path: "/",
    redirect: "/home",
  },
];
