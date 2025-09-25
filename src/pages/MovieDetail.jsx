import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReviewById from "../components/ReviewById";
import ReviewForm from "../components/ReviewForm";
import { useLoader } from "../context/LoaderContext";



export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [moviesCount, setMoviesCount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const currentId = parseInt(id, 10);
  const { showLoader, hideLoader } = useLoader();

  // quando il movie arriva/aggiorna, sincronizzo le recensioni
  useEffect(() => {
    if (movie?.reviews) setReviews(movie.reviews);
  }, [movie]);

  // carico il singolo film
  useEffect(() => {
    let cancelled = false;
    showLoader();

    axios
      .get(`http://localhost:3000/movies/${id}`)
      .then((res) => {
        if (!cancelled) setMovie(res.data);
      })
      .catch((err) => console.log("Errore nella chiamata:", err.message))
      .finally(() => {
        // spegno loader 
        if (!cancelled) hideLoader();
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  // carico anche la lista film per sapere quanti sono
  useEffect(() => {
    axios
      .get("http://localhost:3000/movies")
      .then((res) => setMoviesCount(res.data.length))
      .catch((err) => console.log("Errore nella chiamata:", err.message)).finally(() => {
        hideLoader();
      });
  }, []);

  if (!movie) return null;

  // quando il form crea una review, la inserisco e riordino per created_at
  const handleReviewCreated = (newReview) => {
    setReviews((prev) => {
      const updated = [...prev, newReview];
      // ordino per data crescente → più vecchie prima, più recenti in fondo
      return updated.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    });
  };
  // calcolo prev e next id in base al numero totale
  const prevId = currentId > 1 ? currentId - 1 : null;
  const nextId = currentId < moviesCount ? currentId + 1 : null;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/" className="btn btn-outline-secondary btn-sm">
          ← Back to list
        </Link>

        <div className="d-flex gap-2">
          {prevId && (
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => navigate(`/movies/${prevId}`)}
            >
              ← Previous movie
            </button>
          )}

          {nextId && (
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => navigate(`/movies/${nextId}`)}
            >
              Next movie →
            </button>
          )}
        </div>
      </div>

      <div className="row g-4 mt-3 bg-light p-3 rounded">
        <div className="col-md-4">
          <img
            src={`/${movie.image}`}
            className="img-fluid rounded shadow-sm"
            alt={movie.title}
          />
        </div>

        <div className="col-md-8">
          <h2 className="mb-1">{movie.title}</h2>
          <h5 className="text-muted mb-3">
            {movie.director} • {movie.release_year}
          </h5>

          <span className="badge bg-primary mb-3">{movie.genre}</span>

          <p>{movie.abstract}</p>

          <p className="text-muted mt-4">
            Created on: {new Date(movie.created_at).toLocaleDateString()}
            {movie.updated_at && (
              <> • Updated on: {new Date(movie.updated_at).toLocaleDateString()}</>
            )}
          </p>
        </div>
      </div>
      <hr />
      <ReviewById reviews={reviews} />
      <hr />
      <ReviewForm movieId={movie.id} onCreated={handleReviewCreated} />

    </div>
  );
}
