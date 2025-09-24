import { Link } from "react-router-dom";

// definisco il componente MovieCard
export default function MovieCard({ movie }) {
  return (
    <div className="col-md-4 mb-4">
      {/* position-relative serve per la stretched-link */}
      <div className="card h-100 shadow-sm position-relative">
        {/* immagine film */}
        <img
          src={movie.image}
          className="card-img-top"
          alt={movie.title}
        />

        <div className="card-body">
          {/* titolo e regista */}
          <h5 className="card-title">{movie.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {movie.director} – {movie.release_year}
          </h6>

          {/* genere */}
          <p className="badge bg-primary">{movie.genre}</p>

          {/* abstract */}
          <p className="card-text">{movie.abstract}</p>

          {/* link che rende cliccabile TUTTA la card */}
          <Link
            to={`/movies/${movie.id}`}
            className="stretched-link"
            aria-label={`Vai ai dettagli di ${movie.title}`}
          />
        </div>

        <div className="card-footer text-muted">
          Aggiunto il: {new Date(movie.created_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
