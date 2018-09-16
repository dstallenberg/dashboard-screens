<template>
<div>
  {{ time }}
</div>
</template>

<script>
import BasicWidget from './BasicWidget'
export default {
  name: 'clock',
  extends: BasicWidget,
  mounted () {
    this.$options.interval = setInterval(this.updateDateTime, 1000)
    this.updateDateTime()
    // console.log(this.minWidth)
  },
  methods: {
    updateDateTime () {
      this.time = new Date().toLocaleTimeString()
    }
  },
  data () {
    return {
      time: 0
    }
  }
}
</script>

<style scoped>

</style>
