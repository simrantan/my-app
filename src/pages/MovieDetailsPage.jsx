import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "16px",
  },
  image: {
    width: "auto",
    maxWidth: "100%",
    maxHeight: "400px",
    objectFit: "contain",
    borderRadius: "8px",
  },
  details: {
    textAlign: "left",
    marginTop: "16px",
    padding: "16px",
    backgroundColor: "#1B2432",
    borderRadius: "8px",
  },
  button: {
    marginTop: "16px",
    padding: "10px 16px",
    backgroundColor: "#B76D68",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  textarea: {
    width: "100%",
    minHeight: "100px",
    marginTop: "8px",
    padding: "8px",
    backgroundColor: "#2C2B3C",
    color: "#B76D68",
    border: "1px solid #B76D68",
    borderRadius: "5px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "8px",
    backgroundColor: "#2C2B3C",
    color: "#B76D68",
    border: "1px solid #B76D68",
    borderRadius: "5px",
  },
  reviewBox: {
    marginTop: "24px",
    textAlign: "left",
    backgroundColor: "#1B2432",
    padding: "16px",
    borderRadius: "8px",
  },
  reviewCard: {
    backgroundColor: "#2C2B3C",
    padding: "12px",
    borderRadius: "5px",
    marginTop: "12px",
    border: "1px solid #403F4C",
  },
  reviewer: {
    fontWeight: "bold",
    marginBottom: "4px",
  },
  reviewText: {
    marginTop: "4px",
  },
  rating: {
    fontStyle: "italic",
    color: "#F2D0A4",
    marginTop: "4px",
  },
  averageRating: {
    fontWeight: "bold",
    fontSize: "18px",
    color: "#F2D0A4",
    marginTop: "12px",
  },
};

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  //new
  const [showReviewBox, setShowReviewBox] = useState(false); //keeps track of if review button has been pressed or not
  const [reviewText, setReviewText] = useState(""); //keeps the content of the review
  const [reviewerName, setReviewerName] = useState(""); //keeps the name of the reviewer
  const [reviewRating, setReviewRating] = useState(""); //keeps the reviewer rating
  const [reviews, setReviews] = useState([]); //list of reviews associated with this movie

  //new
  useEffect(() => {
    const fetchMovieDetails = async () => {
      const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
      const url = `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Response === "True") {
          setMovie(data);
        } else {
          console.error("Movie not found:", data.Error);
          setMovie(null);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setMovie(null);
      }
    };
    fetchMovieDetails();

    const savedReviews =
      JSON.parse(localStorage.getItem(`reviews-${id}`)) || [];
    setReviews(savedReviews);
  }, [id]);

  //create an object newReview
  //add name, text, rating to our newreview object
  //add an ID to newReview
  //add this to list savedreviews
  //update our savedReviews (setReviews)
  //refresh our name, text, rating to empty

  const handleSaveReview = () => {
    if (
      reviewText.trim() !== "" &&
      reviewerName.trim() !== "" &&
      reviewRating.trim() !== "" &&
      !isNaN(reviewRating) &&
      Number(reviewRating) >= 0 &&
      Number(reviewRating) <= 10
    ) {
      const newReview = {
        name: reviewerName.trim(),
        text: reviewText.trim(),
        rating: Number(reviewRating),
      };
      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);
      localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews));
      setReviewText("");
      setReviewerName("");
      setReviewRating("");
      setShowReviewBox(false);
    } else {
      alert("Please fill out all fields and enter a rating between 0 and 10.");
    }
  };

  //
  const getAverageRating = () => {
    if (reviews.length === 0) return null;
    const total = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  if (!movie) {
    return (
      <div style={styles.container}>Movie not found or failed to load.</div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{movie.Title}</h1>
      <div style={styles.imageContainer}>
        <img src={movie.Poster} alt={movie.Title} style={styles.image} />
      </div>
      <div style={styles.details}>
        <p>
          <strong>Year:</strong> {movie.Year}
        </p>
        <p>
          <strong>Genre:</strong> {movie.Genre}
        </p>
        <p>
          <strong>Director:</strong> {movie.Director}
        </p>
        <p>
          <strong>Actors:</strong> {movie.Actors}
        </p>
        <p>
          <strong>Plot:</strong> {movie.Plot}
        </p>
        <p>
          <strong>IMDB Rating:</strong> {movie.imdbRating}
        </p>

        <button
          style={styles.button}
          onClick={() => setShowReviewBox(!showReviewBox)}
        >
          {showReviewBox ? "Cancel" : "Write Review"}
        </button>

        {showReviewBox && (
          <div>
            <input
              type="text"
              style={styles.input}
              placeholder="Your name"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
            />
            <input
              type="number"
              style={styles.input}
              placeholder="Rating (0-10)"
              value={reviewRating}
              onChange={(e) => setReviewRating(e.target.value)}
              min="0"
              max="10"
            />
            <textarea
              style={styles.textarea}
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <button style={styles.button} onClick={handleSaveReview}>
              Save Review
            </button>
          </div>
        )}
      </div>

      {reviews.length > 0 && (
        <div style={styles.reviewBox}>
          <h3>Review(s) for {movie.Title}:</h3>
          <div style={styles.averageRating}>
            Average Rating: {getAverageRating()} / 10
          </div>
          {reviews.map((review, index) => (
            <div key={index} style={styles.reviewCard}>
              <div style={styles.reviewer}>{review.name}</div>
              <div style={styles.reviewText}>{review.text}</div>
              <div style={styles.rating}>Rating: {review.rating} / 10</div>
            </div>
          ))}
        </div>
      )}

      <button style={styles.button} onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default MovieDetailsPage;
