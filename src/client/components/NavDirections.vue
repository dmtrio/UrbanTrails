<template>
  <div id="routing-directions">
    <li v-for="inst in $store.state.route.instructions" :key="inst.index" v-if="inst.index > $store.state.route.waypointIndices[1]">
      {{ inst.text }} {{inst.index}} current point {{$store.state.route.waypointIndices[1]}}
    </li>
  </div>
</template>

<script>
  import { getDistance, findNearest } from 'geolib'
  export default {

    data() {
      return {
        currentPoint: 10,
      }
    },
    watch: {
      // location: function() {
      //   this.$data.nearest = findNearest(
      //     { latitude: this.$store.getters.location[0], longitude: this.$store.getters.location[1] },
      //       this.$store.state.route.coordinates
      //   )
      // },
    },
    computed: {
      // location: function() { return this.$store.getters.location }
    },

    methods: {
      // closestWaypoint() {
      //
      // }
    }
  }
</script>
<styles>
  #routing-directions {
    position: fixed;
    z-index: 1050;
    bottom: 0px;
    width: 100%;
  }
</styles>
