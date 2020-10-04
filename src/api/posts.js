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

//게시글 삭제하는 API
function deletePost(postId) {
  return posts.delete(postId);
}

export { fectchPosts, createPost, deletePost };
