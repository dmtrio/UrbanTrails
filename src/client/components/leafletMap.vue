<template>
  <div id="mapid"></div>
</template>

<script>

import * as L from 'leaflet';
import fixit from './fixit.json'
import AustinTrails from './AustinTrails.geojson'
import bCycleKiosks from './bCycleKiosks.json'

export default {
  data() {
    return {
      fixit: fixit.data,
      kiosks: bCycleKiosks.data
    };
  },
  mounted() {
    this.makeMap();
  },
  methods: {
    makeMap() {
      let mymap = L.map('mapid').locate({setView: true, maxZoom: 14});
      
      L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGlyb3kiLCJhIjoiY2o2d21xbHRiMXhqOTJ3bGFxZ3l2bm1sMSJ9.rIS4v4TvYEdQctZulEKzCg', {
        maxZoom: 18,
        id: 'mapbox.streets'
      }).addTo(mymap);

      this.$data.fixit.forEach((chunk) => {
        let lat = chunk[11][1]
        let lon = chunk[11][2]
        let name = chunk[8]
        let address = JSON.parse(chunk[11][0]).address
        let marker = L.marker([lat, lon]).addTo(mymap);
        marker.bindPopup(`<b>${name} Fixit Station</b><br>${address}`)
      })

      this.$data.kiosks.forEach((chunk) => {
        if (chunk[10] === 'active') {
          let address = chunk[9]
          let lat = chunk[11]
          let lon = chunk[12]
          let marker = L.marker([lat, lon]).addTo(mymap);
          marker.bindPopup(`${address} Bicycle Kiosk`)
        }
      })


      L.geoJSON(AustinTrails).addTo(mymap);

      function onLocationFound(e) {
        var radius = e.accuracy / 2;

        L.marker(e.latlng).addTo(mymap)
          .bindPopup("You are within " + radius + " meters from this point").openPopup();

        L.circle(e.latlng, radius).addTo(mymap);
      }

      mymap.on('locationfound', onLocationFound);

    },
    
  },
};


  </script>

<style>
#mapid { height: 500px; }

</style>
