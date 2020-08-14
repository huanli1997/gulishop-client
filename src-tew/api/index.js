// 引入ajax
import Aajx from "@/ajax/Aajx";

// 首页三级分类api
export const reqCategoryList = () => {
  return Aajx({
    method: "get",
    url: "/product/getBaseCategoryList",
  });
};

// reqCategoryList(); //测试进度条
