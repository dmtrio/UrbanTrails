<template>
  <div id="mapid">
    <Dropdown></Dropdown>
  </div>
</template>

<script>
  import * as L from 'leaflet';
  import * as Pin from 'leaflet.marker.pin'
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
        this.fixitMarkers()
      },
      kiosks: function() {
        this.kioskMarkers()
      },
      trails: function(){
        this.addTrails()
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
      }
    },
    methods: {
      fixitMarkers() {
        this.fixits.forEach((chunk) => {
          let lat = chunk[11][1]
          let lon = chunk[11][2]
          let name = chunk[8]
          let address = JSON.parse(chunk[11][0]).address
          let marker = L.marker([lat, lon])
          marker.bindPopup(`<b>${name} Fixit Station</b><br>${address}`)
          this.$data.fixitsLayer.addLayer(marker)
        })
      },
      kioskMarkers() {
        this.kiosks.forEach((chunk) => {
          if (chunk[10] === 'active') {
            let address = chunk[9]
            let lat = chunk[11]
            let lon = chunk[12]
            let marker = L.marker([lat, lon])
            marker.bindPopup(`${address} Bicycle Kiosk`)
            this.$data.kiosksLayer.addLayer(marker)
          }
        })
      },
      addTrails() {
        this.$data.trailsLayer.addData(this.trails)
      },

      makeMap() {

        var myInterface = L.marker.pin.interface ( );

        myInterface.UserLanguage = 'en';

        myInterface.addDefaultCategories ( );

        myInterface.setCallbackFunction ( function ( ) { history.pushState ( { index : "bar" } , "page", '?pin=' + myInterface.stringifyPins ( ) ); });

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
        //end map location

        // layer control
        var baseMaps = {
            "Main": this.$data.mainLayer,
        };

        var overlayMaps = {
            "Trails": this.$data.trailsLayer,
            "Fixits": this.$data.fixitsLayer,
            "Kiosks": this.$data.kiosksLayer,
        };

        L.control.layers(baseMaps, overlayMaps).addTo(mymap);
        //end layer control



        mymap.on ( 'click', function ( Event ) { myInterface.newPin ( mymap, Event.latlng )} );
        mymap.on ( 'contextmenu', function ( Event ) { myInterface.newPin ( mymap, Event.latlng )} );

        var Search = decodeURI ( window.location.search );
        if ( 0 <= Search.indexOf ( 'pin=' ) ) { myInterface.parsePins ( Search.substr ( Search.indexOf ( 'pin=' ) + 4 ), mymap );}

      function getHandlerForFeature(feat) {  // A function...
        return function(ev) {   // ...that returns a function...
          console.log(feat);  // ...that has a closure over the value.
        }
      }

        // The button doesn't exist in the DOM until the popup has been opened, so
        this.map.on('popupopen', function(){
          L.DomEvent.on(
            document.getElementById('mybutton'),
            'click',
            getHandlerForFeature("hi guys!!") // The result of this call is the event handler func.
          );
        });

        function doubleClick (e) {
          let myFunc = function myFunc() {
            console.log('hello everyone')
          }

          var popup = L.popup.call(this)
              .setLatLng([e.latlng.lat, e.latlng.lng])
              .setContent("<button id='mybutton'>Foo!</button>")
              .openOn(mymap);
        }

        this.map.on('dblclick', doubleClick.bind(this))

      },
    },
  };
</script>

<style>
  #mapid {height: 500px;}
</style>
