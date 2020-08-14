// 二次封装axios
import axios from "axios";
// 进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const instance = axios.create({
  baseURL: "/api", // 基础路径
  timeout: 20000, // 响应超时时间
});

// 请求拦截器
instance.interceptors.request.use((config) => {
  // 进度条开始
  NProgress.start();
  return config;
});

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 进度条结束
    NProgress.done();
    // 直接返回响应数据
    return response.data;
  },
  (error) => {
    NProgress.done();
    // 统一处理错误
    alert("请求错误：" + error.message || "未知错误");
    return new Promise(() => {});
  }
);

export default instance;
