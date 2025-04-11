// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import Favorites from "../components/Favorites";

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "16px",
    textAlign: "center",
    backgroundColor: "#121420",
    color: "#B76D68",
    minHeight: "100vh",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "16px",
    color: "#B76D68",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "16px",
    marginTop: "16px",
  },
  filter: {
    backgroundColor: "#1B2432",
    color: "#B76D68",
    border: "2px solid #B76D68",
    padding: "8px",
    borderRadius: "5px",
    marginBottom: "16px",
  },
  clearButton: {
    marginLeft: "10px",
    padding: "8px 12px",
    backgroundColor: "#B76D68",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

const genreList = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Western",
];

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  //new
  const [selectedGenre, setSelectedGenre] = useState("");
  const [allMovies, setAllMovies] = useState([]);

  const searchMovies = async (query) => {
    const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
    const url = `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.Search) {
        const detailedMovies = await Promise.all(
          data.Search.map(async (movie) => {
            const detailsRes = await fetch(
              `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`
            );
            return await detailsRes.json();
          })
        );
        setAllMovies(detailedMovies);
      } else {
        setAllMovies([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //new
  useEffect(() => {
    if (selectedGenre) {
      const filtered = allMovies.filter((movie) => {
        const genres = movie.Genre ? movie.Genre.split(", ") : [];
        return genres.includes(selectedGenre);
      });
      setMovies(filtered);
    } else {
      setMovies(allMovies);
    }
  }, [selectedGenre, allMovies]);

  //new
  const clearGenreFilter = () => {
    setSelectedGenre("");
  };

  const addToFavorites = (movie) => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!storedFavorites.some((fav) => fav.imdbID === movie.imdbID)) {
      const updatedFavorites = [...storedFavorites, movie];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const removeFromFavorites = (movieId) => {
    const updatedFavorites = favorites.filter(
      (movie) => movie.imdbID !== movieId
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Movie Search App</h1>
      <SearchBar onSearch={searchMovies} />

      <div>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          style={styles.filter}
        >
          <option value="">Filter by Genre</option>
          {genreList.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        {selectedGenre && (
          <button onClick={clearGenreFilter} style={styles.clearButton}>
            Clear Filter
          </button>
        )}
      </div>

      <div style={styles.grid}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            favorites={favorites || []}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
          />
        ))}
      </div>
      <Favorites favorites={favorites} />
    </div>
  );
};

export default Home;
