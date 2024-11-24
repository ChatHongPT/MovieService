import React, { useEffect, useState } from "react";
import tmdb from "../api/tmdb"; // tmdb.js에서 가져오기

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = process.env.REACT_APP_TMDB_API_KEY;

      // 이번 주 트렌딩 영화와 인기 영화 데이터를 가져오기
      const trending = await tmdb.fetchMoviesByGenre(apiKey, "28"); // 예: 액션 영화
      const popular = await tmdb.fetchPopularMovies(apiKey);

      setTrendingMovies(trending);
      setPopularMovies(popular);
    };

    fetchMovies();
  }, []);

  const renderMoviesSlider = (movies) => (
    <div className="relative w-full h-[400px] overflow-hidden rounded-md">
      <div className="flex space-x-4 overflow-x-auto snap-x">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="flex-shrink-0 w-[300px] snap-start bg-gray-800 rounded-lg p-4"
          >
            <img
              src={tmdb.getImageUrl(movie.backdrop_path)}
              alt={movie.title}
              className="w-full h-[200px] object-cover rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
            <p className="text-gray-400 text-sm mt-1">{movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMoviesGrid = (movies, title) => (
    <div>
      <h2 className="text-2xl font-bold text-white mt-8 mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden">
            <img
              src={tmdb.getImageUrl(movie.poster_path)}
              alt={movie.title}
              className="w-full h-[300px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-red-500">HONGFLIX</h1>
        <nav className="space-x-4">
          <a href="/" className="text-white hover:text-gray-300">
            홈
          </a>
          <a href="/contents" className="text-white hover:text-gray-300">
            대세 콘텐츠
          </a>
          <a href="/list" className="text-white hover:text-gray-300">
            내가 찜한 리스트
          </a>
          <a href="/search" className="text-white hover:text-gray-300">
            찾아보기
          </a>
        </nav>
      </header>

      {/* 트렌딩 슬라이더 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">이번 주 트렌딩</h2>
        {renderMoviesSlider(trendingMovies)}
      </section>

      {/* 인기 영화 그리드 */}
      <section>
        {renderMoviesGrid(popularMovies, "인기 영화")}
      </section>
    </div>
  );
};

export default Home;