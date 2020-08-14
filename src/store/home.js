// 发送首页三级分类的数据的api接口
import { reqCategoryList } from "@/api";

const state = {
  // 存储首页三级分类的数据
  categoryList: [],
};
const getters = {};

const actions = {
  // 间接修改数据，允许出现 if for 异步操作
  async getCategoryList({ commit }) {
    // reqCategoryList().then((result) => {
    //   commit("RECEIVECATEGORYLIST", result.date);
    // });
    const result = await reqCategoryList();
    if (result.code === 200) {
      commit("RECEIVECATEGORYLIST", result.data);
    }
  },
};

const mutations = {
  // 直接修改数据，不允许出现 if for 异步操作
  RECEIVECATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
