import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: '',
  },
  //computed와 같음, state 값이 변경될때 발동
  getters: {
    isLogin(state) {
      return state.username !== '';
    },
  },
  mutations: {
    //첫 번째 인자 : state, 두번째 인자 : mutaion 콜할때 넘길 데이터
    setUsername(state, username) {
      state.username = username;
    },
    clearUsername(state) {
      state.username = '';
    },
  },
});
