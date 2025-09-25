import { useLoader } from "../context/LoaderContext";

export default function LoaderOverlay() {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return (
    <div className="loader-overlay">
      <div className="text-center">
        {/* spinner nero di boostrapp */}
        <div
          className="spinner-border text-dark"
          role="status"
          aria-label="Loading"
          style={{ width: "3rem", height: "3rem" }}
        ></div>
        <div className="mt-2 small text-muted">Loading...</div>
      </div>
    </div>
  );
}
