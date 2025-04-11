// src/pages/FavoritesPage.jsx
import React, { useState, useEffect } from "react";
import Favorites from "../components/Favorites";

// src/pages/FavoritesPage.jsx

const styles = {
  container: {
    maxWidth: "100vw",
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
};

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(storedFavorites);
    };

    // Listen for localStorage changes
    window.addEventListener("storage", handleStorageChange);

    // Initial load
    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  console.log("favorites:", favorites);
  const removeFromFavorites = (movieId) => {
    const updatedFavorites = favorites.filter(
      (movie) => movie.imdbID !== movieId
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Favorite Movies</h1>
      <Favorites favorites={favorites} />
    </div>
  );
};

export default FavoritesPage;
