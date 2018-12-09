<template>
  <div class="page-content">
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell-centered mdl-cell--4-col">
        <div class="demo-card-square mdl-card mdl-shadow--2dp">
          <div class="mdl-card__title mdl-card--expand">
            <h2 class="mdl-card__title-text">Digital Investigation & Forensic Computing</h2>
          </div>
          <div class="mdl-card__supporting-text">
            Msc - University College Dublin
          </div>
          <div class="mdl-card__actions mdl-card--border">
            <router-link class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                         :to="{name: 'UCD'}">
              Details
            </router-link>
          </div>
        </div>
      </div>
      <div class="mdl-cell mdl-cell-centered mdl-cell--4-col">
        <div class="demo-card-square mdl-card mdl-shadow--2dp">
          <div class="mdl-card__title mdl-card--expand">
            <h2 class="mdl-card__title-text">Software Engineering</h2>
          </div>
          <div class="mdl-card__supporting-text">
            Msc - Ecole des Mines de Nantes
          </div>
          <div class="mdl-card__actions mdl-card--border">
            <router-link class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                         :to="{name: 'EMN'}">
              Details
            </router-link>
          </div>
        </div>
      </div>
      <div class="mdl-cell mdl-cell-centered mdl-cell--4-col">
        <div class="demo-card-square mdl-card mdl-shadow--2dp">
          <div class="mdl-card__title mdl-card--expand">
            <h2 class="mdl-card__title-text">Undergraduate Studies</h2>
          </div>
          <div class="mdl-card__supporting-text">
            Preparatory school: Lycée Saint Louis
          </div>
          <div class="mdl-card__actions mdl-card--border">
            <router-link class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                         :to="{name: 'Undergrad'}">
              Details
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell-centered mdl-cell--4-col">
        <div class="demo-card-square mdl-card mdl-shadow--2dp">
          <div class="mdl-card__title mdl-card--expand">
            <h2 class="mdl-card__title-text">Engineering Skills</h2>
          </div>
          <div class="mdl-card__supporting-text">
          </div>
          <div class="mdl-card__actions mdl-card--border">
            <router-link class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                         :to="{name: 'Skills'}">
              Details
            </router-link>
          </div>
        </div>
      </div>
      <div class="mdl-cell mdl-cell-centered mdl-cell--4-col">
        <div class="demo-card-square mdl-card mdl-shadow--2dp">
          <div class="mdl-card__title mdl-card--expand">
            <h2 class="mdl-card__title-text">Languages</h2>
          </div>
          <div class="mdl-card__supporting-text">
          </div>
          <div class="mdl-card__actions mdl-card--border">
            <router-link class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                         :to="{name: 'Languages'}">
              Details
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'resume',
  data: () => ({
    contentShaded: true,
  }),
};

</script>

<style scoped>
</style>
