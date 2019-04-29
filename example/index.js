import Vue from 'vue';
import hljs from 'highlight.js';
import Example from './example.vue';
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');  
  blocks.forEach((block)=>{
    hljs.highlightBlock(block);
  });
});
new Vue({
  el: '#app',
  render: h => h(Example)
});
