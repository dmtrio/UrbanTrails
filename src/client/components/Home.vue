<template>
  <div>
    <h1>HI3</h1>
    <p>other {{ countTwo }}</p>
  </div>
</template>
<script>
  export default {
    computed: {
      countTwo() {
        return this.$store.state.count
      }
    }
  }
</script>
