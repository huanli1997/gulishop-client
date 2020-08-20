import {
  reqAddOrUpdateCart,
  reqShopCartList,
  reqUpdateIsCheck,
  reqDeleteCart,
} from "@/api";

const state = {
  shopCartList: [],
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
      return Promise.reject(new Error("failed"));
    }
  },

  // 获取购物车列表
  async getShopCartList({ commit }) {
    const result = await reqShopCartList();
    if (result.code === 200) {
      commit("RECEIVESHOPCARTLIST", result.data);
    }
  },

  // 切换商品选中状态
  async updateIsCheck({ commit }, { skuId, isChecked }) {
    const result = await reqUpdateIsCheck(skuId, isChecked);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  // 切换全选状态,让每一个商品都发请求
  async updateAllIsCheck({ commit, state, dispatch }, isChecked) {
    let promises = [];

    await state.shopCartList.forEach((item) => {
      // 遍历每一个购物车，如果选中状态本身就和传递过来要修改的状态一样  就不用发请求
      if (item.isChecked === isChecked) return;
      // 如果说不一样，都需要发送请求，而且所有的每一个的请求都成功，才算成功
      // 每一个的状态都和传入的全选状态一致
      let promise = dispatch("updateIsCheck", {
        skuId: item.skuId,
        isChecked: isChecked,
      });
      promises.push(promise);
    });

    return Promise.all(promises);
  },

  // 删除购物车数据
  async deleteCart({ commit }, skuId) {
    const result = await reqDeleteCart(skuId);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  // 删除选中商品
  async deleteAllCheckCart({ commit, state, dispatch }) {
    let promises = [];
    await state.shopCartList.forEach((item) => {
      if (item.isChecked === 0) return;
      // 删除被选中的
      let promise = dispatch("deleteCart", item.skuId);
      promises.push(promise);
    });
    return Promise.all(promises);
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
