<template>
  <div>
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
