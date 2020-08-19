import { reqAddOrUpdateCart, reqShopCartList } from "@/api";

const state = {
  shopCartList:[],
};
const mutations = {
  RECEIVESHOPCARTLIST(state, shopCartList) {
    state.shopCartList = shopCartList;
  },
};
const actions = {
  // 添加到购物车
  async getAddOrUpdateCart({ commit }, { skuId, skuNum }) {
    const result = await reqAddOrUpdateCart(skuId, skuNum);
    if (result.code === 200) {
      // 请求成功
      return "ok";
    } else {
      // 请求失败返回应该失败的promise
      return Promise.reject(new Error("加入购物车失败"));
    }
  },

  // 获取购物车列表
  async getShopCartList({ commit }) {
    const result = await reqShopCartList();
    if (result.code === 200) {
      commit("RECEIVESHOPCARTLIST", result.data);
    }
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
