import Vue from 'vue'
import * as Vue2Leaflet from 'vue2-leaflet'
import VueAsyncData from 'vue-async-data'
// vuex store
import store from '../vuex/store'
// main component
import App from './App.vue'
// other components
import Map from './Map.vue'
import leafletMap from './leafletMap.vue'
<<<<<<< HEAD
import areaReporting from './areaReporting.vue'
import Home from './Home.vue'
=======
import Dropdown from './Dropdown.vue'

>>>>>>> dropdown working

Vue.use(VueAsyncData)

// register component to be used globally including inside other components
<<<<<<< HEAD
Vue.component('Map', Map)
Vue.component('App', App)
Vue.component('Home', Home)
=======
// Vue.component('Map', Map)
>>>>>>> dropdown working
Vue.component('leafletMap', leafletMap)
Vue.component('v-map', Vue2Leaflet.Map)
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer)
Vue.component('v-marker', Vue2Leaflet.Marker)
<<<<<<< HEAD
Vue.component('areaReporting', areaReporting)
=======
Vue.component('Dropdown', Dropdown)

>>>>>>> dropdown working

new Vue({
  // inject store into all components
  store,
  // element where it will be rendered
  el: '#app',
  // render app component to the dom
  render: h => h(App)
})
