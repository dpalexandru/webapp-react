import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard.jsx";
import { useLoader } from "../context/LoaderContext.jsx";

// definisco il componente Home
export default function Home() {
  // stato per salvare i film
  const [movies, setMovies] = useState([]);
  const { showLoader, hideLoader } = useLoader();
  const [error, setError] = useState(null);

  // useEffect esegue la chiamata al backend quando il componente viene montato
  useEffect(() => {
    showLoader();
    axios
      .get("http://localhost:3000/movies")
      .then((res) => {
        setMovies(res.data);
        setError(null);
      })
      .catch((err) => {
        console.log("Errore nella chiamata:", err.message);
        setError("Connessione al server fallita.");
      })
      .finally(() => {
        hideLoader();
      });
  }, []);

  // renderizzo la lista dei film con MovieCard
  return (
    <div className="container mt-4">
      <h1>Lista Film</h1>
      <div className="row">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {/* se errore presente mostro la scritta */}
        {error && (
          <p className="text-danger mt-3 fw-bold">{error}</p>
        )}
      </div>
    </div>
  );
}
