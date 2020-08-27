export const myMixIn = {
  // 这个对象可以包含组件对象中，所以包含的一切 data methods...
  methods: {
    giveMoney(money) {
      this.$parent.money += money;
      this.money -= money;
    },
  },
};
