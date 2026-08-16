import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import WishList from "./Components/WishList";
import Moive from "./Components/Moive";
import MovieDetail from "./Components/MovieDetail";
import SipperBanner from "./Components/SipperBanner";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const [watchList, setWatchList] = useState([]);

  const handleAddToWatchList = (movieObj) => {
    const newWatchList = [...watchList, movieObj];
    localStorage.setItem("moviesApp", JSON.stringify(newWatchList));
    setWatchList(newWatchList);
  };

  const handleRemoveFromWatchList = (movieObj) => {
    const filteredWatchList = watchList.filter((movie) => movie.id !== movieObj.id);
    setWatchList(filteredWatchList);
    localStorage.setItem("moviesApp", JSON.stringify(filteredWatchList));
  };

  useEffect(() => {
    const moviesFromLocalStorage = localStorage.getItem("moviesApp");
    if (moviesFromLocalStorage) {
      try {
        setWatchList(JSON.parse(moviesFromLocalStorage));
      } catch (e) {
        console.error("Failed to parse local storage:", e);
      }
    }
  }, []);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-yellow-500 selection:text-slate-950">
      <BrowserRouter>
        <Navbar watchListCount={watchList.length} />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SipperBanner
                    watchList={watchList}
                    handleAddToWatchList={handleAddToWatchList}
                    handleRemoveFromWatchList={handleRemoveFromWatchList}
                  />
                  <Moive
                    watchList={watchList}
                    handleAddToWatchList={handleAddToWatchList}
                    handleRemoveFromWatchList={handleRemoveFromWatchList}
                  />
                </>
              }
            />
            <Route
              path="/movie/:id"
              element={
                <MovieDetail
                  watchList={watchList}
                  handleAddToWatchList={handleAddToWatchList}
                  handleRemoveFromWatchList={handleRemoveFromWatchList}
                />
              }
            />
            <Route
              path="/watchlist"
              element={
                <WishList
                  watchList={watchList}
                  handleRemoveFromWatchList={handleRemoveFromWatchList}
                  setWatchList={setWatchList}
                />
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
