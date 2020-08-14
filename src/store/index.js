import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import home from "./home";
import user from "./user";

const state = {};
const getters = {};
const mutations = {};
const actions={}


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    home,
    user,
  },
});
