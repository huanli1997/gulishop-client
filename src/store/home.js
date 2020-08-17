// 发送首页三级分类的数据的api接口
import { reqCategoryList,reqBannerList,reqFloorList } from "@/api";

const state = {
  // 存储首页三级分类的数据
  categoryList: [],
  // mock 数据
  bannerList: [],
  floorList: [],
};
const getters = {};

const actions = {
  // 间接修改数据，允许出现 if for 异步操作
  async getCategoryList({ commit }) {
    const result = await reqCategoryList();
    if (result.code === 200) {
      commit("RECEIVECATEGORYLIST", result.data);
    }
  },

  // banner
  async getBannerList({ commit }) {
    const result = await reqBannerList();
    if (result.code === 200) {
      commit("RECEIVEBANNERLIST", result.data);
    }
  },

  // floor
  async getFloorList({ commit }) {
    const result = await reqFloorList();
    if (result.code === 200) {
      commit("RECEIVEFLOORLIST", result.data);
    }
  },
};

const mutations = {
  // 直接修改数据，不允许出现 if for 异步操作
  RECEIVECATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },

  // banner
  RECEIVEBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },

  // floor
  RECEIVEFLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
