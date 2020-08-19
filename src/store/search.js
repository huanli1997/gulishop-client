import { reqGoodsListInfo } from "@/api";

const state = { goodsListInfo: {} };
const mutations = {
  RECEIVEGOODSLISTINFO(state, goodsListInfo) {
    state.goodsListInfo = goodsListInfo;
  },
};
const actions = {
  async getGoodsListInfo({ commit }, searchParams) {
    const result = await reqGoodsListInfo(searchParams);
    if (result.code === 200) {
      commit("RECEIVEGOODSLISTINFO", result.data);
    }
  },
};

// 防止使用的时候出现 a.b.c 假报错的情况
const getters = {
  attrsList(state) {
    return state.goodsListInfo.attrsList || [];
  },
  goodsList(state) {
    return state.goodsListInfo.goodsList || [];
  },
  trademarkList(state) {
    return state.goodsListInfo.trademarkList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
