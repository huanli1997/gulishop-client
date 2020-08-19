import { reqGoodsDetailInfo } from "@/api";

const state = {
  goodsDetailInfo: {},
};
const mutations = {
  RECEIVEGOODSDETAILINFO(state, goodsDetailInfo) {
    state.goodsDetailInfo = goodsDetailInfo;
  },
};
const actions = {
  async getGoodsDetailInfo({ commit }, skuId) {
    const result = await reqGoodsDetailInfo(skuId);
    if (result.code === 200) {
      commit("RECEIVEGOODSDETAILINFO", result.data);
    }
  },
};
const getters = {
  categoryView() {
    //为什么会加个或者{} 为了防止出现Undefined,后期使用点语法报错
    return state.goodsDetailInfo.categoryView || {};
  },
  skuInfo() {
    return state.goodsDetailInfo.skuInfo || {};
  },
  spuSaleAttrList() {
    return state.goodsDetailInfo.spuSaleAttrList || [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
