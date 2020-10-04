// 게시글 관련된 CRUD API
import { posts } from './index';

//게시글 목록 조회 api
function fectchPosts() {
  return posts.get('/');
}

//게시글 상세조회 api
function fetchPost(postId) {
  return posts.get(postId);
}

//게시글 등록 api
function createPost(postData) {
  return posts.post('/', postData);
}

//게시글 삭제하는 API
function deletePost(postId) {
  return posts.delete(postId);
}

//게시글 수정하는 api
function editPost(postId, postData) {
  return posts.put(postId, postData);
}
export { fectchPosts, fetchPost, createPost, deletePost, editPost };
