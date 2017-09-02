<template>
  <div id="mapid">
    <Dropdown :toggleLayer="toggleLayer"></Dropdown>
    <areaReporting></areaReporting>
  </div>
</template>

<script>
import { Routing } from "leaflet-routing-machine"
  import * as L from 'leaflet';
  import meth from './leafletMethods/leafletMethods.js'
  import loadLayer from './leafletMethods/methLoadLayer.js'
  import customPopup from './leafletMethods/methPopup.js'
  import hamburger from './leafletMethods/methHamburger.js'
  import mLocation from './leafletMethods/methLocation.js'
  export default {
    data() {
      return {
        w: 700,
        h: 580,
        map: 'blah',
        mainLayer: null,
        trailsLayer: null,
        fixitsLayer: null,
        kiosksLayer: null,
      };
    },
    beforeCreate() {
      this.$store.dispatch('LOAD_KIOSKS')
      this.$store.dispatch('LOAD_TRAILS')
      this.$store.dispatch('LOAD_FIXITS')
    },

    mounted() {
      this.makeMap()
    },
    watch: {
      fixits: function() {
        loadLayer.fixitMarkers(this)
      },
      kiosks: function() {
        loadLayer.kioskMarkers(this)
      },
      trails: function(){
        loadLayer.addTrails(this)
      },
    },
    computed: {
      kiosks: function() {
          return this.$store.getters.kiosks
      },
      trails: function() {
          return this.$store.getters.trails
      },
      fixits: function() {
          return this.$store.getters.fixits
      },
      allLayers: function() {
        let layers = [ this.$data.mainLayer, this.$data.trailsLayer, this.$data.fixitsLayer, this.$data.kiosksLayer ]
        return layers
      }

    },
    methods: {
      toggleLayer(layer) {
        hamburger.toggleLayer(layer, this, this.$data.map)
      },

      makeMap() {

        //layers including empty
        this.$data.mainLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGlyb3kiLCJhIjoiY2o2d21xbHRiMXhqOTJ3bGFxZ3l2bm1sMSJ9.rIS4v4TvYEdQctZulEKzCg', {
            maxZoom: 18,
            id: 'mapbox.streets'
        })

        this.$data.trailsLayer = L.geoJSON()

        this.$data.fixitsLayer = L.layerGroup('')

        this.$data.kiosksLayer = L.layerGroup('')

        //end layers

        //map creation
        var mymap = L.map('mapid', {
            center: [51.505, -0.09],
            zoom: 13,
            layers: [
            this.$data.mainLayer,
            this.$data.trailsLayer,
            this.$data.fixitsLayer,
            this.$data.kiosksLayer]
        });
        this.$data.map = mymap
        //end map creation

        //map location

        let clientlng = navigator.geolocation.watchPosition((position) => position.coords.longitude )
        let clientlat = navigator.geolocation.watchPosition((position) => position.coords.latitude )
        let marker = L.marker([51.505, -0.09]).addTo(mymap);
        marker.bindPopup('Configuring your location...').openPopup()
        var circle = L.circle([51.505, -0.09], 0).addTo(mymap)


        function onLocationFound(e) {
          if (circle) {
            mymap.removeLayer(circle)
          }
          var radius = e.accuracy / 2
          var latln = {lat: e.latitude, lng: e.longitude}
          mymap.setView(latln, 18)
          marker.setLatLng(latln).closePopup()
          .bindPopup("You are within " + radius + " meters from this point").openPopup()
          circle = L.circle(latln, radius).addTo(mymap)
        }
        mymap.on('locationfound', onLocationFound)

        if (navigator.geolocation) {
          navigator.geolocation.watchPosition((position) => {
            onLocationFound(position.coords)
          })
        }
        mymap.locate()

          L.Routing.control({
              waypoints: [
                  L.latLng(57.74, 11.94),
                  L.latLng(57.6792, 11.949)
              ]
          }).addTo(this.map);
        //add to here later
        //mLocation.locate(this, mymap)

        //end map location

        // layer control
        // hamburger.addControl(this, mymap)
        //end layer control

        function getHandlerForFeature(feat) {  // A function...
          return function(ev) {   // ...that returns a function...
            console.log(feat);  // ...that has a closure over the value.
          }
        }

        function click (e) {
          console.log('One, ah ah ah');
        }

        function doubleClick (e) {
          console.log('TWO, AH AH AH');
          let pos = [e.latlng.lat, e.latlng.lng]
          var reports = document.getElementsByClassName('reporting');
          reports[0].setAttribute('id', 'selected');
        }

        mymap.on('dblclick', doubleClick.bind(this));
        mymap.on('click', click.bind(this));

        // mymap.on('dblclick', () => {hamburger.toggleLayer(this, mymap, 'kiosksLayer')})

      },
    }
  }
</script>

<style>
  #mapid {height: 100%;}
</style>
