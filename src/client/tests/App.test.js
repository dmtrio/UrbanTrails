/* eslint-disable */
import Vue from 'vue'
import App from '../components/App.vue'

// Inspect the raw component options
test('App has a computed hook', () => {
  expect(App.computed.count).toBeInstanceOf(Function)
})

// inspect default data
test('App', () => {
  const defaultData = App.data()
  expect(defaultData.status).toBe('In Progress')
})

