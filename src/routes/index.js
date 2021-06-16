import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
// import LoginPage from '@/views/LoginPage.vue';
// import SignupPage from '@/views/SignupPage.vue';

Vue.use(VueRouter); //플러그인 사용하기 위한 초기화작업

const router = new VueRouter({
  mode: 'history', //url # 제거 하기 위해
  routes: [
    {
      path: '/map',
      component: () => import('@/views/mapPage.vue'),
      meta: {
        auth: true,
      },
    },
    {
      path: '/',
      redirect: '/login', //localhost:8080 으로 접속 시 로그인 페이지로 리다이렉트
    },
    {
      path: '/login',
      component: () => import('@/views/LoginPage.vue'), //코드스플리팅 : 해당 url로 이동 했을때 해당하는 정보들만 가져오게 하는것
    }, //코드스플리팅 많이 할 수록 초기에 로딩하는 페이지가 적어져서 초기 화면 진입 속도가 빨라짐
    {
      path: '/signup',
      //   component: SignupPage,
      component: () => import('@/views/SignupPage.vue'),
    },
    {
      path: '/main',
      component: () => import('@/views/MainPage.vue'),
      meta: {
        auth: true,
      },
    },
    {
      path: '/add',
      component: () => import('@/views/PostAddPage.vue'),
      //라우트 네비게이션 가드
      //a메타가 있으며 auth 가 true일때만 페이지 이동 가능(auth : 임의로 이름지은것)
      meta: {
        auth: true,
      },
    },
    {
      path: '/post/:id',
      component: () => import('@/views/PostEditPage.vue'),
      meta: {
        auth: true,
      },
    },
    {
      path: '*',
      component: () => import('@/views/NotFoundPage.vue'), //fallback router : 라우터에 연결되어 있지 않은 url 주소 입력시 이동하는 화면
    },
  ],
});

//to: 이동할 페이지, from: 이동 전 현재페이진, next: 이동할때 호출하는 api
router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isLogin) {
    console.log('인증이 필요합니다.');
    next('/login');
    return;
  }
  next();
});

export default router;
