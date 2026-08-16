import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, EffectFade } from "swiper/modules";
import { fetchTrendingBannerMovies } from "../Utility/movieApi";
import genreMap from "../Utility/Genre";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function SipperBanner({ handleAddToWatchList, handleRemoveFromWatchList, watchList = [] }) {
  const [bannerMovies, setBannerMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingBannerMovies()
      .then((movies) => {
        setBannerMovies(movies);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const isMovieInWatchlist = (movieObj) => {
    return watchList.some((item) => item.id === movieObj.id);
  };

  if (loading) {
    return (
      <div className="w-full h-[260px] sm:h-[420px] md:h-[520px] bg-slate-900 animate-pulse flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-400 text-sm font-medium">Loading Featured Movies...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative overflow-hidden bg-slate-950">
      <Swiper
        effect={"fade"}
        fadeEffect={{ crossFade: true }}
        navigation={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        loop={bannerMovies.length > 1}
        modules={[Navigation, Autoplay, Pagination, EffectFade]}
        className="banner-swiper"
      >
        {bannerMovies.map((movie, index) => {
          const bgUrl = movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : movie.poster_path
            ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
            : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba";

          const isInWatchlist = isMovieInWatchlist(movie);

          return (
            <SwiperSlide key={movie.id || index}>
              <div className="relative w-full h-[280px] sm:h-[420px] md:h-[520px] lg:h-[580px]">
                {/* Background Image */}
                <img
                  className="w-full h-full object-cover object-center"
                  src={bgUrl}
                  alt={movie.title || movie.original_title}
                  loading={index === 0 ? "eager" : "lazy"}
                />

                {/* Dark Vignette and Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent"></div>

                {/* Content Details */}
                <div className="absolute bottom-6 sm:bottom-12 md:bottom-16 left-4 sm:left-10 md:left-16 max-w-[90%] sm:max-w-xl md:max-w-2xl text-white z-10">
                  {/* Trending Badge & Rating */}
                  <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
                    <span className="bg-yellow-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                      🔥 Trending #{index + 1}
                    </span>
                    {movie.vote_average && (
                      <span className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-md border border-slate-700 text-yellow-400 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        ⭐ {Number(movie.vote_average).toFixed(1)} / 10
                      </span>
                    )}
                    {movie.genre_ids && movie.genre_ids[0] && (
                      <span className="hidden sm:inline-block bg-slate-800/80 backdrop-blur-md text-gray-300 text-xs px-2.5 py-0.5 rounded-full border border-slate-700">
                        {genreMap[movie.genre_ids[0]] || "Cinema"}
                      </span>
                    )}
                  </div>

                  {/* Title Link */}
                  <Link to={`/movie/${movie.id}`} className="hover:text-yellow-400 transition-colors">
                    <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md line-clamp-1 sm:line-clamp-2">
                      {movie.title || movie.original_title}
                    </h1>
                  </Link>

                  {/* Overview */}
                  {movie.overview && (
                    <p className="mt-1 sm:mt-3 text-xs sm:text-sm md:text-base text-gray-300 line-clamp-2 sm:line-clamp-3 max-w-lg leading-relaxed drop-shadow">
                      {movie.overview}
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-3 sm:mt-5 flex items-center gap-2.5 sm:gap-3">
                    <Link
                      to={`/movie/${movie.id}`}
                      className="inline-flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 px-3.5 py-1.5 sm:px-4 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md"
                    >
                      <i className="fa-solid fa-circle-info text-xs"></i>
                      <span>Details</span>
                    </Link>

                    {handleAddToWatchList && (
                      <button
                        onClick={() =>
                          isInWatchlist
                            ? handleRemoveFromWatchList(movie)
                            : handleAddToWatchList(movie)
                        }
                        className={`flex items-center gap-2 px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 shadow-lg cursor-pointer ${
                          isInWatchlist
                            ? "bg-red-600 hover:bg-red-700 text-white"
                            : "bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-extrabold shadow-yellow-500/30"
                        }`}
                      >
                        <span>{isInWatchlist ? "✓ In Watchlist" : "+ Watchlist"}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Swiper Custom Arrow & Bullet Styles */}
      <style>{`
        .banner-swiper .swiper-button-next,
        .banner-swiper .swiper-button-prev {
          color: #ffffff;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(8px);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          transition: all 0.2s ease;
        }
        @media (max-width: 640px) {
          .banner-swiper .swiper-button-next,
          .banner-swiper .swiper-button-prev {
            display: none;
          }
        }
        .banner-swiper .swiper-button-next:after,
        .banner-swiper .swiper-button-prev:after {
          font-size: 14px;
          font-weight: bold;
        }
        .banner-swiper .swiper-button-next:hover,
        .banner-swiper .swiper-button-prev:hover {
          background: #eab308;
          color: #020617;
          border-color: #eab308;
        }
        .banner-swiper .swiper-pagination-bullet {
          background: #ffffff;
          opacity: 0.5;
        }
        .banner-swiper .swiper-pagination-bullet-active {
          background: #eab308;
          opacity: 1;
          width: 20px;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}
