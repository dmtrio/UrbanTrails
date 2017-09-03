/* eslint-disable */
import Vue from 'vue'
import leafletMap from '../components/leafletMap.vue'

// Mock geojson data so that the tests don't error out
jest.mock('../data/AustinTrails.geojson', ()=>({
  settings: 'someSetting'
}), { virtual: true })

// Inspect the raw component options
test('leafletMap has a mounted hook', () => {
  expect(leafletMap.mounted).toBeInstanceOf(Function)
})

// inspect default data
test('leafletMap sets the correct default data', () => {
  const defaultData = leafletMap.data()
  expect(defaultData.map).toBe('blah')
})
