// TMDB API 기본 URL
export const API_URL = "https://api.themoviedb.org/3";

// TMDB 이미지 URL
export const IMAGE_BASE_URL = "http://image.tmdb.org/t/p";

// TMDB API 키 (Local Storage에서 가져옴)
export const savedTMDbKey = localStorage.getItem("TMDb-Key");

// 장르 테이블 가져오기
export const GET_GENRE_TABLE_URL = `${API_URL}/genre/movie/list?api_key=${savedTMDbKey}&language=ko`;

// 장르별 영화 가져오기
export const GET_MOVIES_BY_GENRE_URL = ({ genre, page }) =>
  `${API_URL}/discover/movie?api_key=${savedTMDbKey}&include_adult=true&with_genres=${genre}&language=ko-KR&sort_by=popularity.desc&page=${page}`;

// 트렌딩 영화 가져오기
export const GET_TRENDING_MOVIES_URL = ({ period, page }) =>
  `${API_URL}/trending/movie/${period}?language=ko-KR&page=${page}`;

// 태그별 영화 가져오기
export const GET_MOVIES_BY_TAG_URL = ({ tag, page }) =>
  `${API_URL}/movie/${tag}?api_key=${savedTMDbKey}&language=ko-KR&page=${page}`;
