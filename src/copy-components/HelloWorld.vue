<template>
  <!--<grid-component :initialBoxes="['clock', 'clock']" />-->
  <!--<clone></clone>-->
  <app/>
</template>

<script>
// import GridComponent from './GridComponent'
// import clone from './clone'
import App from './demo/App'


export default {
  name: 'HelloWorld',
  components: {
    // GridComponent,
    App
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
