import { useState } from "react";
import axios from "axios";

export default function ReviewForm({ movieId, onCreated }) {
  // creo gli state per i campi del form
  const [name, setName] = useState("");
  const [vote, setVote] = useState(0);
  const [text, setText] = useState("");


  // stato invio e messaggi
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // qui gestisco il click sulle stelline
  const handleStarClick = (value) => {
    setVote(value);
  };

  // qui gestisco l'invio del form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // controllo minimale: devo avere nome, voto e testo
    if (!name.trim() || !text.trim() || vote < 1) {
      setError("Please provide your name, a rating and a short review.");
      return;
    }

    try {
      setLoading(true);

      // faccio la POST al backend
      const res = await axios.post(`http://localhost:3000/movies/${movieId}/reviews`, {
        name,
        vote,
        text,
      });

      // se il parent mi passa onCreated, gli passo la review creata per aggiornare la UI
      if (onCreated) onCreated(res.data);

      // pulisco i campi
      setName("");
      setVote(0);
      setText("");
    } catch (err) {
      setError("Unable to submit the review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-2 bg-light p-3 rounded" onSubmit={handleSubmit}>
      {/* titolo form */}
      <h6 className="fw-bold mb-3">Write a review</h6>

      {/* eventuale errore */}
      {error && <div className="alert alert-danger py-2">{error}</div>}

      {/* nome */}
      <div className="mb-3">
        <label className="form-label">Your name</label>
        <input
          type="text"
          className="form-control"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* voto a stelline con Font Awesome */}
      <div className="mb-3">
        <label className="form-label d-block">Your rating</label>
        {/* creo 5 icone cliccabili; quando clicco setto il voto */}
        {[1, 2, 3, 4, 5].map((v) => (
          <i
            key={v}
            role="button"
            onClick={() => handleStarClick(v)}
            className={v <= vote ? "fas fa-star me-1 text-warning" : "far fa-star me-1 text-muted"}
            style={{ fontSize: "1.25rem" }}
            aria-label={`${v} star${v > 1 ? "s" : ""}`}
          />
        ))}
      </div>

      {/* testo recensione */}
      <div className="mb-3">
        <label className="form-label">Your review</label>
        <textarea
          className="form-control"
          rows={5}
          placeholder="What did you think about the movie?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* bottone invio */}
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Submitting..." : "Submit review"}
      </button>
    </form>
  );
}
