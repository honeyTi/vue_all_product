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
  }
};
</script>
<style>
</style>
