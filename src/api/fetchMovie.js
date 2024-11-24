// [fetchMovie.js]
import axios from './axios';

const fetchMovie = async (movieId, categoryId) => {
  const endpoint = categoryId === 'TV' ? `tv/${movieId}` : `movie/${movieId}`;
  const response = await axios.get(endpoint, {
    params: { append_to_response: 'videos' },
  });

  // 영상 필터링 로직
  if (response.data.videos?.results?.length > 0) {
    response.data.officialVideos = response.data.videos.results.filter(
      (video) => video.type === 'Teaser' || video.type === 'Trailer'
    );
  }

  return response.data;
};

export default fetchMovie;
