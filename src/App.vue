<template>
  <div id="app">
    <!-- 使用组件 -->
    <Header></Header>
    <!-- 路由组件 -->
    <router-view></router-view>
    <Footer v-if="!$route.meta.isHade"></Footer>
  </div>
</template>

<script>
// 引入
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "App",
  // 注册组件
  components: {
    Header,
    Footer,
  },

};
</script>

<style></style>
