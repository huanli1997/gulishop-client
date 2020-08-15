<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 
        当鼠标在全部商品分类和列表展示模块时，列表都会展示。因为all nav sort都是使用定位完成的
        所以把all 和 sort放在一起，做鼠标离开 sort隐藏事件
       -->
      <div @mouseleave="moveOutDiv" @mouseenter="moveInDiv">
        <h2 class="all">全部商品分类</h2>
        <!-- 添加动画效果 -->
        <transition name="show">
          <!-- 搜索页的typeNav一级列表隐藏 -->
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click="toSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                @mouseenter="moveIn(index)"
                :class="{ item_on: currentIndex === index }"
              >
                <h3>
                  <!-- 声明式导航组件，会创建新的对象，影响性能 -->
                  <!-- <router-link
                  :to="{
                    name: 'search',
                    query: {
                      categoryName: c1.categoryName,
                      category1Id: c1.categoryId,
                    },
                  }"
                  >{{ c1.categoryName }}</router-link
                > -->

                  <!-- 编程式导航模式，会新建很多函数，所以使用事件冒泡机制 -->
                  <!-- <a
                  href="javsscript:;"
                  @click="
                    $router.push({
                      name: 'search',
                      query: {
                        categoryName: c1.categoryName,
                        category1Id: c1.categoryId,
                      },
                    })
                  "
                  >{{ c1.categoryName }}</a
                > -->

                  <!-- 
                  在共同的父级元素添加事件监听
                ​		问题：怎么知道点击的是不是a标签
                ​		问题：怎么知道点击的是一级还是二级还是三级
                ​		问题：参数怎么携带，要携带携带哪些个的参数
                 -->

                  <!-- 
                  利用自定义属性携带动态数据 data-
                 -->
                  <a
                    href="javascript:;"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <!-- <router-link
                        :to="{
                          name: 'search',
                          query: {
                            categoryName: c2.categoryName,
                            category2Id: c2.categoryId,
                          },
                        }"
                        >{{ c2.categoryName }}</router-link
                      > -->

                        <!-- <a
                        href="javsscript:;"
                        @click="
                          $router.push({
                            name: 'search',
                            query: {
                              categoryName: c2.categoryName,
                              category2Id: c2.categoryId,
                            },
                          })
                        "
                        >{{ c2.categoryName }}</a
                      > -->

                        <a
                          href="javascript:;"
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <!-- <router-link
                          :to="{
                            name: 'search',
                            query: {
                              categoryName: c3.categoryName,
                              category3Id: c3.categoryId,
                            },
                          }"
                          >{{ c3.categoryName }}</router-link
                        > -->

                          <!-- <a
                          href="javsscript:;"
                          @click="
                            $router.push({
                              name: 'search',
                              query: {
                                categoryName: c3.categoryName,
                                category3Id: c3.categoryId,
                              },
                            })
                          "
                          >{{ c3.categoryName }}</a
                        > -->

                          <a
                            href="javascript:;"
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import _ from "lodash"; // 引入ladash
import throttle from "lodash/throttle"; // 局部引入，请求数据大小 chunk-vendors.js
export default {
  name: "TypeNav",
  data() {
    return {
      isShow: true,
      currentIndex: -1, // 控制对应的二三级菜单的显示
    };
  },
  mounted() {
    // this.getCategoryList();

    // 判断是否在home页面，如果不在home页面，typeNav一级列表隐藏
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },
  methods: {
    // getCategoryList() {
    //   this.$store.dispatch("getCategoryList");
    // },
    // 如果鼠标移入的速度过快，就会造成卡顿现象，所以用节流来优化处理
    // 节流：事件由多变少 引入 lodash 工具函数库

    // moveIn(index) {
    //   this.currentIndex = index;
    // },

    /* 
      _.throttle(func, [wait=0], [options={}])
      创建一个节流函数，在 wait 秒内最多执行 func 一次的函数。
      func 会传入最后一次传入的参数给这个函数。 随后调用的函数返回是最后一次 func 调用的结果。
     */
    moveIn: throttle(
      function(index) {
        this.currentIndex = index;
      },
      30, // 30ms 触发一次
      { trailing: false } // 指定调用在节流结束后 false:表示在节流之前触发
    ),

    // 三级菜单点击
    // 事件会由一个event对象，里面存储了触发事件的信息
    toSearch(event) {
      /* 
        event.target 当前触发事件的DOM元素
        .dataset 获取自定义属性集合对象
      */
      const data = event.target.dataset;
      // 结构data
      const { categoryname, category1id, category2id, category3id } = data;
      // 如果有categoryname数据说明点击的是a标签
      if (categoryname) {
        // url 对象
        const location = {
          name: "search",
        };
        const query = {
          categoryname: categoryname,
        };
        //  判断是几级菜单
        if (category1id) {
          query.category1id = category1id;
        } else if (category2id) {
          query.category2id = category2id;
        } else {
          query.category3id = category3id;
        }
        location.query = query;
        // 判断是否有params参数
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        // 编程式导航，传入location参数
        this.$router.push(location);
      }
    },

    // 移入 全部商品分类父div 搜索页的typeNav一级列表显示
    moveInDiv() {
      this.isShow = true;
    },
    // 移出 全部商品分类父div 搜索页的typeNav一级列表隐藏
    moveOutDiv() {
      this.currentIndex = -1;
      // 如果不是home 隐藏
      if (this.$route.path !== "/home") {
        this.isShow = false;
      }
    },
  },
  computed: {
    ...mapState({
      // 把数据映射到categoryList属性上
      categoryList: (state) => state.home.categoryList,
    }),
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 555px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   background-color: #d9d9d9;
          //   .item-list {
          //     display: block;
          //   }
          // }

          &.item_on {
            background-color: #d9d9d9;
            .item-list {
              display: block;
            }
          }
        }
      }

      &.show-enter {
        opacity: 0;
        height: 0;
      }

      &.show-enter-active {
        transition: all 0.3s;
      }

      &.show-enter-to {
        opacity: 1;
        height: 461px;
      }
    }
  }
}
</style>
