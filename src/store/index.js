import Vue from 'vue';
import Vuex from 'vuex';
import {
  getAuthFromCookie,
  getUserFromCookie,
  saveAuthToCookie,
  saveUserToCookie,
} from '@/utils/cookies';
import { loginUser } from '@/api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //쿠키에서 받아오는 정보들 없으면 공백
    username: getUserFromCookie() || '',
    token: getAuthFromCookie() || '',
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
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      console.log(data.token);
      commit('setToken', data.token);
      commit('setUsername', data.user.username); //mutation 호출
      //브라우저 저장소에 토큰, 유저네임 저장
      saveAuthToCookie(data.token);
      saveUserToCookie(data.user.username);
      return data;
    },
  },
});
