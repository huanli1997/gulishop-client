import { getUserTempId } from "@/utils/userabout";
import { reqRegister, reqLogin, reqLogout } from "@/api";

const state = {
  //用户的临时身份标识 userTempId 我们在state当中存一份
  //为了以后获取的时候，效率更高一些
  //用户的身份标识是要存储在永久保存的地方（localStorage）,并且尽量不要更改
  //先去从localStorage内部去取  有就用  没有就得创建，可以使用函数
  userTempId: getUserTempId(),
  // 每次先判断 userInfo 是否存在用户数据
  userInfo: JSON.parse(localStorage.getItem("USERINFO_KEY")) || {},
};
const mutations = {
  RECEIVEUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  RESETUSERINFO(state) {
    state.userInfo = {};
  },
};
const actions = {
  // 注册用户
  async register({ commit }, userInfo) {
    const result = await reqRegister(userInfo);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  // 登录
  async logon({ commit }, userInfo) {
    const result = await reqLogin(userInfo);
    if (result.code === 200) {
      commit("RECEIVEUSERINFO", result.data);
      // 为了能够自动登录，我们把数据存储再localStorage中,然后每次从localStorage取数据
      localStorage.setItem("USERINFO_KEY", JSON.stringify(result.data));
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  // 退出登录
  async logout({ commit }) {
    const result = await reqLogout();
    if (result.code === 200) {
      //清空，localStorage当中的用户数据
      localStorage.removeItem("USERINFO_KEY");
      //清空， state当中的userInfo数据
      // 只有mutations才能操作state里面的数据！！！
      commit("RESETUSERINFO");
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
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
