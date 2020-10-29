<template>
  <div class="contents">
    <h1 class="page-header">Edit Post</h1>
    <LoadingSpinner v-if="isLoading"></LoadingSpinner>
    <div class="form-wrapper" v-else>
      <form class="form" @submit.prevent="submitForm">
        <div>
          <label for="title">Title: </label>
          <input id="title" type="text" v-model="title" />
        </div>
        <div>
          <label for="contents">Contents: </label>
          <!-- <textarea id="contents" type="text" rows="5" v-model="contents" /> -->
          <quill-editor
            ref="myQuillEditor"
            v-model="contents"
            :options="editorOption"
          />
        </div>
        <button type="submit" class="btn">Edit</button>
      </form>
      <p class="log">
        {{ logMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import { fetchPost, editPost } from '@/api/posts';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
  components: {
    LoadingSpinner,
    quillEditor,
  },
  data() {
    return {
      title: '',
      contents: '',
      logMessage: '',
      isLoading: false,
      editorOption: {
        placeholder: '내용 입력하세요.',
      },
    };
  },
  computed: {
    isContentsValid() {
      return this.contents.length <= 200;
    },
  },
  methods: {
    async submitForm() {
      const id = this.$route.params.id;
      try {
        await editPost(id, {
          title: this.title,
          contents: this.contents,
        });
        this.$router.push('/main');
      } catch (error) {
        console.log(error);
        this.logMessage = error;
      }
    },
  },
  async created() {
    const id = this.$route.params.id;
    this.isLoading = true;
    const { data } = await fetchPost(id);
    this.isLoading = false;
    this.title = data.title;
    this.contents = data.contents;
  },
  mounted() {},
};
</script>

<style scoped>
.form-wrapper .form {
  width: 100%;
}
.btn {
  color: white;
}
</style>
