const Vue = require('nativescript-vue');

 
const App = require('./components/App');

 
const About= require('./components/about');

const News= require('./components/news');

const entry= require("./components/refactored/main.js");

 
new Vue({
  render: h => h(entry),
}).$start();
