// 这个文件是所有接口请求函数的文件
// 每一个请求接口数据功能都给它定义成一个函数，以后哪里需要去请求数据，就调用对应的这个接口请求函数就好了
import Ajax from "@/ajax/Ajax"; // 暴露出来二次封装的instance

// 首页三级分类
export const reqCategoryList = () => {
  return Ajax({
    url: "/product/getBaseCategoryList",
    method: "get",
  });
};

// reqCategoryList(); 测试进度条
