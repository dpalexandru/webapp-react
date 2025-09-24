import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import About from "./pages/About.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main className="container mt-4">
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </>
  );
}
