import axios from "axios";

const TMDB_API_KEY = "3fdaea1ec4cf48f6c75024138ea34513";
const BASE_URL = "https://api.themoviedb.org/3";

export const POPULAR_GENRES = [
  { id: "all", name: "🔥 Trending", icon: "🔥" },
  { id: "upcoming", name: "⏳ Upcoming", icon: "⏳" },
  { id: "top_rated", name: "⭐ Top Rated", icon: "⭐" },
  { id: 28, name: "Action", icon: "💥" },
  { id: 27, name: "Horror", icon: "👻" },
  { id: 35, name: "Comedy", icon: "😂" },
  { id: 878, name: "Sci-Fi", icon: "🚀" },
  { id: 16, name: "Animation", icon: "✨" },
  { id: 12, name: "Adventure", icon: "🗺️" },
  { id: 53, name: "Thriller", icon: "🔪" },
  { id: 10749, name: "Romance", icon: "❤️" },
  { id: 18, name: "Drama", icon: "🎭" }
];

// Fallback backup movie data if all network requests fail
const FALLBACK_MOVIES = [
  {
    id: 939243,
    original_title: "Sonic the Hedgehog 3",
    title: "Sonic the Hedgehog 3",
    tagline: "Try to keep up.",
    poster_path: "/d8Ryb8AunYAuycVKDp5H9W6pk0C.jpg",
    backdrop_path: "/zOpe0eHfasBgEN2cl7pk6e18ZCY.jpg",
    overview: "Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before.",
    vote_average: 7.8,
    vote_count: 1450,
    runtime: 110,
    release_date: "2024-12-20",
    popularity: 1845.2,
    genres: [{ id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 35, name: "Comedy" }, { id: 10751, name: "Family" }],
    genre_ids: [28, 12, 35, 10751],
    videos: {
      results: [
        { key: "qSu6i2iFMO0", name: "Official Trailer", site: "YouTube", type: "Trailer" }
      ]
    },
    images: {
      backdrops: [
        { file_path: "/zOpe0eHfasBgEN2cl7pk6e18ZCY.jpg" },
        { file_path: "/v9Du2HC3SpknpuLSt4b45keq2a.jpg" },
        { file_path: "/tElnmtQ6yz1PjN1kePNl8yMSb59.jpg" },
        { file_path: "/3V4kLQg0kSqPLctI5ziYWuqAZYF.jpg" }
      ]
    }
  },
  {
    id: 539972,
    original_title: "Kraven the Hunter",
    title: "Kraven the Hunter",
    tagline: "Villains aren't born. They're made.",
    poster_path: "/1GvvdTX4Vl2YGFMpkN016629k36.jpg",
    backdrop_path: "/v9Du2HC3SpknpuLSt4b45keq2a.jpg",
    overview: "Kraven Kravinoff's complex relationship with his ruthless father, Nikolai, starts him down a path of vengeance with brutal consequences, motivating him to become not only the greatest hunter in the world, but also one of its most feared.",
    vote_average: 6.6,
    vote_count: 820,
    runtime: 127,
    release_date: "2024-12-13",
    popularity: 1420.5,
    genres: [{ id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 53, name: "Thriller" }],
    genre_ids: [28, 12, 53],
    videos: {
      results: [
        { key: "rze8QYwWGMs", name: "Official Red Band Trailer", site: "YouTube", type: "Trailer" }
      ]
    },
    images: {
      backdrops: [
        { file_path: "/v9Du2HC3SpknpuLSt4b45keq2a.jpg" },
        { file_path: "/zOpe0eHfasBgEN2cl7pk6e18ZCY.jpg" }
      ]
    }
  },
  {
    id: 1241982,
    original_title: "Moana 2",
    title: "Moana 2",
    tagline: "The ocean is calling them back.",
    poster_path: "/aLVkiINNOeg2MDZVe6C12fMiAhK.jpg",
    backdrop_path: "/tElnmtQ6yz1PjN1kePNl8yMSb59.jpg",
    overview: "After receiving an unexpected call from her wayfinding ancestors, Moana journeys to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she's ever faced.",
    vote_average: 7.1,
    vote_count: 950,
    runtime: 100,
    release_date: "2024-11-27",
    popularity: 1250.0,
    genres: [{ id: 16, name: "Animation" }, { id: 12, name: "Adventure" }, { id: 10751, name: "Family" }],
    genre_ids: [16, 12, 10751, 35, 14],
    videos: {
      results: [
        { key: "hDZ7y8RP5HE", name: "Official Trailer", site: "YouTube", type: "Trailer" }
      ]
    },
    images: {
      backdrops: [
        { file_path: "/tElnmtQ6yz1PjN1kePNl8yMSb59.jpg" },
        { file_path: "/zOpe0eHfasBgEN2cl7pk6e18ZCY.jpg" }
      ]
    }
  },
  {
    id: 1034541,
    original_title: "Terrifier 3",
    title: "Terrifier 3",
    tagline: "He's making a list. He's checking it twice.",
    poster_path: "/63Za5iyizkSgn14Vl22Qo191Buv.jpg",
    backdrop_path: "/18TSJF1WLA4CkymvVUcKDBDr19b.jpg",
    overview: "Art the Clown unleashes chaos on the unsuspecting residents of Miles County as they peacefully drift off to sleep on Christmas Eve.",
    vote_average: 6.9,
    vote_count: 1300,
    runtime: 125,
    release_date: "2024-10-09",
    popularity: 980.2,
    genres: [{ id: 27, name: "Horror" }, { id: 53, name: "Thriller" }],
    genre_ids: [27, 53],
    videos: {
      results: [
        { key: "868yA7z1XgU", name: "Official Trailer", site: "YouTube", type: "Trailer" }
      ]
    },
    images: {
      backdrops: [
        { file_path: "/18TSJF1WLA4CkymvVUcKDBDr19b.jpg" },
        { file_path: "/3V4kLQg0kSqPLctI5ziYWuqAZYF.jpg" }
      ]
    }
  },
  {
    id: 912649,
    original_title: "Venom: The Last Dance",
    title: "Venom: The Last Dance",
    tagline: "'Til death do they part.",
    poster_path: "/aosm8Vh92loVG6AcgPtNmll8R90.jpg",
    backdrop_path: "/3V4kLQg0kSqPLctI5ziYWuqAZYF.jpg",
    overview: "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
    vote_average: 6.8,
    vote_count: 2200,
    runtime: 109,
    release_date: "2024-10-22",
    popularity: 1100.8,
    genres: [{ id: 28, name: "Action" }, { id: 878, name: "Sci-Fi" }, { id: 12, name: "Adventure" }],
    genre_ids: [28, 878, 12],
    videos: {
      results: [
        { key: "__2bjWbetsA", name: "Final Trailer", site: "YouTube", type: "Trailer" }
      ]
    },
    images: {
      backdrops: [
        { file_path: "/3V4kLQg0kSqPLctI5ziYWuqAZYF.jpg" },
        { file_path: "/yDHYTfA3R0jFYba16jBB1jv8uaC.jpg" }
      ]
    }
  },
  {
    id: 1184918,
    original_title: "The Wild Robot",
    title: "The Wild Robot",
    tagline: "Discover your true nature.",
    poster_path: "/wTnV3PCVW5O92JMrFvvrRil3RsH.jpg",
    backdrop_path: "/417tYZ4XUyJrdyZXWs3MrVIuuII.jpg",
    overview: "After a shipwreck, an intelligent robot named Roz is stranded on an uninhabited island. To survive the harsh environment, Roz bonds with the island's animals and cares for an orphaned baby goose.",
    vote_average: 8.4,
    vote_count: 3600,
    runtime: 102,
    release_date: "2024-09-12",
    popularity: 870.3,
    genres: [{ id: 16, name: "Animation" }, { id: 878, name: "Sci-Fi" }, { id: 10751, name: "Family" }],
    genre_ids: [16, 878, 10751],
    videos: {
      results: [
        { key: "67vlFsVOD8g", name: "Official Trailer", site: "YouTube", type: "Trailer" }
      ]
    },
    images: {
      backdrops: [
        { file_path: "/417tYZ4XUyJrdyZXWs3MrVIuuII.jpg" },
        { file_path: "/zOpe0eHfasBgEN2cl7pk6e18ZCY.jpg" }
      ]
    }
  },
  {
    id: 533535,
    original_title: "Deadpool & Wolverine",
    title: "Deadpool & Wolverine",
    tagline: "Come together.",
    poster_path: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    backdrop_path: "/yDHYTfA3R0jFYba16jBB1jv8uaC.jpg",
    overview: "A listless Wade Wilson toils in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
    vote_average: 7.7,
    vote_count: 5800,
    runtime: 128,
    release_date: "2024-07-24",
    popularity: 630.0,
    genres: [{ id: 28, name: "Action" }, { id: 35, name: "Comedy" }, { id: 878, name: "Sci-Fi" }],
    genre_ids: [28, 35, 878],
    videos: {
      results: [
        { key: "73_1biulkYk", name: "Official Trailer", site: "YouTube", type: "Trailer" }
      ]
    },
    images: {
      backdrops: [
        { file_path: "/yDHYTfA3R0jFYba16jBB1jv8uaC.jpg" },
        { file_path: "/3V4kLQg0kSqPLctI5ziYWuqAZYF.jpg" }
      ]
    }
  }
];

