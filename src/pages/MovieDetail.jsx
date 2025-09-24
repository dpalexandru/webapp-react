import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [moviesCount, setMoviesCount] = useState(0); // numero totale film

  const currentId = parseInt(id, 10);

  // carico il singolo film
  useEffect(() => {
    axios
      .get(`http://localhost:3000/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log("Errore nella chiamata:", err.message));
  }, [id]);

  // carico anche la lista film per sapere quanti sono
  useEffect(() => {
    axios
      .get("http://localhost:3000/movies")
      .then((res) => setMoviesCount(res.data.length))
      .catch((err) => console.log("Errore nella chiamata:", err.message));
  }, []);

  if (!movie) return null;

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

      <div className="row g-4">
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
            Creato il: {new Date(movie.created_at).toLocaleDateString()}
            {movie.updated_at && (
              <> • Aggiornato il: {new Date(movie.updated_at).toLocaleDateString()}</>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
