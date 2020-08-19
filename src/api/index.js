// 这个文件是所有接口请求函数的文件
// 每一个请求接口数据功能都给它定义成一个函数，以后哪里需要去请求数据，就调用对应的这个接口请求函数就好了
import Ajax from "@/ajax/Ajax"; // 暴露出来二次封装的instance
import mockAjax from "@/ajax/mockAjax"; // 封装的发送 mock 请求的函数

// 首页三级分类
export const reqCategoryList = () => {
  return Ajax({
    url: "/product/getBaseCategoryList",
    method: "get",
  });
};

// reqCategoryList(); 测试进度条

// banner
export const reqBannerList = () => {
  return mockAjax({
    url: "/banner",
    method: "get",
  });
};

// floor
export const reqFloorList = () => {
  return mockAjax({
    url: "/floor",
    method: "get",
  });
};

// searchParams代表搜索参数，这个参数必须有，至少得是一个没有属性的空对象
// 参数如果是一个空对象，代表搜索请求获取的是全部的数据
// 参数如果有搜索条件，代表获取的就是搜索条件匹配的数据
export const reqGoodsListInfo = (searchParams) => {
  return Ajax({
    url: "/list",
    method: "post",
    data: searchParams,
  });
};
// reqGoodsListInfo({});

// 详情页面
// /api/item/{ skuId } GET
export const reqGoodsDetailInfo = (skuId) => {
  return Ajax({
    url: `item/${skuId}`,
    method: "get",
  });
};
// reqGoodsDetailInfo(126);
