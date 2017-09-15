<template>
  <div id="routing-directions">
    <transition-group name="slide-up-fade" tag="div">
      <div class="instructions" v-for="(inst, index) in $data.instructions" :key="inst.index" v-show="((inst.index > $store.state.route.waypointIndices[1]) && (index < $data.showCount))  && routePopupClosed">
        <v-card>
          <v-card-title primary-title>
            <p> {{ inst.text }} </p> <span class='arrow'> {{ inst.type === 'Head' ? '⇧' : inst.type === 'Left' ? '⇧' : inst.type === 'Right' ? '⇨' : '⇧'}} </span>
          </v-card-title>
          {{Math.round(inst.distance) >= 1600 ? `${Math.round(inst.distance) % 1600} mi` : `${Math.round(inst.distance)} m`}} • {{Math.round(inst.time) > 60 ? `${Math.round(inst.time % 60) * 1.5} min` : `${Math.round(inst.time % 60) * 1.5} sec`}}
        </v-card>
      </div>
    </transition-group>
  </div>
</template>

<script>
  export default {
    props: ['routePopup'],
    data() {
      return {
        showCount: 2,
        instructions: [],
      }
    },
    watch: {
      route: function() {
        this.$data.instructions = []
        let current = this.$store.state.route.waypointIndices[1]
        let all = this.$store.state.route.instructions
        for (let inst of all ) {
          if (inst.index > current) {
            this.$data.instructions.push(inst)
          }
        }
      }
    },
    computed: {
      route: function() { return this.$store.getters.route },
      routePopupClosed: function () { return !this.routePopup }
    }
  }
</script>
<style>
  .arrow {
    padding: 10px;
    margin-top: -14px;
  }
  .card {
    text-align: center;
  }
  #routing-directions {
    position: fixed;
    z-index: 1050;
    bottom: 0px;
    width: 100%;
    text-align: center;
  }

  #routing-directions > div{
    display: inline-block;
    min-width: 350px;
    // background-color: white;
  }
  .instructions {

  }
  .instructions > div{
    margin-bottom: 10px;
  }

  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .slide-up-fade-enter-active {
    transition: all .5s ease;
  }
  .slide-up-fade-leave-active {
    transition: all .5s ease;
  }
  .slide-up-fade-enter, .slide-up-fade-leave-to
  /* .slide-up-fade-leave-active below version 2.1.8 */ {
    transform: translatey(333%);
    // opacity: 0;
  }

  .card__title {
    -webkit-box-align: center;
    font-weight: 500;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding: 16px;
  }
</style>
