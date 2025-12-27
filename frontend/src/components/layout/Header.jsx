import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white">
      {/* Top Navigation */}
      <div className="px-6 py-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">
          Sudoku
        </Link>

        <nav className="flex gap-4">
          <Link to="/daily">Daily</Link>
          <Link to="/how-to-play">How to Play</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>

      {/* Ad Slot (Header) */}
      <div className="bg-gray-800 py-2 flex justify-center">
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", maxWidth: "728px" }}
          data-ad-client="ca-pub-8581322519667262"
          data-ad-slot="6078505299"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </header>
  );
}
