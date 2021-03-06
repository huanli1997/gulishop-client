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

// 请求添加或者修改购物车（或者修改购物车数量）
// /api/cart/addToCart/{ skuId }/{ skuNum } post
export const reqAddOrUpdateCart = (skuId, skuNum) => {
  return Ajax({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
  });
};
// reqAddOrUpdateCart(112, 1);

// 获取购物车列表
// /api/cart/cartList  get
export const reqShopCartList = () => {
  return Ajax({
    url: "/cart/cartList",
    method: "get",
  });
};
// reqShopCartList();

// 切换商品选中状态
// /api/cart/checkCart/{skuID}/{isChecked}  GET
export const reqUpdateIsCheck = (skuId, isChecked) => {
  return Ajax({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: "get",
  });
};

// 删除购物车数据
// /api/cart/deleteCart/{skuId}  DELETE
export const reqDeleteCart = (skuId) => {
  return Ajax({
    url: `/cart/deleteCart/${skuId}`,
    method: "delete",
  });
};

// 注册
// /api/user/passport/register POST
export const reqRegister = (userInfo) => {
  return Ajax({
    url: `/user/passport/register`,
    method: "post",
    data: userInfo,
  });
};

// 登录
// /api/user/passport/login POST
export const reqLogin = (userInfo) => {
  return Ajax({
    url: "/user/passport/login",
    method: "post",
    data: userInfo,
  });
};

// 退出登录
// /api/user/passport/logout GET
export const reqLogout = () => {
  return Ajax({
    url: "/user/passport/logout",
    method: "get",
  });
};

// 订单确认
// /api/order/auth/trade GET
export const reqTrade = () => {
  return Ajax({
    url: "/order/auth/trade",
    method: "get",
  });
};

// 提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}  POST
export const reqSubmitOrder = (tradeNo, tradeInfo) => {
  return Ajax({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: "post",
    data: tradeInfo,
  });
};

// 获取订单支付信息
// /api/payment/weixin/createNative/{orderId} GET
export const reqPayInfo = (orderId) => {
  return Ajax({
    url: `payment/weixin/createNative/${orderId}`,
    method: "get",
  });
};

// 查询支付订单状态
// /api/payment/weixin/queryPayStatus/{orderId}  GET
export const reqOrderStatus = (orderId) => {
  return Ajax({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "get",
  });
};

// 获取我的订单列表
// /api/order/auth/{page}/{limit} GET
export const reqMyOrderInfo = (page,limit) => {
  return Ajax({
    url: `/order/auth/${page}/${limit}`,
    method: "get",
  });
};
