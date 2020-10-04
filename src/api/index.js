import axios from 'axios';
import store from '@/store/index';

// axios 공통 설정
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL, //.env파일에 설정해 놓은 url
  headers: {
    //헤더안에 기본 적으로 http의 header에 있는 속성 중 하나
    Authorization: store.state.token,
  },
});

function registerUser(userData) {
  //   const url = 'http://localhost:3000/signup';
  //   return axios.post(url, userData);
  return instance.post('signup', userData);
}

function loginUser(userData) {
  return instance.post('login', userData);
}

export { registerUser, loginUser };
