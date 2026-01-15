import { Link } from "react-router-dom";
import AdUnit from "../AdUnit";

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
        <AdUnit
          adSlot="6078505299"
          style={{ display: "block", width: "100%", maxWidth: "728px" }}
        />
      </div>
    </header>
  );
}
