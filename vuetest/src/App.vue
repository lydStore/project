<template>
  <div id="app">
    <router-view/>
    <Foot/>
  </div>
</template>

<script>
import Foot from './components/Foot'
export default {
  name: 'App',
  data(){
    return{

    }
  },
  components:{
    Foot
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