export async function fetchPopularMovies(pageNo = 1) {
  const targetUrl = `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${pageNo}`;
  
  try {
    const res = await axios.get(targetUrl, { timeout: 3000 });
    if (res.data && res.data.results && res.data.results.length > 0) {
      return { results: res.data.results, source: "direct" };
    }
  } catch (err) {
    console.warn("Direct TMDB API failed. Trying proxy fallback...", err.message);
  }

  try {
    const proxyUrl = `https://proxy.cors.sh/${targetUrl}`;
    const res = await axios.get(proxyUrl, { timeout: 5000 });
    if (res.data && res.data.results && res.data.results.length > 0) {
      return { results: res.data.results, source: "proxy" };
    }
  } catch (err) {
    console.warn("Proxy fallback failed.", err.message);
  }

  return { results: FALLBACK_MOVIES, source: "fallback" };
}

export async function fetchMoviesByGenre(genreId = "all", pageNo = 1) {
  let targetUrl;

  if (genreId === "all" || !genreId) {
    targetUrl = `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${pageNo}`;
  } else if (genreId === "upcoming") {
    targetUrl = `${BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=${pageNo}`;
  } else if (genreId === "top_rated") {
    targetUrl = `${BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=${pageNo}`;
  } else {
    targetUrl = `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&language=en-US&sort_by=popularity.desc&page=${pageNo}`;
  }

  try {
    const res = await axios.get(targetUrl, { timeout: 3000 });
    if (res.data && res.data.results && res.data.results.length > 0) {
      return { results: res.data.results, source: "direct" };
    }
  } catch (err) {
    console.warn(`Direct genre fetch for ${genreId} failed. Trying proxy fallback...`, err.message);
  }

  try {
    const proxyUrl = `https://proxy.cors.sh/${targetUrl}`;
    const res = await axios.get(proxyUrl, { timeout: 5000 });
    if (res.data && res.data.results && res.data.results.length > 0) {
      return { results: res.data.results, source: "proxy" };
    }
  } catch (err) {
    console.warn(`Proxy genre fetch for ${genreId} failed.`, err.message);
  }

  if (genreId === "all" || genreId === "upcoming" || genreId === "top_rated") {
    return { results: FALLBACK_MOVIES, source: "fallback" };
  }

  const filtered = FALLBACK_MOVIES.filter(
    (m) => m.genre_ids && m.genre_ids.includes(Number(genreId))
  );
  return { results: filtered.length > 0 ? filtered : FALLBACK_MOVIES, source: "fallback" };
}

