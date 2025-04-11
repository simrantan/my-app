// importing react
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// setting up the styling
const styles = {
  card: {
    border: "1px solid #403F4C",
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
  button: {
    marginTop: "8px",
    backgroundColor: "#B76D68",
    color: "white",
    padding: "8px 16px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#2C2B3C",
    color: "white",
  },
  dropdown: {
    marginTop: "8px",
    padding: "8px",
    borderRadius: "5px",
    backgroundColor: "#2C2B3C",
    color: "#B76D68",
    border: "1px solid #B76D68",
    cursor: "pointer",
  },
};

// defining parameters for each movie card
const MovieCard = ({
  movie,
  favorites,
  addToFavorites,
  removeFromFavorites,
}) => {
  const [isFavorite, setIsFavorite] = useState(false); // creating the "favorite" states
  const [watchlists, setWatchlists] = useState({});
  const [selectedList, setSelectedList] = useState("");
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(storedFavorites.some((fav) => fav.imdbID === movie.imdbID));

    const storedLists = JSON.parse(localStorage.getItem("watchlists")) || {};
    setWatchlists(storedLists);
    //
    if (selectedList && storedLists[selectedList]) {
      setIsInWatchlist(
        storedLists[selectedList].some((item) => item.imdbID === movie.imdbID)
      );
    }
  }, [movie.imdbID, selectedList]);

  const handleFavoriteToggle = () => {
    let updatedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      updatedFavorites = updatedFavorites.filter(
        (fav) => fav.imdbID !== movie.imdbID
      );
      removeFromFavorites(movie.imdbID);
    } else {
      updatedFavorites.push(movie);
      addToFavorites(movie);
    }
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  //is there a selected list?
  //if there is:
  //we want to check if we've already added this movie to the watch list
  //if we dont-
  // we're gonna add it
  //if we do -
  //we're gonna remove it

  const handleWatchlistToggle = () => {
    if (!selectedList) return;
    const updatedLists = { ...watchlists };
    const currentList = updatedLists[selectedList] || [];

    if (isInWatchlist) {
      updatedLists[selectedList] = currentList.filter(
        (item) => item.imdbID !== movie.imdbID
      );
    } else {
      updatedLists[selectedList] = [...currentList, movie];
    }

    setWatchlists(updatedLists);
    localStorage.setItem("watchlists", JSON.stringify(updatedLists));
    setIsInWatchlist(!isInWatchlist);
  };

  return (
    <div style={styles.card}>
      <Link to={`/movie/${movie.imdbID}`}>
        <img src={movie.Poster} alt={movie.Title} style={styles.image} />
      </Link>
      <Link
        to={`/movie/${movie.imdbID}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <h2 style={styles.title}>{movie.Title}</h2>
      </Link>
      <p style={styles.year}>{movie.Year}</p>

      <button
        onClick={handleFavoriteToggle}
        style={styles.button}
        onMouseOver={(e) =>
          (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
        }
        onMouseOut={(e) =>
          (e.target.style.backgroundColor = styles.button.backgroundColor)
        }
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      <select
        style={styles.dropdown}
        value={selectedList}
        onChange={(e) => setSelectedList(e.target.value)}
      >
        <option value="">Select Watchlist</option>
        {Object.keys(watchlists).map((list) => (
          <option key={list} value={list}>
            {list}
          </option>
        ))}
      </select>
      {selectedList && (
        <button style={styles.button} onClick={handleWatchlistToggle}>
          {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>
      )}
    </div>
  );
};

export default MovieCard; // exporting MovieCard to be used in other files
