import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchMovieDetails } from "../Utility/movieApi";
import genreMap from "../Utility/Genre";

const MovieDetail = ({ watchList = [], handleAddToWatchList, handleRemoveFromWatchList }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showTrailerModal, setShowTrailerModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchMovieDetails(id)
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load movie details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 font-medium text-sm">Loading Movie Details...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-white mb-2">Movie Not Found</h2>
        <p className="text-gray-400 mb-6 text-sm">The movie you requested could not be retrieved.</p>
        <Link
          to="/"
          className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm"
        >
          Return Home
        </Link>
      </div>
    );
  }

  const isInWatchlist = watchList.some((item) => String(item.id) === String(movie.id));

  // Extract YouTube Trailer Key
  const videoResults = (movie.videos && movie.videos.results) ? movie.videos.results : [];
  const officialTrailer =
    videoResults.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
    videoResults.find((v) => v.site === "YouTube") ||
    (movie.videos && movie.videos.results && movie.videos.results[0]);
  const trailerKey = officialTrailer ? officialTrailer.key : null;

  // Extract Backdrops for Image Gallery (4 to 6 images)
  const backdrops = (movie.images && movie.images.backdrops ? movie.images.backdrops : [])
    .slice(0, 6)
    .map((img) => `https://image.tmdb.org/t/p/original${img.file_path}`);

  // Fallback backdrops if API didn't return gallery
  const galleryImages = backdrops.length > 0 ? backdrops : [
    movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null,
    movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : null,
  ].filter(Boolean);

  const heroBackdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba";

  const posterImg = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500";

  // Format runtime
  const runtimeString = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : null;

  // Format genres
  const genres = movie.genres
    ? movie.genres.map((g) => g.name)
    : movie.genre_ids
    ? movie.genre_ids.map((gid) => genreMap[gid]).filter(Boolean)
    : ["Cinema"];

  // Top Cast
  const castList = movie.credits && movie.credits.cast ? movie.credits.cast.slice(0, 6) : [];

  return (
    <div className="min-h-screen pb-16">
      {/* Hero Section with Backdrop */}
      <div className="relative w-full min-h-[480px] md:min-h-[580px] bg-slate-950 overflow-hidden">
        {/* Blurred Background Image */}
        <img
          src={heroBackdrop}
          alt={movie.title || movie.original_title}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30 md:opacity-40 filter blur-sm scale-105"
        />

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/60 to-transparent"></div>

        {/* Top Back Navigation Bar */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-slate-900/80 hover:bg-yellow-500 hover:text-slate-950 text-gray-200 border border-slate-700/80 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold backdrop-blur-md transition-all duration-200 cursor-pointer shadow-md"
          >
            <i className="fa-solid fa-arrow-left text-xs"></i>
            <span>Back</span>
          </button>
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col md:flex-row items-center md:items-end gap-6 sm:gap-10">
          {/* Main Poster */}
          <div className="w-48 sm:w-60 md:w-72 shrink-0 rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-2xl shadow-black/80">
            <img
              src={posterImg}
              alt={movie.title || movie.original_title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Main Info */}
          <div className="flex-1 text-center md:text-left">
            {/* Tagline */}
            {movie.tagline && (
              <p className="text-yellow-400/90 italic text-xs sm:text-sm font-medium mb-1">
                "{movie.tagline}"
              </p>
            )}

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
              {movie.title || movie.original_title}
            </h1>

            {/* Meta Tags (Rating, Year, Runtime, Language) */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 my-3 sm:my-4">
              {movie.vote_average && (
                <div className="flex items-center gap-1.5 bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 px-3 py-1 rounded-xl text-xs sm:text-sm font-black shadow-sm">
                  <span>⭐ {Number(movie.vote_average).toFixed(1)} / 10</span>
                  {movie.vote_count && (
                    <span className="text-gray-400 font-normal text-xs">
                      ({movie.vote_count.toLocaleString()} votes)
                    </span>
                  )}
                </div>
              )}

              {movie.release_date && (
                <span className="bg-slate-800/80 text-gray-200 border border-slate-700 px-3 py-1 rounded-xl text-xs font-semibold">
                  📅 {movie.release_date.split("-")[0]}
                </span>
              )}

              {runtimeString && (
                <span className="bg-slate-800/80 text-gray-200 border border-slate-700 px-3 py-1 rounded-xl text-xs font-semibold">
                  ⏱️ {runtimeString}
                </span>
              )}

              {movie.original_language && (
                <span className="bg-slate-800/80 text-gray-200 border border-slate-700 px-3 py-1 rounded-xl text-xs uppercase font-bold">
                  🌐 {movie.original_language}
                </span>
              )}
            </div>

            {/* Genres Chips */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-5">
              {genres.map((g, idx) => (
                <span
                  key={idx}
                  className="bg-slate-900/90 text-yellow-400/90 border border-yellow-500/20 px-2.5 py-0.5 rounded-lg text-xs font-semibold"
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Action Buttons (Watch Trailer + Watchlist) */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              {trailerKey && (
                <button
                  onClick={() => setShowTrailerModal(true)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-red-600/30 transition-all cursor-pointer hover:scale-105"
                >
                  <i className="fa-solid fa-play text-xs"></i>
                  <span>Watch Trailer</span>
                </button>
              )}

              <button
                onClick={() => {
                  if (isInWatchlist) {
                    handleRemoveFromWatchList(movie);
                  } else {
                    handleAddToWatchList(movie);
                  }
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 shadow-lg cursor-pointer ${
                  isInWatchlist
                    ? "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                    : "bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-extrabold shadow-yellow-500/20"
                }`}
              >
                <span>{isInWatchlist ? "✓ In Watchlist" : "+ Add to Watchlist"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        {/* Storyline / Overview */}
        <section className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 sm:p-7 shadow-lg">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-1.5 h-5 bg-yellow-500 rounded-full"></div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white">Storyline</h2>
          </div>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-4xl">
            {movie.overview || "No overview available for this movie."}
          </p>
        </section>

        {/* 🎬 Embedded Official Trailer Player Section */}
        {trailerKey && (
          <section className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 sm:p-7 shadow-lg">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-1.5 h-5 bg-red-600 rounded-full"></div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                Official Trailer & Teaser
              </h2>
            </div>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${trailerKey}?rel=0`}
                title={`${movie.title || movie.original_title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </section>
        )}

        {/* 📸 4-5 Photos & Backdrop Gallery */}
        {galleryImages.length > 0 && (
          <section className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 sm:p-7 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-5 bg-yellow-500 rounded-full"></div>
                <h2 className="text-lg sm:text-xl font-extrabold text-white">
                  Movie Photos & Backdrops ({galleryImages.length})
                </h2>
              </div>
              <span className="text-xs text-gray-400">Click to expand</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {galleryImages.map((imgUrl, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(imgUrl)}
                  className="group relative h-28 sm:h-36 md:h-44 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 cursor-pointer shadow-md"
                >
                  <img
                    src={imgUrl}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute bottom-2 right-2 bg-slate-900/80 text-white p-1 rounded-md text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                    🔍 View
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Top Cast Section (if available) */}
        {castList.length > 0 && (
          <section className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 sm:p-7 shadow-lg">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-1.5 h-5 bg-yellow-500 rounded-full"></div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">Top Cast</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
              {castList.map((actor) => {
                const profileImg = actor.profile_path
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                  : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=185";
                return (
                  <div
                    key={actor.id}
                    className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center flex flex-col items-center"
                  >
                    <img
                      src={profileImg}
                      alt={actor.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full mb-2 border border-slate-700 shadow"
                    />
                    <h4 className="font-bold text-xs text-white line-clamp-1">{actor.name}</h4>
                    <p className="text-[11px] text-gray-400 line-clamp-1">{actor.character}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* 🎬 Floating Video Modal Player */}
      {showTrailerModal && trailerKey && (
        <div
          onClick={() => setShowTrailerModal(false)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full aspect-video bg-slate-950 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl"
          >
            <button
              onClick={() => setShowTrailerModal(false)}
              className="absolute top-3 right-3 z-10 bg-slate-900/80 hover:bg-red-600 text-white w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-colors border border-slate-700 cursor-pointer shadow-lg"
            >
              ✕
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&rel=0`}
              title={`${movie.title || movie.original_title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Lightbox / Fullscreen Image Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-yellow-400 text-2xl font-bold"
            >
              ✕ Close
            </button>
            <img
              src={selectedImage}
              alt="Expanded view"
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl border border-slate-700 shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
