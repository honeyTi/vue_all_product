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
          title="网络零售额当期前十省份排名"
          icon="icon"
          iconfont="icon-leijiline"
        >
          <div class="chart-out" id="bar-map"></div>
        </chart-map>
        <chart-map
          width="24.74vw"
          height="36vh"
          title="数据测试内容"
          icon="icon"
          iconfont="icon-leiji"
          id="left-map"
        >
          <div class="chart-out" id="line-map"></div>
        </chart-map>
      </div>
      <div class="map-center" id="bar-map-center"></div>
      <div class="map-right">
        <chart-map
          width="24.74vw"
          height="36vh"
          title="网络零售额当期走势"
          icon="icon"
          iconfont="icon-duowei"
          id="map-right"
        >
          <div class="chart-out" id="bar-map-3"></div>
        </chart-map>
        <chart-map
          width="24.74vw"
          height="36vh"
          title="实用商品网络零售额当期走势图"
          icon="icon"
          iconfont="icon-dangqiline"
        >
          <div class="chart-out" id="bar-map-4"></div>
        </chart-map>
      </div>
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
      let timeEnd = "2018-12-01" + " 00:00:00";
      this.$api.getMapChart("省市", timeEnd).then(res => {
        if (res.Code === 0) {
          // eslint-disable-next-line no-console
          console.log(res.Data);
          this.mapDataReset(res.Data);
        } else {
          // eslint-disable-next-line no-console
          console.log(res.Data);
        }
      });
    },
    // 地图数据处理
    mapDataReset(data) {
      var date = [],
        dataResetMap = [];
      data.forEach(function(ele) {
        date.push(ele.DataMonth.split("T")[0]);
      });
      date = this._.uniq(date);
      date.forEach(function(ele) {
        dataResetMap.push({
          date: ele,
          map: []
        });
      });
      dataResetMap.forEach(function(list) {
        data.forEach(function(ele) {
          if (ele.DataMonth.split("T")[0] === list.date) {
            list.map.push({
              name:
                ele.Name.indexOf("省") !== -1
                  ? ele.Name.split("省")[0]
                  : ele.Name.indexOf("内蒙古") !== -1
                  ? "内蒙古"
                  : ele.Name.substring(0, 2),
              value: (ele.OrCur / 100000000).toFixed(2)
            });
          }
        });
      });
      var dom = this.$echarts.init(document.getElementById("bar-map-center"));
      this.mapCharts(dom, date, dataResetMap, "各省份当期网络零售额绝对量");
    },
    mapCharts(dom, date, dataMap, title) {
      var seriseMap = [];
      dataMap.forEach(function(ele) {
        seriseMap.push({
          series: {
            name: ele.date,
            type: "map",
            mapType: "china",
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: ele.map
          }
        });
      });
      dom.clear();
      dom.setOption({
        baseOption: {
          timeline: {
            // y: 0,
            axisType: "category",
            autoPlay: true,
            playInterval: 2000,
            data: date,
            bottom: "5%",
            label: {
              color: "#8adaff"
            }
          },
          tooltip: {},
          title: {
            text: title,
            left: "center",
            top: "6%",
            textStyle: {
              color: "#8adaff",
              fontSize: "32"
            }
          },
          visualMap: {
            min: 0,
            max: 500,
            left: "2%",
            bottom: "4%",
            text: ["高", "低"],
            inRange: {
              color: ["#6FCF6A", "#FFFD64", "#FF5000"]
            },
            textStyle: {
              color: "#8adaff"
            }
          },
          geo: {
            map: "china",
            roam: true,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#fff"
                }
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: "transparent",
                borderColor: "#3fdaff",
                borderWidth: 2,
                shadowColor: "rgba(63, 218, 255, 0.5)",
                shadowBlur: 30
              },
              emphasis: {
                areaColor: "#2B91B7"
              }
            }
          },
          series: [
            {
              name: "",
              type: "map",
              geoIndex: 0,
              data: []
            }
          ]
        },
        options: seriseMap
      });
      var dom1 = this.$echarts.init(document.getElementById("bar-map"));
      dom.on("timelinechanged", params => {
        this.barOption(dom1, dataMap[params.currentIndex]);
      });
      this.barOption(dom1, dataMap[0]);
    },
    barOption(echartsDom, data) {
      let bar = [],
        xAisData = [];
      let list = this._.sortBy(data.map, function(arr) {
        return -arr.value;
      });
      list.slice(0, 10).forEach(function(ele) {
        bar.push(ele.value);
        xAisData.push(ele.name);
      });
      echartsDom.setOption({
        tooltip: {
          trigger: "axis"
        },
        grid: {
          top: "13%",
          right: "15%",
          left: "15%",
          bottom: "10%"
        },
        yAxis: {
          type: "category",
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          splitArea: {
            show: false
          },
          data: xAisData.reverse(),
          axisLabel: {
            textStyle: {
              color: "#9faeb5"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#4d4d4d"
            }
          }
        },
        xAxis: [
          {
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            splitArea: {
              show: false
            },
            position: "top",
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#9faeb5",
                fontSize: 16
              }
            },
            axisLine: {
              lineStyle: {
                color: "#4d4d4d"
              }
            }
          }
        ],
        series: [
          {
            name: "绝对量",
            type: "bar",
            barWidth: "50%",
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 1,
                  y: 0,
                  x2: 0,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#00d386" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#0076fc" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                barBorderRadius: 15
              }
            },
            data: bar.reverse()
          }
        ]
      });
    },
    // 柱图总计
    barTotal() {
      let timeStart = "2016-06-01" + " 00:00:00";
      let timeEnd = "2018-12-01" + " 00:00:00";
      this.$api.intotal("总体", timeStart, timeEnd).then(res => {
        if (res.Code === 0) {
          this.dataReset(res.Data);
        }
      });
    },
    dataReset(data) {
      let barDom1 = this.$echarts.init(document.getElementById("bar-map-3"));
      let barDom2 = this.$echarts.init(document.getElementById("bar-map-4"));
      let map1 = {
        date: [],
        bar: [],
        line: []
      };
      let map2 = {
        date: [],
        bar: [],
        line: []
      };
      data.forEach((ele) => {
        map1.bar.push(ele.OrCur / 100000000);
        map1.line.push(ele.OrCurYoy);
        map1.date.push(ele.DataMonth.split("T")[0]);
        map2.date.push(ele.DataMonth.split("T")[0]);
        map2.bar.push(ele.KindCur / 100000000);
        map2.line.push(ele.KindCurYoy);
      });
      this.barOption2(
        barDom1,
        map1.date,
        map1.bar,
        map1.line
      );
      this.barOption2(
        barDom2,
        map2.date,
        map2.bar,
        map2.line
      );
    },
    barOption2(echartsDom, date, bar, line) {
      echartsDom.clear();
      echartsDom.setOption({
        tooltip: {
          trigger: "axis"
        },
        grid: {
          top: "13%",
          right: "15%",
          left: "15%",
          bottom: "10%"
        },
        xAxis: {
          type: "category",
          data: date,
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#9faeb5"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#4d4d4d"
            }
          }
        },
        yAxis: [
          {
            type: "value",
            axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#9faeb5"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#4d4d4d"
            }
          }
          },
          {
            type: "value",
            axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#9faeb5"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#4d4d4d"
            }
          }
          }
        ],
        series: [
          {
            name: "绝对量",
            type: "bar",
            barWidth: "50%",
            itemStyle: {
              barBorderRadius: 5,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#00d386" },
                { offset: 1, color: "#0076fc" }
              ])
            },
            data: bar
          },
          {
            name: "占比",
            yAxisIndex: 1,
            type: "line",
            data: line,
            itemStyle: {
              color: "#e4393c"
            }
          }
        ]
      });
    }
  },
  components: {
    ChartMap
  },
  mounted() {
    this.getMapData();
    this.barTotal();
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
      #map-right {
        margin-bottom: 1.8vh;
      }
      #bar-map-3,
      #bar-map-4 {
        height: 30vh;
        font-size: 20px;
      }
    }
  }
}
</style>
