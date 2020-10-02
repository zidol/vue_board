<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="username">id: </label>
          <input type="text" name="" id="username" v-model="username" />
        </div>
        <div>
          <label for="password">pw: </label>
          <input type="text" name="" id="password" v-model="password" />
        </div>
        <div>
          <label for="nickname">nickname: </label>
          <input type="text" name="" id="nickname" v-model="nickname" />
        </div>
        <button :disabled="!isUsernameValid" type="submit" class="btn">
          회원 가입
        </button>
        <p class="log">{{ logMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { registerUser } from '@/api/index';
import { validateEmail } from '@/utils/validation.js';

export default {
  data() {
    return {
      username: '',
      password: '',
      nickname: '',
      //log
      logMessage: '',
    };
  },
  computed: {
    isUsernameValid() {
      return validateEmail(this.username);
    },
  },
  methods: {
    async submitForm() {
      console.log('폼 제출');
      const userData = {
        username: this.username,
        password: this.password,
        nickname: this.nickname,
      };
      const { data } = await registerUser(userData);
      console.log(data.username);
      this.logMessage = `${data.username}님이 가입되었습니다.`;
      this.initForm();
    },
    initForm() {
      this.username = '';
      this.password = '';
      this.nickname = '';
    },
  },
};
</script>

<style></style>
