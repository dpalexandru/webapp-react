import { useEffect, useState } from "react";
import axios from "axios";

// definisco il componente Home
export default function Home() {
  // stato per salvare i film
  const [movies, setMovies] = useState([]);

  // useEffect esegue la chiamata al backend quando il componente viene montato
  useEffect(() => {
    // chiamata axios al backend express
    axios
      .get("http://localhost:3000/movies")
      .then((res) => {
        // salvo i film nello stato
        setMovies(res.data);
      })
      .catch((err) => {
        // gestisco l'errore solo con un console.log
        console.log("Errore nella chiamata:", err.message);
      });
  }, []);

  // renderizzo la lista dei film
  return (
    <div className="container mt-4">
      <h1>Lista Film</h1>
      <ul className="list-group">
        {movies.map((movie) => (
          <li key={movie.id} className="list-group-item">
            <strong>{movie.title}</strong> – {movie.year} ({movie.genre})
          </li>
        ))}
      </ul>
    </div>
  );
}
