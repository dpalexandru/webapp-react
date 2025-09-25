// definisco il componente ReviewById
export default function ReviewById({ reviews }) {
  // se non ci sono recensioni mostro un messaggio
  if (!reviews || reviews.length === 0) {
    return <p>No reviews yet.</p>;
  }

  // se ci sono recensioni le stampo in lista
  return (
    <div className="mt-3">
      {/* titolo sezione recensioni */}
      <h6 className="fw-bold">Reviews:</h6>

      <ul className="list-group list-group-flush">
        {/* ciclo tutte le recensioni con map */}
        {reviews.map((review) => (
          <li key={review.id} className="list-group-item">
            {/* nome autore e voto */}
            <strong>{review.name}</strong> ⭐ {review.vote}/5
            <br />
            {/* testo recensione */}
            <span>{review.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
