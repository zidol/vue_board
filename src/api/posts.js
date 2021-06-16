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

// function setCookie(name, value, days) {
//   var expires = '';
//   if (days) {
//     var date = new Date();
//     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//     expires = '; expires=' + date.toUTCString();
//   }
//   document.cookie = name + '=' + (value || '') + expires + '; path=/';
// }
// function getCookie(name) {
//   var nameEQ = name + '=';
//   var ca = document.cookie.split(';');
//   for (var i = 0; i < ca.length; i++) {
//     var c = ca[i];
//     while (c.charAt(0) == ' ') c = c.substring(1, c.length);
//     if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
//   }
//   return null;
// } // item click 을 통한 상세 화면 이동관련 함수
// function itemClick(itemIndex) {
//   // 쿠키에 관련 내용 저장
//   var scrollHeightPosition =
//     (document.documentElement && document.documentElement.scrollTop) ||
//     document.body.scrollTop;
//   setCookie('category', 'myCategory'); // 쿠키에 내용을 정의하는 사용자 정의 함수
//   setCookie('scroll_position', scrollHeightPosition); // 쿠키에 내용을 정의하는 사용자 정의 함수
//   // 상세 화면 이동
//   nextPage(itemIndex); // 페이지 이동하는 사용자 정의 함수
// }
// // body.onload 시 사용하게 될 함수
// function afterLoad() {
//   // 쿠키에 저장된 내용 호출
//   var category = getCookie('category'); // 쿠키의 내용을 불러오는 사용자 정의 함수
//   var scrollPosition = getCookie('scroll_position'); // 쿠키의 내용을 불러오는 사용자 정의 함수
//   var pageCategory = 'myCategory'; // 페이지 로딩 시 현제 카테고리 내용
//   if (
//     category != '' &&
//     category != 'undefined' &&
//     category == pageCategory &&
//     scrollPosition != '' &&
//     scrollPosition != 'undefined'
//   ) {
//     window.scroll(0, scrollPosition);
//     // 또는
//     body.scrollTop(scrollPosition);
//   } // 쿠키 내용 초기화
//   setCookie('category', '');
//   setCookie('scroll_position', '');
// }
