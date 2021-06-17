import Vue from 'vue';
import App from './App.vue';
import router from '@/routes/index.js';
import store from '@/store/index';
import { formatDate } from '@/utils/filters';

// import VueLayers from 'vuelayers';
// import 'vuelayers/lib/style.css'; // needs css-loader

// Vue.use(VueLayers);

// import { Map, TileLayer, OsmSource, Geoloc } from 'vuelayers';
// import 'vuelayers/lib/style.css'; // needs css-loader
// Vue.use(Map);
// Vue.use(TileLayer);
// Vue.use(OsmSource);
// Vue.use(Geoloc);

// import { VectorLayer } from 'vuelayers';
// Vue.use(VectorLayer);

Vue.filter('formatDate', formatDate);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
