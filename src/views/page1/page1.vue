<!-- page1map -->
<template>
  <div class="bg">
    <div class="title">
      <h1>电商交易分析</h1>
    </div>
    <div class="content">
      <div class="map-left">
        <chart-map
          width="24.74vw"
          height="36vh"
          title="数据测试内容"
          icon="icon"
          iconfont="icon-leijiline"
        >
          <div class="chart-out" id="bar-map"></div>
        </chart-map>
        <chart-map width="24.74vw" height="36vh" title="数据测试内容" id="left-map">
          <div class="chart-out" id="line-map"></div>
        </chart-map>
      </div>
      <div class="map-center"></div>
      <div class="map-right"></div>
    </div>
  </div>
</template>
<script>
import ChartMap from "@/components/chart-map/chart-list";
export default {
  data() {
    return {
      nameChange: "John"
    };
  },
  methods: {
    getMapData() {
      let timeEnd = "2018-12-01"+" 00:00:00";
      this.$api.getMapChart("省市", timeEnd).then(res => {
        if (res.Code === 0) {
          // eslint-disable-next-line no-console
          console.log(res.Data);
        } else {
          // eslint-disable-next-line no-console
          console.log(res.Data);
        }
      });
    }
  },
  components: {
    ChartMap
  },
  mounted() {
    this.getMapData();
  }
};
</script>
<style lang='scss' scoped>
.bg {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/img/bg.png") no-repeat;
  background-size: 100% 100%;
  div.title {
    width: 100vw;
    h1 {
      width: 36.45vw;
      margin: 0 auto;
      height: 7.5vh;
      line-height: 7.5vh;
      background: url("../../assets/img/title.png") no-repeat;
      background-size: 100% 100%;
      color: #fff;
      font-size: 32px;
      font-style: italic;
      font-weight: bold;
      text-align: center;
      letter-spacing: 1rem;
      text-shadow: 0 0 10px#fff;
    }
  }
  div.content {
    width: 96.875vw;
    height: 88.8vh;
    margin: 0 auto;
    background: url("../../assets/img/content.png") no-repeat;
    background-size: 100% 100%;
    padding: 7.5vh 3.6vw;
    display: flex;
    justify-content: space-between;
    .map-left {
      width: 24.74vw;
      height: 73.8vh;
      .chart-out {
        height: 30vh;
        font-size: 20px;
        color: #fff;
      }
      #left-map {
        margin-top: 1.8vh;
      }
    }
    .map-center {
      width: 36.7vw;
      height: 73.8vh;
      background: url("../../assets/img/charts-bg.png") no-repeat;
      background-size: 100% 100%;
    }
    .map-right {
      width: 24.74vw;
      height: 73.8vh;
    }
  }
}
</style>
