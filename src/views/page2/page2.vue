<!-- page2 -->
<template>
  <div class="bg">
    <div class="title">
      <h1>{{prov}}电商交易分析</h1>
    </div>
    <div class="content">
      <div class="chart1">
        <div class="chart-item" id="bar-or"></div>
        <div class="chart-item" id="bar-county1"></div>
      </div>
      <div class="chart2">
        <div class="chart-item" id="bar-kind"></div>
        <div class="chart-item" id="bar-county2"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prov: "",
      provData: {
        上海: "上海市",
        云南: "云南省",
        内蒙古: "内蒙古自治区",
        北京: "北京市",
        吉林: "吉林省",
        四川: "四川省",
        天津: "天津市",
        宁夏: "宁夏回族自治区",
        安徽: "安徽省",
        山东: "山东省",
        山西: "山西省",
        广东: "广东省",
        广西: "广西壮族自治区",
        新疆: "新疆维吾尔自治区",
        江苏: "江苏省",
        江西: "江西省",
        河北: "河北省",
        河南: "河南省",
        浙江: "浙江省",
        海南: "海南省",
        湖北: "湖北省",
        湖南: "湖南省",
        甘肃: "甘肃省",
        福建: "福建省",
        西藏: "西藏自治区",
        贵州: "贵州省",
        辽宁: "辽宁省",
        重庆: "重庆市",
        陕西: "陕西省",
        青海: "青海省",
        黑龙江: "黑龙江"
      }
    };
  },
  methods: {
    getProvData(prov) {
      let timeEnd = "2018-12-01" + " 00:00:00";
      this.$api.getProv("省市", prov, timeEnd).then(res => {
        if (res.Code === 0) {
          this.barDataReset(res.Data);
        }
      });
    },
    barDataReset(data) {
      // 网络零售额
      var map1 = {
        orAcc: [],
        xAxis: [],
        title: ""
      };
      // 实用商品网络零售额
      var map2 = {
        kindCur: [],
        xAxis: [],
        title: ""
      };
      map1.title = this.prov + "网络销售当期绝对量";
      map2.title = this.prov + "实际商品网络销售额当期绝对量";
      data.forEach(ele => {
        // eslint-disable-next-line no-console
        map1.orAcc.push(ele.OrCur / 100000000);
        map1.xAxis.push(ele.DataMonth.split("T")[0]);
        map2.kindCur.push(ele.KindCur / 100000000);
        map2.xAxis.push(ele.DataMonth.split("T")[0]);
      });
      var chart1 = this.$echarts.init(document.getElementById("bar-or"));
      var chart2 = this.$echarts.init(document.getElementById("bar-kind"));
      this.barOption2(chart1, map1.xAxis, map1.orAcc, map1.title);
      this.barOption2(chart2, map2.xAxis, map2.kindCur, map2.title);
    },
    barOption2(echartsDom, date, bar, title) {
      echartsDom.clear();
      echartsDom.setOption({
        title: {
          text: title,
          left: "center",
          textStyle: {
            color: "#9faeb5",
            fontSize: "22"
          },
          top: "5%"
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          top: "25%",
          right: "15%",
          left: "15%",
          bottom: "20%"
        },
        xAxis: {
          name: "时间",
          type: "category",
          data: date,
          axisTick: {
            show: false
          },
          nameTextStyle: {
            color: "#9faeb5"
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
            name: "单位（亿元）",
            type: "value",
            nameTextStyle: {
              color: "#9faeb5"
            },
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
          }
        ]
      });
    },
    getCountyData(prov) {
      let timeEnd = "2018-12-01" + " 00:00:00";
      this.$api.getCountyData(prov, "不分地区", timeEnd).then(res => {
        if (res.Code === 0) {
          // eslint-disable-next-line no-console
          this.countyDataReset(res.Data);
        }
      });
    },
    countyDataReset(data) {
      // eslint-disable-next-line no-console
      console.log(data);
      var date_list = [];
      data.forEach(ele => {
        date_list.push(ele.DateMonth.split("T")[0]);
      });
      date_list = this._.uniq(date_list);

      var mapSerise1 = [];
      var mapSerise2 = [];
      date_list.forEach(ele => {
        var serise1 = {
          xAxis: [],
          data1: [],
          data2: []
        };
        data.forEach(map => {
          if (map.DateMonth.split("T")[0] === ele) {
            serise1.xAxis.push(map.CityName);
            serise1.data1.push(map.OrAcc / 100000000);
            serise1.data2.push(map.OrCur / 100000000);
          }
        });
        mapSerise1.push({
          title: {
            text: ele + this.prov + "所属地区当期累计绝对量",
            left: "center",
            textStyle: {
              color: "#9faeb5",
              fontSize: "22"
            },
            top: "5%"
          },
          xAxis: {
            data: serise1.xAxis,
          },
          series: {
            type: "bar",
            barWidth: "50%",
            itemStyle: {
              barBorderRadius: 5,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#00d386" },
                { offset: 1, color: "#0076fc" }
              ])
            },
            data: serise1.data1
          }
        });
        mapSerise2.push({
          title: {
            text: ele + this.prov +  "所属地区当期绝对量",
            left: "center",
            textStyle: {
              color: "#9faeb5",
              fontSize: "22"
            },
            top: "5%"
          },
          xAxis: {
            data: serise1.xAxis,
          },
          series: {
            type: "bar",
            barWidth: "50%",
            itemStyle: {
              barBorderRadius: 5,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#00d386" },
                { offset: 1, color: "#0076fc" }
              ])
            },
            data: serise1.data2
          }
        });
      });
      // eslint-disable-next-line no-console
      console.log(mapSerise1)
      var dom1 = this.$echarts.init(document.getElementById('bar-county1'));
      var dom2 = this.$echarts.init(document.getElementById('bar-county2'));
      this.countyOption(dom1, mapSerise1, date_list);
      this.countyOption(dom2, mapSerise2, date_list);
    },
    countyOption(dom, serise, date) {
      dom.clear();
      dom.setOption({
        baseOption: {
          timeline: {
            axisType: "category",
            autoPlay: true,
            playInterval: 3000,
            data: date
          },
          tooltip: {
            trigger: "axis"
          },
          grid: {
            top: "25%",
            right: "15%",
            left: "15%",
            bottom: "20%"
          },
          xAxis: {
            name: "地区",
            type: "category",
            data: [],
            axisTick: {
              show: false
            },
            nameTextStyle: {
              color: "#9faeb5"
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
              name: "单位（亿元）",
              type: "value",
              nameTextStyle: {
                color: "#9faeb5"
              },
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
          series: {
            type: 'bar',
            barWidth: "50%",
            itemStyle: {
              barBorderRadius: 5,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#00d386" },
                { offset: 1, color: "#0076fc" }
              ])
            },
            data: []
          }
        },
        options: serise
      });
    }
  },
  mounted() {
    this.prov = this.provData[this.$route.params.city];
    this.getProvData(this.prov);
    this.getCountyData(this.prov);
  }
};
</script>
<style lang='scss' scoped>
.bg {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/img/bg-2-big.png") no-repeat;
  background-size: 100% 100%;
  div.title {
    width: 100vw;
    h1 {
      width: 36.45vw;
      margin: 0 auto;
      height: 5.5vh;
      line-height: 5.5vh;
      background: url("../../assets/img/title-2.png") no-repeat;
      background-size: 100% 100%;
      color: #fff;
      font-size: 32px;
      font-style: italic;
      font-weight: bold;
      text-align: center;
      letter-spacing: 1rem;
      text-shadow: 0 0 10px#fff;
      margin-bottom: 2vh;
    }
  }
  div.content {
    width: 96.875vw;
    height: 90vh;
    margin: 0 auto;
    background: url("../../assets/img/bg-2.png") no-repeat;
    background-size: 100% 100%;
    padding: 3.5vh 3.6vw 7.5vh;
    .chart1,
    .chart2 {
      width: 100%;
      height: 37vh;
      margin-bottom: 5vh;
      display: flex;
      justify-content: space-between;
      .chart-item {
        width: 42.3875vw;
        height: 37vh;
        background: url("../../assets/img/chart-bg-2.png") no-repeat;
        background-size: 100% 100%;
        padding: 1vh 1.5vw;
      }
    }
    .chart2 {
      margin-bottom: 0;
    }
  }
}
</style>