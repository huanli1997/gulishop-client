<template>
  <!-- <div>
    Search<br />
    params参数:{{ $route.params.keyword }}<br />
    params参数简便获取:{{ keyword }}<br />
    query参数:{{ $route.query.keyword }}<br />
    query参数简便获取:{{ keyword2 }}<br />
  </div> -->
  <div>
    <TypeNav></TypeNav>
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 判断是否存在categoryName query参数 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 判断是否存在keyword params参数 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 判断是否存在trademark  -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 判断是否存在props -->
            <li
              class="with-x"
              v-for="(prop, index) in searchParams.props"
              :key="index"
            >
              {{ prop.split(":")[1] }}
              <i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @searchForTrademark="searchForTrademark"
          @searchForAttrValue="searchForAttrValue"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li
                  :class="{
                    active: orderFlag === '1',
                  }"
                >
                  <a href="javsscript:;" @click="changeOrder('1')"
                    ><i
                      class="iconfont"
                      :class="{
                        icondown: orderType === 'desc',
                        iconup: orderType === 'asc',
                      }"
                      v-if="orderFlag === '1'"
                    ></i
                    >综合</a
                  >
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li
                  :class="{
                    active: orderFlag === '2',
                  }"
                >
                  <a href="javsscript:;" @click="changeOrder('2')"
                    >价格<i
                      class="iconfont"
                      :class="{
                        icondown: orderType === 'desc',
                        iconup: orderType === 'asc',
                      }"
                      v-if="orderFlag === '2'"
                    ></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <a href="item.html" target="_blank"
                      ><img :src="goods.defaultImg"
                    /></a> -->
                    <!-- 使用路由跳转 -->
                    <router-link :to="`/detail/${goods.id}`"
                      ><img :src="goods.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <!-- <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    > -->
                    <router-link
                      :to="`/detail/${goods.id}`"
                      target="_blank"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</router-link
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="fr page">
            <!-- 给子组件传递数据 -->
            <Pagination
              :currentPageNum="searchParams.pageNo"
              :pageSize="searchParams.pageSize"
              :continueSize="searchParams.continueSize"
              :total="goodsListInfo.total"
              @changePageNum="changePageNum"
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TypeNav from "@/components/TypeNav";
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapState, mapGetters } from "vuex";
export default {
  name: "Search",
  // // 接收传递过来的参数
  // props: ["keyword", "keyword2", "name"],
  data() {
    return {
      // 初始化 搜索参数
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 2,
        continueSize: 5,
        props: [],
        trademark: "",
      },
    };
  },
  components: {
    TypeNav,
    SearchSelector,
  },
  // mounted 一般用来异步请求数据
  // beforeMount 一般用来同步处理数据（参数）
  beforeMount() {
    // 更加用户操作，处理参数，去掉空数据
    // const { keyword } = this.$route.params;
    // const {
    //   category1Id,
    //   category2Id,
    //   category3Id,
    //   categoryName,
    // } = this.$route.query;

    // // 新建一个局部变量searchParams
    // const searchParams = {
    //   ...searchParams, // 对searchParams进行拆包
    //   keyword,
    //   category1Id,
    //   category2Id,
    //   category3Id,
    //   categoryName,
    // };

    // // 判断searchParams是否存在空数据，如果存在就剔除
    // // Object.keys()遍历对象的属性，存入一个数组
    // Object.keys(searchParams).forEach((item) => {
    //   if (searchParams[item] === "") {
    //     delete searchParams[item];
    //   }
    // });

    // // 把局部变量searchParams，重新赋值给data中的searchParams
    // // 得到的searchParams就是已经处理过的searchParams
    // this.searchParams = searchParams;

    // 调用处理搜索参数函数
    this.handleSearchParams();
  },

  mounted() {
    this.getGoodsListInfo();
  },
  methods: {
    // 发送请求 获取数据到Vuex
    getGoodsListInfo() {
      this.$store.dispatch("getGoodsListInfo", this.searchParams);
    },
    // 处理搜索参数
    handleSearchParams() {
      const { keyword } = this.$route.params;
      const {
        category1Id,
        category2Id,
        category3Id,
        categoryName,
      } = this.$route.query;

      // 新建一个局部变量searchParams
      const searchParams = {
        ...this.searchParams, // 对searchParams进行拆包
        keyword,
        category1Id,
        category2Id,
        category3Id,
        categoryName,
      };

      // 判断searchParams是否存在空数据，如果存在就剔除
      // Object.keys()遍历对象的属性，存入一个数组
      Object.keys(searchParams).forEach((item) => {
        if (searchParams[item] === "") {
          delete searchParams[item];
        }
      });

      // 把局部变量searchParams，重新赋值给data中的searchParams
      // 得到的searchParams就是已经处理过的searchParams
      this.searchParams = searchParams;
    },

    // 移除CategoryName面包屑 query参数
    removeCategoryName() {
      this.searchParams.categoryName = "";
      // 修改路由路径
      this.$router.push({
        name: "search",
        params: this.$route.params, // 只传params，这样query就为空，就相当于删除了query参数
      });
      // 搜索条件更新，需要当前页码修改为1
      this.searchParams.pageNo = 1;
    },

    // 移除Keyword面包屑 params
    removeKeyword() {
      this.searchParams.keyword = "";
      this.$router.replace({
        name: "search",
        query: this.$route.query,
      });
      this.$bus.$emit("clearKeyword"); //触发Header里面的方法

      // 搜索条件更新，需要当前页码修改为1
      this.searchParams.pageNo = 1;
    },

    // 移除removeTrademark面包屑
    removeTrademark() {
      this.searchParams.trademark = "";
      this.getGoodsListInfo();

      // 搜索条件更新，需要当前页码修改为1
      this.searchParams.pageNo = 1;
    },
    // 点击品牌，搜索
    searchForTrademark(trademark) {
      // 父组件，接收子组件传递过来的trademark
      // trademark 品牌: "ID:品牌名称"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;

      // 搜索条件更新，需要当前页码修改为1
      this.searchParams.pageNo = 1;

      // 重新发送请求
      this.getGoodsListInfo();
    },

    // 点击属性搜索
    searchForAttrValue(attr, attrValue) {
      //"属性ID:属性值:属性名"
      //要先去判断props当中是否已经存在这个点击的属性值条件，如果有了就不需要再去发请求
      // let isTrue = this.searchParams.props.some(item => item === `${attr.attrId}:${attrValue}:${attr.attrName}`)
      // if(isTrue) return

      let num = this.searchParams.props.indexOf(
        `${attr.attrId}:${attrValue}:${attr.attrName}`
      );
      if (num !== -1) return;

      this.searchParams.props.push(
        `${attr.attrId}:${attrValue}:${attr.attrName}`
      );
      // 搜索条件更新，需要当前页码修改为1
      this.searchParams.pageNo = 1;

      this.getGoodsListInfo();
    },

    // 移除Prop面包屑
    removeProp(index) {
      //删除某一个下标的属性值
      this.searchParams.props.splice(index, 1);

      // 搜索条件更新，需要当前页码修改为1
      this.searchParams.pageNo = 1;

      this.getGoodsListInfo();
    },

    // 点击综合价格排序
    changeOrder(orderFlag) {
      /* 
        点击切换排序包含排序项和排序方式
      ​		点击当前排序项         切换排序方式
      ​		点击不是当前排序项     切换排序项指定默认排序方式
      */
      // 记录初始状态 orderFlag:orderType
      // const originOrderFlag = this.searchParams.order.split(":")[0];
      // const originOrderType = this.searchParams.order.split(":")[1];

      // 优化后
      const originOrderFlag = this.orderFlag;
      const originOrderType = this.orderType;
      let newOrder = "";
      if (orderFlag === originOrderFlag) {
        // 判断点击的是否是当前排序项
        newOrder = `${originOrderFlag}:${
          originOrderType === "desc" ? "asc" : "desc"
        }`;
      } else {
        // 点击不是当前排序项 变成排序方式
        // 就变成你点击的排序项的 降序排序
        newOrder = `${orderFlag}:desc`;
      }
      // 给order重新赋值
      this.searchParams.order = newOrder;

      // 搜索条件更新，需要当前页码修改为1
      this.searchParams.pageNo = 1;

      // 发送请求
      this.getGoodsListInfo();
    },

    // 触发分页按钮
    changePageNum(page) {
      // 把子组件传递过来的page数据重新赋值给this.searchParams.pageNo
      this.searchParams.pageNo = page;
      // 发送请求
      this.getGoodsListInfo();
    },
  },

  // 获取数据到组件
  computed: {
    // 我们这个页面只用到了goodsListInfo里面的goodsList数据
    ...mapGetters(["goodsList"]),

    // 模板内部的表达式优化计算属性值
    orderFlag() {
      return this.searchParams.order.split(":")[0];
    },
    orderType() {
      return this.searchParams.order.split(":")[1];
    },

    // 获取到goodsListInfo数据
    ...mapState({
      goodsListInfo: (state) => state.search.goodsListInfo,
    }),
  },
  /*
    在搜索页重新输入关键字或者点击类别不会再发送请求，因为mounted只会执行一次，需要监视路由变化
   */
  watch: {
    $route() {
      // 获取到路由改变后的搜索参数
      // 因为这里也需要搜素参数，使用把搜素参数的步骤封装成一个函数
      this.handleSearchParams();
      // 发送请求
      this.getGoodsListInfo();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
