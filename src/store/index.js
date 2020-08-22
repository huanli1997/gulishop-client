import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import home from "./home";
import user from "./user";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import trade from "./trade";

const state = {};
const getters = {};
const mutations = {};
const actions = {};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    home,
    user,
    search,
    detail,
    shopcart,
    trade,
  },
});
