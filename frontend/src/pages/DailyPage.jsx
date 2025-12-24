import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import GamePage from "./GamePage";

export default function DailyPage() {
  const { date } = useParams();
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];
  const selectedDate = date || today;

  function goToDate(d) {
    navigate(`/daily/${d}`);
  }

  const formattedDate = new Date(selectedDate).toDateString();
  const pageUrl = `https://sudoku-frontend-pmdr.onrender.com/daily/${selectedDate}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Game",
    name: `Daily Sudoku – ${formattedDate}`,
    description:
      "Play the free Daily Sudoku puzzle online with hints, timer, and mistake limits. A new Sudoku puzzle every day.",
    url: pageUrl,
    genre: "Puzzle",
    inLanguage: "en",
    isAccessibleForFree: true
  };

  return (
    <div className="flex flex-col items-center gap-4 px-4">
      <Helmet>
        {/* Primary SEO */}
        <title>Daily Sudoku Puzzle – Play Free Online | {formattedDate}</title>
        <meta
          name="description"
          content={`Play the Daily Sudoku puzzle for ${formattedDate}. Free online Sudoku with hints, timer, and mistake limits. New puzzle every day!`}
        />
        <link rel="canonical" href={pageUrl} />

        {/* Crawl control */}
        <meta name="robots" content="index, follow" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Page Heading */}
      <h1 className="text-2xl font-bold text-center">
        Daily Sudoku – {formattedDate}
      </h1>

      <p className="text-gray-600 text-center max-w-xl">
        Enjoy the Daily Sudoku puzzle for {formattedDate}. Each day features a
        brand-new Sudoku challenge with optional hints, a timer, and mistake
        tracking to sharpen your skills.
      </p>

      {/* Calendar */}
      <input
        type="date"
        value={selectedDate}
        max={today}
        onChange={(e) => goToDate(e.target.value)}
        className="border px-3 py-2 rounded"
        aria-label="Select Daily Sudoku date"
      />

      {/* Internal links (SEO gold) */}
      <div className="text-sm text-gray-500">
        <a href="/daily" className="underline">
          Today’s Sudoku
        </a>
      </div>

      {/* Game */}
      <GamePage mode="daily" dailyDate={selectedDate} />
    </div>
  );
}
