import React, { useState, useEffect } from "react";
import tmdb from "../api/tmdb";

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState([0, 10]);
  const [releaseYear, setReleaseYear] = useState([1900, new Date().getFullYear()]);
  const [sortOption, setSortOption] = useState("popularity.desc");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log("Fetching movies with API key:", process.env.REACT_APP_TMDB_API_KEY);
        const popularMovies = await tmdb.fetchPopularMovies(process.env.REACT_APP_TMDB_API_KEY);
        setMovies(popularMovies);
        setFilteredMovies(popularMovies);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
      }
    };
    fetchMovies();
  }, []);

  const handleFilter = () => {
    let filtered = [...movies];

    // 장르 필터링
    if (genre) {
      filtered = filtered.filter((movie) => movie.genre_ids.includes(parseInt(genre)));
    }

    // 평점 필터링
    filtered = filtered.filter(
      (movie) => parseFloat(movie.vote_average) >= rating[0] && parseFloat(movie.vote_average) <= rating[1]
    );

    // 개봉년도 필터링
    filtered = filtered.filter(
      (movie) =>
        movie.release_date &&
        new Date(movie.release_date).getFullYear() >= releaseYear[0] &&
        new Date(movie.release_date).getFullYear() <= releaseYear[1]
    );

    // 정렬
    filtered.sort((a, b) => {
      if (sortOption === "popularity.desc") return b.popularity - a.popularity;
      if (sortOption === "vote_average.desc") return b.vote_average - a.vote_average;
      return new Date(b.release_date) - new Date(a.release_date);
    });

    console.log("Filtered Movies:", filtered);
    setFilteredMovies(filtered);
  };

  const resetFilters = () => {
    setGenre("");
    setRating([0, 10]);
    setReleaseYear([1900, new Date().getFullYear()]);
    setSortOption("popularity.desc");
    setFilteredMovies([...movies]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 p-8">
      {/* 헤더 */}
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

      {/* 필터링 UI */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        {/* 장르 필터링 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-white">장르</label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="">모두</option>
            <option value="28">액션</option>
            <option value="35">코미디</option>
            <option value="18">드라마</option>
            <option value="27">공포</option>
            <option value="878">SF</option>
          </select>
        </div>

        {/* 평점 필터링 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-white">평점 범위</label>
          <input
            type="range"
            min="0"
            max="10"
            value={rating[1]}
            onChange={(e) => setRating([0, parseFloat(e.target.value)])}
            className="w-full"
          />
          <p className="text-sm mt-2 text-white">
            0 - {rating[1]} ({rating[1]}점 이하)
          </p>
        </div>

        {/* 개봉년도 필터링 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-white">개봉년도</label>
          <div className="flex gap-4">
            <input
              type="number"
              value={releaseYear[0]}
              onChange={(e) =>
                setReleaseYear([parseInt(e.target.value), releaseYear[1]])
              }
              placeholder="최소"
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            <input
              type="number"
              value={releaseYear[1]}
              onChange={(e) =>
                setReleaseYear([releaseYear[0], parseInt(e.target.value)])
              }
              placeholder="최대"
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
        </div>

        {/* 정렬 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-white">정렬 기준</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="popularity.desc">인기순</option>
            <option value="vote_average.desc">평점순</option>
            <option value="release_date.desc">최신 개봉순</option>
          </select>
        </div>

        {/* 필터 버튼 */}
        <div className="flex gap-4">
          <button
            onClick={handleFilter}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            필터 적용
          </button>
          <button
            onClick={resetFilters}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            필터 초기화
          </button>
        </div>
      </div>

      {/* 영화 리스트 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={tmdb.getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{movie.title}</h3>
                <p className="text-sm text-gray-400">
                  {new Date(movie.release_date).toLocaleDateString()}
                </p>
                <p className="text-sm">평점: {movie.vote_average}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">조건에 맞는 영화가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Search;