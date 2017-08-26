<template>
  <div>
    <h1>HI</h1>
    <Home></Home>
    <p>{{ status }}</p>
    <p>{{ count }}</p>
    <button @click="changeStatus">Change Status</button>
    <Map></Map>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        msg: 'data message',
        status: 'In Progress'
      }
    },
    computed: {
      count() {
        return this.$store.state.count
      }
    },
    methods: {
      changeStatus() {
        this.status = 'Done';
      }
    }
  }

</script>
