<template>
  <div>
    <h2>深入v-model</h2>

    <input type="text" v-model="msg" /><br />
    <span>你好,{{ msg }}</span>

    <br />
    <br />
    <br />

    <!-- v-model的本质 -->
    <input type="text" :value="msg" @input="msg = $event.target.value" /><br />
    <span>你好,{{ msg }}</span>

    <br />
    <br />
    <br />

    <!-- v-model不单可以使用在input原生标签身上，还能使用在组件标签身上
    一般我们使用这个v-model在组件标签身上是为了数据父子同步
    而且子组件内部一般都是有表单类元素采用v-model
    -->
    <CustomInput :value="msg1" @input="msg1 = $event"></CustomInput><br />
    <span>我爱你{{ msg1 }}</span>

    <CustomInput v-model="msg1"></CustomInput>
    <span>我爱你{{ msg1 }}</span>
  </div>
</template>

<script type="text/ecmascript-6">
import CustomInput from './CustomInput.vue'
export default {
  name: 'ModelTest',
  data(){
    return{
      msg:'',
      msg1:'IU'
    }
  },
  components: {
    CustomInput
  }
}
</script>
