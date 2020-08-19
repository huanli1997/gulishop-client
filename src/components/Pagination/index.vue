<template>
  <div class="pagination">
    <!-- 
        更新页码父组件要去发请求
        把自身改变页码传给父组件修改参数重新发送请求
     -->
    <!-- 当当前页为第一页时，禁用 -->
    <button
      :disabled="currentPageNum === 1"
      @click="$emit('changePageNum', currentPageNum-1)"
    >
      上一页
    </button>
    <!-- 当start大于1才会显示(如果start等于一的时候显示，就会有出现两个1，因为start会生成一个1)  -->
    <button v-if="startEnd.start > 1" @click="$emit('changePageNum', 1)">
      1
    </button>
    <button v-if="startEnd.start > 2">···</button>

    <!-- 遍历一个数组，会从1开始遍历到这个数据结束 -->
    <!-- v-for 优先级高于v-if -->
    <!-- 如果当前页和目前这个页码是一样的，那么就添加active类 -->
    <button
      v-for="page in startEnd.end"
      :key="page"
      v-if="page >= startEnd.start"
      :class="{ active: currentPageNum === page }"
      @click="$emit('changePageNum', page)"
    >
      {{ page }}
    </button>

    <button v-if="startEnd.end < totalPageNum - 1">···</button>
    <!-- 当end小于totalPageNum才会显示  -->
    <button
      v-if="startEnd.end < totalPageNum"
      @click="$emit('changePageNum', totalPageNum)"
    >
      {{ totalPageNum }}
    </button>
    <!-- 当当前页为最大页时，禁用 -->
    <button
      :disabled="currentPageNum === totalPageNum"
      @click="$emit('changePageNum', currentPageNum + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">{{ total }}</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    /*
      currentPageNum：当前页面
      pageSize：每页显示的数量
      continueSize：连续页数
      total：总数
    */
    // 复杂写法
    currentPageNum: {
      type: Number,
      default: 1,
    },
    pageSize: Number,
    continueSize: {
      type: Number,
      default: 5,
    },
    total: Number,
  },
  computed: {
    // totalPageNum：总页数
    // 1.计算并展示总页数
    totalPageNum() {
      return Math.ceil(this.total / this.pageSize);
    },

    // 2.连续页的起始和结束页码
    startEnd() {
      // disNum：修正值
      let start, end, disNum;
      // 解构需要的数据
      let { currentPageNum, continueSize, total, totalPageNum } = this;

      // 如果当前的页面>页面的总数量，那就显示当前页面的总数量
      if (currentPageNum > total) {
        start = 1;
        end = currentPageNum;
      } else {
        // 通用类型的start  和 end
        start = currentPageNum - Math.floor(continueSize / 2);
        end = currentPageNum + Math.floor(continueSize / 2);
      }

      // 当计算实例的 start < 1 时就需要修正 修正左边临界值
      if (start < 1) {
        disNum = 1 - start;
        start += disNum;
        end += disNum;
      }

      // 当计算实例的 end > totalPageNum 时就需要修正 修正右边临界值
      if (end > totalPageNum) {
        disNum = end - totalPageNum;
        start -= disNum;
        end -= disNum;
      }
      // 因为需要返回两个值，所以返回对象/数组
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
