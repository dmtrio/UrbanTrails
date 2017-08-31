/* eslint-disable */
import Vue from 'vue'
import Home from '../components/Home.vue'

import { mount } from 'avoriaz'
import Vuex from 'vuex'

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

// Inspect the raw component options
test('Home has a computed hook', () => {
  expect(Home.computed.countTwo).toBeInstanceOf(Function)
})

// Mount an instance and inspect the render output
test('renders the correct message', () => {
  const Ctor = Vue.extend(Home)
  const wrapper = mount(Ctor, { store })
  expect(wrapper.find('p')[0].text()).toBe("other 0")
})
