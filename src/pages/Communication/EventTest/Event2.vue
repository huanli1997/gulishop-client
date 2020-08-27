<template>
  <div style="background: #ccc; height: 80px;">
    <h2>Event2组件</h2>
    <button @click="$emit('click', 10)">分发自定义click事件</button><br />

    <!-- 如果不传参，就回调中参数接收到的就是undefined -->
    <button @click="$emit('heihei', $event)">分发自定义xxx事件</button><br />
  </div>
</template>
