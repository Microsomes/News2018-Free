const Vue = require('nativescript-vue');
const App = require('./components/App');
const About= require('./components/about');

const News= require('./components/news');



new Vue({
  render: h => h(News),
}).$start();
