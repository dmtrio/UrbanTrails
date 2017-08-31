<template>
  <div id="mapid">
    <Dropdown></Dropdown>
  </div>
</template>

<script>
<<<<<<< HEAD
import * as L from 'leaflet';
import * as Pin from 'leaflet.marker.pin'
export default {
  data() {
    return {
      w: 700,
      h: 580,
      map: "blah"
    };
  },
  beforeCreate() {
    this.$store.dispatch('LOAD_KIOSKS')
    this.$store.dispatch('LOAD_TRAILS')
    this.$store.dispatch('LOAD_FIXITS')
  },
=======
  import * as L from 'leaflet';
  export default {
    data() {
      return {
        w: 700,
        h: 580,
      };
    },
    beforeCreate() {
      this.$store.dispatch('LOAD_KIOSKS')
      this.$store.dispatch('LOAD_TRAILS')
      this.$store.dispatch('LOAD_FIXITS')
    },
>>>>>>> dropdown working
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
        let marker = L.marker([lat, lon]).addTo(this.map);
        marker.bindPopup(`<b>${name} Fixit Station</b><br>${address}`)
      })
    },
    
    kioskMarkers() {
      this.kiosks.forEach((chunk) => {
        if (chunk[10] === 'active') {
          let address = chunk[9]
          let lat = chunk[11]
          let lon = chunk[12]
          let marker = L.marker([lat, lon]).addTo(this.map);
          marker.bindPopup(`${address} Bicycle Kiosk`)
        }
      })     
    },

    addTrails() {
      L.geoJSON(this.trails).addTo(this.map)
    },
    
    makeMap() {
    
        var myInterface = L.marker.pin.interface ( );
        
        myInterface.UserLanguage = 'en';
        
        myInterface.addDefaultCategories ( );
        
        myInterface.setCallbackFunction ( function ( ) { history.pushState ( { index : "bar" } , "page", '?pin=' + myInterface.stringifyPins ( ) ); });

      const mymap = L.map('mapid').setView([51.505, -0.09], 13)
      this.map = mymap
      this.map.locate({setView: true, zoom: 10});

       L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGlyb3kiLCJhIjoiY2o2d21xbHRiMXhqOTJ3bGFxZ3l2bm1sMSJ9.rIS4v4TvYEdQctZulEKzCg', {
       maxZoom: 18,
       id: 'mapbox.streets'
       }).addTo(this.map);
       
       let marker = L.marker([51.505, -0.09]).addTo(this.map);
       marker.bindPopup('Configuring your location...').openPopup()

       this.map.on ( 'click', function ( Event ) { myInterface.newPin ( mymap, Event.latlng )} );
       this.map.on ( 'contextmenu', function ( Event ) { myInterface.newPin ( mymap, Event.latlng )} ); 

       var Search = decodeURI ( window.location.search );
       if ( 0 <= Search.indexOf ( 'pin=' ) ) { myInterface.parsePins ( Search.substr ( Search.indexOf ( 'pin=' ) + 4 ), this.map );}
 
      function onLocationFound(e) {
         var radius = e.accuracy / 2;
        L.marker(e.latlng)
          .addTo(this.map)
          .bindPopup("You are within " + radius + " meters from this point")
          .openPopup()
        
          L.circle(e.latlng, radius).addTo(this.map)
      }
      
      this.map.on('locationfound', onLocationFound.bind(this)).bind
     },

    },
    };
</script>

<style>
  #mapid {
    height: 500px;
    // z-index: 10;
  }
</style>
