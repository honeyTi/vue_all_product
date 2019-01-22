<!-- page1map -->
<template>
  <div>
    <button @click="setName(nameChange)">修改名字</button>
    <button @click="setAge(312312)">修改年龄</button>
    <div>
      {{name}} - {{age}}
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      nameChange: "John"
    };
  },
  computed: {
    ...mapGetters(["name", "age"])
  },
  methods: {
    ...mapMutations({
      setName: "SET_NAME",
      setAge: "SET_AGE"
    }),
    ...mapActions(["nameAsyn"])
  },
  mounted() {
    this.http
      .get("/index/GetCharts", {
        types: "总体",
        timeStart: "2016-12-01 00:00:00",
        timeEnd: "2016-12-01 00:00:00"
      })
      .then(res => {
        // eslint-disable-next-line no-console
        console.log(res.data);
      });
  }
};
</script>
<style>
</style>
