<template>
  <header>
    <div>
      <router-link :to="logoLink" class="logo">
        Board
        <span v-if="isUserLogin">by {{ $store.state.username }}</span>
      </router-link>
    </div>
    <div class="navigations">
      <!-- 1 -->
      <!-- 스크립트단 거치지 않고 바로 store 접근 -->
      <!-- <template v-if="$store.getters.isLogin"> -->
      <template v-if="isUserLogin">
        <router-link to="/map">지도</router-link>
        <a href="javascript:;" @click="logoutUser" class="logout-button">
          Logout
        </a>
      </template>
      <!-- 2 -->
      <template v-else>
        <router-link to="/login">로그인</router-link>
        <router-link to="/signup">회원가입</router-link>
      </template>
    </div>
  </header>
</template>

<script>
import { deleteCookie } from '@/utils/cookies';
export default {
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
    logoLink() {
      return this.$store.getters.isLogin ? '/main' : '/login';
    },
  },
  methods: {
    logoutUser() {
      //state 삭제
      this.$store.commit('clearUsername');
      this.$store.commit('clearToken');
      //쿠키값 삭제
      deleteCookie('til_auth');
      deleteCookie('til_user');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.username {
  color: white;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #3b5998;
  z-index: 2;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05);
}
a {
  color: #dedede;
  font-size: 18px;
}
a.logo {
  font-size: 30px;
  font-weight: 900;
  color: white;
}
.logo > span {
  font-size: 14px;
  font-weight: normal;
}
.navigations a {
  margin-left: 10px;
}
.fixed {
  position: fixed;
  top: 0;
  width: 100%;
}
.logout-button {
  font-size: 14px;
}
a.router-link-exact-active {
  color: white;
  font-weight: bold;
}
</style>
