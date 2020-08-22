// 引入axios
import axios from "axios";
// 下载 npm install --save nprogress
// 引入NProgress 进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store"; // 为了使用userTempId

// 二次封装axios
// 1.配置基础路径和超时限制
const instance = axios.create({
  baseURL: "/api",
  timeout: 20000, // 超时时间
});

// 请求拦截器
instance.interceptors.request.use((config) => {
  // 在发送请求之前，做一些事
  //把用户的临时身份标识添加到每次请求的请求头当中
  let userTempId = store.state.user.userTempId;
  config.headers.userTempId = userTempId;
  /* 
  userTempId
    - 未登录状态下的用户身份识别标识(主要用来未登录时，添加购物车)
  token
    - 登录状态下的用户身份识别标识    
  */
  //用户登录后，后台会返回一个token，把用户的token添加到每次请求的请求头当中
  let token = store.state.user.userInfo.token;
  if (token) {
    config.headers.token = token;
  }
  // 进度条开始
  NProgress.start();
  return config;
});

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 进度条结束
    NProgress.done();
    // 当响应成功时，接收请求之前会触发
    //返回的响应不再需要从data属性当中拿数据，而是响应就是我们要的数据
    return response.data;
  },
  (error) => {
    // 进度条结束
    NProgress.done();
    // 错误
    alert("发送请求失败:" + error.message || "未知错误");
    // 如果你需要继续处理就返回一个失败状态的promise
    // return Promise.reject(new Error('请求失败'));

    // 如果不需要继续处理，就返回一个peddling状态promise，结束链式调用
    return new Promise(() => {});
  }
);
// 暴露
export default instance;
