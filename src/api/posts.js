// 게시글 관련된 CRUD API
import { posts } from './index';

//게시글 조회 api
function fectchPosts() {
  return posts.get('/');
}

//게시글 등록 api
function createPost(postData) {
  return posts.post('/', postData);
}

export { fectchPosts, createPost };
