<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="initList">请求数据</button>
    <ul>
      <li v-for="(item,index) in dataList" :key="index">{{item.id}}----{{item.name}}---{{item.age}}</li>
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
      dataList: []
    };
  },
  methods: {
    async initList() {
      try{
        const res = await getindex();
        if (res.ret === "0") {
          this.dataList = res.data;
        }
      }catch(error){
        console.log(error)
      }
    }
  },
  created() {
    this.initList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
h1 {
  font-size: 0.32rem;
}
ul {
  li {
    list-style: none;
    font-size: 0.4rem;
    text-align: left;
  }
}
button {
  width: 1.6rem;
  height: 0.48rem;
  line-height: 0.48rem;
  background: #ff7200;
  color: #fff;
  font-size: 0.24rem;
  border-radius: 4px;
  border: 0;
  outline: 0;
}
</style>
