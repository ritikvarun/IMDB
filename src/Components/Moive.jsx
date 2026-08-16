import React, { useEffect, useState } from "react";
import MoivesCard from "./MoivesCard";
import Pagination from "./Pagination";
import { fetchMoviesByGenre, POPULAR_GENRES } from "../Utility/movieApi";

const Movie = ({
  handleAddToWatchList,
  handleRemoveFromWatchList,
  watchList = [],
}) => {
  const [movie, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("all");

  const currentGenreObj = POPULAR_GENRES.find((g) => g.id === selectedGenre) || POPULAR_GENRES[0];

  const handleGenreChange = (genreId) => {
    if (selectedGenre !== genreId) {
      setSelectedGenre(genreId);
      setPageNo(1);
    }
  };

  const handlePrevious = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
      window.scrollTo({ top: 380, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
    window.scrollTo({ top: 380, behavior: "smooth" });
  };

  useEffect(() => {
    setLoading(true);
    fetchMoviesByGenre(selectedGenre, pageNo)
      .then((data) => {
        setMovies(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch movies by genre:", err);
        setLoading(false);
      });
  }, [selectedGenre, pageNo]);

  const getSectionTitle = () => {
    if (selectedGenre === "all") return "Trending Movies";
    if (selectedGenre === "upcoming") return "Upcoming Releases";
    if (selectedGenre === "top_rated") return "Top Rated Classics";
    return `${currentGenreObj.name} Movies`;
  };

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Genre Filter Tabs / Section Buttons */}
      <div className="mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
          {POPULAR_GENRES.map((genre) => {
            const cleanName = genre.name.replace(/^[^a-zA-Z0-9]+/, "");
            return (
              <button
                key={genre.id}
                onClick={() => handleGenreChange(genre.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shadow-sm shrink-0 ${
                  selectedGenre === genre.id
                    ? "bg-yellow-500 text-slate-950 shadow-md shadow-yellow-500/20 scale-105"
                    : "bg-slate-900/90 text-gray-300 hover:bg-slate-800 hover:text-white border border-slate-800"
                }`}
              >
                <span>{genre.icon}</span>
                <span>{cleanName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section Header */}
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-6 bg-yellow-500 rounded-full"></div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide flex items-center gap-2">
            <span>{currentGenreObj.icon}</span>
            <span>{getSectionTitle()}</span>
          </h2>
        </div>
        <span className="text-xs sm:text-sm text-gray-400 font-medium">
          Page <strong className="text-yellow-400 font-bold">{pageNo}</strong>
        </span>
      </div>

      {/* Grid Content / Skeleton */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="h-[260px] sm:h-[320px] rounded-2xl bg-slate-900 animate-pulse border border-slate-800 flex flex-col justify-end p-3 gap-2"
            >
              <div className="h-4 bg-slate-800 rounded w-3/4"></div>
              <div className="h-3 bg-slate-800 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : movie.length === 0 ? (
        <div className="py-16 text-center text-gray-400">
          <p>No movies found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {movie.map((movieObj) => (
            <MoivesCard
              key={movieObj.id}
              movieObj={movieObj}
              poster_path={movieObj.poster_path}
              name={movieObj.original_title || movieObj.title}
              handleAddToWatchList={handleAddToWatchList}
              handleRemoveFromWatchList={handleRemoveFromWatchList}
              watchList={watchList}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <Pagination
        pageNo={pageNo}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />
    </section>
  );
};

export default Movie;
