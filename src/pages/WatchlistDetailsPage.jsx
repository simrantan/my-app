// src/pages/WatchlistDetailsPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

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
  movieContainer: {
    backgroundColor: "#1B2432",
    padding: "16px",
    borderRadius: "8px",
    marginTop: "16px",
  },
  movieItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px",
    backgroundColor: "#403F4C",
    borderRadius: "5px",
    marginBottom: "8px",
  },
  movieImage: {
    width: "50px",
    height: "75px",
    objectFit: "cover",
    borderRadius: "5px",
  },
  button: {
    padding: "8px 12px",
    backgroundColor: "#B76D68",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

const WatchlistDetailsPage = () => {
  const { listName } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem("watchlists")) || {};
    if (storedLists[listName]) {
      setMovies(storedLists[listName]);
    }
  }, [listName]);

  const removeMovie = (movieId) => {
    const updatedMovies = movies.filter((movie) => movie.imdbID !== movieId);
    setMovies(updatedMovies);
    const storedLists = JSON.parse(localStorage.getItem("watchlists")) || {};
    storedLists[listName] = updatedMovies;
    localStorage.setItem("watchlists", JSON.stringify(storedLists));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{listName} Watchlist</h1>
      <Link
        to="/watchlist"
        style={{
          color: "#B76D68",
          textDecoration: "none",
          display: "block",
          marginBottom: "16px",
        }}
      >
        Back to Watchlists
      </Link>
      <div style={styles.movieContainer}>
        {movies.length === 0 ? (
          <p>No movies in this watchlist.</p>
        ) : (
          movies.map((movie) => (
            <div key={movie.imdbID} style={styles.movieItem}>
              <img
                src={movie.Poster}
                alt={movie.Title}
                style={styles.movieImage}
              />
              <Link
                to={`/movie/${movie.imdbID}`}
                style={{ color: "#B76D68", textDecoration: "none" }}
              >
                {movie.Title} ({movie.Year})
              </Link>
              <button
                onClick={() => removeMovie(movie.imdbID)}
                style={styles.button}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WatchlistDetailsPage;
