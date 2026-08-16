import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import genreMap from "../Utility/Genre";

const WishList = ({ watchList = [], handleRemoveFromWatchList, setWatchList }) => {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(["All genres"]);
  const [currGenre, setCurrGenre] = useState("All genres");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const sortIncreasing = () => {
    const sorted = [...watchList].sort((a, b) => (a.vote_average || 0) - (b.vote_average || 0));
    setWatchList(sorted);
  };

  const sortDecreasing = () => {
    const sorted = [...watchList].sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
    setWatchList(sorted);
  };

  useEffect(() => {
    const temp = watchList
      .map((movieObj) => (movieObj.genre_ids && movieObj.genre_ids[0] ? genreMap[movieObj.genre_ids[0]] : null))
      .filter(Boolean);
    const uniqueGenres = Array.from(new Set(temp));
    setGenreList(["All genres", ...uniqueGenres]);
  }, [watchList]);

  const filteredMovies = watchList
    .filter((movieObj) => {
      if (currGenre === "All genres") return true;
      const movieGenre = movieObj.genre_ids && movieObj.genre_ids[0] ? genreMap[movieObj.genre_ids[0]] : "";
      return movieGenre === currGenre;
    })
    .filter((movieObj) => {
      const title = movieObj.title || movieObj.original_title || "";
      return title.toLowerCase().includes(search.toLowerCase());
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[80vh]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-6 bg-yellow-500 rounded-full"></div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
            My Watchlist
          </h1>
          <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-yellow-500/30">
            {watchList.length} {watchList.length === 1 ? "Movie" : "Movies"}
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search in watchlist..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
          />
          <i className="fa-solid fa-magnifying-glass absolute right-3.5 top-3.5 text-gray-400 text-xs"></i>
        </div>
      </div>

      {/* Genre Filter Chips */}
      {genreList.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-thin">
          {genreList.map((genre) => (
            <button
              key={genre}
              onClick={() => setCurrGenre(genre)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shadow-sm ${
                currGenre === genre
                  ? "bg-yellow-500 text-slate-950 shadow-yellow-500/20"
                  : "bg-slate-900 text-gray-300 hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      )}

      {/* Empty State */}
      {watchList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-900/40 rounded-3xl border border-slate-800/80 my-4">
          <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center text-3xl text-yellow-500 mb-4">
            🎬
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
            Your Watchlist is Empty
          </h3>
          <p className="text-sm text-gray-400 max-w-sm mb-6">
            Explore trending movies and click the heart icon to save movies you want to watch later!
          </p>
          <Link
            to="/"
            className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-yellow-500/20"
          >
            Explore Movies
          </Link>
        </div>
      ) : filteredMovies.length === 0 ? (
        <div className="py-16 text-center text-gray-400">
          <p>No movies match your search "{search}".</p>
        </div>
      ) : (
        <>
          {/* Mobile Card List (Visible on Phone/Small screens) */}
          <div className="grid grid-cols-1 gap-3 sm:hidden">
            {filteredMovies.map((movieObj) => {
              const poster = movieObj.poster_path
                ? `https://image.tmdb.org/t/p/w500${movieObj.poster_path}`
                : "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500";
              const genreName =
                movieObj.genre_ids && movieObj.genre_ids[0]
                  ? genreMap[movieObj.genre_ids[0]]
                  : "Movie";

              return (
                <div
                  key={movieObj.id}
                  className="flex items-center gap-3 p-3 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-md"
                >
                  <Link to={`/movie/${movieObj.id}`} className="shrink-0">
                    <img
                      src={poster}
                      alt={movieObj.title || movieObj.original_title}
                      className="w-16 h-22 object-cover rounded-xl shrink-0"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/movie/${movieObj.id}`}>
                      <h4 className="font-bold text-sm text-white truncate hover:text-yellow-400 transition-colors">
                        {movieObj.title || movieObj.original_title}
                      </h4>
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-yellow-400 text-xs font-bold">
                        ⭐ {Number(movieObj.vote_average || 0).toFixed(1)}
                      </span>
                      <span className="text-gray-500 text-xs">•</span>
                      <span className="text-gray-400 text-xs">{genreName}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFromWatchList(movieObj)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                    title="Remove from watchlist"
                  >
                    <i className="fa-solid fa-trash-can text-sm"></i>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Desktop Table (Hidden on small screens, visible on sm and above) */}
          <div className="hidden sm:block overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left">
              <thead className="bg-slate-900 border-b border-slate-800 text-xs uppercase tracking-wider text-gray-400 font-bold">
                <tr>
                  <th className="px-6 py-4">Movie</th>
                  <th className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span>Rating</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={sortIncreasing}
                          title="Sort Ascending"
                          className="hover:text-yellow-400 cursor-pointer"
                        >
                          <i className="fa-solid fa-arrow-up text-[10px]"></i>
                        </button>
                        <button
                          onClick={sortDecreasing}
                          title="Sort Descending"
                          className="hover:text-yellow-400 cursor-pointer"
                        >
                          <i className="fa-solid fa-arrow-down text-[10px]"></i>
                        </button>
                      </div>
                    </div>
                  </th>
                  <th className="px-6 py-4">Popularity</th>
                  <th className="px-6 py-4">Genre</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm text-gray-300">
                {filteredMovies.map((movieObj) => {
                  const poster = movieObj.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movieObj.poster_path}`
                    : "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500";
                  const genreName =
                    movieObj.genre_ids && movieObj.genre_ids[0]
                      ? genreMap[movieObj.genre_ids[0]]
                      : "Movie";

                  return (
                    <tr
                      key={movieObj.id}
                      className="hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-6 py-3.5 flex items-center gap-4">
                        <Link to={`/movie/${movieObj.id}`}>
                          <img
                            src={poster}
                            alt={movieObj.title || movieObj.original_title}
                            className="w-12 h-16 object-cover rounded-lg shadow shrink-0 hover:opacity-80 transition-opacity"
                          />
                        </Link>
                        <Link to={`/movie/${movieObj.id}`} className="hover:text-yellow-400 transition-colors">
                          <span className="font-bold text-white text-base">
                            {movieObj.title || movieObj.original_title}
                          </span>
                        </Link>
                      </td>
                      <td className="px-6 py-3.5 font-bold text-yellow-400">
                        ⭐ {Number(movieObj.vote_average || 0).toFixed(1)}
                      </td>
                      <td className="px-6 py-3.5 text-gray-400">
                        {Math.round(movieObj.popularity || 0)}
                      </td>
                      <td className="px-6 py-3.5">
                        <span className="bg-slate-800 text-gray-300 text-xs px-2.5 py-1 rounded-lg border border-slate-700">
                          {genreName}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <button
                          onClick={() => handleRemoveFromWatchList(movieObj)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          <i className="fa-solid fa-trash-can text-xs"></i>
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default WishList;
