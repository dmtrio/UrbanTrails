<template>
  <div>
    <h1>Welcome</h1>
    <Home></Home>
    <!-- <p>{{ status }}</p> -->
    <!-- <p>{{ count }}</p> -->
    <leafletMap></leafletMap>
    <!-- <button @click="changeStatus">Change Status</button> -->
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
