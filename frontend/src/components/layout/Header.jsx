import { Link } from "react-router-dom";
import AdUnit from "../AdUnit";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [showGameModes, setShowGameModes] = useState(false);

  return (
    <header className="bg-gray-900 text-white">
      {/* Top Navigation */}
      <div className="px-6 py-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">
          Sudoku
        </Link>

        <nav className="flex gap-4 items-center">
          <Link to="/daily">Daily</Link>

          {/* Game Modes Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowGameModes(!showGameModes)}
              onBlur={() => setTimeout(() => setShowGameModes(false), 200)}
              className="hover:text-gray-300"
            >
              Game Modes ▾
            </button>
            {showGameModes && (
              <div className="absolute top-full left-0 mt-2 bg-white text-gray-900 rounded-lg shadow-lg py-2 min-w-[180px] z-50">
                <Link
                  to="/time-trial"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowGameModes(false)}
                >
                  ⏱️ Time Trial
                </Link>
                <Link
                  to="/challenge"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowGameModes(false)}
                >
                  🔥 Challenge
                </Link>
                <Link
                  to="/custom"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowGameModes(false)}
                >
                  ✏️ Custom Puzzle
                </Link>
              </div>
            )}
          </div>

          <Link to="/stats">Stats</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/how-to-play">How to Play</Link>
          <Link to="/about">About</Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="text-2xl hover:scale-110 transition-transform"
            aria-label="Toggle dark mode"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
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
