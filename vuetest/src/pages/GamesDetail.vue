<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Games',
  data () {
    return {
      msg: '游戏详情',
      id2:0
    }
  },
  mounted() {
    let id = this.$route.params.id;
    this.id2 = id;
    console.log(this.id2)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  font-size: .32rem
}
</style>
