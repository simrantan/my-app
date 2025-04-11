// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "./pages/Home";
import FavoritesPage from "./pages/FavoritesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import WatchlistPage from "./pages/WatchlistPage";
import WatchlistDetailsPage from "./pages/WatchlistDetailsPage";

const styles = {
  navContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "16px",
    backgroundColor: "#1B2432",
    borderBottom: "2px solid #B76D68",
  },
  link: {
    color: "#B76D68",
    textDecoration: "none",
    fontSize: "18px",
    padding: "8px 16px",
    borderRadius: "5px",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  activeLink: {
    backgroundColor: "#2C2B3C",
    color: "white",
  },
};

const App = () => {
  return (
    <Router>
      <nav style={styles.navContainer}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.activeLink : {}),
          })}
        >
          Home
        </NavLink>

        <NavLink
          to="/favorites"
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.activeLink : {}),
          })}
        >
          Favorites
        </NavLink>

        <NavLink
          to="/watchlist"
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.activeLink : {}),
          })}
        >
          Watchlist
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/watchlist/:listName" element={<WatchlistDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
