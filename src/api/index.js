import axios from 'axios';
// import store from '@/store/index';
import { setInterceptors } from './common/interceptors';

// 액시오스 초기화 함수
//함수의 결과가 interceptor가 세팅 된 instace가 생성됨(return) : interceptor 모듈화
function createInstance() {
  // axios 공통 설정
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL, //.env파일에 설정해 놓은 url
    // headers: {
    //   //헤더안에 기본 적으로 http의 header에 있는 속성 중 하나
    //  // 자바스크립트 레벨에선 토큰값이 바뀌어도 기존의 값이 들어가기 때문에 login api가 실행되도 빈 토큰값이 들어감.
    // //해결책: 인터셉터를 이용해 요청 보내기전에 headers에 넣음
    //   Authorization: store.state.token,
    // },
  });
  return setInterceptors(instance); //interceptor 세팅
}

const instance = createInstance();

//회원가입 api
function registerUser(userData) {
  //   const url = 'http://localhost:3000/signup';
  //   return axios.post(url, userData);
  return instance.post('signup', userData);
}
//로그인 api
function loginUser(userData) {
  return instance.post('login', userData);
}

//게시글 조회 api
function fectchPosts() {
  return instance.get('posts');
}

export { registerUser, loginUser, fectchPosts };
