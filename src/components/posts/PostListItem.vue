<template>
  <li>
    <div class="post-title">
      {{ postItem.title }}
    </div>
    <div class="post-contents">
      <!-- {{ postItem.contents }} -->
      <p v-html="postItem.contents"></p>
    </div>
    <div class="post-time">
      {{ postItem.createdAt | formatDate }}
      <i class="icon ion-md-create" @click="routeEditPage"></i>
      <i class="icon ion-md-trash" @click="deleteItem"></i>
    </div>
  </li>
</template>

<script>
import { deletePost } from '@/api/posts';
export default {
  props: {
    postItem: {
      type: Object,
      required: true,
    },
  },
  //지역 필터
  // filters: {
  //   formatDate(value) {
  //     return new Date(value);
  //   },
  // },
  methods: {
    async deleteItem() {
      if (confirm('삭제 하시겠습니가?')) {
        await deletePost(this.postItem._id);
        this.$emit('refresh');
      }
      // console.log('deleted!!');
    },
    routeEditPage() {
      const id = this.postItem._id;
      this.$router.push(`/post/${id}`);
    },
  },
};
</script>

<style></style>
