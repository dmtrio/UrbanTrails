/* eslint-disable*/
import Vue from 'vue'
import Vuex from 'vuex'
import * as VueGoogleMaps from 'vue2-google-maps'

//main component
import App from './App.vue'
//other components
import Home from './Home.vue'
import Map from './Map.vue'

//VUEX STORE FOR ALL COMPONENTS
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBvWE_sIwKbWkiuJQOf8gSk9qzpO96fhfY',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
})

//register component to be used globally including inside other components
Vue.component('Home', Home)
Vue.component('Map', Map)

new Vue({
  // Passing down Vuex store to all child components
  store,
  //element where it will be rendered
  el: '#app',
  //render app component to the dom
  render: h => h(App)
})
