<template>
  <div>
    <ul>
      <li v-for="(todo, index) in todos" :key="todo.id">
        <!-- slot 标签中 用 ：绑定，表示在向父亲传递数据 -->
        <!-- 给父组件传递一个 {} 对象用slot-scope接收 ，里面有一个todo属性 ，值为 todo -->
        <slot :todo="todo" :index="index">
          {{ todo.text }}
        </slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {
    todos: Array,
  },
};
</script>
