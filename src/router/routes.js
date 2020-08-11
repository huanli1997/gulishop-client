// 引入路由
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";

// 专门放置路由的地方
export default [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
    // meta简单来说就是路由元信息 也就是每个路由身上携带的信息。
    meta: {
      isHade: true,
    },
  },
  {
    path: "/register",
    component: Register,
    meta: {
      isHade: true,
    },
  },
  {
    path: "/search/:keyword?", //?代表这个params参数可以传也可以不传
    component: Search,
    name: "search",
    props: true, // 布尔值，只传递params参数
    // props: { name: "赵丽颖" }, // 对象写法，只能传递静态的数据  几乎不用  因为需要额外传递静态数
    // props(route) {
    //   //route 收集好参数的路由对象
    //   //把传递过来的params参数和query参数一起映射为组件的属性（）
    //   return { keyword: route.params.keyword, keyword2: route.query.keyword };
    // },
  },
  // 重定向
  {
    path: "/",
    redirect: "/home",
  },
];