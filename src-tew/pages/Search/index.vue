<template>
  <div>
    <!-- Search<br />
    params参数:{{ $route.params.keyword }}<br />
    params参数简便获取:{{ name }}<br />
    query参数简便获取:{{ keyword }}<br />
    query参数:{{ $route.query.keyword }}<br />
    query参数简便获取:{{ keyword2 }}<br /> -->
    <TypeNav></TypeNav>
  </div>
</template>

<script>
// 引入
import TypeNav from '@/components/TypeNav'

export default {
  name: "Search",
  // props: ["name"],
  props: ["keyword", "keyword2"],
};
</script>

<style lang="less" scoped></style>
