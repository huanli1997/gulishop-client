<template>
  <div>
    <h2>效果一: 显示TODO列表时, 已完成的TODO为绿色</h2>
    <!-- <list :todos="todos">
      slot-scope 可以接收到子组件传递过来的数据 ， 它是一个对象 ，名字可以随意
      <template slot-scope="slotProps">
        <span
          :style="{
            color: slotProps.todo.isComplete ? 'red' : 'black',
          }"
          >{{ slotProps.todo.text }}</span
        >
      </template>
    </list> -->
    <hr />

    <h2>效果二: 显示TODO列表时, 带序号, TODO的颜色为蓝绿搭配</h2>
    <list :todos="todos">
      <!-- slot-scope 可以接收到子组件传递过来的数据 ， 它是一个对象 ，名字可以随意 -->
      <template slot-scope="slotProps">
        <span
          :style="{
            color: slotProps.index % 2 === 0 ? 'green' : 'blue',
          }"
          >{{ slotProps.index + 1 }} {{ slotProps.todo.text }}</span
        >
      </template>
    </list>
  </div>
</template>

<script type="text/ecmascript-6">
import List from './List'
export default {
  name: 'ScopeSlotTest',
  data () {
    return {
      todos: [
        {id: 1, text: 'AAA', isComplete: false},
        {id: 2, text: 'BBB', isComplete: true},
        {id: 3, text: 'CCC', isComplete: false},
        {id: 4, text: 'DDD', isComplete: false},
      ]
    }
  },

  components: {
    List
  }
}
</script>
