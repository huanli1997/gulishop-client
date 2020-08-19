<template>
  <div class="swiper-container" ref="imgBanner">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(image, index) in imageList"
        :key="image.id"
      >
        <img
          :src="image.imgUrl"
          :class="{ active: index === defaultIndex }"
          @click="changDdefaultIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  name: "ImageList",
  props: ["imageList"],
  data() {
    return {
      defaultIndex: 0, // 默认第0张图片，显示小橙色框
    };
  },

  methods: {
    // 鼠标点击小图切换图片
    changDdefaultIndex(index) {
      this.defaultIndex = index;
      // 把defaultIndex数据传递给Detail
      this.$bus.$emit("changeDefaultIndex", this.defaultIndex);
    },
  },

  watch: {
    imageList: {
      immediate: true, // 为了配合floor组件 抽取公共部分
      handler(newVal, oldVal) {
        // Vue.nextTick() 和 vm.$nextTick() 效果一样
        // 当数据最后一次更新完成后，触发里面的回调函数
        this.$nextTick(() => {
          // 轮播图
          new Swiper(this.$refs.imgBanner, {
            // loop: true, // 循环模式选项

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 自动轮播
            // autoplay: {
            //   disableOnInteraction: false, // 用户操作后，还可自动切换
            // },

            slidesPerView: 5, // 一次性展示5张图
            slidesPerGroup: 5, // 每组5张图
          });
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // 换成鼠标点击的时候显示颜色
      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
