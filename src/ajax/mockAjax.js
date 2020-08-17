// 用来发送mock请求
// 引入axios
import axios from 'axios'
// 下载 npm install --save nprogress
// 引入NProgress 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 二次封装axios
// 1.配置基础路径和超时限制
const instance = axios.create({
  baseURL: "/mock", // 修改基础路径，就不会转发到服务器，就直接往本地发请求
  timeout: 20000, // 超时时间
});

// 请求拦截器
instance.interceptors.request.use((config) => {
  // 进度条开始
  NProgress.start();
  // 在发送请求之前，做一些事
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
