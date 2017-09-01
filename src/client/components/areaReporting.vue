<template>
  <div>
    <div class="reporting">
      <button v-on:click="toReportType(1)" id="reportSelection">Issues</button>
      <button v-on:click="toReportType(2)" id="reportSelection">Recommendations</button>
    </div>

    <div class="issues">
      <button id="pothole">Pothole</button>
      <button id="sidewalks">Sidewalks</button>
      <button id="vagrants">Vagrants</button>
      <button id="other">Other</button>
      <!--Set of options based on report type-->
      <!--on click send data to server, mark as icon on map for temporary time (2 weeks?)-->
    </div>
    <div class="recommendations">
      Duty
      <!--Set of options based on report type-->
      <!--on click send data to server, mark as icon on map for temporary time (2 weeks?)-->
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    methods: {
      toReportType: (reportType) => {
        document.getElementsByClassName('reporting')[0].removeAttribute('id')
        if (reportType === 1) {
          document.getElementsByClassName('issues')[0].setAttribute('id', 'selected')
        } else {
          document.getElementsByClassName('recommendations')[0].setAttribute('id', 'selected')
        }
      }
    }
  }
</script>