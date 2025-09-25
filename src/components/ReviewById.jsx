export default function ReviewById({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <p>No reviews yet.</p>;
  }

  // calcolo la media dei voti
  const avg = reviews.reduce((sum, r) => sum + r.vote, 0) / reviews.length;
  const rounded = Math.round(avg); // arrotondo per le stelle piene
  const total = reviews.length;    // numero totale recensioni

  return (
    <div className="mt-2 bg-light p-3 rounded">
      {/* titolo sezione recensioni con media e totale */}
      <div className="d-flex align-items-center mb-3">
        <h6 className="fw-bold mb-0 me-2">Reviews</h6>
        <div>
          {/* stelle media */}
          {[...Array(5)].map((_, i) => (
            <i
              key={i}
              className={
                i < rounded ? "fas fa-star text-warning" : "far fa-star text-muted"
              }
            ></i>
          ))}
          {/* media numerica + totale recensioni */}
          <span className="ms-2 text-muted">
            ({avg.toFixed(1)} – {total} reviews)
          </span>
        </div>
      </div>

      {/* lista recensioni */}
      <div className="list-group">
        {reviews.map((review) => (
          <div key={review.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <strong>{review.name}</strong>
              <div>
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={
                      i < review.vote
                        ? "fas fa-star text-warning"
                        : "far fa-star text-muted"
                    }
                  ></i>
                ))}
              </div>
            </div>
            <p className="mb-0 text-muted">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
