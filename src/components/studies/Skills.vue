<template>
  <div class="page-content">
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--2-offset-desktop mdl-cell--8-col">
        <h2>Skills</h2>
        <bar-chart></bar-chart>
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
    advanced: [
      {
        name: 'Python',
        scale: 90,
        author: 'Mehdi Raddadi',
        published: 'December 1st, 2018',
        description: 'How to use docker compose with django to automaticaly test and deploy your applications.',
        image: 'gitlab',
      },
      {
        name: 'graphql',
        title: 'Introduction to GraphQL & Django',
        author: 'Mehdi Raddadi',
        published: 'November 20th, 2018',
        description: 'A short introduction to GraphQL in the python ecosystem.',
        image: 'graphql-django',
      },
    ],
  }),
};
</script>

<style lang="stylus">
</style>


