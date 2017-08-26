/* eslint-disable*/
import Vue from 'vue'
import Vuex from 'vuex'

//main component
import App from './App.vue'
//other components
import Home from './Home.vue'

Vue.use(Vuex)
//register component to be used globally including inside other components
Vue.component('Home', Home)

new Vue({
  //element where it will be rendered
  el: '#app',
  //render app component to the dom
  render: h => h(App)
})
