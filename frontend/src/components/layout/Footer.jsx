import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-sm text-center py-6 mt-10">
      
      {/* Footer Ad */}
      <div className="flex justify-center mb-4">
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", maxWidth: "728px" }}
          data-ad-client="ca-pub-8581322519667262"
          data-ad-slot="4693927977"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>

      <div className="flex justify-center gap-4 mb-2">
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <p className="mb-2">
        © {new Date().getFullYear()} Sudoku by Pranjal
      </p>

      <button
        onClick={() =>
          window.open("https://forms.gle/NUkpFx1ZsGesNXBa7", "_blank")
        }
        className="px-4 py-2 bg-gray-900 text-white rounded"
      >
        💬 Give Feedback
      </button>
    </footer>
  );
}
