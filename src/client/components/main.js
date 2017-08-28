/* eslint-disable*/
import Vue from 'vue'
import Vuex from 'vuex'
import * as Vue2Leaflet from 'vue2-leaflet'

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

//register component to be used globally including inside other components
Vue.component('Home', Home)
Vue.component('Map', Map)
Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
Vue.component('v-marker', Vue2Leaflet.Marker);

new Vue({
  // Passing down Vuex store to all child components
  store,
  //element where it will be rendered
  el: '#app',
  //render app component to the dom
  render: h => h(App)
})
