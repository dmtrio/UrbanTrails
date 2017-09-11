<template>
  <div>
    <button class="closure" v-on:click="closeReport()">x</button>

    <div class="reporting">
      <button v-on:click="toReportType('issuesDiv')" class="issues twoWide button">Issues</button>
      <button v-on:click="toReportType('commendationsDiv')" class="commendations twoWide button">Commend</button>
    </div>

    <div class="issuesDiv">
      <button v-on:click="postReport('POTHOLES', 'Pothole')" class="issues fourWide button">Potholes</button>
      <button v-on:click="toReportType('bikelanesDiv')" class="issues fourWide button">Bad Bike Lanes</button>
      <button v-on:click="toReportType('trafficDiv')" class="issues fourWide button">Traffic</button>
      <button v-on:click="toReportType('otherDiv', 'OTHER_ISSUES')" class="issues fourWide button">Other</button>
    </div>

    <div class="bikelanesDiv">
      <button v-on:click="postReport('CRACKED_PAVEMENT', 'Cracked Pavement')" class="issues twoWide button">Cracked Pavement</button>
      <button v-on:click="postReport('DIRTY_LANES', 'Dirty Bike Lane')" class="issues twoWide button">Dirty Bike Lane</button>
    </div>

    <div class="trafficDiv">
      <button v-on:click="postReport('MILD_TRAFFIC', 'Mild Traffic')" class="issues twoWide button">Mild Traffic</button>
      <button v-on:click="postReport('HEAVY_TRAFFIC', 'Heavy Traffic')" class="issues twoWide button">Heavy Traffic</button>
    </div>

    <div class="commendationsDiv">
      <button v-on:click="postReport('BIKE_FRIENDLY_BUSINESS', 'bikeBusiness')" class="commendations fourWide button">Bike Friendly Business</button>
      <button v-on:click="postReport('SCENIC_AREAS', 'scenicArea')"class="commendations fourWide button">Scenic Area</button>
      <button v-on:click="postReport('BIKE_RACKS', 'bikeRacks')" class="commendations fourWide button">Bike Racks</button>
      <button v-on:click="toReportType('otherDiv', 'OTHER_COMMENDATIONS')" class="commendations fourWide button">Other</button>
    </div>

    <div class="otherDiv">
      <textarea id="inputBox" rows="8" cols="50" placeholder="Give us your thoughts!"></textarea>
      <button class="other button fourWide" v-on:click="otherReport()">Send Report</button>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {};
    },
    mounted() {
    },
    methods: {
      toReportType: (reportType, other) => {
        document.getElementById('selected').removeAttribute('id')
        document.getElementsByClassName(reportType)[0].setAttribute('id', 'selected')
        if (other) document.getElementsByClassName('otherDiv')[0].setAttribute('data', other)
      },

      otherReport() {
        this.postReport(document.getElementsByClassName('otherDiv')[0].getAttribute('data'), document.getElementById('inputBox').value)
        document.getElementById('inputBox').value = ''
        document.getElementsByClassName('other')[0].removeAttribute('data')
      },

      postReport(type, content) {
        let reportInfo = {reportType: type, reportContent: content, userid: 1, created_at: new Date(), coordinates: document.getElementsByClassName('reporting')[0].getAttribute('data')}
        this.$store.dispatch('POST_REPORT', reportInfo)
        this.$store.dispatch(`LOAD_${type}`, reportInfo)
        document.getElementById('selected').removeAttribute('id')
        document.getElementById('active').removeAttribute('id')
      },

      closeReport: () => {
        document.getElementById('selected').removeAttribute('id')
        document.getElementById('active').removeAttribute('id')
      }
    }
  }
</script>
