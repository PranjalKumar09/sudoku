import { Helmet } from "react-helmet-async";

export default function About() {
  const shareUrl = "https://sudoku-frontend-pmdr.onrender.com";
  const shareText =
    "Play free online Sudoku with hints, notes, timer & multiple difficulty levels!";

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* SEO */}
      <Helmet>
        <title>About | Free Online Sudoku – Play Daily Sudoku Puzzles</title>

        <meta
          name="description"
          content="Learn about this free online Sudoku game built with React and Spring Boot. Play daily Sudoku puzzles with hints, notes, timer, and multiple difficulty levels."
        />

        <meta
          name="keywords"
          content="free sudoku, online sudoku, daily sudoku, sudoku game, sudoku with hints, react sudoku"
        />

        <link
          rel="canonical"
          href="https://sudoku-frontend-pmdr.onrender.com/about"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Free Online Sudoku Game" />
        <meta
          property="og:description"
          content="A clean, distraction-free Sudoku experience with hints, notes, and multiple difficulty levels."
        />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Free Online Sudoku Game" />
        <meta
          name="twitter:description"
          content="Play free Sudoku online with a modern UI, hints, notes, and timer."
        />
      </Helmet>

      <h1 className="text-3xl font-bold mb-4">About This Sudoku Game</h1>

      <p className="mb-4 text-gray-700">
        This website is a <strong>free online Sudoku platform</strong> where you
        can enjoy classic and daily Sudoku puzzles directly in your browser —
        no sign-up, no ads, and no distractions.
      </p>

      <p className="mb-4 text-gray-700">
        The goal is to deliver a clean and focused Sudoku experience with modern
        features like <strong>pencil notes</strong>, <strong>smart hints</strong>,
        a <strong>timer</strong>, mistake limits, and multiple difficulty levels
        for beginners and experts alike.
      </p>

      <p className="mb-4 text-gray-700">
        The project is built using <strong>React</strong> on the frontend and
        <strong> Java Spring Boot</strong> on the backend, focusing on
        performance, simplicity, and usability.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">About the Creator</h2>
      <p className="mb-4 text-gray-700">
        Hi, I’m <strong>Pranjal Kumar Shukla</strong> — a software developer who
        enjoys building logical, minimal, and meaningful applications. This
        Sudoku game is a personal project created to blend problem-solving,
        clean UI, and continuous learning.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Support This Project ☕
      </h2>
      <p className="mb-3 text-gray-700">
        If you enjoy playing this Sudoku game and want to support its
        development, you can buy me a coffee or donate via UPI. Your support
        helps keep this project free and improving.
      </p>

      <div className="flex flex-wrap gap-3 mb-6">
        <a
          href="https://www.buymeacoffee.com/pranjalkumar09"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500"
        >
          ☕ Buy Me a Coffee
        </a>

        <div className="px-5 py-2 border rounded bg-gray-50 text-gray-800">
          <strong>UPI:</strong> officialakumar@ybl
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">Share This Game ❤️</h2>
      <div className="flex flex-wrap gap-3 mb-6">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(
            `${shareText} ${shareUrl}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          WhatsApp
        </a>

        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}&url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          X
        </a>

        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
        >
          LinkedIn
        </a>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">Find Me Online</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-1">
        <li>
          <a
            href="https://leetcode.com/u/coderkumarshukla/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            LeetCode
          </a>
        </li>
        <li>
          <a
            href="https://github.com/PranjalKumar09"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://gitlab.com/coderkumarshukla"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            GitLab
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/pranjalkumar09/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="https://x.com/KumarPranjal09"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            X (Twitter)
          </a>
        </li>
      </ul>
    </div>
  );
}
