<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="username">id:</label>
          <input id="username" type="text" v-model="username" />
          <p class="validation-text">
            <span class="warning" v-if="!isUsernameValid && username">
              Please enter an email address
            </span>
          </p>
        </div>
        <div>
          <label for="password">pw: </label>
          <input id="password" type="text" v-model="password" />
        </div>
        <button
          :disabled="!isUsernameValid || !password"
          type="submit"
          class="btn"
        >
          로그인
        </button>
        <p class="log">{{ lopMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
// import { loginUser } from '@/api/index';
import { validateEmail } from '@/utils/validation.js';
// import { saveAuthToCookie, saveUserToCookie } from '@/utils/cookies';

export default {
  data() {
    return {
      //form value
      username: '',
      password: '',
      //log
      lopMessage: '',
    };
  },
  computed: {
    isUsernameValid() {
      return validateEmail(this.username);
    },
  },
  methods: {
    //로그인 메소드
    async submitForm() {
      try {
        //비지니스 로직
        const userData = {
          username: this.username,
          password: this.password,
        };
        await this.$store.dispatch('LOGIN', userData); //dispatch 끝난 후 router.push 수행 해야하기 때문에 await 꼭 해야함
        // store 의 actions로 하단 로직 옮김
        // const { data } = await loginUser(userData);
        // console.log(data.token);
        // this.$store.commit('setToken', data.token);
        // this.$store.commit('setUsername', data.user.username); //mutation 호출
        // //브라우저 저장소에 토큰, 유저네임 저장
        // saveAuthToCookie(data.token);
        // saveUserToCookie(data.user.username);
        this.$router.push('/main'); // html 레벨 : <rotuer-link to="/"></rotuer-link> 와 같은것
        /*
        //ex) 쿼리 파라미터 
        this.$router.push({
          path: 'main',
          query: { plan: 'private', aa: 'aa' },
        });
        */
      } catch (error) {
        //에러 헨들링
        // console.log(error.response.data);
        this.lopMessage = error.response.data;
      } finally {
        this.initForm();
      }
    },
    initForm() {
      this.username = '';
      this.password = '';
    },
  },
};
</script>

<style>
.btn {
  color: white;
}
</style>
