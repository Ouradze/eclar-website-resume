<template>
  <div class="page-content">
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell-stretch mdl-cell--2-offset-desktop mdl-cell--8-col">
        <h2>Skills</h2>
        <bar-chart :data="skillsData" :options="chartOptions"></bar-chart>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from '../utils/BarChart.vue';

export default {
  name: 'skills',
  components: { BarChart },
  data: () => ({
    skillsData: {
      labels: ['Python', 'Django', 'Javascript', 'Docker', 'Jenkins', 'Typescript', 'GrapQL', 'Graphene', 'Apollo', 'CSS', 'VueJS', 'Postgres', 'Kubernetes', 'Helm', 'Pendas'],
      datasets: [
        {
          label: 'Self evaluation',
          backgroundColor: '#0B8C7F',
          data: [9, 8, 5, 6, 7, 4, 8, 8, 7, 4, 4, 4, 2, 1, 3],
        },
      ],
    },
    chartOptions: {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontColor: 'white',
          },
        }],
        xAxes: [{
          ticks: {
            fontColor: 'white',
          },
        }],
        legend: {
          labels: {
            fontColor: 'white',
          },
        },
      },
    },
  }),
};
</script>

<style lang="stylus">
</style>
