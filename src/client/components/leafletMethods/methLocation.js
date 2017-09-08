/* eslint-disable no-undef */
/* eslint-disable max-len */
import accuratePosition from './accuratePosition'

  let firstRun = true
  let  position = L.marker([51.505, -0.09]).bindPopup('Configuring your location...').addTo(mymap).openPopup()
  let area = L.circle([51.505, -0.09], 120).addTo(mymap)

  locate: (context, mymap) => {
    console.log('thisssss', firstRun)
    const asdfa = locationObj()
    console.log('true', asdfa)
    //sets markers at the location and adjust view
    function onLocationFound(e) {
      const radius = e.accuracy / 2
      const latln = { lat: e.latitude, lng: e.longitude }

      mymap.removeLayer(position)
      mymap.removeLayer(area)
      position = L.marker([latln.lat, latln.lng])
      .bindPopup(`You are within ${radius} meters from this point`).addTo(mymap)
      area = L.circle(latln, radius).addTo(mymap)
      // this.setView()
    }
    // mymap.on('locationFound', onLocationFound)

    // updates location based on navigator
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        onLocationFound(position.coords)
      })
    }
    accuratePosition.findAccuratePosition.bind(this, { maxWait: 15000, desiredAccuracy: 10, enableHighAccuracy: true })
  }

  setView: () => {
    // if (true) {
    if (firstRun || context.$store.state.viewLocked) {
      mymap.setView(latln, 18)
      //because set view toggles viewLocked to false
      context.$store.commit('TOGGLE_VIEW_LOCKED', true)
      firstRun = false
    }
  }

  export {location, setView}
