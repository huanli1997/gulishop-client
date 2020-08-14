import { reqCategoryList } from "@/api"; // 发送请求的方法

const state = {
  categoryList: [],
};
const getters = {};
const actions = {
  async getCategoryList({ commit }) {
    const result = await reqCategoryList();
    if (result.code === 200) {
      // 说明请求发送成功
      commit("RECEIVECATEGORYLIST", result.data);
    }
  },
};
const mutations = {
  RECEIVECATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
