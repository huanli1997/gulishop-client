<template>
  <div>
    <h2>自定义带Hover提示的按钮</h2>
    <Child aaa="bbb" :xxx="'zzz'" @heihei="haha" @hh="haha"></Child>

    <el-button
      type="primary"
      size="mini"
      icon="el-icon-plus"
      @click="handle"
    ></el-button>
    <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
    <el-button
      type="warning"
      size="mini"
      icon="el-icon-edit"
      @dblclick.native="handle"
    ></el-button>

    <HintButton
      type="primary"
      size="mini"
      icon="el-icon-plus"
      @click="handle"
      title="添加"
    ></HintButton>
    <HintButton
      type="danger"
      size="mini"
      icon="el-icon-delete"
      title="删除"
    ></HintButton>
    <HintButton
      type="warning"
      size="mini"
      icon="el-icon-edit"
      @dblclick.native="handle"
      title="修改"
    ></HintButton>
  </div>
</template>

<script type="text/ecmascript-6">
import Child from './Child'
import HintButton from './HintButton'
  export default {
    name: 'AttrsListenersTest',
    components:{
      Child,
      HintButton
    },
    methods: {
      haha(){
        console.log('我是哈哈');
      },

      handle(){
        console.log(222);
      }
    },
  }
</script>
