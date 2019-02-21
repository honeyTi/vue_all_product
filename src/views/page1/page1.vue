<!-- page1map -->
<template>
  <div>
    <button>修改名字</button>
    <button>修改年龄</button>
    <button>提示内容</button>
    <div>
      {{nameChange}}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nameChange: "John"
    };
  },
  methods: {},
  mounted() {
    var start = "2016-12-01" + " 00:00:00";
    var end = "2018-12-01" + " 00:00:00";
    this.$api
      .getCharts("总体", start, end)
      .then(res => {
        if (res.Code === 0) {
          // eslint-disable-next-line no-console
          console.log(res.Data);
        } else {
          // eslint-disable-next-line no-console
          console.log(res.Data);
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }
};
</script>
<style>
</style>
