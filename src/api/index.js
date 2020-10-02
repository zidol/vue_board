import axios from 'axios';

// axios 공통 설정
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL, //.env파일에 설정해 놓은 url
});

function registerUser(userData) {
  //   const url = 'http://localhost:3000/signup';
  //   return axios.post(url, userData);
  return instance.post('signup', userData);
}

export { registerUser };
