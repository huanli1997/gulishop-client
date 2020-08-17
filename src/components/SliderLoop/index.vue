<template>
  <!--banner轮播-->
  <div class="swiper-container" ref="banner">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="banner in bannerList" :key="banner.id">
        <img :src="banner.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper"; // 轮播图 js
import "swiper/css/swiper.css"; // 轮播图 css css文件不需要使用变量接收，直接引入

export default {
  name: "SliderLoop",
  props: ["bannerList"], // 从其他组件中接收这个属性
  watch: {
    bannerList: {
      immediate: true, // 为了配合floor组件 抽取公共部分
      handler(newVal, oldVal) {
        // Vue.nextTick() 和 vm.$nextTick() 效果一样
        // 当数据最后一次更新完成后，触发里面的回调函数
        this.$nextTick(() => {
          // 轮播图
          new Swiper(this.$refs.banner, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            // 下面的小圆点
            pagination: {
              el: ".swiper-pagination",
              clickable: true, // 小圆点点击
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 自动轮播
            autoplay: {
              disableOnInteraction: false, // 用户操作后，还可自动切换
            },
          });
        });
      },
    },
  },
};
</script>

<style lang="less" scoped></style>
