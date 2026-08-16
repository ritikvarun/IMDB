import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ watchListCount = 0 }) => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-yellow-500 text-slate-950 font-black text-xl sm:text-2xl px-2.5 py-0.5 rounded-lg tracking-tighter group-hover:scale-105 transition-transform duration-200 shadow-md shadow-yellow-500/20">
            IMDb
          </div>
          <span className="text-white font-bold text-base sm:text-lg tracking-wide hidden xs:inline-block">
            Cinema<span className="text-yellow-400">Hub</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/"
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
              location.pathname === "/"
                ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30"
                : "text-gray-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            🎬 Movies
          </Link>

          <Link
            to="/watchlist"
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
              location.pathname === "/watchlist"
                ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30"
                : "text-gray-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <span>❤️ Watchlist</span>
            {watchListCount > 0 && (
              <span className="bg-yellow-500 text-slate-950 text-[11px] font-black px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                {watchListCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
