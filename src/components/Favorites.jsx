// src/components/Favorites.jsx
import React from "react";
import { Link } from "react-router-dom";

const styles = {
  container: {
    marginTop: "20px",
    textAlign: "center",
    backgroundColor: "#121420",
    padding: "16px",
    borderRadius: "8px",
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "16px",
    padding: "0",
    listStyle: "none",
  },
  card: {
    border: "1px solid #B76D68",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    backgroundColor: "#1B2432",
    color: "#B76D68",
  },
  image: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    marginBottom: "8px",
    borderRadius: "5px",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  year: {
    color: "#B76D68",
  },
};
const Favorites = ({ favorites }) => {
  return (
    <div style={styles.container}>
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorite movies added yet.</p>
      ) : (
        <ul style={styles.list}>
          {favorites.map((movie) => (
            <li key={movie.imdbID} style={styles.card}>
              <Link to={`/movie/${movie.imdbID}`}>
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  style={styles.image}
                />
              </Link>
              <Link
                to={`/movie/${movie.imdbID}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h2 style={styles.title}>{movie.Title}</h2>
              </Link>
              <p style={styles.year}>{movie.Year}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
