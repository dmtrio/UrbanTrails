/* eslint-disable*/
import Vue from 'vue'
import Vuex from 'vuex'

//main component
import App from './App.vue'
//other components
import Home from './Home.vue'

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

new Vue({
  // Passing down Vuex store to all child components
  store,
  //element where it will be rendered
  el: '#app',
  //render app component to the dom
  render: h => h(App)
})
