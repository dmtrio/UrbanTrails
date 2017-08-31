<template>
  <div >
    <input id="hamburger" @click="toggleVisible" type="image" src="./static/graphics/menu-250.png" />
    <transition name="slide-fade">
      <div id="dropdown-list" v-if="visible">
        <ul>
          <li><p>other {{ countTwo }}</p></li>
          <li><p>other {{ countTwo }}</p></li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
      }
    },
    computed: {
      countTwo() {
        return this.$store.state.count
      }
    },
    methods: {
      toggleVisible() {
        this.$data.visible = !this.$data.visible
      }
    }
  }
</script>
<style >

  #hamburger {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 500;
    width: 30px;
  }

  #dropdown-list {
    position: relative;
    width: 200px;
    // height: 0px;
    float: right;
    background-color: #9E9E9E;
    top: -20px;
    padding: 50px 0px 0px;
    z-index: 450;
  }

  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .slide-fade-enter-active {
    transition: all .5s ease;
  }
  .slide-fade-leave-active {
    transition: all .5s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translatey(-200px);
    // opacity: 0;
  }

</style>