export async function fetchTrendingBannerMovies() {
  const targetUrl = `${BASE_URL}/trending/movie/day?api_key=${TMDB_API_KEY}`;
  try {
    const res = await axios.get(targetUrl, { timeout: 3000 });
    if (res.data && res.data.results && res.data.results.length > 0) {
      return res.data.results.slice(0, 6);
    }
  } catch (err) {
    console.warn("Trending fetch direct failed. Trying proxy fallback...", err.message);
  }

  try {
    const proxyUrl = `https://proxy.cors.sh/${targetUrl}`;
    const res = await axios.get(proxyUrl, { timeout: 5000 });
    if (res.data && res.data.results && res.data.results.length > 0) {
      return res.data.results.slice(0, 6);
    }
  } catch (err) {
    console.warn("Trending proxy failed, using fallbacks.", err.message);
  }

  return FALLBACK_MOVIES.slice(0, 6);
}

export async function fetchMovieDetails(id) {
  const targetUrl = `${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=images,credits,recommendations,videos`;
  
  try {
    const res = await axios.get(targetUrl, { timeout: 3500 });
    if (res.data && res.data.id) {
      return res.data;
    }
  } catch (err) {
    console.warn("Direct Movie Details failed. Trying proxy fallback...", err.message);
  }

  try {
    const proxyUrl = `https://proxy.cors.sh/${targetUrl}`;
    const res = await axios.get(proxyUrl, { timeout: 5500 });
    if (res.data && res.data.id) {
      return res.data;
    }
  } catch (err) {
    console.warn("Proxy Movie Details failed.", err.message);
  }

  const found = FALLBACK_MOVIES.find((m) => String(m.id) === String(id));
  if (found) {
    return found;
  }

  return FALLBACK_MOVIES[0];
}
