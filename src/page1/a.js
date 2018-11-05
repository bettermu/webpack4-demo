//require('./a.less')

import './a.less'
import Vue from 'vue'
import a1 from './components/a1.vue'

new Vue({
  render:h=> h(a1)
}).$mount('#app')

require('jquery')

document.write('aaaaa')

$('.wrap').addClass('hhhh')

$.ajax({
  type: "get",
  url: "/search/hot",
  dataType: "json",
  success: function (response) {
    console.log(response)
  }
});