<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to="/game/detail/1">详情</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Games",
  data() {
    return {
      msg: "游戏"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 0.32rem;
}
</style>
