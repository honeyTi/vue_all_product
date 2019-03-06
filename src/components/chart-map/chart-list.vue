<!-- 背景标题组件 -->
<template>
  <div class="charts" v-bind:style="{ width: width, height: height }">
    <h2 class="title">
      {{title}}
    </h2>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'chartMap',
  data () {
    return {
    };
  },
  props :['width', 'height', 'title'],
  methods: {}
}

</script>
<style lang='scss' scoped>
  .charts {
    background: url('../../assets/img/charts-bg.png') no-repeat;
    background-size: 100% 100%;
    h2.title {
      font-size: 20px;
      color: #8adaff;
      padding: 0 20px;
      height: 49px;
      line-height: 49px;
    }
    slot {
      width: 100%;
      height: calc(100% - 49px);
      div {
        width: 100%;
      }
    }
  }
</style>