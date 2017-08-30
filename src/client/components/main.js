import Vue from 'vue'
import * as Vue2Leaflet from 'vue2-leaflet'
import VueAsyncData from 'vue-async-data'
//vuex store
import store from '../vuex/store'
//main component
import App from './App.vue'
//other components
import Map from './Map.vue'
import leafletMap from './leafletMap.vue'

Vue.use(VueAsyncData)

//register component to be used globally including inside other components
Vue.component('Map', Map)
Vue.component('leafletMap', leafletMap)
Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
Vue.component('v-marker', Vue2Leaflet.Marker);

new Vue({
  //inject store into all components
  store: store,
  //element where it will be rendered
  el: '#app',
  //render app component to the dom
  render: h => h(App)
})
