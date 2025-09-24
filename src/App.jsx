import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* rotta per il dettaglio del film */}
          <Route path="/movies/:id" element={<MovieDetail />} />
        </Routes>
      </main>
    </>
  );
}
