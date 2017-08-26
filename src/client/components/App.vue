<template>
  <div>
    <h1>HI</h1>
    <Home></Home>
    <p>{{ status }}</p>
    <button @click="changeStatus">Change Status</button>
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
    methods: {
      changeStatus() {
        this.status = 'Done';
      }
    }
  }

</script>
