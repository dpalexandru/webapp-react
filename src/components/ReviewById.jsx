import { useEffect, useState } from "react";

export default function ReviewById({ movieId }) {
  // creo gli state per salvare le recensioni, lo stato di loading e gli eventuali errori
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // uso useEffect per recuperare le recensioni quando cambia l'id del film
  useEffect(() => {
    async function fetchReviews() {
      try {
        // faccio la chiamata AJAX al backend Express
        const response = await fetch(`http://localhost:3000/movies/${movieId}/reviews`);
        if (!response.ok) throw new Error("Errore nel caricamento delle recensioni");

        // trasformo la risposta in JSON
        const data = await response.json();

        // aggiorno lo state con le recensioni
        setReviews(data);
      } catch (err) {
        // in caso di errore lo salvo nello state
        setError(err.message);
      } finally {
        // in ogni caso tolgo il loading
        setLoading(false);
      }
    }

    // chiamo la funzione fetch
    fetchReviews();
  }, [movieId]); // dipendenza: se cambia movieId rifaccio la fetch

  // se sto ancora caricando mostro un messaggio
  if (loading) return <p className="text-muted">Loading reviews...</p>;

  // se c’è un errore lo mostro
  if (error) return <p className="text-danger">{error}</p>;

  // se arrivo qui vuol dire che ho i dati, quindi li stampo
  return (
    <div className="mt-3">
      {/* titolo sezione recensioni */}
      <h6 className="fw-bold">Reviews:</h6>

      {/* se non ci sono recensioni mostro un messaggio */}
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        // se ci sono recensioni le ciclo con map
        <ul className="list-group list-group-flush">
          {reviews.map((review) => (
            <li key={review.id} className="list-group-item">
              {/* nome autore e voto */}
              <strong>{review.name}</strong> ⭐ {review.vote}/5
              <br />
              {/* testo della recensione */}
              <span>{review.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
