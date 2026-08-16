import React from "react";
import { Link } from "react-router-dom";

const MoivesCard = ({
  movieObj,
  poster_path,
  name,
  handleAddToWatchList,
  handleRemoveFromWatchList,
  watchList = [],
}) => {
  const isInWatchlist = watchList.some((item) => item.id === movieObj.id);

  const imgUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500";

  return (
    <Link
      to={`/movie/${movieObj.id}`}
      className="group relative w-full h-[260px] sm:h-[320px] md:h-[340px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/80 shadow-lg hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between block cursor-pointer"
    >
      {/* Background Poster Image */}
      <img
        src={imgUrl}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />

      {/* Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

      {/* Top Badges (Rating + Watchlist Toggle) */}
      <div className="relative z-10 p-2 sm:p-2.5 flex items-center justify-between">
        {movieObj.vote_average ? (
          <span className="bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-yellow-400 text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 shadow">
            ⭐ {Number(movieObj.vote_average).toFixed(1)}
          </span>
        ) : (
          <div></div>
        )}

        {/* Watchlist Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isInWatchlist) {
              handleRemoveFromWatchList(movieObj);
            } else {
              handleAddToWatchList(movieObj);
            }
          }}
          aria-label="Add to watchlist"
          className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 cursor-pointer shadow-md ${
            isInWatchlist
              ? "bg-red-500/90 text-white scale-110 shadow-red-500/40"
              : "bg-slate-950/70 text-gray-300 hover:text-white hover:bg-slate-900 border border-slate-700/80 hover:scale-110"
          }`}
        >
          {isInWatchlist ? (
            <svg
              className="w-4 h-4 fill-current text-white"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 fill-none stroke-current stroke-2"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </button>
      </div>

      {/* Bottom Title & Details */}
      <div className="relative z-10 p-2.5 sm:p-3 text-white">
        <h3 className="font-bold text-xs sm:text-sm md:text-base leading-tight drop-shadow-md line-clamp-2">
          {name}
        </h3>
        {movieObj.release_date && (
          <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
            {movieObj.release_date.split("-")[0]}
          </p>
        )}
      </div>
    </Link>
  );
};

export default MoivesCard;
