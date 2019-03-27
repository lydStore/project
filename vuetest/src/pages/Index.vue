<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: '首页'
    }
  },
  mounted(){
    this.$get('/platform/all',{id:1})
      .then((response) => {
        // console.log(response);
      }).catch(e=>{
        //  console.log(e)
      })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  font-size: .32rem
}
</style>
