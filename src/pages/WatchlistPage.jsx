// src/pages/WatchlistPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
  listContainer: {
    backgroundColor: "#1B2432",
    padding: "16px",
    borderRadius: "8px",
    marginTop: "16px",
  },
  input: {
    padding: "8px",
    marginRight: "8px",
    borderRadius: "5px",
    border: "1px solid #B76D68",
    backgroundColor: "#2C2B3C",
    color: "#B76D68",
  },
  button: {
    padding: "8px 12px",
    backgroundColor: "#B76D68",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  listItem: {
    backgroundColor: "#403F4C",
    padding: "8px",
    margin: "8px 0",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

const WatchlistPage = () => {
  const [lists, setLists] = useState({});
  const [newListName, setNewListName] = useState("");

  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem("watchlists")) || {};
    setLists(storedLists);
  }, []);

  const addList = () => {
    if (newListName.trim() !== "" && !lists[newListName]) {
      const updatedLists = { ...lists, [newListName]: [] };
      setLists(updatedLists);
      localStorage.setItem("watchlists", JSON.stringify(updatedLists));
      setNewListName("");
    }
  };

  const deleteList = (listName) => {
    const updatedLists = { ...lists };
    delete updatedLists[listName];
    setLists(updatedLists);
    localStorage.setItem("watchlists", JSON.stringify(updatedLists));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Watchlists</h1>
      <input
        type="text"
        placeholder="New List Name"
        value={newListName}
        onChange={(e) => setNewListName(e.target.value)}
        style={styles.input}
      />
      <button onClick={addList} style={styles.button}>
        Add List
      </button>
      <div style={styles.listContainer}>
        {Object.keys(lists).length === 0 ? (
          <p>No watchlists created yet.</p>
        ) : (
          Object.keys(lists).map((listName) => (
            <div key={listName} style={styles.listItem}>
              <Link
                to={`/watchlist/${listName}`}
                style={{ color: "#B76D68", textDecoration: "none" }}
              >
                <h3>{listName}</h3>
              </Link>
              <button
                onClick={() => deleteList(listName)}
                style={styles.button}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;
