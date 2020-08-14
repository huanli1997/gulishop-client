import Vue from "vue";
import Vuex from "vuex";

import home from "./home";
import user from "./user";

Vue.use(Vuex);

const state = {};
const getters = {};
const actions = {};
const mutations = {};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    home: home,
    user: user,
  },
});
