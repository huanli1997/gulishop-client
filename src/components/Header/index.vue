<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="$store.state.user.userInfo.name">
            <span>请</span>
            <!-- <router-link to="/login">登录</router-link> -->
            <a href="javascript:;">{{ $store.state.user.userInfo.name }}</a>
            <!-- <router-link to="/register" class="register">免费注册</router-link> -->
            <a href="javascript:;" class="register" @click="logout">退出</a>
          </p>
          <p v-else>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <!-- <a href="###">登录</a> -->
            <router-link to="/register" class="register">免费注册</router-link>
            <!-- <a href="###" class="register">免费注册</a> -->
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/home" class="logo" title="尚品汇"
          ><img src="./images/logo.png" alt=""
        /></router-link>
        <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
          
        </a> -->
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="toSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  mounted() {
    this.$bus.$on("clearKeyword", this.clearKeyword);
  },
  methods: {
    toSearch() {
      /*
        route是“路由信息对象”，包括path，params，hash，query，fullPath，matched，name等路由信息参数。
        router是“路由实例”对象包括了路由的跳转方法，钩子函数等。
       */
      //1、对象写法
      //当传递参数传递有params参数的时候，对象写法必须是name和params去组合
      //当传递参数有query的时候无所谓

      //2、怎么制定params参数可传可不传
      // 在路由路径当中获取params参数的时候加?

      //3、传递的params参数如果是空串，路径也会出问题
      // 要么不指定params参数   要么传递过去一个undefined 代表什么都没传，不能直接传空串
      // 前提得  params参数可传可不传

      let location = {
        // path: "/search",
        name: "search",
        params: {
          keyword: this.keyword || undefined,
        },
      };
      // 判断是否有query参数
      if (this.$route.query) {
        location.query = this.$route.query;
      }

      /*
        如果是搜索页往搜索页去跳转使用replace
        如果是home页往搜索页去跳转使用push
      */
      if (this.$route.path !== "/home") {
        this.$router.replace(location);
      } else {
        this.$router.push(location);
      }
    },

    // 清除搜索关键字
    clearKeyword() {
      this.keyword = "";
    },

    // 退出登录
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
