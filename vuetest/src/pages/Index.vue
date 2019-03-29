<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="(item,index) in dataList" :key = "index">{{item.id}}</li>
    </ul>
  </div>
</template>

<script>
import { getindex } from "../utils/api";
export default {
  name: "Index",
  data() {
    return {
      msg: "首页",
      dataList:[]
    };
  },
  methods: {
    initList(){
      getindex().then(res => {
        this.dataList = res.data;
      }).catch(error=>{
        console.log(error)
      });
    }
  },
  created () {
    this.initList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 0.32rem;
}
ul,li{
  list-style:none;
  font-size:.24rem;
}
</style>
