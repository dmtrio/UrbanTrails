import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  kiosks: [],
  fixits: [],
  trails: []
}

const actions = {
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
  SET_KIOSKS(state, { kiosks }) {
    state.kiosks = kiosks
  },
  SET_FIXITS(state, { fixits }) {
    state.fixits = fixits
  },
  SET_TRAILS(state, { trails }) {
    state.trails = trails
  }
}

const getters = {
  kiosks: state => state.kiosks,
  fixits: state => state.fixits,
  trails: state => state.trails
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
