<template>
  <div class="page-content">
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell-centered mdl-cell--4-offset-desktop mdl-cell--4-col">
        <div class="mdl-card mdl-shadow--2dp">
          <div class="mdl-card__title">
            <h2 class="mdl-card__title-text">Not ready !</h2>
          </div>
          <div class="mdl-card__supporting-text">
            <p>
            Under construction, please be patient :)
            </p>
          </div>
          <div class="mdl-card__actions mdl-card--border">
            <div>toto</div>
          </div>
          <div class="mdl-card__menu">
            <div class="mdl-tooltip mdl-tooltip--large">Share</div>
            <button
              class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"
              >
              <i class="material-icons">share</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';

export default {
  name: 'contact',
  components: {
    VueMarkdown,
  },
  data: () => ({
    articles: [
      {
        name: 'django-compose-gitlab',
        title: 'DevOps with Gitlab and Django',
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

<style scoped>
.graphql-django {
  /*background-color: rgba(25,32,35);*/
}
.mdl-card {
  width: 100%;
}
.mdl-card__menu button {
  color: black;
}
</style>
