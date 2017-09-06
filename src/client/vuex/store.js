import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import calculateDistance from './calculateDistance'
import { getDistance } from 'geolib'

Vue.use(Vuex)

const state = {
  kiosks: [],
  fixits: [],
  trails: [],
  kiosksWithinLocation: [],
  location: null
}

const actions = {
  FIND_LOCATION: ({ commit }) => {
    navigator.geolocation.watchPosition((position) => {
      commit('SET_LOCATION', { location: [position.coords.latitude, position.coords.longitude] })
      // axios.get('/kiosks').then((response) => {
      //   commit('SET_KIOSKS_IN_LOC', { kiosksWithinLocation: response.data.data.filter(data => {
      //      const lat = JSON.parse(data[11])
      //      const long = JSON.parse(data[12])
      //      getDistance({latitude: position.coords.latitude, longitude: position.coords.longitude}, {latitude: lat, longitude: long}) < 1000 })
      //   })
      // })
    })
  },
  LOAD_KIOSKS: ({ commit }) => {
    axios.get('/kiosks').then((response) => {
      commit('SET_KIOSKS', { kiosks: response.data.data })
    }, (err) => {
      console.log(err)
    })
  },
  LOAD_FIXITS: ({ commit }) => {
    axios.get('/fixits').then((response) => {
      commit('SET_FIXITS', { fixits: response.data.data })
    }, (err) => {
      console.log(err)
    })
  },
  LOAD_TRAILS: ({ commit }) => {
    axios.get('/trails').then((response) => {
      commit('SET_TRAILS', { trails: response.data.features })
    }, (err) => {
      console.log(err)
    })
  }
}

const mutations = {
  SET_LOCATION(state, { location }) {
    state.location = location
  },
  SET_KIOSKS(state, { kiosks }) {
    state.kiosks = kiosks
  },
  SET_FIXITS(state, { fixits }) {
    state.fixits = fixits
  },
  SET_TRAILS(state, { trails }) {
    state.trails = trails
  }
  // SET_KIOSKS_IN_LOC(state, { kiosksWithinLocation }) {
  //   state.kiosksWithinLocation = kiosksWithinLocation
  // }
}

const getters = {
  location: state => state.location,
  kiosks: state => state.kiosks,
  fixits: state => state.fixits,
  trails: state => state.trails,
  kiosksWithinLocation: state => state.kiosks.filter(data => {
     const lat = JSON.parse(data[11])
     const long = JSON.parse(data[12])
     console.log(state.location)
     getDistance({latitude: state.location[0], longitude: state.location[1]}, {latitude: lat, longitude: long}) < 1000
  })
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
