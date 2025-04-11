import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// 🎨 Styles
const styles = {
  container: {
    position: "relative", // Needed for dropdown to position correctly
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "16px",
    backgroundColor: "#1B2432",
    padding: "10px",
    borderRadius: "8px",
  },
  inputWrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  input: {
    width: "300px",
    padding: "10px",
    border: "1px solid #B76D68",
    borderRadius: "5px",
    fontSize: "16px",
    marginRight: "8px",
    backgroundColor: "#2C2B3C",
    color: "#B76D68",
  },
  button: {
    padding: "10px 16px",
    backgroundColor: "#B76D68",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#403F4C",
  },
  suggestions: {
    position: "absolute",
    top: "60px",
    width: "300px",
    maxHeight: "250px",
    overflowY: "auto",
    backgroundColor: "#2C2B3C",
    border: "1px solid #B76D68",
    borderRadius: "5px",
    zIndex: 10,
  },
  suggestionItem: {
    display: "flex", // layout for poster and text
    alignItems: "center",
    gap: "10px",
    padding: "8px",
    cursor: "pointer",
    color: "#B76D68",
  },
  suggestionItemHover: {
    backgroundColor: "#403F4C",
  },
  posterThumb: {
    width: "40px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "4px",
  },
};

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // 🔍 Fetch autocomplete suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
      if (query.length < 3) return setSuggestions([]);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
        );
        const data = await res.json();
        if (data.Response === "True") {
          setSuggestions(data.Search.slice(0, 5)); // Only top 5
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        console.error("Failed to fetch suggestions:", err);
      }
    };

    fetchSuggestions();
  }, [query]);

  // 🔎 Trigger search
  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query);
      setSuggestions([]);
    }
  };

  // 🧠 Set input and search on suggestion click
  const handleSuggestionClick = (title) => {
    setQuery(title);
    onSearch(title);
    setSuggestions([]);
  };

  return (
    <div style={styles.container}>
      <div style={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.input}
        />
        <button
          onClick={handleSearch}
          style={styles.button}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor =
              styles.buttonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
        >
          Search
        </button>
      </div>

      {/* Suggestion Dropdown */}

      {suggestions.length > 0 && (
        <div style={styles.suggestions}>
          {suggestions.map((movie) => (
            <Link
              to={`/movie/${movie.imdbID}`}
              style={{ color: "#B76D68", textDecoration: "none" }}
            >
              <div
                key={movie.imdbID}
                style={styles.suggestionItem}
                onClick={() => handleSuggestionClick(movie.Title)}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    styles.suggestionItemHover.backgroundColor)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "/fallback.png"}
                  alt={movie.Title}
                  style={styles.posterThumb}
                />
                <span>
                  {movie.Title} {movie.Year ? `(${movie.Year})` : ""}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
