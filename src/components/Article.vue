<template>
  <div class="page-content">
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--2-offset mdl-cell--8-col article-content">
        <vue-markdown class="result-html" :source="source"></vue-markdown>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Prism from 'prismjs';

export default {
  name: 'md-article',
  data() {
    return {
      source: '',
    };
  },
  mounted() {
    axios.get(`${process.env.BASE_URL}articles/${this.$route.params.name}.md`).then((response) => {
      this.source = response.data;
    }).then(() => {
      // always executed
      Prism.highlightAll();
    });
  },
};
</script>

<style scoped>
.result-html pre code {
  width: 100%;
  display: contents;
}
.mdl-cell {
  background-color: #E3E3E3;
  opacity: 0.9;
  color: black;
}
.article-content {
  border-radius: 15px;
  padding-left: 5%;
  padding-right: 5%;
}
</style>
