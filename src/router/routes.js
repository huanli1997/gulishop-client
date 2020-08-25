// 引入路由
// import Home from "@/pages/Home";
// import Login from "@/pages/Login";
// import Register from "@/pages/Register";
// import Search from "@/pages/Search";
// import Detail from "@/pages/Detail";
// import AddCartSuccess from "@/pages/AddCartSuccess";
// import ShopCart from "@/pages/ShopCart";
// import Trade from "@/pages/Trade";
// import Pay from "@/pages/Pay";
// import PaySuccess from "@/pages/PaySuccess";
// import Center from "@/pages/Center";
// import MyOrder from "@/pages/Center/MyOrder";
// import GroupOrder from "@/pages/Center/GroupOrder";

// 路由的懒加载
const Home = () => import("@/pages/Home");
const Login = () => import("@/pages/Login");
const Register = () => import("@/pages/Register");
const Search = () => import("@/pages/Search");
const Detail = () => import("@/pages/Detail");
const AddCartSuccess = () => import("@/pages/AddCartSuccess");
const ShopCart = () => import("@/pages/ShopCart");
const Trade = () => import("@/pages/Trade");
const Pay = () => import("@/pages/Pay");
const PaySuccess = () => import("@/pages/PaySuccess");
const Center = () => import("@/pages/Center");
const MyOrder = () => import("@/pages/Center/MyOrder");
const GroupOrder = () => import("@/pages/Center/GroupOrder");

import store from "@/store";

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
    // 独享守卫
    // 只有没登录才能看到登录的界面
    beforeEnter: (to, from, next) => {
      if (!store.state.user.userInfo.name) {
        next();
      } else {
        next(false);
      }
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

  {
    path: "/detail/:skuId", // 详情页面 : 后面 params 参数   :skuId? ?表示可以传可以不传
    component: Detail,
  },
  // 只有携带了skuNum和sessionStorage内部有skuInfo数据  才能看到添加购物车成功的界面
  {
    path: "/addCartSuccess", // 添加购物车-成功
    component: AddCartSuccess,
    beforeEnter: (to, from, next) => {
      let skuInfo = sessionStorage.getItem("SKUINFO_KEY");
      // to 要前往的地址
      if (to.query.skuNum && skuInfo) {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/shopcart", // 添加购物车列表
    component: ShopCart,
  },

  // 只有从购物车界面才能跳转到交易页面（创建订单）
  {
    path: "/trade", // 订单
    component: Trade,
    beforeEnter: (to, from, next) => {
      if (from.path === "/shopcart") {
        next();
      } else {
        next(false);
      }
    },
  },
  // 只有从交易页面（创建订单）页面才能跳转到支付页面
  {
    path: "/pay", // 支付页面
    component: Pay,
    beforeEnter: (to, from, next) => {
      if (from.path === "/trade") {
        next();
      } else {
        next(false);
      }
    },
  },

  // 只有从支付页面才能跳转到支付成功页面
  {
    path: "/paysuccess", // 支付成功
    component: PaySuccess,
    beforeEnter: (to, from, next) => {
      if (from.path === "/pay") {
        next();
      } else {
        next(false);
      }
    },
  },

  {
    path: "/center", // 用户中心
    component: Center,
    children: [
      {
        path: "myorder", // 我的订单
        component: MyOrder,
      },
      {
        path: "grouporder", // 团购订单
        component: GroupOrder,
      },
      {
        path: "",
        redirect: "myorder",
      },
    ],
  },

  // 重定向
  {
    path: "/",
    redirect: "/home",
  },
];
