<template>
  <div style="background: #ccc; height: 50px;">
    <h3>女儿小红: 有存款: {{ money }}</h3>
    <button @click="giveMoney(100)">给BABA钱: 100</button>
  </div>
</template>

<script>
import { myMixIn } from "./moneyMixin";
export default {
  name: "Daughter",
  data() {
    return {
      money: 20000,
    };
  },
  mixins: [myMixIn],

  // methods: {
  //   giveMoney(money) {
  //     this.$parent.money += money;
  //     this.money -= money;
  //   },
  // },
};
</script>
