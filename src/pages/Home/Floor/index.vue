<template>
  <!--楼层-->
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{ floor.name }}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li class="active" v-for="nav in floor.navList" :key="nav.text">
              <a href="#tab1" data-toggle="tab">{{ nav.text }}</a>
            </li>
            <!-- <li>
              <a href="#tab2" data-toggle="tab">大家电</a>
            </li>
            <li>
              <a href="#tab3" data-toggle="tab">生活电器</a>
            </li>
            <li>
              <a href="#tab4" data-toggle="tab">厨房电器</a>
            </li>
            <li>
              <a href="#tab5" data-toggle="tab">应季电器</a>
            </li>
            <li>
              <a href="#tab6" data-toggle="tab">空气/净水</a>
            </li>
            <li>
              <a href="#tab7" data-toggle="tab">高端电器</a>
            </li> -->
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li
                  v-for="(keyword, index) in floor.keywords"
                  :key="keyword.index"
                >
                  {{ keyword }}
                </li>
                <!-- <li>4K电视</li>
                <li>空气净化器</li>
                <li>IH电饭煲</li>
                <li>滚筒洗衣机</li>
                <li>电热水器</li> -->
              </ul>
              <img :src="floor.imgUrl" />
            </div>
            <div class="floorBanner">
              <!-- <div class="swiper-container" ref="floor">
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide"
                    v-for="carousel in floor.carouselList"
                    :key="carousel.id"
                  >
                    <img :src="carousel.imgUrl" />
                  </div> -->
                  <!-- <div class="swiper-slide">
                                            <img src="./images/floor-1-b02.png">
                                        </div>
                                        <div class="swiper-slide">
                                            <img src="./images/floor-1-b03.png">
                                        </div> -->
                <!-- </div> -->
                <!-- 如果需要分页器 -->
                <!-- <div class="swiper-pagination"></div> -->

                <!-- 如果需要导航按钮 -->
                <!-- <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div> -->
              <!-- <SliderLopp :bannerList="floor.navList"></SliderLopp> -->
              <SliderLoop :bannerList="floor.carouselList"></SliderLoop>
            </div>

            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="floor.recommendList[0]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="floor.recommendList[1]" />
              </div>
            </div>
            <div class="split center">
              <img :src="floor.bigImg" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="floor.recommendList[2]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="floor.recommendList[3]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Swiper from "swiper"; // 轮播图 js
// import "swiper/css/swiper.css"; // 轮播图 css css文件不需要使用变量接收，直接引入
export default {
  name: "Floor",
  props: ["floor"], // 接收Home组件传过来的数据
  /* 
    它是根据数据循环创建组件对象的，外部的floor创建的时候
​	  所以数据肯定是已经获取到了，所以我们在mounted内部去创建swiper
  */
  // 因为我们要抽取一个函数，使用使用使用watch属性来写
  mounted() {
    // 轮播图
    // new Swiper(this.$refs.floor, {
    //   loop: true, // 循环模式选项
    //   // 如果需要分页器
    //   // 下面的小圆点
    //   pagination: {
    //     el: ".swiper-pagination",
    //     clickable: true, // 小圆点点击
    //   },
    //   // 如果需要前进后退按钮
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //   },
    //   // 自动轮播
    //   autoplay: {
    //     disableOnInteraction: false, // 用户操作后，还可自动切换
    //   },
    // });
    // console.log(this);
  },

  // watch: {
  //   floor: {
  //     // 因为floor是由数据创建的，使用直接监视bannerList无法触发swipe，因为已经加载完成
  //     // immediate 立即 添加这个属性 就算数据没有改变，watch监视的属性内部会立即执行一次
  //     immediate: true,
  //     handler(newVal, oldVal) {
  //       // Vue.nextTick() 和 vm.$nextTick() 效果一样
  //       // 当数据最后一次更新完成后，触发里面的回调函数
  //       this.$nextTick(() => {
  //         // 轮播图
  //         new Swiper(this.$refs.floor, {
  //           loop: true, // 循环模式选项

  //           // 如果需要分页器
  //           // 下面的小圆点
  //           pagination: {
  //             el: ".swiper-pagination",
  //             clickable: true, // 小圆点点击
  //           },

  //           // 如果需要前进后退按钮
  //           navigation: {
  //             nextEl: ".swiper-button-next",
  //             prevEl: ".swiper-button-prev",
  //           },
  //           // 自动轮播
  //           autoplay: {
  //             disableOnInteraction: false, // 用户操作后，还可自动切换
  //           },
  //         });
  //       });
  //     },
  //   },
  // },
};
</script>

<style lang="less" scoped>
.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      .fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;

              &::after {
                content: "|";
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: "";
                }
              }
            }

            &.active {
              a {
                color: #e1251b;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-top: 2px solid #c81623;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 210px;
            height: 100%;
            background: #f7f7f7;

            .jd-list {
              padding: 15px 0;
              overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .floorBanner {
            width: 330px;
            height: 100%;
          }

          .split {
            width: 220px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
  }
}
</style>
