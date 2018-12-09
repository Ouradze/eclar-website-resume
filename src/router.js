import Vue from 'vue';
import Router from 'vue-router';

import About from './components/About.vue';
import Article from './components/Article.vue';
import Blog from './components/Blog.vue';
import Home from './components/Home.vue';
import Resume from './components/Resume.vue';
import Projects from './components/Projects.vue';
import Work from './components/Work.vue';

import studies from './components/studies';
import work_exp from './components/work_exp';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/blog/article/:name',
      name: 'article',
      component: Article,
    },
    {
      path: '/blog',
      name: 'Blog',
      component: Blog,
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
    },
    {
      path: '/resume',
      name: 'Resume',
      component: Resume,
    },
    {
      path: '/resume/ucd',
      name: 'UCD',
      component: studies.Ucd,
    },
    {
      path: '/resume/emn',
      name: 'EMN',
      component: studies.Emn,
    },
    {
      path: '/resume/undergraduate',
      name: 'Undergrad',
      component: studies.Undergrad,
    },
    {
      path: '/resume/skills',
      name: 'Skills',
      component: studies.Skills,
    },
    {
      path: '/resume/languages',
      name: 'Languages',
      component: studies.Languages,
    },
    {
      path: '/work',
      name: 'Work',
      component: Work,
    },
    {
      path: '/work/cgi',
      name: 'CGI',
      component: work_exp.Cgi,
    },
    {
      path: '/work/degremont',
      name: 'Degremont',
      component: work_exp.Degremont,
    },
    {
      path: '/work/iquate',
      name: 'Iquate',
      component: work_exp.Iquate,
    },
    {
      path: '/work/polyconseil',
      name: 'Polyconseil',
      component: work_exp.Polyconseil,
    },
    {
      path: '/work/wavestone',
      name: 'Wavestone',
      component: work_exp.Wavestone,
    },
  ],
  mode: 'history',
});
