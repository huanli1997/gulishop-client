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
  </div>
</template>

<script>
import TypeNav from "@/components/TypeNav";
export default {
  // name: "Search",
  // // 接收传递过来的参数
  // props: ["keyword", "keyword2", "name"],
  components: {
    TypeNav,
  },
};
</script>

<style lang="less" scoped></style>
