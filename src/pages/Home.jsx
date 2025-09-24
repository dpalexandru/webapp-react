import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard.jsx";

// definisco il componente Home
export default function Home() {
  // stato per salvare i film
  const [movies, setMovies] = useState([]);

  // useEffect esegue la chiamata al backend quando il componente viene montato
  useEffect(() => {
    axios
      .get("http://localhost:3000/movies")
      .then((res) => {
        setMovies(res.data); // salvo i film nello stato
      })
      .catch((err) => {
        console.log("Errore nella chiamata:", err.message);
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
      </div>
    </div>
  );
}
