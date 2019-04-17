<template>
  <div class="footer">
    <router-link to="/index">首页</router-link>
    <router-link to="/game">游戏</router-link>
    <router-link to="/news">新闻</router-link>
    <router-link to="/my">我的</router-link>
  </div>
</template>
<script>
export default {
  name: "foot"
};
</script>
<style scoped lang="less">
ul,
li {
  list-style: none;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  font-size: 0.24rem;
  color: #000;
  a {
    text-decoration: none;
    color: #000;
    display: block;
    height: 0.64rem;
    background: #eee;
    width: 100%;
    line-height: 0.64rem;
    &.current {
      color: #fff;
      background: #ff7200;
    }
  }
}
</style>
