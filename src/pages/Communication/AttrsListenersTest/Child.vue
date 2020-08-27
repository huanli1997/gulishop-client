<template>
  <div>孩子{{aaa}}</div>
</template>

<script>
export default {
  name: "Child",
  props: ["xxx", "aaa"],
  mounted() {
    /* 
      $attrs 如果不声明props 那么子组件当中是可以看到
      如果声明了哪个属性，那么那个属性在$attrs当中看不到,它会排除 props声明接收的属性 以及class style

    */
    this.$emit("heihei");
    console.log(this.$attrs, this.$listeners);
  },
};
</script>

<style lang="less" scoped></style>
